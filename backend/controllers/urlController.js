import { nanoid } from "nanoid";
import asyncHandler from "../utils/asyncHandler.js";
import { handleExpireTime } from "../utils/expiryDateGenerator.js";
import bcrypt from "bcrypt";
import { generateAndUploadQR } from "../utils/generateAndUploadQr.js";
import ShortUrl from "../models/ShortUrlModel.js";

import { generateUniqueShortCode } from "../utils/generateUniqueShortCode.js";

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
    (isPasswordProtected && !password)
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

export const getUrl = asyncHandler((req, res, next) => {});
