const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.username = payload.username;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
}

module.exports = verifyToken;