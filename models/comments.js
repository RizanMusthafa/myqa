const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  description: {
    type: Text,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Comment = mongoose.model('comment', commentsSchema);

module.exports = { commentsSchema, Comment };