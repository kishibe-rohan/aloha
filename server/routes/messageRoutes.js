const express = require("express");
const router = express.Router();

import { newMessage, getMessages } from "../controllers/messageController";

router.post("/", newMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
