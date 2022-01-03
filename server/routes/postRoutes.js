const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,
  getFeedPosts,
  getAllPosts,
} = require("../controllers/postController");

router.post("/new", createPost);
router.get("/feed/:id", getFeedPosts);
router.get("/profile/:username", getAllPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);

module.exports = router;
