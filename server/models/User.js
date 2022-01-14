const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      minLength: [3, "Username must be atleast 3 chars long"],
      maxLength: [20, "Username cannot exceed 20 chars"],
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followedCategories: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      maxLength: [50, "Bio cannot exceed 50 chars"],
    },
    from: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
