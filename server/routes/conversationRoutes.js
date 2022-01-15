const express = require("express");
const router = express.Router();

const {
  getAllConversations,
  newConversation,
  getConversation,
} = require("../controllers/conversationController");

router.post("/", newConversation);
router.get("/:userId", getAllConversations);
router.get("/find/:firstUserId/:secondUserId", getConversation);

module.exports = router;
