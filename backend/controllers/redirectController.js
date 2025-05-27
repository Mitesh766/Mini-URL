import ShortUrl from "../models/ShortUrl.js";
import ClickLog from "../models/ClickLog.js";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";

// Bot detection patterns
const BOT_PATTERNS = [
  // Social media crawlers
  /twitterbot/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegrambot/i,
  /slackbot/i,
  /linkedinbot/i,
  /discordbot/i,
  /skypeuri/i,
  
  // Search engine bots
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /baiduspider/i,
  /duckduckbot/i,
  
  // Other crawlers
  /crawler/i,
  /spider/i,
  /bot\b/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /postman/i,
  /insomnia/i,
  /httpie/i,
  /axios/i,
  /node-fetch/i,
  
  // Preview generators
  /preview/i,
  /thumbnail/i,
  /unfurl/i,
  /linkpreview/i,
  
  // Security scanners
  /nmap/i,
  /nikto/i,
  /sqlmap/i,
  /burpsuite/i,
];

// Helper function to detect if request is from a bot
const isBot = (userAgent, headers = {}) => {
  if (!userAgent) return false;
  
  // Check user agent against bot patterns
  const isBotUserAgent = BOT_PATTERNS.some(pattern => pattern.test(userAgent));
  
  // Check for common bot headers
  const botHeaders = [
    'x-requested-with',
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip'
  ];
  
  const hasAutomatedHeaders = Object.keys(headers).some(header => 
    header.toLowerCase().includes('bot') || 
    header.toLowerCase().includes('crawler') ||
    header.toLowerCase().includes('spider')
  );
  
  return isBotUserAgent || hasAutomatedHeaders;
};

// Helper function to get user agent info
const getUserAgentInfo = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  return {
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    deviceType: result.device.type || "desktop",
    isBot: isBot(userAgent)
  };
};

// Helper function to log click analytics (only for non-bot traffic)
const logClick = async (shortUrlId, req, shouldLog = true) => {
  if (!shouldLog) {
    console.log("Bot detected - skipping analytics logging");
    return;
  }
  
  try {
    const userAgentInfo = getUserAgentInfo(req.get("User-Agent"));
    
    const clickLog = new ClickLog({
      shortUrlId,
      browser: userAgentInfo.browser,
      os: userAgentInfo.os,
      deviceType: userAgentInfo.deviceType,
      // You can add country detection here using IP geolocation service
      country: "Unknown"
    });
    
    await clickLog.save();
  } catch (error) {
    console.error("Error logging click:", error);
    // Don't throw error - analytics failure shouldn't break redirect
  }
};

export const redirectHandler = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userAgent = req.get("User-Agent") || "";
    const requestHeaders = req.headers;
    
    // Detect if request is from a bot
    const isBotRequest = isBot(userAgent, requestHeaders);
    
    console.log(`Request from ${isBotRequest ? 'BOT' : 'USER'}: ${userAgent}`);
    
    // Find the short URL by code
    const shortUrl = await ShortUrl.findOne({ 
      shortCode: code,
      isActive: true
    });

    // If URL doesn't exist, pass to next middleware (React SPA)
    if (!shortUrl) {
      return next();
    }

    // Check if URL has expired
    if (shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
      return res.status(410).json({ 
        success: false, 
        message: "This link has expired" 
      });
    }

    // For bots, allow access to expired or used one-time URLs for preview generation
    // But for regular users, enforce restrictions
    if (!isBotRequest) {
      // Check if it's a one-time URL that has already been used
      if (shortUrl.isOneTime && shortUrl.hasBeenUsed) {
        return res.status(410).json({ 
          success: false, 
          message: "This one-time link has already been used" 
        });
      }

      // Handle password-protected URLs (bots skip password protection for previews)
      if (shortUrl.isPasswordProtected) {
        const { password } = req.body;
        
        // If no password provided, return password prompt
        if (!password) {
          return res.status(200).json({
            success: false,
            requiresPassword: true,
            message: "This link is password protected. Please provide the password."
          });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, shortUrl.password);
        
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            requiresPassword: true,
            message: "Incorrect password. Please try again."
          });
        }
      }

      // Update click count and one-time usage only for non-bot traffic
      const updateData = {
        $inc: { clickCount: 1 }
      };

      if (shortUrl.isOneTime) {
        updateData.hasBeenUsed = true;
      }

      await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);

      // Log the click for analytics (only for non-bot traffic)
      await logClick(shortUrl._id, req, true);
    } else {
      // For bots, don't update stats but still log the bot visit for debugging
      console.log(`Bot access to ${code}: ${shortUrl.originalUrl}`);
    }

    // For API requests (with password), return success response
    if (!isBotRequest && shortUrl.isPasswordProtected && req.body.password) {
      return res.status(200).json({
        success: true,
        originalUrl: shortUrl.originalUrl,
        message: "Redirecting..."
      });
    }

    // For normal URLs and bots, redirect directly
    return res.redirect(301, shortUrl.originalUrl);

  } catch (error) {
    console.error("Error in redirectHandler:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

// Optional: Separate endpoint for password verification
export const verifyPassword = async (req, res) => {
  try {
    const { code } = req.params;
    const { password } = req.body;
    const userAgent = req.get("User-Agent") || "";
    const requestHeaders = req.headers;
    
    // Detect if request is from a bot
    const isBotRequest = isBot(userAgent, requestHeaders);

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
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
        message: "Short URL not found" 
      });
    }

    // Check if URL has expired (only for non-bot requests)
    if (!isBotRequest && shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
      return res.status(410).json({ 
        success: false, 
        message: "This link has expired" 
      });
    }

    // Check if it's a one-time URL that has already been used (only for non-bot requests)
    if (!isBotRequest && shortUrl.isOneTime && shortUrl.hasBeenUsed) {
      return res.status(410).json({ 
        success: false, 
        message: "This one-time link has already been used" 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, shortUrl.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Update stats only for non-bot requests
    if (!isBotRequest) {
      // Update click count and one-time usage
      const updateData = {
        $inc: { clickCount: 1 }
      };

      if (shortUrl.isOneTime) {
        updateData.hasBeenUsed = true;
      }

      await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);

      // Log the click for analytics
      await logClick(shortUrl._id, req, true);
    } else {
      console.log(`Bot password verification for ${code}: ${shortUrl.originalUrl}`);
    }

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl.originalUrl
    });

  } catch (error) {
    console.error("Error in verifyPassword:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};