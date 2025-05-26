import { nanoid } from "nanoid";
import asyncHandler from "../utils/asyncHandler.js";
import { handleExpireTime } from "../utils/expiryDateGenerator.js";
import bcrypt from "bcrypt";
import { generateAndUploadQR } from "../utils/generateAndUploadQr.js";
import ShortUrl from "../models/ShortUrlModel.js";
import validator from "validator";

import { generateUniqueShortCode } from "../utils/generateShortCode.js";

/**
 * @desc    Creates a new shortened URL with optional custom alias, password protection, expiration, and one-time usage.
 *          Prevents shortening of URLs that already belong to the service to avoid redirect cycles.
 * @route   POST /api/url/shortenUrl
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Validate required input fields and check presence of necessary data based on alias type and password protection.
 * 2. Ensure the original URL is not already a short URL from this service to prevent infinite redirect loops.
 * 3. Generate a unique short code, either from a custom alias or a random string.
 * 4. Construct the full short URL using the generated short code.
 * 5. Generate a QR code for the short URL and upload it to a storage service.
 * 6. Hash the password securely if password protection is enabled.
 * 7. Calculate and set the expiration date/time based on the requested expiration period.
 * 8. Create a new ShortUrl document in MongoDB containing all URL metadata.
 * 9. Save the document and respond with the newly created short URL data.
 */
export const shortenUrl = asyncHandler(async (req, res, next) => {
  const {
    title,
    originalUrl,
    customAlias,
    aliasType,
    expirationTime,
    isPasswordProtected,
    password,
    isOneTime,
  } = req.body;

  if (
    !originalUrl ||
    (aliasType === "custom" && !customAlias) ||
    !expirationTime ||
    (isPasswordProtected && !password) ||
    !title
  ) {
    res.status(400);
    throw new Error("Please fill all the required details.");
  }

  const SHORT_URL_BASE = "https://minli.info";

  if (originalUrl.startsWith(SHORT_URL_BASE)) {
    res.status(400);
    throw new Error("Cannot shorten a URL from this service.");
  }

  const shortCode = await generateUniqueShortCode(aliasType, customAlias);
  const shortUrl = `${SHORT_URL_BASE}/${shortCode}`;
  const qrUrl = await generateAndUploadQR(shortUrl, shortCode);

  const urlData = new ShortUrl({
    userId: req.user._id,
    title,
    originalUrl,
    shortCode,
    shortUrl,
    isCustomAlias: aliasType === "custom",
    isPasswordProtected,
    password: isPasswordProtected ? await bcrypt.hash(password, 10) : undefined,
    expiresAt: handleExpireTime(expirationTime),
    isOneTime,
    qrUrl,
  });

  const newUrl = await urlData.save();
  res.status(201).json({
    message: "Short URL created successfully",
    newUrl,
  });
});

/**
 * @desc    Retrieves all shortened URLs created by the authenticated user.
 *          Returns metadata for each URL, including status, protection, and usage details.
 * @route   GET /api/url/getAllUrls
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Ensure the request is authenticated and contains a valid user object.
 * 2. Query the database to find all ShortUrl documents associated with the user's ID.
 * 3. Select specific fields to return only relevant URL metadata.
 * 4. Optionally convert documents to plain objects for performance (if using .lean()).
 * 5. Respond with a success message and the list of URLs created by the user.
 */
export const getAllUrls = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const urls = await ShortUrl.find({ userId: req.user._id })
    .select(
      "_id originalUrl shortUrl isPasswordProtected expiresAt isActive isOneTime hasBeenUsed qrUrl createdAt clickCount title"
    )
    .lean();

  res.status(200).json({
    message: "URLs fetched successfully",
    urls,
  });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword, urlId } = req.body;

  if (!newPassword || !confirmPassword || !urlId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (!validator.isStrongPassword(newPassword)) {
    res.status(400);
    throw new Error("Please create a strong password");
  }

  const urlData = await ShortUrl.findById(urlId);

  if (!urlData) {
    res.status(404);
    throw new Error("Invalid URL");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  urlData.password = hashedPassword;
  urlData.isPasswordProtected = true;

  await urlData.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

export const deleteUrl = asyncHandler(async (req, res) => {
  const { urlId } = req.params;

  const urlData = await ShortUrl.deleteOne({ _id: urlId });

  if (urlData.deletedCount === 0) {
    res.status(404);
    throw new Error("No URL found with the provided ID");
  }

  res.status(200).json({
    message: "URL deleted successfully",
  });
});

export const changeActivationStatus = asyncHandler(async (req, res) => {
  const { urlId } = req.params;
  const urlData = await ShortUrl.findById(urlId);
  if (!urlData) {
    res.status(404);
    throw new Error("Invalid url Id");
  }

  urlData.isActive = !urlData.isActive;
  await urlData.save();

  res.status(200).json({
    message: "Activation status updated successfully",
  });
});
