const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  sName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 150
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model('user', userSchema);

module.exports = { userSchema, User };
