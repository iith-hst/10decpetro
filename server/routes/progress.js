const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');

// @route   GET api/progress
// @desc    Get user's progress for all games
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id });
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/progress/:game
// @desc    Get user's progress for specific game
// @access  Private
router.get('/:game', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user.id,
      game: req.params.game
    });
    
    if (!progress) {
      return res.status(404).json({ msg: 'No progress found for this game' });
    }

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/progress/:game
// @desc    Update or create progress for a game
// @access  Private
router.post('/:game', auth, async (req, res) => {
  try {
    const { level, challengeId, score } = req.body;

    let progress = await Progress.findOne({
      user: req.user.id,
      game: req.params.game
    });

    if (!progress) {
      progress = new Progress({
        user: req.user.id,
        game: req.params.game,
        level: 1,
        completedChallenges: []
      });
    }

    if (level) progress.level = level;
    
    if (challengeId) {
      progress.completedChallenges.push({
        challengeId,
        completedAt: new Date(),
        score
      });
    }

    progress.lastPlayed = new Date();
    await progress.save();

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 