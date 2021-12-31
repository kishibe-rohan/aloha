const express = require("express");
const router = express.Router();

import {
  followCategory,
  unfollowCategory,
} from "../controllers/userController";
import { getCategories, addCategory } from "../controllers/categoryController";

router.get("/all", getCategories);
router.post("/new", addCategory);
router.put("/:id/follow", followCategory);
router.put("/:id/unfollow", unfollowCategory);

module.exports = router;
