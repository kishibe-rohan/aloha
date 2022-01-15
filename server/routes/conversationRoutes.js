const express = require("express");
const router = express.Router();

const {
  getAllConversations,
  newConversation,
  getConversation,
  getMembers,
} = require("../controllers/conversationController");

router.post("/", newConversation);
router.get("/:userId", getAllConversations);
router.get("/find/:firstUserId/:secondUserId", getConversation);
router.get("/members/:id", getMembers);

module.exports = router;
