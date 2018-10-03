const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
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
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comments'
  },
  images: {
    type: Object
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Answer = mongoose.model('answer', answersSchema);

module.exports = { answersSchema, Answer };
