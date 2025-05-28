import mongoose from "mongoose";

const ClickLogSchema = new mongoose.Schema({
  shortUrlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortUrl",
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  browser: String,
  os: String,
  deviceType: String,
});

ClickLogSchema.index({ shortUrlId: 1, timestamp: 1 });

const ClickLog = mongoose.model("ClickLog", ClickLogSchema);
export default ClickLog;
