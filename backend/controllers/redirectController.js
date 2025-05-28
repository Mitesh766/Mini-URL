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

// HTML template for password input
const getPasswordInputHTML = (code, title, error = null) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Protected Link</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .container {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                width: 100%;
                max-width: 400px;
                text-align: center;
            }
            
            .lock-icon {
                font-size: 48px;
                color: #667eea;
                margin-bottom: 20px;
            }
            
            h1 {
                color: #333;
                margin-bottom: 10px;
                font-size: 24px;
            }
            
            .subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 14px;
            }
            
            .form-group {
                margin-bottom: 20px;
                text-align: left;
            }
            
            label {
                display: block;
                margin-bottom: 8px;
                color: #333;
                font-weight: 500;
            }
            
            input[type="password"] {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                font-size: 16px;
                transition: border-color 0.3s;
                outline: none;
            }
            
            input[type="password"]:focus {
                border-color: #667eea;
            }
            
            .btn {
                width: 100%;
                padding: 12px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .btn:hover {
                background: #5a6fd8;
            }
            
            .btn:active {
                transform: translateY(1px);
            }
            
            .error {
                background: #fee;
                color: #c33;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 20px;
                border: 1px solid #fcc;
            }
            
            .link-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 6px;
                margin-bottom: 20px;
                border-left: 4px solid #667eea;
            }
            
            .link-title {
                font-weight: 500;
                color: #333;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="lock-icon">🔒</div>
            <h1>Password Protected</h1>
            <p class="subtitle">This link requires a password to access</p>
            
            ${title ? `<div class="link-info">
                <div class="link-title">${title}</div>
            </div>` : ''}
            
            ${error ? `<div class="error">${error}</div>` : ''}
            
            <form method="POST" action="/${code}">
                <div class="form-group">
                    <label for="password">Enter Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        autofocus
                        placeholder="Enter the password..."
                    >
                </div>
                <button type="submit" class="btn">Access Link</button>
            </form>
        </div>
        
        <script>
            // Auto focus on password field
            document.getElementById('password').focus();
        </script>
    </body>
    </html>
  `;
};

// HTML template for expired/used links
const getErrorHTML = (message, title = "Link Unavailable") => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                margin: 0;
            }
            
            .container {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 400px;
            }
            
            .icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            
            h1 {
                color: #333;
                margin-bottom: 20px;
                font-size: 24px;
            }
            
            .message {
                color: #666;
                font-size: 16px;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">⚠️</div>
            <h1>${title}</h1>
            <p class="message">${message}</p>
        </div>
    </body>
    </html>
  `;
};

// Main redirect handler
export const redirectHandler = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { password } = req.body;
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

    

    // Check one-time usage (skip for bots)
    if (shortUrl.isOneTime && shortUrl.hasBeenUsed) {
      return res.send(getErrorHTML("This one-time link has already been used and cannot be accessed again.", "Link Already Used"));
    }

    // Handle password protection (bots skip for previews)
    if (!isBotRequest && shortUrl.isPasswordProtected) {
      // No password provided - show password input form
      if (!password) {
        return res.send(getPasswordInputHTML(code, shortUrl.title));
      }

      // Verify password
      const isValid = await bcrypt.compare(password, shortUrl.password);
      if (!isValid) {
        return res.send(getPasswordInputHTML(code, shortUrl.title, "Incorrect password. Please try again."));
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

    // Direct redirect for all valid requests
    return res.redirect(301, shortUrl.originalUrl);

  } catch (error) {
    console.error("Redirect error:", error);
    return res.send(getErrorHTML("An unexpected error occurred. Please try again later.", "Server Error"));
  }
};