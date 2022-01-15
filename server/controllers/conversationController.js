const Conversation = require("../models/Conversation");
const User = require("../models/User");

//Add new conversation
exports.newConversation = async (req, res) => {
  const addConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await addConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all conversations of a user
exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get particular conversation
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get members from a conversation
exports.getMembers = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    const members = conversation.members;

    const user1 = await User.findById(members[0]);
    const user2 = await User.findById(members[1]);

    res.status(200).json([user1, user2]);
  } catch (err) {
    res.status(500).json(err);
  }
};
