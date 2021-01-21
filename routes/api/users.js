const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

const User = require('../../models/User');

router.get('/search/:username', verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).end();

    return res.json({ username });
  } catch (err) {
    res.status(500).end();
  }
});

router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const { username } = req;
    const user = await User.findOne({ username });
    
    if (!user) return res.status(400).end();

    res.json(user.contacts);
  } catch (err) {
    res.status(500).end();
  }
});

router.post('/contacts', verifyToken, async (req, res) => {
  try {
    const { username } = req;
    const { userToAdd } = req.body;
    const query = await User.updateOne(
      { username }, 
      { $addToSet: { contacts: userToAdd } }
    );

    if (!query.n) return res.status(400).end();
    res.end();

  } catch (err) {
    res.status(500).end();
  }
});


router.put('/conversations', verifyToken, async (req, res) => {
  try {
    const { username } = req;
    const {_id, lastMessageRead} = req.body;

    await User.updateOne(
      { username, 'conversations.conversationId': _id },
      { $set: { 'conversations.$.lastMessageRead': lastMessageRead } }
    );

    res.end();
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;