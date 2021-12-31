const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
