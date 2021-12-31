const express = require("express");
const router = express.Router();

import { register, login } from "../controllers/authController";
import {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
} from "../controllers/userController";

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
