const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const {
  register,
  login,
  logout,
  updateUser,
  userProvider,
  singleUser
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware"); // Updated path

const router = express.Router();

// Register a new user
router.post("/register",upload.single("profile_image"), register);

// Register a new user
router.get("/me",authMiddleware, userProvider);

router.get("/singleUser/:id",authMiddleware,singleUser);

// Login user
router.post("/login", login);

// Logout user
router.post("/logout", logout);

// Update user profile (protected route)
router.put("/update", authMiddleware,upload.single("profile_image"), updateUser);

module.exports = router;
