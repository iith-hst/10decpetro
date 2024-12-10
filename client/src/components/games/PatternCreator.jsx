import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const CreatorArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Canvas = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  background: #8B4513;
  padding: 4px;
  border-radius: 8px;
  aspect-ratio: 1;
`;

const Cell = styled(motion.div)`
  background: ${props => props.symbol ? '#4ECDC4' : '#D2B48C'};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  aspect-ratio: 1;
  position: relative;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SymbolPalette = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SymbolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Symbol = styled(motion.button)`
  aspect-ratio: 1;
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'primary' ?
        'linear-gradient(45deg, #FF6B6B, #4ECDC4)' : '#eee'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const PreviewPanel = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  z-index: 1000;
`;

const symbols = [
    { id: 'human', icon: '🚶' },
    { id: 'deer', icon: '🦌' },
    { id: 'sun', icon: '☀️' },
    { id: 'moon', icon: '🌙' },
    { id: 'star', icon: '⭐' },
    { id: 'tree', icon: '🌳' },
    { id: 'mountain', icon: '⛰️' },
    { id: 'water', icon: '💧' },
    { id: 'fish', icon: '🐟' },
    { id: 'bird', icon: '🦅' },
    { id: 'spiral', icon: '🌀' },
    { id: 'hand', icon: '✋' }
];

function PatternCreator() {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [grid, setGrid] = useState(Array(100).fill(null));
    const [showPreview, setShowPreview] = useState(false);
    const [patterns, setPatterns] = useState([]);

    const handleCellClick = (index) => {
        if (!selectedSymbol) return;

        const newGrid = [...grid];
        newGrid[index] = newGrid[index] === selectedSymbol ? null : selectedSymbol;
        setGrid(newGrid);
    };

    const handleSave = () => {
        const pattern = {
            id: Date.now(),
            grid: [...grid],
            date: new Date().toISOString()
        };
        setPatterns([...patterns, pattern]);
        setShowPreview(true);
    };

    const handleClear = () => {
        setGrid(Array(100).fill(null));
    };

    const handleSymmetry = () => {
        const newGrid = [...grid];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                const index = i * 10 + j;
                const mirrorIndex = i * 10 + (9 - j);
                newGrid[mirrorIndex] = newGrid[index];
            }
        }
        setGrid(newGrid);
    };

    return (
        <GameContainer>
            <h2>Pattern Creator</h2>
            <p>Create your own petroglyph patterns using ancient symbols</p>

            <CreatorArea>
                <Canvas>
                    <Grid>
                        {grid.map((symbol, index) => (
                            <Cell
                                key={index}
                                symbol={symbol}
                                onClick={() => handleCellClick(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {symbol?.icon}
                            </Cell>
                        ))}
                    </Grid>
                </Canvas>

                <ControlPanel>
                    <SymbolPalette>
                        <h3>Symbols</h3>
                        <SymbolGrid>
                            {symbols.map(symbol => (
                                <Symbol
                                    key={symbol.id}
                                    selected={selectedSymbol?.id === symbol.id}
                                    onClick={() => setSelectedSymbol(symbol)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {symbol.icon}
                                </Symbol>
                            ))}
                        </SymbolGrid>
                    </SymbolPalette>

                    <ActionButton
                        onClick={handleSymmetry}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        🔄 Apply Symmetry
                    </ActionButton>

                    <ActionButton
                        onClick={handleClear}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        🗑️ Clear Pattern
                    </ActionButton>

                    <ActionButton
                        variant="primary"
                        onClick={handleSave}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        💾 Save Pattern
                    </ActionButton>
                </ControlPanel>
            </CreatorArea>

            <AnimatePresence>
                {showPreview && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999
                            }}
                            onClick={() => setShowPreview(false)}
                        />
                        <PreviewPanel
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                        >
                            <h3>Pattern Saved! 🎉</h3>
                            <p>Your pattern has been added to the gallery.</p>
                            <ActionButton
                                onClick={() => setShowPreview(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Continue Creating
                            </ActionButton>
                        </PreviewPanel>
                    </>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default PatternCreator; 