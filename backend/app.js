//Internal Import
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//External Import
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
connectDB();
 
// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// Routing Error handller
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
