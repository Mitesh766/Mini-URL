import { nanoid } from "nanoid";
import asyncHandler from "../utils/asyncHandler.js";
import { handleExpireTime } from "../utils/expiryDateGenerator.js";
import bcrypt from "bcrypt";
import { generateAndUploadQR } from "../utils/generateAndUploadQR.js";
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

  if (!validator.isURL(originalUrl)) {
    res.status(400);
    throw new Error("Please enter a valid URL");
  }

  const SHORT_URL_BASE = "https://minli.info";

  if (originalUrl.startsWith(SHORT_URL_BASE)) {
    res.status(400);
    throw new Error("Cannot shorten a URL from this service.");
  }

  const shortCode = await generateUniqueShortCode(aliasType, customAlias);
  const minUrl = `${SHORT_URL_BASE}/${shortCode}`;
  const qrUrl = await generateAndUploadQR(minUrl, shortCode);

  const urlData = new ShortUrl({
    userId: req.user._id,
    title,
    originalUrl,
    shortCode,
    shortUrl:minUrl,
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


/**
 * @desc    Updates or removes password protection for a shortened URL.
 *          If a new password is provided, it is hashed and saved.
 *          If an empty string is provided, password protection is removed.
 * @route   PUT /api/url/delete/:urlId
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Extract `urlId`, `newPassword`, and `confirmPassword` from the request.
 * 2. Validate all required fields and check for password mismatch.
 * 3. Look up the ShortUrl document using the provided `urlId`.
 * 4. If `newPassword` is an empty string, remove password protection.
 * 5. Otherwise, hash the new password and set protection flags.
 * 6. Save the updated document.
 * 7. Respond with a success message indicating the result (added/removed).
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const { urlId } = req.params;
  let { newPassword, confirmPassword } = req.body;
  console.log("First")
  if (newPassword === undefined || confirmPassword === undefined || !urlId) {
    res.status(400);
    throw new Error("All fields are required");
  }
  console.log("Second")

  // Trim both inputs
  newPassword = newPassword.trim();
  confirmPassword = confirmPassword.trim();

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const urlData = await ShortUrl.findById(urlId);
  if (!urlData) {
    res.status(404);
    throw new Error("Invalid URL");
  }

  const isRemovingPassword = newPassword === "";
  console.log(isRemovingPassword)
  if (isRemovingPassword) {
    urlData.password = undefined;
    urlData.isPasswordProtected = false;
  } else {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    urlData.password = hashedPassword;
    urlData.isPasswordProtected = true;
  }

  await urlData.save();

  res.status(200).json({
    message: isRemovingPassword
      ? "Password removed successfully"
      : "Password updated successfully",
  });
});



/**
 * @desc    Deletes a shortened URL by its ID.
 *          If no URL with the provided ID is found, returns a 404 error.
 * @route   DELETE /api/url/delete/:urlId
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Extract `urlId` from the request parameters.
 * 2. Attempt to delete the ShortUrl document with the matching `_id`.
 * 3. If no document is deleted (`deletedCount` is 0), respond with a 404 error.
 * 4. If deletion succeeds, respond with a success message.
 */
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


/**
 * @desc    Toggles the activation status (active/inactive) of a shortened URL by its ID.
 *          Returns a 404 error if the URL with the given ID is not found.
 * @route   PUT /api/url/changeActivationStatus/:urlId
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Extract `urlId` from the request parameters.
 * 2. Find the ShortUrl document by its `_id`.
 * 3. If no document is found, respond with a 404 error.
 * 4. Toggle the `isActive` boolean flag.
 * 5. Save the updated document.
 * 6. Respond with a success message confirming the update.
 */
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


/**
 * @desc    Updates the original URL and expiry date of a shortened URL by its ID.
 *          Validates the new URL and expiry date before saving changes.
 *          Prevents shortening URLs from the same service domain.
 * @route   PUT /api/url/updateUrlAndExpiry/:urlId
 * @access  Private (Requires authenticated user)
 *
 * Steps:
 * 1. Extract `urlId` from request parameters and `newLongUrl`, `newExpiry` from request body.
 * 2. Validate that both `newLongUrl` and `newExpiry` are provided.
 * 3. Trim and validate the URL format using a validator.
 * 4. Validate the expiry date is a valid date.
 * 5. Check if the new URL is not from the service’s own domain to prevent self-shortening.
 * 6. Find the ShortUrl document by ID.
 * 7. If not found, respond with 404 error.
 * 8. Update the original URL and expiry date fields.
 * 9. Save the document.
 * 10. Respond with a success message.
 */
export const updateUrlAndExpiry = asyncHandler(async (req, res) => {
  const { urlId } = req.params;
  const { newLongUrl, newExpiry } = req.body || {};

  if (!newLongUrl || !newExpiry) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const trimmedUrl = validator.trim(newLongUrl);

  if (!validator.isURL(trimmedUrl)) {
    res.status(400);
    throw new Error("Please enter a valid URL");
  }

  const expiryDate = new Date(newExpiry);
  if (isNaN(expiryDate.getTime())) {
    res.status(400);
    throw new Error("Please enter a valid expiry date");
  }

  const SHORT_URL_BASE = "https://minli.info";

  if (trimmedUrl.startsWith(SHORT_URL_BASE)) {
    res.status(400);
    throw new Error("Cannot shorten a URL from this service.");
  }

  const urlData = await ShortUrl.findById(urlId);
  if (!urlData) {
    res.status(404);
    throw new Error("Invalid URL ID");
  }

  urlData.originalUrl = trimmedUrl;
  urlData.expiresAt = expiryDate;
  await urlData.save();

  res.status(200).json({
    message: "URL updated successfully",
  });
});
