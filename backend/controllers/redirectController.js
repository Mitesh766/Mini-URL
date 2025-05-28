import ShortUrl from "../models/ShortUrlModel.js";
import ClickLog from "../models/ClickLogModel.js";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";




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

// Helper function to find and validate short URL
const findAndValidateShortUrl = async (code) => {
  const shortUrl = await ShortUrl.findOne({ 
    shortCode: code,
    isActive: true
  });

  if (!shortUrl) {
    return { error: 'not_found', shortUrl: null };
  }


  // Check one-time usage
  if (shortUrl.isOneTime && shortUrl.hasBeenUsed) {
    return { error: 'used', shortUrl };
  }

  return { error: null, shortUrl };
};

// Handle GET requests - show password form or redirect
export const handleGetRequest = async (req, res, next) => {
  try {
    const { code } = req.params;
   
    
    const { error, shortUrl } = await findAndValidateShortUrl(code);

    // If URL doesn't exist, fallback to frontend
    if (error === 'not_found') {
      return next();
    }

    // Handle errors for non-bot requests
    
      if (error === 'expired') {
        return res.send(getErrorHTML("This link has expired and is no longer accessible.", "Link Expired"));
      }
      
      if (error === 'used') {
        return res.send(getErrorHTML("This one-time link has already been used and cannot be accessed again.", "Link Already Used"));
      }

      // If password protected, show password form
      if (shortUrl.isPasswordProtected) {
        return res.send(getPasswordInputHTML(code, shortUrl.title));
      }

    

    // For non-password protected URLs or bots, redirect directly
   
      // Update analytics for real users
      const updateData = { $inc: { clickCount: 1 } };
      if (shortUrl.isOneTime) {
        updateData.hasBeenUsed = true;
      }
      
      await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);
      await logAnalytics(shortUrl._id, req);
      
      console.log(`User redirected: ${code} -> ${shortUrl.originalUrl}`);
    

    return res.redirect(301, shortUrl.originalUrl);

  } catch (error) {
    console.error("GET redirect error:", error);
    return res.send(getErrorHTML("An unexpected error occurred. Please try again later.", "Server Error"));
  }
};

// Handle POST requests - password verification
export const handlePostRequest = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { password } = req.body;
    
    console.log(`POST request for ${code} with password attempt`);

   

    const { error, shortUrl } = await findAndValidateShortUrl(code);

    // If URL doesn't exist, fallback to frontend
    if (error === 'not_found') {
      return next();
    }

    // Handle errors
    if (error === 'expired') {
      return res.send(getErrorHTML("This link has expired and is no longer accessible.", "Link Expired"));
    }
    
    if (error === 'used') {
      return res.send(getErrorHTML("This one-time link has already been used and cannot be accessed again.", "Link Already Used"));
    }

    // If not password protected, redirect to GET
    if (!shortUrl.isPasswordProtected) {
      return res.redirect(301, `/${code}`);
    }

    // Check if password was provided
    if (!password || password.trim() === '') {
      return res.send(getPasswordInputHTML(code, shortUrl.title, "Password is required."));
    }

    // Verify password
    const isValid = await bcrypt.compare(password, shortUrl.password);
    if (!isValid) {
      return res.send(getPasswordInputHTML(code, shortUrl.title, "Incorrect password. Please try again."));
    }

    // Password is correct, update analytics and redirect
    const updateData = { $inc: { clickCount: 1 } };
    if (shortUrl.isOneTime) {
      updateData.hasBeenUsed = true;
    }
    
    await ShortUrl.findByIdAndUpdate(shortUrl._id, updateData);
    await logAnalytics(shortUrl._id, req);
    
    console.log(`User authenticated and redirected: ${code} -> ${shortUrl.originalUrl}`);

    return res.redirect(301, shortUrl.originalUrl);

  } catch (error) {
    console.error("POST redirect error:", error);
    return res.send(getErrorHTML("An unexpected error occurred. Please try again later.", "Server Error"));
  }
};