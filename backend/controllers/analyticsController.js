import asyncHandler from "../utils/asyncHandler.js";
import ClickLog from "../models/ClickLogModel.js";
import ShortUrl from "../models/ShortUrlModel.js";
import mongoose from "mongoose";

export const getAnalytics = asyncHandler(async (req, res) => {
  const { shortUrlId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shortUrlId)) {
    res.status(400);
    throw new Error("Invalid URL ID");
  }

  const url = await ShortUrl.findById(shortUrlId);
  if (!url) {
    res.status(404);
    throw new Error("Short URL not found");
  }

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalClicks,
    todayClicks,
    browserWise,
    deviceWise,
    dailyClicks,
    hourlyClicks,
  ] = await Promise.all([
    ClickLog.countDocuments({ shortUrlId }),
    ClickLog.countDocuments({ shortUrlId, timestamp: { $gte: startOfToday } }),

    ClickLog.aggregate([
      { $match: { shortUrlId: new mongoose.Types.ObjectId(shortUrlId) } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
    ]),

    ClickLog.aggregate([
      { $match: { shortUrlId: new mongoose.Types.ObjectId(shortUrlId) } },
      { $group: { _id: "$deviceType", count: { $sum: 1 } } },
    ]),

    ClickLog.aggregate([
      {
        $match: {
          shortUrlId: new mongoose.Types.ObjectId(shortUrlId),
          timestamp: { $gte: last30Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    ClickLog.aggregate([
      {
        $match: {
          shortUrlId: new mongoose.Types.ObjectId(shortUrlId),
          timestamp: { $gte: yesterday },
        },
      },
      {
        $group: {
          _id: { hour: { $hour: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.hour": 1 } },
    ]),
  ]);

  const createdAt = url.createdAt;
  const diffInDays = Math.max(
    Math.ceil((now - createdAt) / (1000 * 60 * 60 * 24)),
    1
  );
  const avgDailyClicks = Math.round(totalClicks / diffInDays);

  res.json({
    shortUrl: {
      _id: url._id,
      shortCode: url.shortCode,
    },
    totalClicks,
    todayClicks,
    createdAt,
    avgDailyClicks,
    browserWise,
    deviceWise,
    last30Days: dailyClicks,
    last24HoursHourly: hourlyClicks,
  });
});
