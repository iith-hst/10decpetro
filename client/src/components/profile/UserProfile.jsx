import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { gameService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Avatar = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
`;

const RecentActivity = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Achievements = styled.div`
  margin-top: 2rem;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Achievement = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  
  .icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

function UserProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user stats and activity
                const userStats = await Promise.all([
                    gameService.getUserStats(user.id),
                    gameService.getRecentActivity(user.id)
                ]);

                setStats(userStats[0]);
                setRecentActivity(userStats[1]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <ProfileContainer>
            <ProfileHeader>
                <Avatar
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {user.username[0].toUpperCase()}
                </Avatar>
                <h2>{user.username}</h2>
                <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </ProfileHeader>

            <StatsGrid>
                <StatCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Games Played</h3>
                    <p>{stats?.gamesPlayed || 0}</p>
                </StatCard>
                <StatCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>Total Score</h3>
                    <p>{stats?.totalScore || 0}</p>
                </StatCard>
                <StatCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>Achievements</h3>
                    <p>{stats?.achievements || 0}</p>
                </StatCard>
            </StatsGrid>

            <RecentActivity>
                <h3>Recent Activity</h3>
                <ActivityList>
                    {recentActivity.map((activity, index) => (
                        <ActivityItem
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div>
                                <strong>{activity.game}</strong>
                                <p>{activity.description}</p>
                            </div>
                            <div>{new Date(activity.date).toLocaleDateString()}</div>
                        </ActivityItem>
                    ))}
                </ActivityList>
            </RecentActivity>

            <Achievements>
                <h3>Achievements</h3>
                <AchievementGrid>
                    {stats?.achievements?.map((achievement, index) => (
                        <Achievement
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="icon">{achievement.icon}</div>
                            <h4>{achievement.title}</h4>
                            <p>{achievement.description}</p>
                        </Achievement>
                    ))}
                </AchievementGrid>
            </Achievements>
        </ProfileContainer>
    );
}

export default UserProfile; 