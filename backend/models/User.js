const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  mobile: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String, // store file path or image URL
    default: "",
  },

  aboutMe: {
    type: String,
    default: ""
  },

  socials: {
    facebook: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
},
{
  timestamps: true,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
