import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const AnalysisArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin: 2rem 0;
`;

const ArtifactViewer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const AnalysisTools = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Tool = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${props => props.active ? '#4ECDC4' : '#eee'};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MeasurementOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
`;

const ArtifactImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  position: relative;
`;

const FeatureMarker = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  background: rgba(78, 205, 196, 0.3);
  border: 2px solid #4ECDC4;
  border-radius: 50%;
  cursor: pointer;
`;

const MagnifierLens = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border: 3px solid #4ECDC4;
  border-radius: 50%;
  background: white;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const FindingsPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

const Finding = styled(motion.div)`
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const NotificationContainer = styled(motion.div)`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

const Notification = styled(motion.div)`
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
        font-size: 1.5rem;
    }

    .content {
        h4 {
            margin: 0;
            color: #4ECDC4;
        }

        p {
            margin: 0.25rem 0 0 0;
            font-size: 0.9rem;
            color: #666;
        }
    }
`;

const ExpertModeToggle = styled(motion.button)`
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 0.75rem 1.5rem;
    background: ${props => props.active ? '#4ECDC4' : '#eee'};
    color: ${props => props.active ? 'white' : '#666'};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    z-index: 100;
`;

const ScoreDisplay = styled(motion.div)`
    position: fixed;
    top: 20px;
    right: 200px;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    z-index: 100;

    .score-item {
        text-align: center;
        
        h4 {
            color: #666;
            margin: 0;
            font-size: 0.9rem;
        }
        
        p {
            color: #4ECDC4;
            margin: 0;
            font-size: 1.2rem;
            font-weight: bold;
        }
    }
`;

const LeaderboardPanel = styled(motion.div)`
    position: fixed;
    right: -300px;
    top: 100px;
    width: 300px;
    background: white;
    padding: 1.5rem;
    border-radius: 12px 0 0 12px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 90;
`;

const LeaderboardToggle = styled(motion.button)`
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
    background: #4ECDC4;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    writing-mode: vertical-rl;
    text-orientation: mixed;
`;

const LeaderboardEntry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    
    &:last-child {
        border-bottom: none;
    }

    .rank {
        font-weight: bold;
        color: #4ECDC4;
    }

    .score {
        color: #666;
    }
`;

const AchievementBadge = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: ${props => props.unlocked ? 'linear-gradient(45deg, #4ECDC4, #45b8b0)' : '#eee'};
    color: ${props => props.unlocked ? 'white' : '#666'};
    border-radius: 20px;
    margin: 0.25rem;
    font-size: 0.9rem;

    .icon {
        font-size: 1.2rem;
    }
`;

const artifacts = [
    {
        id: 1,
        name: "Hunter Scene Panel",
        image: petroglyph1,
        dimensions: { width: 120, height: 80 },
        features: [
            { type: "tool_mark", x: 30, y: 40, description: "Pecking marks visible" },
            { type: "weathering", x: 60, y: 50, description: "Natural erosion pattern" },
            { type: "paint", x: 45, y: 35, description: "Traces of red ochre pigment" }
        ],
        analysis: {
            technique: "Pecking and abrading with pigment application",
            period: "Early Bronze Age",
            condition: "Well preserved with some pigment remains",
            significance: "Rare example of combined techniques"
        }
    },
    {
        id: 2,
        name: "Ceremonial Dance Scene",
        image: petroglyph2,
        dimensions: { width: 200, height: 150 },
        features: [
            { type: "tool_mark", x: 25, y: 45, description: "Fine incision lines" },
            { type: "damage", x: 70, y: 30, description: "Recent vandalism marks" },
            { type: "style", x: 50, y: 50, description: "Distinctive local artistic style" }
        ],
        analysis: {
            technique: "Fine line incision",
            period: "Middle Bronze Age",
            condition: "Partially damaged",
            significance: "Important ritual documentation"
        }
    },
    {
        id: 3,
        name: "Animal Migration Panel",
        image: petroglyph3,
        dimensions: { width: 180, height: 120 },
        features: [
            { type: "superimposition", x: 40, y: 60, description: "Multiple layers visible" },
            { type: "weathering", x: 20, y: 40, description: "Desert varnish formation" },
            { type: "technique", x: 55, y: 45, description: "Deep percussion marks" }
        ],
        analysis: {
            technique: "Deep percussion with multiple phases",
            period: "Late Bronze Age",
            condition: "Good preservation with patina",
            significance: "Shows chronological sequence"
        }
    }
];

const tools = [
    {
        id: "measure",
        name: "Measurement Tool",
        icon: "📏",
        description: "Measure dimensions and distances",
        cursor: "crosshair"
    },
    {
        id: "magnify",
        name: "Digital Microscope",
        icon: "🔍",
        description: "Examine surface details and tool marks",
        cursor: "zoom-in"
    },
    {
        id: "photo",
        name: "RTI Camera",
        icon: "📸",
        description: "Capture surface details under different lighting",
        cursor: "cell"
    },
    {
        id: "colorPicker",
        name: "Color Analysis",
        icon: "🎨",
        description: "Analyze pigments and surface colors",
        cursor: "pointer"
    },
    {
        id: "3dScan",
        name: "3D Scanner",
        icon: "📊",
        description: "Create detailed 3D surface model",
        cursor: "crosshair"
    }
];

const analysisCategories = [
    {
        id: "technique",
        name: "Creation Technique",
        requiredFindings: 3,
        points: 100
    },
    {
        id: "preservation",
        name: "Preservation State",
        requiredFindings: 2,
        points: 75
    },
    {
        id: "dating",
        name: "Dating Evidence",
        requiredFindings: 2,
        points: 150
    },
    {
        id: "cultural",
        name: "Cultural Context",
        requiredFindings: 3,
        points: 125
    }
];

const analyzeSurfaceDetails = (coordinates) => {
    const surfaceFeatures = [
        {
            type: "pecking",
            description: "Deep circular marks indicating stone tool percussion",
            confidence: 0.9
        },
        {
            type: "incision",
            description: "Fine linear marks suggesting metal tool use",
            confidence: 0.8
        },
        {
            type: "abrasion",
            description: "Smoothed surface from repeated rubbing",
            confidence: 0.85
        },
        {
            type: "weathering",
            description: "Natural erosion patterns visible",
            confidence: 0.75
        }
    ];

    // Simulate analysis based on coordinates
    const randomIndex = Math.floor(Math.random() * surfaceFeatures.length);
    return surfaceFeatures[randomIndex];
};

const generateDepthMap = (coordinates) => {
    return {
        maxDepth: (Math.random() * 5 + 1).toFixed(2),
        surfaceVariation: (Math.random() * 2 + 0.5).toFixed(2),
        toolMarks: Math.random() > 0.5,
        profile: {
            type: Math.random() > 0.5 ? "V-shaped" : "U-shaped",
            width: (Math.random() * 10 + 5).toFixed(2),
            consistency: (Math.random() * 100).toFixed(0) + "%"
        }
    };
};

const analyzeSpectrum = (coordinates) => {
    // Simulated color/pigment analysis
    const pigments = [
        { color: "Red Ochre", composition: "Iron oxide", age: "Prehistoric" },
        { color: "Black", composition: "Manganese oxide", age: "Early Bronze Age" },
        { color: "White", composition: "Calcium carbonate", age: "Middle Bronze Age" },
        { color: "Yellow Ochre", composition: "Hydrated iron oxide", age: "Late Bronze Age" }
    ];
    return pigments[Math.floor(Math.random() * pigments.length)];
};

const tutorialSteps = [
    {
        id: 1,
        title: "Welcome to Artifact Analysis",
        content: "Learn to analyze petroglyphs using professional tools and techniques.",
        target: null
    },
    {
        id: 2,
        title: "Digital Microscope",
        content: "Use this tool to examine surface details and tool marks.",
        target: "magnify"
    },
    {
        id: 3,
        title: "RTI Camera",
        content: "Capture surface details under different lighting conditions.",
        target: "photo"
    },
    {
        id: 4,
        title: "3D Scanner",
        content: "Create detailed surface models to analyze carving techniques.",
        target: "3dScan"
    }
];

const TutorialOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const TutorialCard = styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;

    h3 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    p {
        color: #666;
        margin-bottom: 1.5rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        background: #4ECDC4;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
    }
`;

const expertModeFeatures = {
    timeLimit: 300, // 5 minutes
    requiredFindings: 10,
    minAccuracy: 0.8,
    bonusPoints: {
        quickCompletion: 200,
        highAccuracy: 150,
        comprehensiveAnalysis: 250
    }
};

const expertAchievements = [
    {
        id: 'speed_demon',
        icon: '⚡',
        title: 'Speed Demon',
        description: 'Complete analysis in under 2 minutes',
        condition: (stats) => stats.timeRemaining > 180
    },
    {
        id: 'perfect_eye',
        icon: '👁️',
        title: 'Perfect Eye',
        description: 'Achieve 100% accuracy',
        condition: (stats) => stats.accuracy === 1
    },
    {
        id: 'master_analyst',
        icon: '🎓',
        title: 'Master Analyst',
        description: 'Complete all analysis categories',
        condition: (stats) => stats.completedCategories.length === analysisCategories.length
    }
];

function ArtifactAnalysis() {
    const [currentArtifact, setCurrentArtifact] = useState(artifacts[0]);
    const [activeTool, setActiveTool] = useState(null);
    const [measurements, setMeasurements] = useState([]);
    const [findings, setFindings] = useState([]);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [measureStart, setMeasureStart] = useState(null);
    const [measureEnd, setMeasureEnd] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [analysisProgress, setAnalysisProgress] = useState({});
    const [toolData, setToolData] = useState({});
    const [showTutorial, setShowTutorial] = useState(true);
    const [analysisScore, setAnalysisScore] = useState(0);
    const [discoveredFeatures, setDiscoveredFeatures] = useState([]);
    const [completedCategories, setCompletedCategories] = useState([]);
    const [showFeatureHighlight, setShowFeatureHighlight] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [expertMode, setExpertMode] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [accuracy, setAccuracy] = useState(1);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    const handleToolSelect = (toolId) => {
        setActiveTool(toolId === activeTool ? null : toolId);
        setMeasureStart(null);
        setMeasureEnd(null);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const coords = { x, y };

        switch (activeTool) {
            case 'measure':
                handleMeasurement(coords);
                break;
            case 'magnify':
                handleMagnification(coords);
                break;
            case '3dScan':
                handle3DScan(coords);
                break;
            case 'colorPicker':
                handleColorAnalysis(coords);
                break;
            default:
                checkFeatureDiscovery(coords);
        }
    };

    const handleMeasurement = (coords) => {
        if (!measureStart) {
            setMeasureStart(coords);
        } else {
            setMeasureEnd(coords);
            const distance = calculateDistance(measureStart, coords);
            addFinding({
                type: 'measurement',
                value: `${distance.toFixed(1)} cm`,
                coordinates: [measureStart, coords]
            });
            setMeasureStart(null);
        }
    };

    const handleMagnification = (coords) => {
        const surfaceDetails = analyzeSurfaceDetails(coords);
        addFinding({
            type: 'surface_analysis',
            details: surfaceDetails,
            coordinates: coords
        });
    };

    const handle3DScan = (coords) => {
        const depthData = generateDepthMap(coords);
        addFinding({
            type: '3d_scan',
            data: depthData,
            coordinates: coords
        });
    };

    const handleColorAnalysis = (coords) => {
        const colorData = analyzeSpectrum(coords);
        addFinding({
            type: 'color_analysis',
            data: colorData,
            coordinates: coords
        });
    };

    const addFinding = (finding) => {
        setFindings(prev => [...prev, {
            id: Date.now(),
            ...finding,
            timestamp: new Date().toISOString()
        }]);
        updateScore(finding);
        checkAchievements();
    };

    const updateScore = (finding) => {
        const scoreMap = {
            measurement: 50,
            surface_analysis: 75,
            '3d_scan': 100,
            color_analysis: 75,
            feature_discovery: 150
        };
        setAnalysisScore(prev => prev + (scoreMap[finding.type] || 0));
    };

    const checkFeatureDiscovery = (coords) => {
        const feature = findNearbyFeature(coords);
        if (feature && !discoveredFeatures.includes(feature.type)) {
            handleFeatureDiscovery(feature);
        }
    };

    const findNearbyFeature = (coords) => {
        const threshold = 10; // % of image size
        return currentArtifact.features.find(feature => {
            const distance = Math.sqrt(
                Math.pow(feature.x - coords.x, 2) +
                Math.pow(feature.y - coords.y, 2)
            );
            return distance < threshold;
        });
    };

    useEffect(() => {
        if (discoveredFeatures.length >= currentArtifact.features.length) {
            setAnalysisComplete(true);
        }
    }, [discoveredFeatures]);

    useEffect(() => {
        if (expertMode) {
            checkAchievements();
        }
    }, [analysisScore, completedCategories, accuracy]);

    const calculateDistance = (start, end) => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        return Math.sqrt(dx * dx + dy * dy) * currentArtifact.dimensions.width / 100;
    };

    const checkCompletion = () => {
        const requiredFindings = 5;
        if (findings.length >= requiredFindings && !analysisComplete) {
            setAnalysisComplete(true);
        }
    };

    useEffect(() => {
        checkCompletion();
    }, [findings]);

    const handleToolAction = (tool, coordinates) => {
        switch (tool) {
            case 'magnify':
                handleMagnification(coordinates);
                break;
            case '3dScan':
                handle3DScan(coordinates);
                break;
            case 'colorPicker':
                handleColorAnalysis(coordinates);
                break;
            default:
                break;
        }
    };

    const handleFeatureDiscovery = (feature) => {
        if (!discoveredFeatures.includes(feature.type)) {
            setDiscoveredFeatures([...discoveredFeatures, feature.type]);
            setAnalysisScore(prev => prev + 50);
            checkCategoryCompletion(feature.type);
        }
    };

    const checkCategoryCompletion = (featureType) => {
        const categoryMap = {
            tool_mark: "technique",
            weathering: "preservation",
            paint: "dating",
            style: "cultural",
            superimposition: "dating"
        };

        const category = categoryMap[featureType];
        if (category) {
            const categoryData = analysisCategories.find(c => c.id === category);
            const categoryFindings = discoveredFeatures.filter(f => categoryMap[f] === category);

            if (categoryFindings.length >= categoryData.requiredFindings) {
                if (!completedCategories.includes(category)) {
                    setCompletedCategories([...completedCategories, category]);
                    setAnalysisScore(prev => prev + categoryData.points);
                    showCategoryCompletion(category);
                }
            }
        }
    };

    const showCategoryCompletion = (category) => {
        // Add completion notification
        const notification = {
            id: Date.now(),
            type: 'achievement',
            category,
            points: analysisCategories.find(c => c.id === category).points
        };
        setNotifications(prev => [...prev, notification]);
    };

    const renderAnalysisResults = () => {
        if (!toolData.scanData && !toolData.colorData) return null;

        return (
            <AnalysisResults>
                {toolData.scanData && (
                    <ResultSection>
                        <h4>3D Scan Results</h4>
                        <p>Maximum Depth: {toolData.scanData.maxDepth}mm</p>
                        <p>Surface Variation: {toolData.scanData.surfaceVariation}mm</p>
                        <p>Tool Marks: {toolData.scanData.toolMarks ? 'Detected' : 'None detected'}</p>
                    </ResultSection>
                )}
                {toolData.colorData && (
                    <ResultSection>
                        <h4>Pigment Analysis</h4>
                        <p>Color: {toolData.colorData.spectrum.color}</p>
                        <p>Composition: {toolData.colorData.spectrum.composition}</p>
                        <p>Estimated Age: {toolData.colorData.spectrum.age}</p>
                    </ResultSection>
                )}
            </AnalysisResults>
        );
    };

    const AnalysisResults = styled.div`
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    `;

    const ResultSection = styled.div`
        margin-bottom: 1rem;
        
        h4 {
            color: #4ECDC4;
            margin-bottom: 0.5rem;
        }

        p {
            margin: 0.25rem 0;
            font-size: 0.9rem;
            color: #666;
        }
    `;

    const renderNotifications = () => (
        <NotificationContainer>
            <AnimatePresence>
                {notifications.map(notification => (
                    <Notification
                        key={notification.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        onAnimationComplete={() => {
                            setTimeout(() => {
                                setNotifications(prev =>
                                    prev.filter(n => n.id !== notification.id)
                                );
                            }, 3000);
                        }}
                    >
                        <div className="icon">
                            {notification.type === 'achievement' ? '🏆' : 'ℹ️'}
                        </div>
                        <div className="content">
                            <h4>
                                {notification.type === 'achievement'
                                    ? 'Category Complete!'
                                    : 'New Finding'}
                            </h4>
                            <p>
                                {notification.type === 'achievement'
                                    ? `${notification.category} +${notification.points} points`
                                    : notification.message}
                            </p>
                        </div>
                    </Notification>
                ))}
            </AnimatePresence>
        </NotificationContainer>
    );

    const handleTutorialNext = () => {
        if (tutorialStep < tutorialSteps.length - 1) {
            setTutorialStep(tutorialStep + 1);
        } else {
            setShowTutorial(false);
        }
    };

    const renderTutorial = () => (
        <AnimatePresence>
            {showTutorial && (
                <TutorialOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <TutorialCard
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                    >
                        <h3>{tutorialSteps[tutorialStep].title}</h3>
                        <p>{tutorialSteps[tutorialStep].content}</p>
                        <button onClick={handleTutorialNext}>
                            {tutorialStep < tutorialSteps.length - 1 ? 'Next' : 'Start Analysis'}
                        </button>
                    </TutorialCard>
                </TutorialOverlay>
            )}
        </AnimatePresence>
    );

    const toggleExpertMode = () => {
        if (!expertMode) {
            setTimeRemaining(expertModeFeatures.timeLimit);
            setAnalysisScore(0);
            setDiscoveredFeatures([]);
            setCompletedCategories([]);
        }
        setExpertMode(!expertMode);
    };

    useEffect(() => {
        let timer;
        if (expertMode && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [expertMode, timeRemaining]);

    const handleTimeUp = () => {
        if (expertMode) {
            const totalFindings = discoveredFeatures.length;
            const accuracyScore = (1 - (incorrectAttempts / totalFindings));

            let bonusPoints = 0;
            if (timeRemaining > expertModeFeatures.timeLimit / 2) {
                bonusPoints += expertModeFeatures.bonusPoints.quickCompletion;
            }
            if (accuracyScore >= expertModeFeatures.minAccuracy) {
                bonusPoints += expertModeFeatures.bonusPoints.highAccuracy;
            }
            if (completedCategories.length === analysisCategories.length) {
                bonusPoints += expertModeFeatures.bonusPoints.comprehensiveAnalysis;
            }

            setAnalysisScore(prev => prev + bonusPoints);
            setAnalysisComplete(true);
        }
    };

    const renderScoreDisplay = () => (
        <ScoreDisplay>
            <div className="score-item">
                <h4>Score</h4>
                <p>{analysisScore}</p>
            </div>
            {expertMode && (
                <>
                    <div className="score-item">
                        <h4>Time</h4>
                        <p>{timeRemaining}s</p>
                    </div>
                    <div className="score-item">
                        <h4>Accuracy</h4>
                        <p>{(accuracy * 100).toFixed(0)}%</p>
                    </div>
                </>
            )}
        </ScoreDisplay>
    );

    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
        if (!showLeaderboard) {
            fetchLeaderboard();
        }
    };

    const fetchLeaderboard = () => {
        // Simulated leaderboard data
        const mockLeaderboard = [
            { name: "Expert1", score: 1200 },
            { name: "Analyst2", score: 1050 },
            { name: "Pro3", score: 950 },
            { name: "Scholar4", score: 800 },
            { name: "Novice5", score: 600 }
        ];
        setLeaderboardData(mockLeaderboard);
    };

    const checkAchievements = () => {
        const stats = {
            timeRemaining,
            accuracy,
            completedCategories,
            score: analysisScore
        };

        expertAchievements.forEach(achievement => {
            if (achievement.condition(stats) && !unlockedAchievements.includes(achievement.id)) {
                setUnlockedAchievements(prev => [...prev, achievement.id]);
                setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'achievement',
                    title: achievement.title,
                    description: achievement.description,
                    icon: achievement.icon
                }]);
            }
        });
    };

    const renderLeaderboard = () => (
        <LeaderboardPanel
            animate={{ right: showLeaderboard ? 0 : -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <LeaderboardToggle onClick={toggleLeaderboard}>
                Leaderboard
            </LeaderboardToggle>
            <h3>Top Analysts</h3>
            {leaderboardData.map((entry, index) => (
                <LeaderboardEntry key={index}>
                    <span className="rank">#{index + 1}</span>
                    <span>{entry.name}</span>
                    <span className="score">{entry.score}</span>
                </LeaderboardEntry>
            ))}
        </LeaderboardPanel>
    );

    const renderAchievements = () => (
        <div style={{ marginTop: '1rem' }}>
            <h3>Achievements</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {expertAchievements.map(achievement => (
                    <AchievementBadge
                        key={achievement.id}
                        unlocked={unlockedAchievements.includes(achievement.id)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="icon">{achievement.icon}</span>
                        {achievement.title}
                    </AchievementBadge>
                ))}
            </div>
        </div>
    );

    return (
        <GameContainer>
            <ExpertModeToggle
                active={expertMode}
                onClick={toggleExpertMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {expertMode ? '🎯 Expert Mode' : '🎮 Normal Mode'}
            </ExpertModeToggle>
            {renderScoreDisplay()}
            <h2>Artifact Analysis</h2>
            <p>Learn professional techniques for analyzing and documenting petroglyphs</p>

            <AnalysisArea>
                <div>
                    <ArtifactViewer>
                        <ArtifactImage
                            image={currentArtifact.image}
                            onMouseMove={handleMouseMove}
                            onClick={handleClick}
                        >
                            {currentArtifact.features.map(feature => (
                                <FeatureMarker
                                    key={feature.type}
                                    style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}

                            {activeTool === 'magnify' && (
                                <MagnifierLens
                                    style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
                                >
                                    Examining surface details...
                                </MagnifierLens>
                            )}

                            {measureStart && (
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        left: `${measureStart.x}%`,
                                        top: `${measureStart.y}%`,
                                        width: '10px',
                                        height: '10px',
                                        background: '#4ECDC4',
                                        borderRadius: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            )}
                        </ArtifactImage>
                    </ArtifactViewer>

                    <FindingsPanel>
                        <h3>Analysis Findings</h3>
                        <AnimatePresence>
                            {findings.map(finding => (
                                <Finding
                                    key={finding.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    {finding.type === 'measurement' ? '📏' : '📸'} {finding.description}
                                    {finding.value && `: ${finding.value}`}
                                </Finding>
                            ))}
                        </AnimatePresence>
                    </FindingsPanel>
                </div>

                <AnalysisTools>
                    {tools.map(tool => (
                        <Tool
                            key={tool.id}
                            active={activeTool === tool.id}
                            onClick={() => handleToolSelect(tool.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>{tool.icon}</span>
                            <div>
                                <strong>{tool.name}</strong>
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>{tool.description}</p>
                            </div>
                        </Tool>
                    ))}
                </AnalysisTools>
            </AnalysisArea>

            <AnimatePresence>
                {analysisComplete && (
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
                        <h2>Analysis Complete! 🎉</h2>
                        <p>You've successfully documented this artifact.</p>
                        <button onClick={() => window.location.reload()}>
                            Analyze Another Artifact
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {renderTutorial()}
            {renderNotifications()}
            {expertMode && renderAchievements()}
            {renderLeaderboard()}
        </GameContainer>
    );
}

export default ArtifactAnalysis; 