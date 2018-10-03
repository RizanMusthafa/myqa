const mongoose = require('mongoose');
const Joi = require('joi');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isSolved: {
    type: Boolean,
    default: false
  },
  answers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'answer'
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comments'
  },
  tags: {
    type: [String],
    required: true,
    maxlength: 5
  },
  images: {
    type: Object
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

const Question = mongoose.model('question', questionSchema);

function validateQuestion(question) {
  return Joi.validate(question, {
    title: Joi.string()
      .required()
      .max(255)
      .min(5),
    description: Joi.string().required(),
    tags: Joi.array()
      .required()
      .max(5)
      .min(1)
  });
}

module.exports = { Question, questionSchema, validateQuestion };
