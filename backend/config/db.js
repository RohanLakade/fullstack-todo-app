const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Recommended: Use `createPool()`
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the database");
    connection.release(); // Releases the connection
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

module.exports = db;
