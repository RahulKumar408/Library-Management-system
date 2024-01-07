const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// bcrypting the user password
adminuserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verify password 
adminuserSchema.methods.isPasswordMatch = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

const Adminuser = mongoose.model('Adminuser', adminuserSchema);

module.exports = Adminuser;
