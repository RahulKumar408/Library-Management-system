const express = require('express');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const Adminuser = require('../models/Adminuser');
const adminusersRoute = express.Router();

// Register
adminusersRoute.post('/register',authMiddleware, adminMiddleware, asyncHandler( async (req, res) =>{
  const {username, name, password, email, contactNumber} = req.body;
  const userExists = await Adminuser.findOne({email:email});
  if(userExists){
    throw new Error('Admin already exists');
  }
  else{
    const userCreated = await Adminuser.create({username, name, password, email, contactNumber});
    res.status(200);

    res.json({
      _id: userCreated._id,
      username:username,
      name:userCreated.name,
      email: userCreated.email,
      contactNumber:contactNumber,
      token: generateToken(userCreated._id),
    });
  }

}));
adminusersRoute.post('/login', asyncHandler( async(req, res) => {
  const {username, password} = req.body;
  const adminuser = await Adminuser.findOne({username: username});

  if(adminuser && (await adminuser.isPasswordMatch(password)) ){
    res.status(200);
    res.json({
      _id: adminuser._id,
      username:adminuser.username,
      name:adminuser.name,
      email: adminuser.email,
      contactNumber:adminuser.contactNumber,
      token: generateToken(adminuser._id),
      isAdmin:true,
    });
  }else{
    res.status(401);
    throw new Error('Invalid Crendential');
  }
}));

// user update
adminusersRoute.put('/update', authMiddleware, adminMiddleware, asyncHandler(async(req, res) => {
  const adminuser = await Adminuser.findById(req.adminuser._id);

  if(user){
    adminuser.username = req.body.username || adminuser.username;
    adminuser.name = req.body.name || adminuser.name;
    adminuser.email = req.body.email || adminuser.email;
    adminuser.contactNumber = req.body.contactNumber || adminuser.contactNumber;
    
    if(req.body.passowrd){
      adminuser.passowrd = req.body.password || adminuser.passowrd;
    }

    const updateUser = await adminuser.save();
    res.json({
      _id:updateUser._id,
      username:updateUser.username,
      name:updateUser.name,
      email:updateUser.email,
      contactNumber:updateUser.contactNumber,
      token:generateToken(updateUser._id),
    });
  }
  
}));

// Delete admin
adminusersRoute.delete('/:adminId',authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const deletedadmin = await Adminuser.findByIdAndDelete(adminId);

  if (deletedadmin) {
    res.status(200).json(deletedadmin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
}));


// fetched admins
adminusersRoute.get('/', asyncHandler(async(req, res)=>{
  
  const admin = await Adminuser.find({});

  if(admin){
    res.status(200);
    res.json(admin);
  }else{
    res.status(500);
    throw new Error('There are no books.');
  }

}));

// get admin detail
adminusersRoute.get('/:Id',authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const { Id } = req.params;

  try {
    const userDetail = await User.findById(Id);
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(404);
    throw new Error('Admin Not Found');
  }
}));


module.exports = adminusersRoute;