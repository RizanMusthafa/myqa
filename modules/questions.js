const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: Text,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isSolved: {
    type: Boolean,
    default: false
  },
  answerCount: {
    type: Number,
    default: 0
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
    ref: 'users'
  }
});

const Question = mongoose.model('question', questionSchema);

module.exports = { Question, questionSchema };
