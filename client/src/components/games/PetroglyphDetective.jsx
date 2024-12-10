import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import { useNavigate } from 'react-router-dom';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const CaseArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EvidenceBoard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const Evidence = styled(motion.div)`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  
  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
`;

const CaseFile = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NotesArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: inherit;
  resize: vertical;
`;

const ClueTag = styled(motion.span)`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #4ECDC4;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  margin: 0.25rem;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Tool = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
`;

const HypothesisForm = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`;

const SolutionPanel = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  z-index: 1000;
`;

const TutorialOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const TutorialContent = styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    position: relative;
`;

const TutorialStep = styled(motion.div)`
    text-align: center;

    h2 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    .image-preview {
        width: 100%;
        max-width: 400px;
        height: 200px;
        margin: 1rem auto;
        border-radius: 8px;
        overflow: hidden;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .tools-preview {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0;
    }
`;

const DifficultySelect = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
`;

const DifficultyCard = styled(motion.div)`
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;

    h3 {
        color: #4ECDC4;
        margin-bottom: 0.5rem;
    }

    .features {
        margin-top: 1rem;
        font-size: 0.9rem;
        
        li {
            margin: 0.25rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }
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
        background: #45b8b0;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// Add case categories for organization
const caseCategories = {
    PATTERN: '🔍 Pattern Analysis',
    CULTURAL: '🏺 Cultural Context',
    DATING: '📅 Dating & Timeline',
    RITUAL: '🌟 Ritual & Ceremony',
    TECHNIQUE: '🛠️ Technical Analysis'
};

// Update cases with real petroglyph mysteries
const cases = [
    {
        id: 1,
        category: caseCategories.PATTERN,
        title: "The Kasheli Elephant Mystery",
        description: "Investigate India's largest petroglyph - a massive elephant figure containing hidden animal motifs.",
        difficulty: 'beginner',
        timeLimit: 300,
        evidence: [
            {
                id: 'e1',
                type: 'image',
                url: petroglyph1,
                description: 'Main Elephant Composition',
                clues: [
                    'Notice the scale - 18x13 meters',
                    'Look for smaller figures within',
                    'Study the carving technique'
                ],
                zoomable: true,
                hotspots: [
                    { x: 30, y: 40, label: 'Hidden tiger figure' },
                    { x: 60, y: 50, label: 'Marine life symbols' },
                    { x: 45, y: 70, label: 'Tool marks visible' }
                ]
            },
            {
                id: 'e2',
                type: 'analysis',
                title: 'Technical Report',
                content: 'Deep pecking technique used consistently. Evidence of planning in figure placement.',
                image: petroglyph2,
                clues: ['Uniform carving depth', 'Planned composition']
            },
            {
                id: 'e3',
                type: 'document',
                title: 'Field Notes',
                content: 'Site orientation suggests possible astronomical alignment. Microliths found nearby indicate human settlement.',
                clues: ['Astronomical connection', 'Settlement evidence']
            }
        ],
        solution: {
            pattern: 'ecosystem-hierarchy',
            explanation: 'This masterpiece demonstrates advanced artistic planning and deep ecological understanding. The elephant serves as a canvas for depicting the entire ecosystem, from marine life to terrestrial animals.',
            correctClues: [
                'Hierarchical composition',
                'Multiple species representation',
                'Astronomical alignment'
            ]
        }
    },
    {
        id: 2,
        category: caseCategories.RITUAL,
        title: "The Sacred Tiger Transformation",
        description: "Uncover the meaning behind the unique rectangular tiger forms at Barsu.",
        difficulty: 'intermediate',
        timeLimit: 240,
        evidence: [
            {
                id: 'e4',
                type: 'image',
                url: petroglyph3,
                description: 'Tiger and Human Composition',
                clues: [
                    'Geometric tiger forms',
                    'Central figure position',
                    'Symbolic patterns'
                ],
                zoomable: true,
                hotspots: [
                    { x: 35, y: 45, label: 'Ritual symbols' },
                    { x: 65, y: 50, label: 'Geometric patterns' }
                ]
            },
            {
                id: 'e5',
                type: 'analysis',
                title: 'Cultural Analysis',
                content: 'Similar motifs found in regional shamanic practices. Geometric patterns match known ritual symbols.',
                image: petroglyph4,
                clues: ['Shamanic elements', 'Ritual symbolism']
            }
        ],
        solution: {
            pattern: 'transformation-ritual',
            explanation: 'The composition depicts a shamanic transformation ritual, with the rectangular tigers representing spirit guardians.',
            correctClues: [
                'Ritual symbolism',
                'Geometric patterns',
                'Central figure placement'
            ]
        }
    }
];

// Add expert insights for each case
const expertInsights = {
    1: [
        {
            expert: "Dr. Sarah Chen",
            title: "Archaeological Pattern Specialist",
            insight: "The hierarchical arrangement of figures within the elephant suggests a sophisticated understanding of ecological relationships."
        },
        {
            expert: "Prof. Rajesh Kumar",
            title: "Rock Art Technologist",
            insight: "The consistent carving depth despite the massive scale indicates advanced planning and tool control."
        }
    ],
    2: [
        {
            expert: "Dr. Maya Patel",
            title: "Cultural Anthropologist",
            insight: "The geometric patterns in the tiger forms match known shamanic symbols from the region."
        }
    ]
};

// Add tutorial steps content
const tutorialSteps = [
    {
        title: "Welcome to Petroglyph Detective",
        content: "Uncover the mysteries of ancient rock art through careful investigation and deduction.",
        image: petroglyph1
    },
    {
        title: "Analyze Evidence",
        content: "Use specialized tools to examine petroglyphs, artifacts, and archaeological data.",
        image: petroglyph2,
        tools: ['🔍 Analyze', '📏 Measure', '📸 Document']
    },
    {
        title: "Connect the Clues",
        content: "Build connections between different pieces of evidence to form hypotheses.",
        image: petroglyph3
    },
    {
        title: "Submit Your Findings",
        content: "Present your conclusions based on the evidence you've gathered.",
        image: petroglyph4
    }
];

// Add difficulty levels
const difficultyLevels = [
    {
        id: 'beginner',
        title: 'Apprentice Detective',
        description: 'Learn the basics of archaeological investigation',
        features: [
            '3 pieces of evidence per case',
            'Clear connections between clues',
            'Guided analysis tools',
            'Hint system available'
        ],
        icon: '🔰'
    },
    {
        id: 'intermediate',
        title: 'Field Investigator',
        description: 'Handle more complex cases with multiple layers',
        features: [
            '5 pieces of evidence per case',
            'Multiple possible connections',
            'Time pressure added',
            'Limited hints'
        ],
        icon: '🏛️'
    },
    {
        id: 'expert',
        title: 'Master Archaeologist',
        description: 'Tackle the most challenging mysteries',
        features: [
            'Complex evidence networks',
            'Time-sensitive investigations',
            'Advanced analysis required',
            'No hints available'
        ],
        icon: '🎓'
    }
];

// Add styled components for enhanced visuals
const CaseHeader = styled.div`
    background: linear-gradient(45deg, #2D3436, #636E72);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(${props => props.backgroundImage});
        background-size: cover;
        opacity: 0.1;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }

    .category {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: rgba(78, 205, 196, 0.2);
        border-radius: 20px;
        margin-bottom: 1rem;
    }

    .difficulty {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
    }
`;

const EvidenceViewer = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 1000;

    .evidence-image {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .evidence-content {
        display: grid;
        gap: 1rem;
    }

    .clues {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
`;

// Add new styled components for guides
const GuidePopup = styled(motion.div)`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    z-index: 1000;

    h4 {
        color: #4ECDC4;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .tip-content {
        margin: 1rem 0;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .progress {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        justify-content: center;

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${props => props.active ? '#4ECDC4' : '#eee'};
        }
    }
`;

// Add guide content
const investigationGuides = [
    {
        id: 1,
        title: "Start with Evidence",
        icon: "🔍",
        content: "Click on evidence items to examine them closely. Each piece contains important clues!",
        trigger: "first-visit"
    },
    {
        id: 2,
        title: "Use Your Tools",
        icon: "🛠️",
        content: "Select different analysis tools to reveal hidden clues. Try the Analyze tool on images!",
        trigger: "evidence-clicked"
    },
    {
        id: 3,
        title: "Take Notes",
        icon: "📝",
        content: "Write down your observations in the notes area. Important details will be highlighted!",
        trigger: "tool-used"
    },
    {
        id: 4,
        title: "Form a Hypothesis",
        icon: "💡",
        content: "Once you've gathered enough clues, submit your hypothesis about the petroglyph's meaning.",
        trigger: "notes-added"
    },
    {
        id: 5,
        title: "Expert Insights",
        icon: "👨‍🏫",
        content: "Click on expert icons to get additional insights about the evidence.",
        trigger: "clues-found"
    }
];

function PetroglyphDetective() {
    const [currentCase, setCurrentCase] = useState(cases[0]);
    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [notes, setNotes] = useState('');
    const [hypothesis, setHypothesis] = useState('');
    const [solved, setSolved] = useState(false);
    const [activeTools, setActiveTools] = useState([]);
    const [discoveredClues, setDiscoveredClues] = useState([]);
    const [showSolution, setShowSolution] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [currentGuide, setCurrentGuide] = useState(0);
    const [showGuide, setShowGuide] = useState(true);
    const [completedGuides, setCompletedGuides] = useState(new Set());

    const handleEvidenceClick = (evidence) => {
        handleGuideTrigger('evidence-clicked');
        setSelectedEvidence(evidence);
        // Discover new clues based on active tools
        if (activeTools.includes('analyze') && evidence.type === 'image') {
            setDiscoveredClues(prev => [...new Set([...prev, ...evidence.clues])]);
        }
    };

    const handleToolClick = (tool) => {
        handleGuideTrigger('tool-used');
        setActiveTools(prev =>
            prev.includes(tool)
                ? prev.filter(t => t !== tool)
                : [...prev, tool]
        );
    };

    const handleSubmitHypothesis = (e) => {
        e.preventDefault();
        const isCorrect = hypothesis.toLowerCase().includes(currentCase.solution.pattern);
        setSolved(isCorrect);
        setShowSolution(true);
    };

    const handleNextCase = () => {
        const nextCase = cases[cases.findIndex(c => c.id === currentCase.id) + 1];
        if (nextCase) {
            setCurrentCase(nextCase);
            resetInvestigation();
        }
    };

    const resetInvestigation = () => {
        setSelectedEvidence(null);
        setNotes('');
        setHypothesis('');
        setSolved(false);
        setShowSolution(false);
        setDiscoveredClues([]);
    };

    // Add tutorial navigation
    const handleNextStep = () => {
        if (tutorialStep < tutorialSteps.length - 1) {
            setTutorialStep(prev => prev + 1);
        } else {
            setShowTutorial(false);
        }
    };

    const handlePrevStep = () => {
        if (tutorialStep > 0) {
            setTutorialStep(prev => prev - 1);
        }
    };

    // Add guide handling
    const handleGuideProgress = () => {
        if (currentGuide < investigationGuides.length - 1) {
            setCurrentGuide(prev => prev + 1);
        } else {
            setShowGuide(false);
        }
        setCompletedGuides(prev => new Set([...prev, investigationGuides[currentGuide].id]));
    };

    // Add guide trigger handling
    const handleGuideTrigger = (trigger) => {
        const guide = investigationGuides.find(g => g.trigger === trigger);
        if (guide && !completedGuides.has(guide.id)) {
            setCurrentGuide(investigationGuides.indexOf(guide));
            setShowGuide(true);
        }
    };

    // Add tutorial render function
    const renderTutorial = () => (
        <TutorialOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <TutorialContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {!selectedDifficulty ? (
                    <>
                        <h2>Select Your Difficulty Level</h2>
                        <DifficultySelect>
                            {difficultyLevels.map(level => (
                                <DifficultyCard
                                    key={level.id}
                                    onClick={() => setSelectedDifficulty(level)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <h3>{level.icon} {level.title}</h3>
                                    <p>{level.description}</p>
                                    <ul className="features">
                                        {level.features.map((feature, index) => (
                                            <li key={index}>✓ {feature}</li>
                                        ))}
                                    </ul>
                                </DifficultyCard>
                            ))}
                        </DifficultySelect>
                    </>
                ) : (
                    <TutorialStep
                        key={tutorialStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2>{tutorialSteps[tutorialStep].title}</h2>
                        <p>{tutorialSteps[tutorialStep].content}</p>

                        <div className="image-preview">
                            <img
                                src={tutorialSteps[tutorialStep].image}
                                alt="Tutorial example"
                            />
                        </div>

                        {tutorialSteps[tutorialStep].tools && (
                            <div className="tools-preview">
                                {tutorialSteps[tutorialStep].tools.map((tool, index) => (
                                    <Tool
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {tool}
                                    </Tool>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                            {tutorialStep > 0 && (
                                <Button onClick={handlePrevStep}>
                                    ← Previous
                                </Button>
                            )}
                            <Button onClick={handleNextStep}>
                                {tutorialStep === tutorialSteps.length - 1 ? 'Start Investigation' : 'Next →'}
                            </Button>
                        </div>
                    </TutorialStep>
                )}
            </TutorialContent>
        </TutorialOverlay>
    );

    // Add guide rendering
    const renderGuide = () => (
        <AnimatePresence>
            {showGuide && (
                <GuidePopup
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <h4>
                        {investigationGuides[currentGuide].icon}
                        {investigationGuides[currentGuide].title}
                    </h4>
                    <div className="tip-content">
                        {investigationGuides[currentGuide].content}
                    </div>
                    <div className="progress">
                        {investigationGuides.map((_, index) => (
                            <div
                                key={index}
                                className="dot"
                                style={{
                                    background: index === currentGuide ? '#4ECDC4' : '#eee'
                                }}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleGuideProgress}
                        style={{ width: '100%', marginTop: '1rem' }}
                    >
                        {currentGuide === investigationGuides.length - 1 ?
                            "Got it!" : "Next Tip"}
                    </Button>
                </GuidePopup>
            )}
        </AnimatePresence>
    );

    return (
        <GameContainer>
            <AnimatePresence>
                {showTutorial && renderTutorial()}
            </AnimatePresence>

            <CaseHeader backgroundImage={currentCase.evidence[0].url}>
                <div className="content">
                    <div className="category">{currentCase.category}</div>
                    <h2>{currentCase.title}</h2>
                    <p>{currentCase.description}</p>
                    <div className="difficulty">
                        {currentCase.difficulty === 'beginner' ? '🔰' :
                            currentCase.difficulty === 'intermediate' ? '🏛️' : '🎓'}
                        {currentCase.difficulty}
                    </div>
                </div>
            </CaseHeader>

            <CaseArea>
                <EvidenceBoard>
                    {currentCase.evidence.map(evidence => (
                        <Evidence
                            key={evidence.id}
                            onClick={() => handleEvidenceClick(evidence)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {evidence.type === 'image' ? (
                                <img src={evidence.url} alt={evidence.description} />
                            ) : (
                                <p>{evidence.content}</p>
                            )}
                            <p>{evidence.description}</p>
                        </Evidence>
                    ))}
                </EvidenceBoard>

                <CaseFile>
                    <h3>{currentCase.title}</h3>
                    <p>{currentCase.description}</p>

                    <ToolBar>
                        <Tool
                            active={activeTools.includes('analyze')}
                            onClick={() => handleToolClick('analyze')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🔍 Analyze
                        </Tool>
                        <Tool
                            active={activeTools.includes('measure')}
                            onClick={() => handleToolClick('measure')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📏 Measure
                        </Tool>
                    </ToolBar>

                    {discoveredClues.length > 0 && (
                        <div>
                            <h4>Discovered Clues:</h4>
                            {discoveredClues.map((clue, index) => (
                                <ClueTag
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    {clue}
                                </ClueTag>
                            ))}
                        </div>
                    )}

                    <NotesArea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Take notes about your investigation..."
                    />

                    <HypothesisForm onSubmit={handleSubmitHypothesis}>
                        <h4>Submit Your Hypothesis</h4>
                        <input
                            type="text"
                            value={hypothesis}
                            onChange={(e) => setHypothesis(e.target.value)}
                            placeholder="What's your theory?"
                            required
                        />
                        <Tool
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit Theory
                        </Tool>
                    </HypothesisForm>
                </CaseFile>
            </CaseArea>

            <AnimatePresence>
                {showSolution && (
                    <SolutionPanel
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <h3>{solved ? '🎉 Case Solved!' : '❌ Not Quite Right'}</h3>
                        <p>{currentCase.solution.explanation}</p>
                        <Tool
                            onClick={solved ? handleNextCase : () => setShowSolution(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {solved ? 'Next Case' : 'Try Again'}
                        </Tool>
                    </SolutionPanel>
                )}
            </AnimatePresence>
            {renderGuide()}
        </GameContainer>
    );
}

export default PetroglyphDetective; 