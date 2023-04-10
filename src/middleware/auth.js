const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).send('Access denied. User not found');
    }

    req.user = decoded;
    req.body['user_id'] = user._id;

    next();
  } catch (error) {
    return res.status(401).send('Access denied. Invalid token');
  }
}

module.exports = {
  authenticateToken,
};