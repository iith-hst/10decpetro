import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const SubTitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const ExploreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

function WelcomeScreen({ onExplore }) {
    return (
        <WelcomeContainer>
            <Title
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Discover Konkan Petroglyphs
            </Title>
            <SubTitle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                Journey through ancient art and stories
            </SubTitle>
            <ExploreButton
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExplore}
            >
                Begin Your Adventure
            </ExploreButton>
        </WelcomeContainer>
    );
}

export default WelcomeScreen; 