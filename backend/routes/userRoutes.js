const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const db = require("../config/db"); // Import the MySQL pool

const router = express.Router();

// Route to get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token

    // Fetch user from the database using async/await with pool
    const [results] = await db.query(
      "SELECT id, fullname AS fullName, email FROM users WHERE id = ?",
      [userId]
    );

    if (results.length === 0) {
      return res
        .status(403)
        .json({ message: "User no longer exists. Please re-login." });
    }

    res.json({ user: results[0] });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
