const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');

module.exports = io => {
  router.get('/', verifyToken, async (req, res) => {
    try {
      const { username } = req;
      const user = await User.findOne({ username });
      const conversationIds = user.conversations.map(
        conversation => conversation.conversationId
      );
      const conversations = await Conversation.find(
        { _id: { $in: conversationIds } }
      );

      const conversationsWithInfo = conversations.map(
        (conversation, index) => ({
          ...conversation._doc,
          lastMessageRead: user.conversations[index].lastMessageRead
        })
      );

      res.json(conversationsWithInfo);
    } catch (err) {
      res.status(500).end();
    }
  });


  router.post('/', verifyToken, async (req, res) => {
    try {
      const participants = req.body;
      const conversation = await Conversation.findOne({ participants });

      if (conversation) return res.status(400).end();

      const newConversation = new Conversation({ participants });
      await newConversation.save();

      const conversationInfo = {
        conversationId: newConversation._id, 
        lastMessageRead: 0 
      };
      await User.updateMany(
        { username: { $in: participants } }, 
        { $addToSet: { conversations: conversationInfo } }
      );

      const newConversationWithInfo = {
        ...newConversation._doc,
        lastMessageRead: 0
      };
      io.emit('conversation', newConversationWithInfo);

      res.end();
    } catch (err) {
      res.status(500).end();
    }
  });


  router.post('/messages', verifyToken, async (req, res) => {
    try {
      const { _id, message } = req.body;

      await Conversation.findByIdAndUpdate(
        _id, 
        { $push: { messages: message } },
        { new: true }
      );
      
      const data = { _id, message }
      io.emit('message', data);

      res.end();

    } catch (err) {
      res.status(400).end();
    }
  });

  return router;
}