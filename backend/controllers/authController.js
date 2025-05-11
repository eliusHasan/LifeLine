const fs = require("fs");
const path = require("path");
const {cloudinary} = require("../config/cloudinary");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      mobile,
      password
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profileImageUrl = null;

    if (req.file){
      const localPath = req.file.path;
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "uploads",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });
      profileImageUrl = result.secure_url;

      fs.unlink(localPath, (err) => {
        if (err) console.error("Failed to delete local file:", err);
      });
    }

    // Create new user
    const user = await User.create({
      name,
      address,
      email,
      mobile,
      password,
      profileImage: profileImageUrl,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set JWT as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "None",
      maxAge:24 * 60 * 60 * 1000,
    });

    // Respond with user data (excluding password)
    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        profileImage: user.profileImage,
        aboutMe: user.aboutMe,
        socials: user.socials,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set JWT as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with user data (excluding password)
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        profileImage: user.profileImage,
        aboutMe: user.aboutMe,
        socials: user.socials,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout user
exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out successfully" });
};

// Provide user
exports.userProvider = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.user.id})
    res.status(200).json({user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      profileImage: user.profileImage,
      aboutMe: user.aboutMe,
      socials: user.socials,
    }});
  } catch (error) {
    console.log(error);
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user; // Extracted from JWT token
    const { name, email, mobile, address, socials,aboutMe } = req.body;
    
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(req.file){
      const localPath = req.file.path;
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "uploads",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });
      user.profileImage = result.secure_url;
      fs.unlink(localPath, (err) => {
        if (err) console.error("Failed to delete local image:", err);
      });
    }
    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (socials) user.socials = socials;
    if (aboutMe) user.aboutMe = aboutMe;

    // Save the updated user
    await user.save();
    // Respond with updated user data (excluding password)
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        profileImage: user.profileImage,
        aboutMe: user.aboutMe,
        socials: user.socials,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.singleUser = async (req, res) => {
  try {
      const { id } = req.params;
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch the User', error: error.message });
    }
}
