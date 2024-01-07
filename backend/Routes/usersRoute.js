const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware')

const usersRoute = express.Router();

// login user
usersRoute.post('/login', asyncHandler( async(req, res) => {
  const {name, email} = req.body;
 
  const user = await User.findOne({email:email,name:name});

  if(user){
    res.status(200);
    res.json({
      _id: user._id,
      username:user.username,
      name:user.name,
      email: user.email,
      contactNumber:user.contactNumber,
      token: generateToken(user._id),
      isAdmin:false,  
    });
  }else{
    res.status(401);
    throw new Error('Invalid Crendential');
  }
}));
// Add user
usersRoute.post('/add', authMiddleware, adminMiddleware, asyncHandler( async (req, res) =>{
  const {username, name, email, contactNumber} = req.body;

  const userExists = await User.findOne({email:email});
  if(userExists){
    throw new Error('User already exists');
  } 
  else{
    const userCreated = await User.create({username, name, email, contactNumber});
    res.status(200);

    res.json({
      _id: userCreated._id,
      username:userCreated.username,
      name:userCreated.name,
      email: userCreated.email,
      contactNumber: userCreated.contactNumber,
      token: generateToken(userCreated._id),
    });
  }

}));

// Delete user
usersRoute.delete('/:userId',authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
}));
// Get User Details
usersRoute.get('/:userId',authMiddleware, asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const userDetail = await User.findById(userId);
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(404);
    throw new Error('User Not Found');
  }
}));

// sign in
usersRoute.post('/signin', asyncHandler( async(req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email: email});

  if(user){
    res.status(200);
    res.json({
      _id: user._id,
      username:user.username,
      name:user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      token: generateToken(urer._id),
    });
  }else{
    res.status(401);
    throw new Error('Invalid Crendential');
  }
}));

// user update
usersRoute.put('/update', authMiddleware, asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if(req.body.passowrd){
      user.passowrd = req.body.password || user.passowrd;
    }

    const updateUser = await user.save();
    res.json({
      _id:updateUser._id,
      name:updateUser.name,
      email:updateUser.email,
      token:generateToken(updateUser._id),
    });
  }
  
}));


// fetched user
usersRoute.get('/', asyncHandler(async(req, res)=>{
  const users = await User.find({});

  if(users){
    res.status(200);
    res.json(users);
  }else{
    res.status(500);
    throw new Error('There are no books.');
  }

}));


module.exports = usersRoute;