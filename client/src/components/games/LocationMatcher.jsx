import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const GameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/path/to/konkan-map.jpg');
  background-size: cover;
  background-position: center;
`;

const MapMarker = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  background: ${props => props.isActive ? '#4ECDC4' : '#FF6B6B'};
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  &::after {
    content: '${props => props.label}';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PetroglyphPanel = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PetroglyphCard = styled(motion.div)`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

const ScoreBoard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
`;

const locations = [
    { id: 1, name: 'Ratnagiri', x: 30, y: 40 },
    { id: 2, name: 'Sindhudurg', x: 45, y: 65 },
    { id: 3, name: 'Raigad', x: 60, y: 25 },
    // Add more locations...
];

const petroglyphs = [
    {
        id: 1,
        image: '/path/to/petroglyph1.jpg',
        name: 'Hunter Scene',
        location: 'Ratnagiri',
        description: 'A complex hunting scene with multiple figures'
    },
    {
        id: 2,
        image: '/path/to/petroglyph2.jpg',
        name: 'Animal Group',
        location: 'Sindhudurg',
        description: 'Group of wild animals including deer and elephants'
    },
    // Add more petroglyphs...
];

function LocationMatcher() {
    const [selectedPetroglyph, setSelectedPetroglyph] = useState(null);
    const [matches, setMatches] = useState([]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handlePetroglyphSelect = (petroglyph) => {
        setSelectedPetroglyph(petroglyph);
    };

    const handleLocationClick = (location) => {
        if (!selectedPetroglyph) return;

        setAttempts(attempts + 1);

        if (selectedPetroglyph.location === location.name) {
            setMatches([...matches, selectedPetroglyph.id]);
            setScore(score + 100);
            setShowResult({ correct: true, message: 'Correct! Perfect match!' });
        } else {
            setScore(Math.max(0, score - 20));
            setShowResult({ correct: false, message: 'Try again! That\'s not the right location.' });
        }

        setSelectedPetroglyph(null);

        setTimeout(() => {
            setShowResult(false);
        }, 2000);
    };

    const remainingPetroglyphs = petroglyphs.filter(p => !matches.includes(p.id));

    return (
        <GameContainer>
            <ScoreBoard>
                <h2>Score: {score}</h2>
                <p>Match petroglyphs to their original locations</p>
                <p>Matches: {matches.length} / {petroglyphs.length}</p>
            </ScoreBoard>

            <GameArea>
                <MapContainer>
                    <Map>
                        {locations.map(location => (
                            <MapMarker
                                key={location.id}
                                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                                label={location.name}
                                isActive={selectedPetroglyph?.location === location.name}
                                onClick={() => handleLocationClick(location)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </Map>
                </MapContainer>

                <PetroglyphPanel>
                    <h3>Petroglyphs to Match</h3>
                    {remainingPetroglyphs.map(petroglyph => (
                        <PetroglyphCard
                            key={petroglyph.id}
                            onClick={() => handlePetroglyphSelect(petroglyph)}
                            animate={{
                                scale: selectedPetroglyph?.id === petroglyph.id ? 1.05 : 1,
                                borderColor: selectedPetroglyph?.id === petroglyph.id ? '#4ECDC4' : 'transparent'
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={petroglyph.image} alt={petroglyph.name} />
                            <h3>{petroglyph.name}</h3>
                            <p>{petroglyph.description}</p>
                        </PetroglyphCard>
                    ))}
                </PetroglyphPanel>
            </GameArea>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: showResult.correct ? '#4ECDC4' : '#FF6B6B',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        {showResult.message}
                    </motion.div>
                )}
            </AnimatePresence>

            {matches.length === petroglyphs.length && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', marginTop: '2rem' }}
                >
                    <h2>Congratulations! 🎉</h2>
                    <p>You've matched all petroglyphs to their locations!</p>
                    <p>Final Score: {score}</p>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </motion.div>
            )}
        </GameContainer>
    );
}

export default LocationMatcher; 