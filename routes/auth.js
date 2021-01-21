const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ username, password: passwordHash });
    await user.save();

    const token = jwt.sign(
      { username },
      process.env.TOKEN_SECRET
    );

    res.cookie('authToken', token, {
      httpOnly: true
    }).json({ username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { username },
      process.env.TOKEN_SECRET
    );

    res.cookie('authToken', token, {
      httpOnly: true
    }).json({ username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });    
  }
});


router.get('/logout', (req, res) => {
  const token = req.cookies.authToken;
  res.clearCookie('authToken', token, {
    httpOnly: true
  }).end();
});


router.get('/verify', async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.json({ isAuthenticated: false });

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { username } = payload;

    const user = await User.findOne({ username });

    res.json({ 
      isAuthenticated: true,
      username: user.username
    });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;