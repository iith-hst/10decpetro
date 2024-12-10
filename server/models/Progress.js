const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  completedChallenges: [{
    challengeId: String,
    completedAt: Date,
    score: Number
  }],
  lastPlayed: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', ProgressSchema); 