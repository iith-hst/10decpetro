import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const WorkshopArea = styled.div`
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

const WorkSurface = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #8B4513;
  border-radius: 8px;
  position: relative;
  cursor: crosshair;
`;

const ToolPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tool = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

const TechniqueInfo = styled(motion.div)`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-top: 1rem;
`;

const Mark = styled(motion.div)`
  position: absolute;
  background: ${props => props.color};
  border-radius: ${props => props.type === 'pecking' ? '50%' : '2px'};
  transform: translate(-50%, -50%);
`;

const tools = [
    {
        id: 'hammer-stone',
        name: 'Hammer Stone',
        icon: '🔨',
        technique: 'pecking',
        description: 'Used for direct percussion, creating small circular marks',
        markSize: 5,
        markColor: '#654321'
    },
    {
        id: 'chisel',
        name: 'Stone Chisel',
        icon: '⚒️',
        technique: 'incising',
        description: 'Creates fine lines and detailed work',
        markSize: 3,
        markColor: '#543210'
    },
    {
        id: 'abrader',
        name: 'Abrading Stone',
        icon: '🗿',
        technique: 'abrading',
        description: 'Smooths surfaces through repeated rubbing',
        markSize: 10,
        markColor: '#765432'
    }
];

function AncientTechnology() {
    const [selectedTool, setSelectedTool] = useState(tools[0]);
    const [marks, setMarks] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [completionLevel, setCompletionLevel] = useState(0);

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
    };

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        addMark(e);
    };

    const handleMouseMove = (e) => {
        if (isDrawing) {
            addMark(e);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        updateCompletion();
    };

    const addMark = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newMark = {
            id: Date.now(),
            x,
            y,
            type: selectedTool.technique,
            size: selectedTool.markSize,
            color: selectedTool.markColor
        };

        setMarks(prev => [...prev, newMark]);
    };

    const updateCompletion = () => {
        // Simple completion calculation based on covered area
        const newLevel = Math.min(100, completionLevel + 5);
        setCompletionLevel(newLevel);
    };

    return (
        <GameContainer>
            <h2>Ancient Technology Workshop</h2>
            <p>Learn and experiment with ancient petroglyph-making techniques</p>

            <WorkshopArea>
                <Canvas>
                    <WorkSurface
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsDrawing(false)}
                    >
                        {marks.map(mark => (
                            <Mark
                                key={mark.id}
                                style={{
                                    left: `${mark.x}%`,
                                    top: `${mark.y}%`,
                                    width: `${mark.size}px`,
                                    height: `${mark.size}px`
                                }}
                                color={mark.color}
                                type={mark.type}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            />
                        ))}
                    </WorkSurface>

                    <motion.div
                        style={{
                            width: '100%',
                            height: '8px',
                            background: '#eee',
                            borderRadius: '4px',
                            marginTop: '1rem',
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div
                            style={{
                                width: `${completionLevel}%`,
                                height: '100%',
                                background: '#4ECDC4',
                                borderRadius: '4px'
                            }}
                            animate={{ width: `${completionLevel}%` }}
                        />
                    </motion.div>
                </Canvas>

                <ToolPanel>
                    <h3>Ancient Tools</h3>
                    <ToolGrid>
                        {tools.map(tool => (
                            <Tool
                                key={tool.id}
                                selected={selectedTool.id === tool.id}
                                onClick={() => handleToolSelect(tool)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                                <span>{tool.name}</span>
                            </Tool>
                        ))}
                    </ToolGrid>

                    <TechniqueInfo
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={selectedTool.id}
                    >
                        <h4>Technique: {selectedTool.technique}</h4>
                        <p>{selectedTool.description}</p>
                    </TechniqueInfo>

                    {completionLevel >= 100 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ marginTop: '1rem', textAlign: 'center' }}
                        >
                            <h3>🎉 Artwork Complete!</h3>
                            <button
                                onClick={() => {
                                    setMarks([]);
                                    setCompletionLevel(0);
                                }}
                            >
                                Start New Artwork
                            </button>
                        </motion.div>
                    )}
                </ToolPanel>
            </WorkshopArea>
        </GameContainer>
    );
}

export default AncientTechnology; 