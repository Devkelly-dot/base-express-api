const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const {getModelByField} = require('../utils/queries');

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

async function verifyOwnership(req, res, next, model, ownership_field, body_id_field, user_id_field) {
  const model_id = req.body[body_id_field]; 
  const user_id = req.body[user_id_field];
  const target_model = await getModelByField(model, '_id', model_id);

  if(target_model[ownership_field].toString() !== user_id.toString())
  {
    return res.status(401).send(`Access denied. Not your ${model.modelName}`);
  }

  next();
}

module.exports = {
  authenticateToken,
  verifyOwnership
};