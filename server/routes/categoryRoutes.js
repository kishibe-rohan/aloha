const express = require("express");
const router = express.Router();

const {
  followCategory,
  unfollowCategory,
} = require("../controllers/userController");
const {
  getCategories,
  addCategory,
} = require("../controllers/categoryController");

router.get("/all", getCategories);
router.post("/new", addCategory);
router.put("/:id/follow", followCategory);
router.put("/:id/unfollow", unfollowCategory);

module.exports = router;
