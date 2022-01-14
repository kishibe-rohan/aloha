const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

//Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
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

      res.status(200).json("Post updated successfully");
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
      res.status(200).json("Post has been deleted");
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

      console.log("Liked");
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
    const currentUser = await User.findById(req.params.id);
    console.log(currentUser);

    const userPosts = await Post.find({ userId: currentUser._id });

    const followedUsersPost = await Promise.all(
      currentUser.followings.map((followingId) => {
        //console.log(followingId);
        return Post.find({ userId: followingId });
      })
    );

    //console.log(followedUsersPost);
    const friendPosts = userPosts.concat(...followedUsersPost);

    //console.log(friendPosts);

    const followedCategoriesPost = await Promise.all(
      currentUser.followedCategories.map((followingId) => {
        //console.log(followingId);
        return Post.find({ categoryId: followingId });
      })
    );
    //console.log(followedCategoriesPost);

    const allPosts = friendPosts.concat(...followedCategoriesPost);

    const feedPosts = [];
    const map = new Map();

    //keep only one copy of each post
    for (const post of allPosts) {
      if (!map.has(post._id.toString())) {
        map.set(post._id.toString(), true);
        feedPosts.push(post);
      }
    }

    //console.log(map);
    //console.log(feedPosts);

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching followed users post",
      err,
    });
  }
};

// Get All Posts Of An User
exports.getAllPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    //console.log(user);
    const profilePosts = await Post.find({ userId: user._id });
    res.status(200).json(profilePosts);
  } catch (err) {
    res.status(500).json({
      message: "Error getting user posts",
      err,
    });
  }
};
