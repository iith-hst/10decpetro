import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const RestoreArea = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const ToolSection = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const Tool = styled(motion.button)`
  padding: 0.75rem;
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const CanvasContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
`;

const CompletionMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;
`;

const tools = [
    { id: 'clean', icon: '🧹', name: 'Clean', description: 'Remove dirt and debris' },
    { id: 'repair', icon: '🔨', name: 'Repair', description: 'Fix cracks and damage' },
    { id: 'enhance', icon: '✨', name: 'Enhance', description: 'Enhance faded areas' },
    { id: 'restore', icon: '🎨', name: 'Restore', description: 'Restore original colors' }
];

const artifacts = [
    {
        id: 1,
        name: 'Hunting Scene',
        image: '/path/to/damaged1.jpg',
        target: '/path/to/restored1.jpg',
        description: 'A damaged hunting scene that needs careful restoration'
    },
    // Add more artifacts...
];

function ArtifactRestoration() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [selectedTool, setSelectedTool] = useState('clean');
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [currentArtifact, setCurrentArtifact] = useState(artifacts[0]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineWidth = 20;
        contextRef.current = context;

        // Load damaged image
        const img = new Image();
        img.src = currentArtifact.image;
        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, [currentArtifact]);

    const getToolSettings = (tool) => {
        switch (tool) {
            case 'clean':
                return { operation: 'destination-out', size: 20 };
            case 'repair':
                return { operation: 'source-over', size: 10 };
            case 'enhance':
                return { operation: 'lighter', size: 15 };
            case 'restore':
                return { operation: 'source-over', size: 20 };
            default:
                return { operation: 'source-over', size: 20 };
        }
    };

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
        const settings = getToolSettings(tool);
        contextRef.current.globalCompositeOperation = settings.operation;
        contextRef.current.lineWidth = settings.size;
    };

    const startRestoration = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    const restore = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

        // Update progress
        setProgress(prev => {
            const newProgress = Math.min(prev + 0.2, 100);
            if (newProgress >= 100 && !isComplete) {
                setIsComplete(true);
            }
            return newProgress;
        });
    };

    const stopRestoration = () => {
        contextRef.current.closePath();
    };

    return (
        <GameContainer>
            <h2>Restore Ancient Petroglyphs</h2>
            <p>Use different tools to carefully restore the damaged petroglyph</p>

            <ProgressBar>
                <Progress
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </ProgressBar>

            <RestoreArea>
                <ToolPanel>
                    <ToolSection>
                        <h3>Restoration Tools</h3>
                        <ToolGrid>
                            {tools.map(tool => (
                                <Tool
                                    key={tool.id}
                                    selected={selectedTool === tool.id}
                                    onClick={() => handleToolSelect(tool.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {tool.icon} {tool.name}
                                </Tool>
                            ))}
                        </ToolGrid>
                    </ToolSection>

                    <ToolSection>
                        <h3>Current Artifact</h3>
                        <p>{currentArtifact.description}</p>
                    </ToolSection>
                </ToolPanel>

                <CanvasContainer>
                    <Canvas
                        ref={canvasRef}
                        onMouseDown={startRestoration}
                        onMouseMove={restore}
                        onMouseUp={stopRestoration}
                        onMouseLeave={stopRestoration}
                    />
                </CanvasContainer>
            </RestoreArea>

            <AnimatePresence>
                {isComplete && (
                    <CompletionMessage
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <h2>Restoration Complete! 🎉</h2>
                        <p>You've successfully restored this petroglyph.</p>
                        <button onClick={() => window.location.reload()}>
                            Restore Another
                        </button>
                    </CompletionMessage>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default ArtifactRestoration; 