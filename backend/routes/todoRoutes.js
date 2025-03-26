const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new task (Async/Await)
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { task_title, task_desc, priority } = req.body;
    const user_id = req.user.id; // Extract user ID from token

    if (!task_title || !task_desc || !priority) {
      return res
        .status(400)
        .json({ message: "Task title and description are required" });
    }

    const query =
      "INSERT INTO todos (user_id, task_title, task_desc, priority) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(query, [
      user_id,
      task_title,
      task_desc,
      priority,
    ]);

    res
      .status(201)
      .json({ message: "Task added successfully", taskId: result.insertId });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

// Get all todos for a user (Async/Await)
router.get("/get", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const query =
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC";

    const [results] = await db.query(query, [userId]);

    res.json(results);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Get specific todos for a user (Async/Await)
router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id; // Extract task ID from params
    const userId = req.user.id; // Extract user ID from token
    const query =
      "SELECT * FROM todos WHERE id = ? AND user_id = ? ORDER BY created_at DESC";

    const [results] = await db.query(query, [taskId, userId]);

    res.json(results);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.put("/toggle/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id; // Extract user ID from token

    // Fetch current task status
    const [task] = await db.query(
      "SELECT status FROM todos WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    const newStatus = task[0].status === "pending" ? "completed" : "pending";

    // Update status in DB
    const query = "UPDATE todos SET status = ? WHERE id = ? AND user_id = ?";
    await db.query(query, [newStatus, taskId, userId]);

    res.json({
      message: `Task status updated to ${newStatus}`,
      status: newStatus,
    });
  } catch (error) {
    console.error("Toggle Task Status Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id; // Extract user ID from token
    const { task_title, task_desc, priority } = req.body;

    if (!task_title || !task_desc || !priority) {
      return res
        .status(400)
        .json({ message: "Task title and description are required" });
    }

    const query =
      "UPDATE todos SET task_title = ?, task_desc = ?, priority = ? WHERE id = ? AND user_id = ?";
    const [result] = await db.query(query, [
      task_title,
      task_desc,
      priority,
      taskId,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Edit Task Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id; // Extract user ID from token

    const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
    const [result] = await db.query(query, [taskId, userId]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/deleteall", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token

    const query = "DELETE FROM todos WHERE user_id = ?";
    const [result] = await db.query(query, [userId]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "All Tasks deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
