const mongoose = require('mongoose');
const Joi = require('joi');

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
    maxlength: 150,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model('user', userSchema);

function validateUser(user) {
  Joi.validate();
  return Joi.validate(user, {
    fName: Joi.string()
      .max(150)
      .min(3)
      .required(),
    sName: Joi.string()
      .max(150)
      .min(3)
      .required(),
    email: Joi.string()
      .required()
      .max(150)
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  });
}

module.exports = { userSchema, User, validateUser };
