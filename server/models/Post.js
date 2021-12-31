const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: String,
    maxLength: [500, "Review cannot exceed 500 chars"],
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
