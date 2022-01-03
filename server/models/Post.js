const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      maxLength: [500, "Review cannot exceed 500 chars"],
      required: true,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
