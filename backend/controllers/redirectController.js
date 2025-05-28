import ShortUrl from "../models/ShortUrlModel.js";
import ClickLog from "../models/ClickLogModel.js";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";

// Bot detection patterns - focusing on social media crawlers and preview generators
const BOT_PATTERNS = [
  /twitterbot/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegrambot/i,
  /slackbot/i,
  /linkedinbot/i,
  /discordbot/i,
  /googlebot/i,
  /bingbot/i,
  /crawler/i,
  /spider/i,
  /bot\b/i,
  /preview/i,
  /unfurl/i,
];

// Check if request is from a bot
const isBot = (userAgent) => {
  if (!userAgent) return false;
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
};

// Log analytics for real users only
const logAnalytics = async (shortUrlId, req) => {
  try {
    const parser = new UAParser(req.get("User-Agent"));
    const result = parser.getResult();
    
    const clickLog = new ClickLog({
      shortUrlId,
      browser: result.browser.name || "Unknown",
      os: result.os.name || "Unknown",
      deviceType: result.device.type || "desktop",
      country: "Unknown" // Add IP geolocation service if needed
    });
    
    await clickLog.save();
  } catch (error) {
    console.error("Analytics logging failed:", error);
    // Don't break redirect if analytics fail
  }
};

// Main redirect handler
export const redirectHandler = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userAgent = req.get("User-Agent") || "";
    const isBotRequest = isBot(userAgent);
    
    // Find the short URL
    const shortUrl = await ShortUrl.findOne({ 
      shortCode: code,
      isActive: true
    });

    // If URL doesn't exist, fallback to frontend
    if (!shortUrl) {
      return next(); // This will serve your static frontend
    }

    // Check expiration (skip for bots to allow previews)
    if (!isBotRequest && shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
      return res.status(410).json({ 
        success: false, 
        message: "This link has expired" 
      });
    }

    // Check one-time usage (skip for bots)
    if (!isBotRequest && shortUrl.isOneTime && shortUrl.hasBeenUsed) {
      return res.status(410).json({ 
        success: false, 
        message: "This one-time link has already been used" 
      });
    }

    // Handle password protection (bots skip for previews)
    if (!isBotRequest && shortUrl.isPasswordProtected) {
      const { password } = req.body;
      
      // No password provided
      if (!password) {
        return res.status(200).json({
          success: false,
          requiresPassword: true,
          message: "Password required"
        });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, shortUrl.password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          requiresPassword: true,
          message: "Incorrect password"
        });
      }
    }

    // Update analytics only for real users (not bots)
    if (!isBotRequest) {
      // Update click count and usage status
      const updateData = { $inc: { clickCount: 1 } };
      if (shortUrl.isOneTime) {
        updateData.hasBeenUsed = true;
      }
      
      await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);
      
      // Log detailed analytics
      await logAnalytics(shortUrl._id, req);
      
      console.log(`User redirected: ${code} -> ${shortUrl.originalUrl}`);
    } else {
      console.log(`Bot preview: ${code} -> ${shortUrl.originalUrl}`);
    }

    // For password-protected API requests, return JSON response
    if (!isBotRequest && shortUrl.isPasswordProtected && req.body.password) {
      return res.status(200).json({
        success: true,
        originalUrl: shortUrl.originalUrl,
        message: "Redirecting..."
      });
    }

    // Direct redirect for normal URLs and bots
    return res.redirect(301, shortUrl.originalUrl);

  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Separate password verification endpoint (optional)
export const verifyPassword = async (req, res) => {
  try {
    const { code } = req.params;
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password required"
      });
    }

    const shortUrl = await ShortUrl.findOne({ 
      shortCode: code,
      isActive: true,
      isPasswordProtected: true
    });

    if (!shortUrl) {
      return res.status(404).json({ 
        success: false, 
        message: "URL not found" 
      });
    }

    // Check expiration and usage
    if (shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
      return res.status(410).json({ 
        success: false, 
        message: "Link expired" 
      });
    }

    if (shortUrl.isOneTime && shortUrl.hasBeenUsed) {
      return res.status(410).json({ 
        success: false, 
        message: "Link already used" 
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, shortUrl.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Update stats and log analytics
    const updateData = { $inc: { clickCount: 1 } };
    if (shortUrl.isOneTime) {
      updateData.hasBeenUsed = true;
    }
    
    await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);
    await logAnalytics(shortUrl._id, req);

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl.originalUrl
    });

  } catch (error) {
    console.error("Password verification error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};