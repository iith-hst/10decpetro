import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  background: #f5f5f5;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const features = [
    {
        title: 'Games & Puzzles',
        icon: '🎮',
        description: 'Challenge yourself with interactive games and puzzles',
        color: '#FFD93D'
    },
    {
        title: 'Learn',
        icon: '📚',
        description: 'Educational modules about Konkan petroglyphs',
        color: '#4ECDC4'
    },
    {
        title: 'Community',
        icon: '👥',
        description: 'Join discussions and share your discoveries',
        color: '#FF6B6B'
    },
    {
        title: 'VR Museum',
        icon: '🥽',
        description: 'Experience petroglyphs in virtual reality',
        color: '#6C5CE7'
    },
    {
        title: 'AI Explorer',
        icon: '🤖',
        description: 'Analyze petroglyphs using AI tools',
        color: '#A8E6CF'
    },
    {
        title: 'Image Library',
        icon: '🖼️',
        description: 'Browse our collection of petroglyph images',
        color: '#FF8B94'
    }
];

function MainDashboard() {
    return (
        <DashboardContainer>
            {features.map((feature, index) => (
                <FeatureCard
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ background: `linear-gradient(135deg, ${feature.color}22, white)` }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        {feature.icon} {feature.title}
                    </h2>
                    <p>{feature.description}</p>
                </FeatureCard>
            ))}
        </DashboardContainer>
    );
}

export default MainDashboard; 