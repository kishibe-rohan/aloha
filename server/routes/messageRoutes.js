const express = require("express");
const router = express.Router();

const { newMessage, getMessages } = require("../controllers/messageController");

router.post("/", newMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
