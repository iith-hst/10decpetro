import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HeroSection = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #ccc;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BackgroundPattern = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url('/path/to/pattern.svg');
  opacity: 0.1;
  z-index: 1;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

function LandingPage() {
    return (
        <>
            <HeroSection>
                <BackgroundPattern
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
                <HeroContent>
                    <Title
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Discover Ancient Petroglyphs
                    </Title>
                    <Subtitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Explore, learn, and experience the fascinating world of ancient rock art
                        through interactive games and challenges.
                    </Subtitle>
                    <CTAButton
                        to="/games"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Start Exploring
                    </CTAButton>

                    <FeatureGrid>
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </FeatureCard>
                        ))}
                    </FeatureGrid>
                </HeroContent>
            </HeroSection>
            {/* Add more sections as needed */}
        </>
    );
}

const features = [
    {
        title: "Interactive Learning",
        description: "Engage with ancient art through hands-on digital experiences"
    },
    {
        title: "Expert Knowledge",
        description: "Learn from archaeological research and historical insights"
    },
    {
        title: "Multiple Games",
        description: "Choose from various challenges and educational activities"
    }
];

export default LandingPage; 