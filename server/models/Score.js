const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  details: {
    timeSpent: Number,
    accuracy: Number,
    completedItems: Number
  },
  achievedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for leaderboard queries
ScoreSchema.index({ game: 1, score: -1 });

module.exports = mongoose.model('Score', ScoreSchema); 