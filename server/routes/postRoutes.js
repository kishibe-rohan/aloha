const express = require("express");
const router = express.Router();

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,
  getFeedPosts,
} from "../controllers/postController";

router.post("/new", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/feed", getFeedPosts);

module.exports = router;
