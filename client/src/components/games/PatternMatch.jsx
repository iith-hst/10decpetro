import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';
import petroglyph6 from '../../assets/images/6.jpg';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
`;

const PatternGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`;

const Pattern = styled(motion.div)`
  aspect-ratio: 1;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: ${props => props.isSelected ? '0 0 0 3px #4ECDC4' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  border: 2px solid ${props => props.isSelected ? '#4ECDC4' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${props => props.isBlurred ? 'blur(3px)' : 'none'};
    transition: filter 0.3s ease;
    
    &:hover {
      filter: none;
    }
  }

  .fallback {
    font-size: 2rem;
    color: #666;
  }
`;

const Timer = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
  color: ${props => props.isLow ? '#FF6B6B' : '#4ECDC4'};
  font-weight: bold;
`;

const Score = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 1.5rem;
  color: #2d3436;
  font-weight: bold;
`;

// Define the patterns with actual petroglyph images
const petroglyphPatterns = [
    {
        id: 1,
        image: petroglyph1,
        name: 'Petroglyph 1',
        description: 'Ancient rock art depicting various figures and symbols'
    },
    {
        id: 2,
        image: petroglyph2,
        name: 'Petroglyph 2',
        description: 'Complex composition showing hunting scenes'
    },
    {
        id: 3,
        image: petroglyph3,
        name: 'Petroglyph 3',
        description: 'Geometric patterns and animal figures'
    },
    {
        id: 4,
        image: petroglyph4,
        name: 'Petroglyph 4',
        description: 'Detailed human and animal representations'
    },
    {
        id: 5,
        image: petroglyph5,
        name: 'Petroglyph 5',
        description: 'Ritualistic scenes with multiple figures'
    },
    {
        id: 6,
        image: petroglyph6,
        name: 'Petroglyph 6',
        description: 'Ancient symbols and cultural motifs'
    }
];

// Add new styled components for info display
const InfoPanel = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;

  h3 {
    color: #2d3436;
    margin-bottom: 0.5rem;
  }

  p {
    color: #636e72;
    font-size: 0.9rem;
  }
`;

const MatchInfo = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #4ECDC4;
  font-weight: bold;
`;

// Add difficulty levels
const difficultyLevels = [
    {
        level: 1,
        gridSize: 9, // 3x3
        matchesNeeded: 3,
        timeLimit: 60,
        description: 'Find three matching petroglyphs'
    },
    {
        level: 2,
        gridSize: 12, // 3x4
        matchesNeeded: 4,
        timeLimit: 50,
        description: 'Find four matching petroglyphs'
    },
    {
        level: 3,
        gridSize: 16, // 4x4
        matchesNeeded: 3,
        timeLimit: 45,
        shuffleInterval: 5000, // Board shuffles every 5 seconds
        description: 'Board shuffles periodically!'
    },
    {
        level: 4,
        gridSize: 16,
        matchesNeeded: 4,
        timeLimit: 40,
        fadeOutCards: true, // Cards slowly fade out
        description: 'Cards fade over time - be quick!'
    },
    {
        level: 5,
        gridSize: 20, // 4x5
        matchesNeeded: 3,
        timeLimit: 35,
        rotatingCards: true, // Cards rotate
        description: 'Rotating cards challenge'
    },
    {
        level: 6,
        gridSize: 20,
        matchesNeeded: 5,
        timeLimit: 50,
        shuffleInterval: 4000,
        fadeOutCards: true,
        description: 'Find five matches with shuffling and fading cards!'
    },
    {
        level: 7,
        gridSize: 25, // 5x5
        matchesNeeded: 4,
        timeLimit: 40,
        mirrorMode: true, // Board is mirrored
        description: 'Mirror mode - cards are reflected!'
    },
    {
        level: 8,
        gridSize: 25,
        matchesNeeded: 4,
        timeLimit: 45,
        invertedControls: true, // Clicking a card selects its neighbor
        description: 'Inverted controls - select card neighbors!'
    },
    {
        level: 9,
        gridSize: 25,
        matchesNeeded: 5,
        timeLimit: 40,
        rotatingCards: true,
        shuffleInterval: 6000,
        description: 'Rotating cards that shuffle periodically!'
    },
    {
        level: 10,
        gridSize: 30, // 5x6
        matchesNeeded: 4,
        timeLimit: 35,
        fadeOutCards: true,
        mirrorMode: true,
        description: 'Fading cards in mirror mode!'
    },
    {
        level: 11,
        gridSize: 30,
        matchesNeeded: 6,
        timeLimit: 45,
        invertedControls: true,
        rotatingCards: true,
        description: 'Inverted controls with rotating cards!'
    },
    {
        level: 12,
        gridSize: 36, // 6x6
        matchesNeeded: 4,
        timeLimit: 30,
        shuffleInterval: 3000,
        fadeOutCards: true,
        rotatingCards: true,
        description: 'Fast shuffling with fading and rotating cards!'
    },
    {
        level: 13,
        gridSize: 36,
        matchesNeeded: 5,
        timeLimit: 40,
        mirrorMode: true,
        invertedControls: true,
        shuffleInterval: 4000,
        description: 'Mirror mode with inverted controls and shuffling!'
    },
    {
        level: 14,
        gridSize: 42, // 6x7
        matchesNeeded: 6,
        timeLimit: 50,
        rotatingCards: true,
        fadeOutCards: true,
        mirrorMode: true,
        invertedControls: true,
        description: 'Ultimate challenge - all mechanics combined!'
    },
    {
        level: 15,
        gridSize: 49, // 7x7
        matchesNeeded: 7,
        timeLimit: 60,
        shuffleInterval: 2500,
        rotatingCards: true,
        fadeOutCards: true,
        mirrorMode: true,
        invertedControls: true,
        blurCards: true, // New mechanic: cards become blurry
        description: 'Master level - Find 7 matches with all challenges!'
    }
];

function PatternMatch() {
    const [gamePatterns, setGamePatterns] = useState([]);
    const [selectedPatterns, setSelectedPatterns] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentPattern, setCurrentPattern] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [levelComplete, setLevelComplete] = useState(false);
    const [fadeOpacity, setFadeOpacity] = useState(1);

    const generatePatterns = () => {
        const level = difficultyLevels[currentLevel];
        const patternToMatch = petroglyphPatterns[Math.floor(Math.random() * petroglyphPatterns.length)];
        setCurrentPattern(patternToMatch);

        const newPatterns = Array(level.gridSize).fill(null).map(() => {
            const randomPattern = petroglyphPatterns[Math.floor(Math.random() * petroglyphPatterns.length)];
            return { ...randomPattern, key: Math.random() };
        });

        const positions = Array(level.matchesNeeded).fill(0)
            .map(() => Math.floor(Math.random() * level.gridSize));
        positions.forEach(pos => {
            newPatterns[pos] = { ...patternToMatch, key: Math.random() };
        });

        setGamePatterns(newPatterns);
    };

    useEffect(() => {
        generatePatterns();
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.shuffleInterval) {
            const shuffleTimer = setInterval(() => {
                setGamePatterns(prev => [...prev].sort(() => Math.random() - 0.5));
            }, level.shuffleInterval);
            return () => clearInterval(shuffleTimer);
        }
    }, [currentLevel]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.fadeOutCards) {
            const fadeTimer = setInterval(() => {
                setFadeOpacity(prev => Math.max(prev - 0.1, 0.3));
            }, 1000);
            return () => clearInterval(fadeTimer);
        }
    }, [currentLevel]);

    const handleLevelComplete = () => {
        setLevelComplete(true);
        if (currentLevel < difficultyLevels.length - 1) {
            setTimeout(() => {
                setCurrentLevel(currentLevel + 1);
                setLevelComplete(false);
                setTimeLeft(difficultyLevels[currentLevel + 1].timeLimit);
                generatePatterns();
                setFadeOpacity(1);
            }, 2000);
        } else {
            setIsGameOver(true);
        }
    };

    const handlePatternClick = (pattern, index) => {
        const level = difficultyLevels[currentLevel];

        if (level.invertedControls) {
            // Select neighboring card instead
            const gridWidth = Math.sqrt(level.gridSize);
            const neighborIndex = (index + 1) % level.gridSize;
            index = neighborIndex;
        }

        if (selectedPatterns.includes(index)) {
            setSelectedPatterns(selectedPatterns.filter(i => i !== index));
        } else {
            const newSelected = [...selectedPatterns, index];
            setSelectedPatterns(newSelected);

            if (newSelected.length >= level.matchesNeeded) {
                const selectedIds = newSelected.map(idx => gamePatterns[idx].id);
                const allMatch = selectedIds.every(id => id === selectedIds[0]);

                if (allMatch) {
                    setScore(score + level.matchesNeeded);
                    handleLevelComplete();
                }
                setSelectedPatterns([]);
            }
        }
    };

    return (
        <GameContainer>
            <InfoPanel>
                <h3>Level {currentLevel + 1}</h3>
                <p>{difficultyLevels[currentLevel].description}</p>
                {currentPattern && (
                    <>
                        <p>Find {difficultyLevels[currentLevel].matchesNeeded} instances of: <strong>{currentPattern.name}</strong></p>
                        <p>{currentPattern.description}</p>
                    </>
                )}
            </InfoPanel>

            <Timer isLow={timeLeft <= 10}>{timeLeft}s</Timer>
            <Score>Score: {score}</Score>
            <MatchInfo>Find {difficultyLevels[currentLevel].matchesNeeded} matching petroglyphs</MatchInfo>

            <PatternGrid
                style={{
                    gridTemplateColumns: `repeat(${Math.sqrt(difficultyLevels[currentLevel].gridSize)}, 1fr)`,
                    transform: difficultyLevels[currentLevel].mirrorMode ? 'scaleX(-1)' : 'none'
                }}
            >
                {gamePatterns.map((pattern, index) => (
                    <Pattern
                        key={pattern.key}
                        isSelected={selectedPatterns.includes(index)}
                        isBlurred={difficultyLevels[currentLevel].blurCards}
                        onClick={() => handlePatternClick(pattern, index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            opacity: difficultyLevels[currentLevel].fadeOutCards ? fadeOpacity : 1,
                            transform: difficultyLevels[currentLevel].rotatingCards
                                ? `rotate(${index * (360 / difficultyLevels[currentLevel].gridSize)}deg)`
                                : 'none'
                        }}
                    >
                        <img
                            src={pattern.image}
                            alt={pattern.name}
                            style={{
                                transform: difficultyLevels[currentLevel].rotatingCards
                                    ? `rotate(-${index * (360 / difficultyLevels[currentLevel].gridSize)}deg)`
                                    : 'none'
                            }}
                        />
                    </Pattern>
                ))}
            </PatternGrid>

            <AnimatePresence>
                {isGameOver && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}
                        >
                            <h2>Game Over!</h2>
                            <p>Final Score: {score}</p>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#4ECDC4',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }}
                            >
                                Play Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default PatternMatch; 