const Message = require("../models/Message");

//Send new message
exports.newMessage = async (req, res) => {
  const addMessage = new Message(req.body);
  try {
    const savedMessage = await addMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all messages from a conversation
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
