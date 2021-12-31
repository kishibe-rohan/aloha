const User = require("../models/User");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");

//Update User
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //Update PW
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json({
          message: "Error updating Password",
          err,
        });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("User updated successfully");
    } catch (err) {
      return res.status(500).json({ message: "Error while updating user" });
    }
  } else {
    return res.status(403).json("Unauthorized user");
  }
};

//Delete User
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account has been deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ message: "Unauthorized user" });
  }
};

//Get specific user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    //send details except password
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};

//Follow an user
exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "User has been followed" });
      } else {
        res.status(403).json({
          message: "you already follow this user",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error while following",
        err,
      });
    }
  } else {
    res.status(403).json({
      message: "You can't follow yourself",
    });
  }
};

//Follow a category
exports.followCategory = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const category = await Category.findById(req.params.id);

    if (!user.followedCategories.includes(req.params.id)) {
      await user.updateOne({
        $push: { followedCategories: req.params.id },
      });
      await category.updateOne({
        $push: { followers: req.body.userId },
      });

      res.status(200).json({
        message: "Category has been followed",
      });
    } else {
      res.status(403).json({
        message: "You already follow this category",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while following category",
    });
  }
};

//Unfollow an user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowed" });
      } else {
        res.status(403).json({
          message: "You don't follow this user",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error while following",
      });
    }
  } else {
    res.status(403).json({
      message: "You can't unfollow yourself",
    });
  }
};

//Unfollow a category
exports.unfollowCategory = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const category = await Category.findById(req.params.id);

    if (user.followedCategories.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followedCategories: req.params.id },
      });

      await category.updateOne({
        $pull: { followers: req.body.userId },
      });

      res.status(200).json({
        message: "Category unfollowed successfully",
      });
    } else {
      res.status(403).json("You don't follow this category");
    }
  } catch (err) {
    res.status(500).json({
      message: "Error unfollowign category",
    });
  }
};
