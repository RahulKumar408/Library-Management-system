// adminMiddleware.js
const asyncHandler = require('express-async-handler');
const Adminuser = require('../models/Adminuser');

const adminMiddleware = asyncHandler(async (req, res, next) => {
  if(!req.adminuser){
    res.status(403);
    throw new Error('Forbidden - Admin access required');
  }

  const amdinExist = await Adminuser.findById(req.adminuser._id);
  
  if (amdinExist) {
    next();
  } else {
    res.status(403);
    throw new Error('Forbidden - Admin access required');
  }
});

module.exports = adminMiddleware;
