const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getFollowers,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);
router.get("/followers/:id", getFollowers);

module.exports = router;
