import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ExcavationArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DigSite = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  background: #8B4513;
  padding: 4px;
  border-radius: 8px;
  aspect-ratio: 1;
`;

const Layer = styled(motion.div)`
  position: relative;
  background: ${props => props.type === 'artifact' ? '#4ECDC4' :
        props.type === 'sediment' ? '#8B4513' : '#D2B48C'};
  border-radius: 4px;
  cursor: pointer;
  opacity: ${props => props.revealed ? 0 : 1};
  transition: opacity 0.3s;

  &::after {
    content: '${props => props.revealed && props.type === 'artifact' ? '🗿' : ''}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }
`;

const ToolPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToolCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Tool = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.selected ? '#4ECDC4' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
`;

const tools = [
    { id: 'trowel', name: 'Trowel', icon: '🔨', power: 1 },
    { id: 'brush', name: 'Brush', icon: '🖌️', power: 0.5 },
    { id: 'shovel', name: 'Shovel', icon: '⛏️', power: 2 }
];

function generateGrid(size) {
    return Array(size * size).fill(null).map((_, index) => ({
        id: index,
        type: Math.random() < 0.2 ? 'artifact' : 'sediment',
        health: 100,
        revealed: false,
        layer: Math.floor(Math.random() * 3) + 1
    }));
}

function DigitalExcavation() {
    const [grid, setGrid] = useState([]);
    const [selectedTool, setSelectedTool] = useState(tools[0]);
    const [artifacts, setArtifacts] = useState(0);
    const [totalArtifacts, setTotalArtifacts] = useState(0);
    const [damageLevel, setDamageLevel] = useState(0);

    useEffect(() => {
        const initialGrid = generateGrid(6);
        setGrid(initialGrid);
        setTotalArtifacts(initialGrid.filter(cell => cell.type === 'artifact').length);
    }, []);

    const handleDig = (cell, index) => {
        if (cell.revealed) return;

        const newGrid = [...grid];
        const damage = cell.type === 'artifact' && selectedTool.id === 'shovel' ? 20 : 0;

        newGrid[index] = {
            ...cell,
            health: Math.max(0, cell.health - selectedTool.power * 20),
            revealed: cell.health - selectedTool.power * 20 <= 0
        };

        if (damage > 0) {
            setDamageLevel(prev => prev + damage);
        }

        if (newGrid[index].revealed && newGrid[index].type === 'artifact') {
            setArtifacts(prev => prev + 1);
        }

        setGrid(newGrid);
    };

    const getLayerStyle = (cell) => {
        if (cell.revealed) return {};
        return {
            backgroundColor: cell.layer === 1 ? '#D2B48C' :
                cell.layer === 2 ? '#BC8F8F' :
                    '#8B4513'
        };
    };

    return (
        <GameContainer>
            <h2>Digital Excavation</h2>
            <p>Carefully excavate the site to discover ancient petroglyphs</p>

            <ExcavationArea>
                <DigSite>
                    <Grid>
                        {grid.map((cell, index) => (
                            <Layer
                                key={cell.id}
                                type={cell.type}
                                revealed={cell.revealed}
                                style={getLayerStyle(cell)}
                                onClick={() => handleDig(cell, index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        ))}
                    </Grid>
                </DigSite>

                <ToolPanel>
                    <ToolCard>
                        <h3>Progress</h3>
                        <p>Artifacts Found: {artifacts}/{totalArtifacts}</p>
                        <ProgressBar>
                            <Progress
                                animate={{ width: `${(artifacts / totalArtifacts) * 100}%` }}
                            />
                        </ProgressBar>
                        <p>Damage Level: {damageLevel}%</p>
                        <ProgressBar>
                            <Progress
                                animate={{ width: `${damageLevel}%` }}
                                style={{ background: '#FF6B6B' }}
                            />
                        </ProgressBar>
                    </ToolCard>

                    <ToolCard>
                        <h3>Tools</h3>
                        {tools.map(tool => (
                            <Tool
                                key={tool.id}
                                selected={selectedTool.id === tool.id}
                                onClick={() => setSelectedTool(tool)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tool.icon} {tool.name}
                            </Tool>
                        ))}
                    </ToolCard>
                </ToolPanel>
            </ExcavationArea>

            <AnimatePresence>
                {(artifacts === totalArtifacts || damageLevel >= 100) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            zIndex: 1000
                        }}
                    >
                        <h2>{damageLevel >= 100 ? '❌ Excavation Failed' : '🎉 Excavation Complete!'}</h2>
                        <p>
                            {damageLevel >= 100
                                ? 'Too much damage was caused to the artifacts.'
                                : `You found all ${artifacts} artifacts with ${damageLevel}% damage.`}
                        </p>
                        <Tool
                            onClick={() => window.location.reload()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Again
                        </Tool>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default DigitalExcavation; 