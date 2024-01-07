// authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Import the User model
const Adminuser = require('../models/Adminuser');

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized - No token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    const adminuser = await Adminuser.findById(decoded.id);
    
    req.user = user;
    req.adminuser = adminuser;

    if (!user && !adminuser) {
      res.status(401);
      throw new Error('Unauthorized - Invalid user');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Unauthorized - Invalid token');
  }
});

module.exports = authMiddleware;
