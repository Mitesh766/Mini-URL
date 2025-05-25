import jwt from "jsonwebtoken";



/**
 * Middleware to authenticate a user based on the JWT token stored in cookies.
 *
 * This function:
 * - Checks for a JWT token in the request cookies.
 * - Verifies the token using the secret key stored in the environment variable.
 * - Extracts user details (`_id`, `email`, `fullName`) from the token payload.
 * - Attaches the user data to the `req.user` object for downstream access.
 * - Proceeds to the next middleware or route handler on success.
 * - Returns a 401 if no token is provided.
 * - Returns a 403 if the token is invalid or expired.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { email, fullName, _id } = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = {
      _id,
      email,
      fullName,
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token! Please login again" });
  }
};
