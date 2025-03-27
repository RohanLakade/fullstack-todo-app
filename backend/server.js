const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fullstack-todo-app-zeta.vercel.app",
    ],
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

// Base route to check if the server is running
app.get("/", (req, res) => {
  res.json({ message: "Connected and working!" });
});

const routes = {
  "/api/auth": authRoutes,
  "/api/user": userRoutes,
  "/api/todo": todoRoutes,
};

Object.entries(routes).forEach(([path, route]) => {
  app.use(path, route);
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("Server running on port " + process.env.PORT);
});
