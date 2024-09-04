// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/config');
const token = req.header('Authorization')?.replace('Bearer ', '');


module.exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
