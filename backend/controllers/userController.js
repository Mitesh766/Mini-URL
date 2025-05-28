import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js"; // Add `.js` if using ESModules
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

/**
 * @desc    Registers a new user after validating input
 * @route   POST /api/user/register
 * @access  Public
 *
 * Steps:
 * 1. Validate required fields (fullName, email, password).
 * 2. Validate email format and password strength using validator package.
 * 3. Check if user already exists with the provided email.
 * 4. Hash password using bcrypt before saving to database.
 * 5. Save new user to MongoDB using Mongoose.
 * 6. Attaching user details to the body of the request handler.
 * 7. Respond with success message and user info (excluding password).
 */
export const register = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please fill all the details");
  }
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password.trim()) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  if (fullName.length < 2) {
    res.status(400);
    throw new Error("Please enter a valid fullName");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid Email Id");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("Invalid password format");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);
  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "None",
  });

  const savedUser = await user.save();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    _id: savedUser._id,
    fullName: savedUser.fullName,
    email: savedUser.email,
  });
});

/**
 * @desc    Logs in an existing user after validating credentials
 * @route   POST /api/user/login
 * @access  Public
 *
 * Steps:
 * 1. Check if email and password are provided in the request body.
 * 2. Validate the email format using the validator package.
 * 3. Look up the user in the database using the provided email.
 * 4. If user is found, compare the hashed password using bcrypt.
 * 5. If password matches, generate an authentication token.
 * 6. Store the token in a secure, HTTP-only cookie.
 * 7. Respond with a success message and user info (excluding password).
 */
export const login = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid Email Id");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid user");
  }

  const isUserValid = await bcrypt.compare(password.trim(), user.password);
  if (!isUserValid) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    fullName: user.fullName,
    email: user.email,
    _id: user._id,
  });
});

export const verifyLogin = asyncHandler(async (req, res) => {
  res.status(200).json({ isLoggedIn: true });
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Logout failed");
  }
});
