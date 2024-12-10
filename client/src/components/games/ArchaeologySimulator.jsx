import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';

const dirtTexture = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=60';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExcavationArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  background: #8B4513;
  padding: 4px;
  border-radius: 12px;
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 1;
`;

const Cell = styled(motion.div)`
  background: ${props => props.revealed ? '#D2B48C' : '#8B4513'};
  aspect-ratio: 1;
  border-radius: 4px;
  cursor: ${props => props.revealed ? 'default' : 'pointer'};
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
  transition: background 0.3s;

  &:hover {
    opacity: ${props => props.revealed ? 1 : 0.8};
    transform: ${props => props.revealed ? 'none' : 'scale(1.05)'};
  }

  .artifact-content {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.revealed ? 1 : 0};
    transition: opacity 0.3s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tool = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const InfoPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
`;

const DocumentationPanel = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4ECDC4;
    border-radius: 4px;
  }

  > * {
    margin-bottom: 1.5rem;
  }

  .artifact-preview {
    width: 200px;
    height: 200px;
    margin: 1rem auto;
    border-radius: 8px;
    background: ${props => props.background};
    background-size: cover;
    background-position: center;
  }

  .documentation-guide {
    margin: 1rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;

    h4 {
      color: #4ECDC4;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: #4ECDC4;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        background: #45b8b0;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const artifacts = [
    {
        id: 1,
        type: 'petroglyph',
        image: petroglyph1,
        description: 'A hunting scene showing human figures with bows and animals',
        period: 'Early Period',
        significance: 'Shows early hunting practices'
    },
    {
        id: 2,
        type: 'petroglyph',
        image: petroglyph2,
        description: 'Multiple animal figures including deer and birds',
        period: 'Middle Period',
        significance: 'Depicts local wildlife'
    },
    {
        id: 3,
        type: 'petroglyph',
        image: petroglyph3,
        description: 'Complex scene with multiple figures',
        period: 'Late Period',
        significance: 'Shows community activities'
    },
    {
        id: 4,
        type: 'petroglyph',
        image: petroglyph4,
        description: 'Geometric patterns and symbols',
        period: 'Middle Period',
        significance: 'Possible ritual significance'
    },
    {
        id: 5,
        type: 'petroglyph',
        image: petroglyph5,
        description: 'Detailed animal representations',
        period: 'Late Period',
        significance: 'Shows artistic development'
    }
];

const tools = [
    { id: 'brush', name: 'Brush', icon: '🖌️', description: 'Gently remove surface dirt' },
    { id: 'trowel', name: 'Trowel', icon: '🔨', description: 'Carefully excavate deeper layers' },
    { id: 'shovel', name: 'Shovel', icon: '⛏️', description: 'Clear larger areas quickly' }
];

const Instructions = styled.div`
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: left;

    h3 {
        color: #4ECDC4;
        margin-bottom: 0.5rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const IntroOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IntroPanel = styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    text-align: center;

    h2 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    .steps {
        text-align: left;
        margin: 2rem 0;
        display: grid;
        gap: 1rem;
    }

    .step {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;

        .icon {
            font-size: 2rem;
        }

        .text {
            h4 {
                margin: 0;
                color: #2d3436;
            }
        }
    }

    button {
        padding: 1rem 2rem;
        background: #4ECDC4;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: translateY(-2px);
            background: #45b8b0;
        }
    }
`;

const scoringCriteria = {
    detailLevel: {
        low: 10,
        medium: 25,
        high: 50
    },
    accuracy: {
        low: 10,
        medium: 25,
        high: 50
    },
    observations: {
        perObservation: 5,
        maxObservations: 10
    }
};

const expertFeedback = {
    detailLevel: {
        low: "Try to include more specific details about what you see.",
        medium: "Good observations. Consider adding more technical details.",
        high: "Excellent detailed documentation!"
    },
    suggestions: [
        "Consider the relationship between different elements in the scene.",
        "Note any patterns or recurring motifs.",
        "Compare this finding with others from the same period.",
        "Look for signs of tool marks or carving techniques."
    ]
};

// Add new game mechanics
const gameMechanics = {
    tools: {
        brush: {
            name: 'Brush',
            icon: '🖌️',
            description: 'Gentle surface cleaning',
            durability: 10,
            accuracy: 0.9,
            timePerUse: 1
        },
        trowel: {
            name: 'Trowel',
            icon: '🔨',
            description: 'Careful deeper digging',
            durability: 5,
            accuracy: 0.7,
            timePerUse: 2
        },
        shovel: {
            name: 'Shovel',
            icon: '⛏️',
            description: 'Clear larger areas quickly',
            durability: 3,
            accuracy: 0.5,
            timePerUse: 3
        }
    },
    levels: [
        {
            name: "Novice Site",
            gridSize: 16,
            artifactDensity: 0.3,
            timeLimit: 300,
            weatherConditions: "clear"
        },
        {
            name: "Advanced Dig",
            gridSize: 25,
            artifactDensity: 0.4,
            timeLimit: 240,
            weatherConditions: "dusty"
        },
        {
            name: "Expert Excavation",
            gridSize: 36,
            artifactDensity: 0.5,
            timeLimit: 180,
            weatherConditions: "stormy"
        }
    ]
};

// Add new state variables
const DurabilityBar = styled.div`
    width: 50px;
    height: 4px;
    background: #eee;
    border-radius: 2px;
    margin-left: 0.5rem;
    overflow: hidden;

    &::after {
        content: '';
        display: block;
        width: ${props => (props.value / props.max) * 100}%;
        height: 100%;
        background: ${props => props.value > props.max * 0.3 ? '#4ECDC4' : '#FF6B6B'};
        transition: width 0.3s;
    }
`;

const ShopButton = styled(Tool)`
    background: #FFD93D;
    color: #333;

    &:hover {
        background: #FFC107;
    }
`;

function ArchaeologySimulator() {
    // Move all state declarations inside the component
    const [cells, setCells] = useState([]);
    const [selectedTool, setSelectedTool] = useState('brush');
    const [findings, setFindings] = useState([]);
    const [currentFinding, setCurrentFinding] = useState(null);
    const [showDocumentation, setShowDocumentation] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [score, setScore] = useState(0);
    const [expertAdvice, setExpertAdvice] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300);
    const [toolDurability, setToolDurability] = useState({
        brush: 10,
        trowel: 5,
        shovel: 3
    });
    const [weather, setWeather] = useState("clear");
    const [resources, setResources] = useState(100);
    const [combo, setCombo] = useState(0);
    const [showShop, setShowShop] = useState(false);

    // Add shopItems definition
    const shopItems = [
        {
            id: 'brush_repair',
            name: 'Repair Brush',
            cost: 50,
            effect: () => {
                setToolDurability(prev => ({ ...prev, brush: 10 }));
            }
        },
        {
            id: 'time_boost',
            name: 'Time Extension',
            cost: 100,
            effect: () => {
                setTimeLeft(prev => prev + 60);
            }
        },
        {
            id: 'resource_boost',
            name: 'Resource Pack',
            cost: 75,
            effect: () => {
                setResources(prev => prev + 150);
            }
        }
    ];

    // Add calculateScore function inside the component
    const calculateScore = (documentation) => {
        let points = 0;
        const words = documentation.notes.split(' ').length;

        // Score based on detail level
        if (words > 100) points += scoringCriteria.detailLevel.high;
        else if (words > 50) points += scoringCriteria.detailLevel.medium;
        else points += scoringCriteria.detailLevel.low;

        // Score based on key observations
        const keyTerms = [
            'technique', 'pattern', 'condition', 'size',
            'color', 'style', 'figure', 'shape', 'detail',
            'composition'
        ];

        const observations = keyTerms.filter(term =>
            documentation.notes.toLowerCase().includes(term)
        ).length;

        points += Math.min(
            observations * scoringCriteria.observations.perObservation,
            scoringCriteria.observations.maxObservations * scoringCriteria.observations.perObservation
        );

        // Bonus points for mentioning period-specific details
        if (documentation.notes.toLowerCase().includes(currentFinding.period.toLowerCase())) {
            points += 25;
        }

        // Bonus points for mentioning significance
        if (documentation.notes.toLowerCase().includes(currentFinding.significance.toLowerCase())) {
            points += 25;
        }

        return points;
    };

    // Add initialization effect
    useEffect(() => {
        // Initialize grid with artifacts
        const gridSize = 25; // 5x5 grid
        const initialCells = Array(gridSize).fill(null).map((_, index) => ({
            id: index,
            revealed: false,
            // Increase chance of finding artifacts (40% chance)
            artifact: Math.random() < 0.4 ? artifacts[Math.floor(Math.random() * artifacts.length)] : null
        }));
        setCells(initialCells);
    }, []); // Run once on component mount

    // Add timer effect
    useEffect(() => {
        if (timeLeft > 0 && !showIntro) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleLevelEnd();
        }
    }, [timeLeft, showIntro]);

    // Update handleCellClick to be more responsive
    const handleCellClick = (cell) => {
        if (cell.revealed || toolDurability[selectedTool] <= 0) return;

        // Deduct tool durability and resources
        setToolDurability(prev => ({
            ...prev,
            [selectedTool]: prev[selectedTool] - 1
        }));
        setResources(prev => prev - gameMechanics.tools[selectedTool].timePerUse);

        // Check for successful excavation
        const success = Math.random() < gameMechanics.tools[selectedTool].accuracy;

        // Always reveal the cell, but only show artifact if successful
        const newCells = [...cells];
        const clickedCell = newCells[cell.id];
        clickedCell.revealed = true;
        setCells(newCells);

        if (success && clickedCell.artifact) {
            setCombo(prev => prev + 1);
            const comboBonus = combo * 50;
            setScore(prev => prev + 100 + comboBonus);
            setCurrentFinding(clickedCell.artifact);
            setShowDocumentation(true);
        } else {
            setCombo(0);
        }
    };

    // Add handleDocumentation function
    const handleDocumentation = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const documentation = {
            artifact: currentFinding,
            notes: formData.get('notes'),
            date: formData.get('date'),
            location: formData.get('location')
        };

        // Calculate score and feedback
        const documentationScore = calculateScore(documentation);
        setScore(prev => prev + documentationScore);

        // Generate expert feedback
        const feedback = {
            score: documentationScore,
            detailFeedback: documentationScore > 75 ?
                expertFeedback.detailLevel.high :
                documentationScore > 40 ?
                    expertFeedback.detailLevel.medium :
                    expertFeedback.detailLevel.low,
            suggestions: expertFeedback.suggestions[Math.floor(Math.random() * expertFeedback.suggestions.length)]
        };

        setExpertAdvice(feedback);
        setFindings([...findings, { ...documentation, score: documentationScore }]);

        setTimeout(() => {
            setShowDocumentation(false);
            setExpertAdvice(null);
        }, 3000);
    };

    // Add renderIntroScreen function
    const renderIntroScreen = () => (
        <IntroOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <IntroPanel
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <h2>Welcome to Archaeological Excavation</h2>
                <p>Experience the thrill of discovering ancient petroglyphs!</p>

                <div className="steps">
                    <div className="step">
                        <div className="icon">🔍</div>
                        <div className="text">
                            <h4>Explore the Site</h4>
                            <p>The excavation grid contains hidden artifacts beneath the soil.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="icon">🛠️</div>
                        <div className="text">
                            <h4>Choose Your Tools</h4>
                            <p>
                                <strong>🖌️ Brush:</strong> Gentle surface cleaning<br />
                                <strong>🔨 Trowel:</strong> Careful deeper digging<br />
                                <strong>⛏️ Shovel:</strong> Clear larger areas
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="icon">🎯</div>
                        <div className="text">
                            <h4>Excavate Carefully</h4>
                            <p>Click on soil squares to excavate. Different tools have different effects.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="icon">📝</div>
                        <div className="text">
                            <h4>Document Findings</h4>
                            <p>When you discover an artifact, document it with notes and observations.</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => setShowIntro(false)}>
                    Start Excavation
                </button>
            </IntroPanel>
        </IntroOverlay>
    );

    // Add renderGallery function
    const renderGallery = () => (
        <DocumentationPanel
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
        >
            <h2>Findings Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {findings.map((finding, index) => (
                    <div key={index} style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <img
                            src={finding.artifact.image}
                            alt={finding.artifact.description}
                            style={{
                                width: '100%',
                                aspectRatio: '1',
                                objectFit: 'cover',
                                borderRadius: '4px'
                            }}
                        />
                        <strong>{finding.artifact.type}</strong>
                        <p>Score: {finding.score}</p>
                        <small>{finding.date}</small>
                    </div>
                ))}
            </div>
            <Button onClick={() => setShowGallery(false)}>Close Gallery</Button>
        </DocumentationPanel>
    );

    // Add handleLevelEnd function
    const handleLevelEnd = () => {
        if (currentLevel < gameMechanics.levels.length - 1) {
            // Advance to next level
            setCurrentLevel(prev => prev + 1);
            setTimeLeft(gameMechanics.levels[currentLevel + 1].timeLimit);
            setWeather(gameMechanics.levels[currentLevel + 1].weatherConditions);

            // Reset tools and give bonus resources
            setToolDurability({
                brush: 10,
                trowel: 5,
                shovel: 3
            });
            setResources(prev => prev + 50);

            // Initialize new grid
            const newLevel = gameMechanics.levels[currentLevel + 1];
            const initialCells = Array(newLevel.gridSize).fill(null).map((_, index) => ({
                id: index,
                revealed: false,
                artifact: Math.random() < newLevel.artifactDensity ?
                    artifacts[Math.floor(Math.random() * artifacts.length)] : null
            }));
            setCells(initialCells);
        } else {
            // Game complete
            alert(`Congratulations! You've completed all levels!\nFinal Score: ${score}`);
            // Could add a game completion screen here
        }
    };

    // Add shop panel
    const renderShop = () => (
        <AnimatePresence>
            {showShop && (
                <>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowShop(false)}
                    />
                    <DocumentationPanel
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <h3>Supply Shop</h3>
                        <p>Resources: {resources}</p>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {shopItems.map(item => (
                                <Tool
                                    key={item.id}
                                    onClick={() => {
                                        if (resources >= item.cost) {
                                            item.effect();
                                            setResources(prev => prev - item.cost);
                                        }
                                    }}
                                    disabled={resources < item.cost}
                                >
                                    {item.name} (Cost: {item.cost})
                                </Tool>
                            ))}
                        </div>
                    </DocumentationPanel>
                </>
            )}
        </AnimatePresence>
    );

    // Add shop rendering to the return statement
    return (
        <GameContainer>
            <AnimatePresence>
                {showIntro && renderIntroScreen()}
            </AnimatePresence>

            {!showIntro && (
                <>
                    <InfoPanel>
                        <h2>Archaeological Excavation Site</h2>
                        <p>Carefully excavate the area to discover ancient petroglyphs</p>
                        <p>Findings: {findings.length} | Score: {score}</p>

                        <Instructions>
                            <h3>How to Play:</h3>
                            <ul>
                                {tools.map(tool => (
                                    <li key={tool.id}>
                                        <span>{tool.icon}</span>
                                        <strong>{tool.name}:</strong> {tool.description}
                                    </li>
                                ))}
                            </ul>
                            <p>👉 Click on cells to excavate and discover artifacts</p>
                            <p>📝 Document your findings for research</p>
                        </Instructions>
                    </InfoPanel>

                    <ToolBar>
                        {Object.entries(gameMechanics.tools).map(([id, tool]) => (
                            <Tool
                                key={id}
                                active={selectedTool === id}
                                onClick={() => setSelectedTool(id)}
                                disabled={toolDurability[id] <= 0}
                            >
                                {tool.icon} {tool.name}
                                <DurabilityBar value={toolDurability[id]} max={tool.durability} />
                            </Tool>
                        ))}
                        <ShopButton onClick={() => setShowShop(true)}>
                            🛍️ Shop
                        </ShopButton>
                    </ToolBar>

                    <ExcavationArea>
                        {cells.map(cell => (
                            <Cell
                                key={cell.id}
                                revealed={cell.revealed}
                                onClick={() => handleCellClick(cell)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="artifact-content">
                                    {cell.revealed && cell.artifact && (
                                        <motion.img
                                            src={cell.artifact.image}
                                            alt={cell.artifact.description}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                    )}
                                </div>
                            </Cell>
                        ))}
                    </ExcavationArea>

                    <AnimatePresence>
                        {showDocumentation && (
                            <>
                                <Overlay
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowDocumentation(false)}
                                />
                                <DocumentationPanel
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    background={currentFinding?.background}
                                >
                                    <h3>Document Your Finding</h3>

                                    <div className="artifact-preview" />

                                    <div className="documentation-guide">
                                        <h4>About this Artifact:</h4>
                                        <p><strong>Type:</strong> {currentFinding?.type}</p>
                                        <p><strong>Description:</strong> {currentFinding?.description}</p>
                                        <p><strong>Period:</strong> {currentFinding?.period}</p>

                                        <h4>Documentation Guidelines:</h4>
                                        <ul>
                                            <li>🔍 Describe the visual elements you see</li>
                                            <li>📏 Note the size and condition</li>
                                            <li>🎨 Describe the carving technique</li>
                                            <li>📝 Add any other observations</li>
                                        </ul>
                                    </div>

                                    <Form onSubmit={handleDocumentation}>
                                        <Input
                                            type="date"
                                            name="date"
                                            required
                                            defaultValue={new Date().toISOString().split('T')[0]}
                                        />
                                        <Input
                                            type="text"
                                            name="location"
                                            placeholder="Grid location (e.g., A3, B4)"
                                            required
                                        />
                                        <TextArea
                                            name="notes"
                                            placeholder={`Describe your observations...
- What do you see in the image?
- What techniques were used?
- What is the condition?
- What might it tell us about ancient life?`}
                                            required
                                            rows="6"
                                        />
                                        <Tool type="submit">
                                            Save Documentation
                                        </Tool>
                                    </Form>
                                </DocumentationPanel>
                            </>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showGallery && renderGallery()}
                    </AnimatePresence>
                </>
            )}
            {renderShop()}
        </GameContainer>
    );
}

export default ArchaeologySimulator; 