import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { gameService } from '../../services/api';
import LoadingSpinner from './LoadingSpinner';

const LeaderboardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LeaderboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    color: var(--primary);
    margin: 0;
  }
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LeaderboardItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  gap: 1rem;

  .rank {
    font-weight: bold;
    color: ${props =>
        props.rank === 1 ? '#FFD700' :
            props.rank === 2 ? '#C0C0C0' :
                props.rank === 3 ? '#CD7F32' : 'white'
    };
  }

  .score {
    color: var(--primary);
    font-weight: bold;
  }
`;

const TimeFilter = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

function Leaderboard({ gameId }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeFrame, setTimeFrame] = useState('all');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await gameService.getLeaderboard(gameId);
                setScores(data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [gameId, timeFrame]);

    if (loading) return <LoadingSpinner />;

    return (
        <LeaderboardContainer>
            <LeaderboardHeader>
                <h3>Leaderboard</h3>
                <TimeFilter
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                >
                    <option value="all">All Time</option>
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                    <option value="today">Today</option>
                </TimeFilter>
            </LeaderboardHeader>

            <LeaderboardList>
                <AnimatePresence>
                    {scores.map((score, index) => (
                        <LeaderboardItem
                            key={score.id}
                            rank={index + 1}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <span className="rank">#{index + 1}</span>
                            <span>{score.user.username}</span>
                            <span className="score">{score.score}</span>
                        </LeaderboardItem>
                    ))}
                </AnimatePresence>
            </LeaderboardList>
        </LeaderboardContainer>
    );
}

export default Leaderboard; 