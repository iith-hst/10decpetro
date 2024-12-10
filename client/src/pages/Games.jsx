import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const GamesContainer = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const GameCard = styled(motion(Link))`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.accentColor};
  }
`;

const GameImage = styled.div`
  height: 200px;
  background: ${props => props.background};
  border-radius: 12px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const GameTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const GameDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const DifficultyBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: ${props => props.background};
  color: white;
`;

const games = [
    {
        id: 'match-patterns',
        title: 'Pattern Matching',
        description: 'Match similar petroglyph patterns to clear the board',
        emoji: '🔍',
        background: '#FFE5E5',
        accentColor: '#FF6B6B',
        difficulty: 'Easy',
        difficultyColor: '#4ECDC4'
    },
    {
        id: 'puzzle-solve',
        title: 'Petroglyph Puzzle',
        description: 'Reconstruct ancient petroglyphs piece by piece',
        emoji: '🧩',
        background: '#E5F9F6',
        accentColor: '#4ECDC4',
        difficulty: 'Medium',
        difficultyColor: '#FFB347'
    },
    {
        id: 'memory-game',
        title: 'Memory Challenge',
        description: 'Test your memory by matching petroglyph pairs',
        emoji: '🧠',
        background: '#F0E5FF',
        accentColor: '#6C5CE7',
        difficulty: 'Hard',
        difficultyColor: '#FF6B6B'
    },
    {
        id: 'quiz-master',
        title: 'Petroglyph Quiz',
        description: 'Test your knowledge about Konkan petroglyphs',
        emoji: '📝',
        background: '#E5FFE9',
        accentColor: '#A8E6CF',
        difficulty: 'Easy',
        difficultyColor: '#4ECDC4'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

function Games() {
    return (
        <GamesContainer>
            <Header>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Games & Puzzles
                </Title>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Challenge yourself with these fun and educational games about Konkan petroglyphs
                </motion.p>
            </Header>

            <GameGrid
                as={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        to={`/games/${game.id}`}
                        accentColor={game.accentColor}
                        variants={cardVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <GameImage background={game.background}>
                            {game.emoji}
                        </GameImage>
                        <GameTitle>{game.title}</GameTitle>
                        <GameDescription>{game.description}</GameDescription>
                        <DifficultyBadge background={game.difficultyColor}>
                            {game.difficulty}
                        </DifficultyBadge>
                    </GameCard>
                ))}
            </GameGrid>
        </GamesContainer>
    );
}

export default Games; 