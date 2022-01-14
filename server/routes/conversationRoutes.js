const express = require("express");
const router = express.Router();

import {
  getAllConversations,
  newConversation,
  getConversation,
} from "../controllers/conversationController";

router.post("/", newConversation);
router.get("/:userId", getAllConversations);
router.get("/find/:firstUserId/:secondUserId", getConversation);

module.exports = router;
