const Post = require("../models/Post");
const User = require("../models/User");

//Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post added successfully",
      savedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding post",
      err,
    });
  }
};

//Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.id === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });

      res.status(200).json({
        message: "Post updated successfully",
      });
    } else {
      res.status(200).json({
        message: "Unauthorized user",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating post",
      err,
    });
  }
};

//Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.id === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({
        message: "Post has been deleted",
      });
    } else {
      res.status(403).json({
        message: "Unauthorized user",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
    });
  }
};

//Fetch a specific post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching post",
    });
  }
};

//Like or unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: { likes: req.body.userId },
      });

      res.status(200).json({
        message: "Post liked successfully",
      });
    } else {
      await post.updateOne({
        $pull: { likes: req.body.userId },
      });

      res.status(200).json({
        message: "Post unliked successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while liking/unliking post",
    });
  }
};

//Get posts of followed users and categories
exports.getFeedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);

    const followedUsersPost = await Promise.all(
      currentUser.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );

    const followedCategoriesPost = await Promise.all(
      currentUser.followedCategories.map((followingId) => {
        return Post.find({ categoryId: followingId });
      })
    );

    res.json(followedUsersPost.conact(...followedCategoriesPost));
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching followed users post",
    });
  }
};
