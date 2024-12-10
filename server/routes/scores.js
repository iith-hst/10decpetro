const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Score = require('../models/Score');

// @route   GET api/scores/leaderboard/:game
// @desc    Get leaderboard for a specific game
// @access  Public
router.get('/leaderboard/:game', async (req, res) => {
  try {
    const scores = await Score.find({ game: req.params.game })
      .sort({ score: -1 })
      .limit(10)
      .populate('user', 'username');
    
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/scores/:game
// @desc    Submit a new score
// @access  Private
router.post('/:game', auth, async (req, res) => {
  try {
    const { score, timeSpent, accuracy, completedItems } = req.body;

    const newScore = new Score({
      user: req.user.id,
      game: req.params.game,
      score,
      details: {
        timeSpent,
        accuracy,
        completedItems
      }
    });

    await newScore.save();
    res.json(newScore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/scores/user/:game
// @desc    Get user's scores for a specific game
// @access  Private
router.get('/user/:game', auth, async (req, res) => {
  try {
    const scores = await Score.find({
      user: req.user.id,
      game: req.params.game
    }).sort({ achievedAt: -1 });
    
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 