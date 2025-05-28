import { nanoid } from "nanoid";
import ShortUrl from "../models/ShortUrlModel.js";

/**
 * Generates a unique short code based on aliasType.
 * - For 'custom' type, checks if alias is already used.
 * - For 'random' type, retries up to 5 times in case of collision.
 *
 * @param {string} aliasType - 'custom' or 'random'
 * @param {string} [customAlias] - custom alias if aliasType is 'custom'
 * @returns {Promise<string>} - A unique shortCode
 * @throws {Error} - Throws error if alias is taken or unique code couldn't be generated
 */
export const generateUniqueShortCode = async (aliasType, customAlias) => {
  let shortCode = aliasType === "custom" ? customAlias : nanoid(8);
  
  let existing = await ShortUrl.findOne({ shortCode });

  if (existing) {
    if (aliasType === "custom") {
      throw new Error("Custom alias already in use. Please choose another one.");
    } else {
      // Retry up to 5 times for random collisions
      let retryCount = 0;
      do {
        shortCode = nanoid(8);
        retryCount++;
        if (retryCount > 5) {
          throw new Error("Failed to generate a unique short code. Please try again.");
        }
      } while (await ShortUrl.findOne({ shortCode }));
    }
  }

  return shortCode;
};
