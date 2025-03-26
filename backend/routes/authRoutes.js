const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

// Generate Access Token (Expires in 15 min)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, fullName: user.fullname },
    process.env.JWT_SECRET_FOR_ACCESS_TOKEN,
    { expiresIn: "15m" }
  );
};

// Generate Refresh Token (Expires in 7 days)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, fullName: user.fullname },
    process.env.JWT_SECRET_FOR_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
};

// 🔹 Register User
router.post("/register", async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    // Check if email exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Get user by email
    const [userResult] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (userResult.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userResult[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in DB
    await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      user.id,
    ]);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful!",
      accessToken,
      user: { id: user.id, fullName: user.fullname, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Refresh Token Route
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided!" });
  }

  try {
    // Check if refresh token is in DB
    const [userResult] = await db.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      [refreshToken]
    );

    if (userResult.length === 0) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = userResult[0];

    // Verify token
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_FOR_REFRESH_TOKEN,
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
        }

        // Generate new access token
        const accessToken = generateAccessToken(user);

        res.status(200).json({
          accessToken,
          user: { id: user.id, fullName: user.fullname, email: user.email },
        });
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Logout Route
router.post("/logout", async (req, res) => {
  try {
    // Clear refresh token in DB
    await db.query(
      "UPDATE users SET refresh_token = NULL WHERE refresh_token = ?",
      [req.cookies.refreshToken]
    );

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
