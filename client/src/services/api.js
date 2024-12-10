const gameService = {
  getProgress: async (gameId) => {
    // Return mock progress data
    return {
      level: 1,
      score: 0,
      completedChallenges: []
    };
  },

  updateProgress: async (gameId, data) => {
    // Log progress to console instead of saving to DB
    console.log('Progress updated:', { gameId, data });
    return data;
  },

  submitScore: async (gameId, scoreData) => {
    // Log score to console
    console.log('Score submitted:', { gameId, scoreData });
    return scoreData;
  },

  getLeaderboard: async (gameId) => {
    // Return mock leaderboard data
    return [
      { name: "Player 1", score: 1200 },
      { name: "Player 2", score: 1050 },
      { name: "Player 3", score: 950 },
      { name: "Player 4", score: 800 },
      { name: "Player 5", score: 600 }
    ];
  },

  getUserScores: async (gameId) => {
    // Return mock user scores
    return [
      { score: 100, date: new Date().toISOString() },
      { score: 200, date: new Date().toISOString() }
    ];
  }
};

export { gameService }; 