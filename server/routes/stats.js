const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Score = require('../models/Score');
const Progress = require('../models/Progress');

// @route   GET api/stats/user/:userId
// @desc    Get user stats and achievements
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const scores = await Score.find({ user: req.params.userId });
    const progress = await Progress.find({ user: req.params.userId });

    // Calculate stats
    const stats = {
      gamesPlayed: scores.length,
      totalScore: scores.reduce((acc, score) => acc + score.score, 0),
      achievements: calculateAchievements(scores, progress),
      highScores: calculateHighScores(scores),
      recentActivity: generateRecentActivity(scores, progress)
    };

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Helper functions
const calculateAchievements = (scores, progress) => {
  const achievements = [];

  // Example achievement calculations
  if (scores.length >= 10) {
    achievements.push({
      id: 'games10',
      title: 'Dedicated Explorer',
      description: 'Played 10 games',
      icon: '🎮'
    });
  }

  if (scores.reduce((acc, score) => acc + score.score, 0) >= 1000) {
    achievements.push({
      id: 'score1000',
      title: 'Score Master',
      description: 'Reached 1000 total points',
      icon: '🏆'
    });
  }

  // Add more achievement logic...

  return achievements;
};

const calculateHighScores = (scores) => {
  const highScores = {};
  scores.forEach(score => {
    if (!highScores[score.game] || score.score > highScores[score.game]) {
      highScores[score.game] = score.score;
    }
  });
  return highScores;
};

const generateRecentActivity = (scores, progress) => {
  const activity = [
    ...scores.map(score => ({
      id: score._id,
      type: 'score',
      game: score.game,
      description: `Scored ${score.score} points`,
      date: score.achievedAt
    })),
    ...progress.map(prog => ({
      id: prog._id,
      type: 'progress',
      game: prog.game,
      description: `Reached level ${prog.level}`,
      date: prog.lastPlayed
    }))
  ];

  return activity.sort((a, b) => b.date - a.date).slice(0, 10);
};

module.exports = router; 