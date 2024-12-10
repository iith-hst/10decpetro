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
    padding: 2rem;
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

const ImageDisplay = styled.div`
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PetroglyphImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: contain;
    background: #f5f5f5;
`;

const CategoryButtons = styled.div`
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
`;

const Button = styled(motion.button)`
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.selected ? '#4ECDC4' : '#f8f9fa'};
    color: ${props => props.selected ? 'white' : 'inherit'};
    cursor: pointer;
    text-align: left;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        background: ${props => props.selected ? '#45b8b0' : '#f1f2f3'};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
`;

const ScorePanel = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Update petroglyphData to use our actual images
const petroglyphData = [
    {
        id: 1,
        image: petroglyph1,
        category: 'animals',
        description: 'Large animal figure with detailed features',
        location: 'Site A',
        details: 'Shows clear anatomical details and natural pose'
    },
    {
        id: 2,
        image: petroglyph2,
        category: 'human',
        description: 'Human figures in dynamic poses',
        location: 'Site B',
        details: 'Depicts human activities and social interactions'
    },
    {
        id: 3,
        image: petroglyph3,
        category: 'geometric',
        description: 'Complex geometric patterns',
        location: 'Site C',
        details: 'Features repeating motifs and symmetrical designs'
    },
    {
        id: 4,
        image: petroglyph4,
        category: 'animals',
        description: 'Multiple animal figures in a scene',
        location: 'Site D',
        details: 'Shows interaction between different species'
    },
    {
        id: 5,
        image: petroglyph5,
        category: 'human',
        description: 'Ceremonial human figures',
        location: 'Site E',
        details: 'Suggests ritual or ceremonial activities'
    }
];

const categories = [
    {
        id: 'animals',
        label: 'Animal Figures',
        description: 'Depictions of wildlife and domesticated animals'
    },
    {
        id: 'human',
        label: 'Human Figures',
        description: 'Human forms and activities'
    },
    {
        id: 'geometric',
        label: 'Geometric Patterns',
        description: 'Abstract and geometric designs'
    }
];

// Update difficultyLevels with clearer requirements
const difficultyLevels = [
    {
        id: 'beginner',
        label: 'Beginner',
        description: 'Basic categorization of petroglyphs',
        requiredScore: 3,  // Need at least 3 correct answers
        totalChallenges: 5  // Need to complete 5 challenges total
    },
    {
        id: 'intermediate',
        label: 'Intermediate',
        description: 'Detailed analysis and subcategories',
        requiredScore: 5,  // Need at least 5 correct answers
        totalChallenges: 8  // Need to complete 8 challenges total
    },
    {
        id: 'expert',
        label: 'Expert',
        description: 'Complex interpretation and cultural context',
        requiredScore: 7,  // Need at least 7 correct answers
        totalChallenges: 10  // Need to complete 10 challenges total
    }
];

// Expand categories with subcategories and detailed criteria
const expandedCategories = {
    beginner: [
        {
            id: 'animals',
            label: 'Animal Figures',
            description: 'Depictions of wildlife and domesticated animals'
        },
        {
            id: 'human',
            label: 'Human Figures',
            description: 'Human forms and activities'
        },
        {
            id: 'geometric',
            label: 'Geometric Patterns',
            description: 'Abstract and geometric designs'
        }
    ],
    intermediate: [
        {
            id: 'hunting_scenes',
            label: 'Hunting Scenes',
            description: 'Complex scenes showing hunting activities'
        },
        {
            id: 'ceremonial',
            label: 'Ceremonial Depictions',
            description: 'Ritual and spiritual practices'
        },
        {
            id: 'daily_life',
            label: 'Daily Life',
            description: 'Everyday activities and social scenes'
        },
        {
            id: 'astronomical',
            label: 'Astronomical Symbols',
            description: 'Celestial bodies and events'
        }
    ],
    expert: [
        {
            id: 'cultural_significance',
            label: 'Cultural Analysis',
            description: 'Interpret cultural meaning and context'
        },
        {
            id: 'chronological',
            label: 'Chronological Period',
            description: 'Determine the historical period'
        },
        {
            id: 'technique_analysis',
            label: 'Technical Analysis',
            description: 'Analyze creation techniques and tools'
        }
    ]
};

// Add more complex petroglyph data
const advancedPetroglyphData = [
    // ... existing data ...
    {
        id: 6,
        image: petroglyph1,
        category: 'hunting_scenes',
        period: 'Late Prehistoric',
        technique: 'Deep pecking',
        culturalContext: 'Hunter-gatherer society',
        description: 'Complex hunting scene with multiple figures',
        details: 'Shows advanced hunting techniques and group coordination',
        questions: [
            {
                text: 'What hunting methods are depicted in this scene?',
                options: [
                    'Individual pursuit',
                    'Group coordination',
                    'Trap setting',
                    'Ambush tactics'
                ],
                correct: 1,
                explanation: 'The scene shows multiple figures coordinating in a group hunt'
            },
            {
                text: 'What can this tell us about the society?',
                options: [
                    'Solitary lifestyle',
                    'Organized social structure',
                    'Agricultural focus',
                    'Nomadic patterns'
                ],
                correct: 1,
                explanation: 'The coordinated hunting suggests an organized social structure'
            }
        ]
    },
    // Add more complex examples...
];

// Add new styled components
const QuestionModal = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 600px;
    z-index: 1000;
`;

const ComparisonView = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;
`;

const Timer = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: ${props => props.timeLeft < 10 ? '#FF6B6B' : '#4ECDC4'};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    transition: background 0.3s;
`;

// Add expert-level questions
const expertQuestions = [
    {
        type: 'comparison',
        text: 'Compare these two petroglyphs and analyze their cultural significance:',
        images: [petroglyph1, petroglyph2],
        options: [
            'Different time periods, similar cultural practices',
            'Same period, different cultural meanings',
            'Evolution of artistic techniques',
            'Regional variations of same ritual'
        ],
        correct: 1,
        explanation: 'The petroglyphs show similar themes but different execution styles, suggesting regional variations of the same cultural practices.'
    },
    {
        type: 'technique',
        text: 'Analyze the carving technique used in this petroglyph:',
        options: [
            'Shallow pecking with stone tools',
            'Deep incision with metal tools',
            'Natural weathering enhanced by artists',
            'Multiple technique combination'
        ],
        correct: 3,
        explanation: 'The varying depths and patterns suggest multiple techniques were used, showing sophisticated artistic methods.'
    },
    {
        type: 'interpretation',
        text: 'What does the spatial arrangement of figures suggest about social hierarchy?',
        options: [
            'Egalitarian structure',
            'Hierarchical organization',
            'Familial relationships',
            'Seasonal activities'
        ],
        correct: 1,
        explanation: 'The central figure\'s size and position relative to others indicates a hierarchical social structure.'
    }
];

// Add time challenge levels
const timeChallengeLevels = [
    {
        id: 'quick',
        timeLimit: 30,
        pointMultiplier: 2,
        description: 'Quick Classification: 30 seconds per image'
    },
    {
        id: 'speed',
        timeLimit: 15,
        pointMultiplier: 3,
        description: 'Speed Challenge: 15 seconds per image'
    },
    {
        id: 'expert',
        timeLimit: 45,
        pointMultiplier: 2.5,
        description: 'Expert Analysis: 45 seconds for detailed analysis'
    }
];

// Add achievement system
const achievements = [
    {
        id: 'beginner_master',
        title: '👶 Beginner Master',
        description: 'Complete beginner level with 90% accuracy',
        condition: (score, attempts, level) =>
            level === 'beginner' && (score / attempts) >= 0.9
    },
    {
        id: 'speed_demon',
        title: '⚡ Speed Demon',
        description: 'Complete a time challenge with perfect score',
        condition: (score, attempts, level, timeChallenge) =>
            timeChallenge && score === attempts
    },
    {
        id: 'streak_master',
        title: '🔥 Streak Master',
        description: 'Achieve a 5x streak',
        condition: (score, attempts, level, timeChallenge, streak) =>
            streak >= 5
    },
    {
        id: 'expert_analyst',
        title: '🎓 Expert Analyst',
        description: 'Answer 3 expert questions correctly in a row',
        condition: (score, attempts, level, timeChallenge, streak, expertStreak) =>
            expertStreak >= 3
    }
];

// Add learning resources
const learningResources = {
    beginner: [
        {
            title: 'Introduction to Rock Art',
            type: 'article',
            content: 'Learn the basics of petroglyphs, pictographs, and other forms of rock art. Understand the difference between natural and human-made marks.',
            link: '#',
            imageExample: petroglyph1
        },
        {
            title: 'Common Petroglyph Motifs',
            type: 'interactive',
            content: 'Explore the most common types of figures and symbols found in rock art worldwide.',
            link: '#',
            imageExample: petroglyph2
        },
        {
            title: 'Basic Classification Guide',
            type: 'video',
            content: 'Step-by-step guide to identifying and categorizing basic petroglyph elements.',
            link: '#',
            imageExample: petroglyph3
        }
    ],
    intermediate: [
        {
            title: 'Understanding Context',
            type: 'article',
            content: 'Learn how location, surrounding features, and cultural history help interpret petroglyphs.',
            link: '#',
            imageExample: petroglyph4
        },
        {
            title: 'Dating Methods',
            type: 'video',
            content: 'Scientific techniques used to date rock art, including relative and absolute dating methods.',
            link: '#',
            imageExample: petroglyph5
        },
        {
            title: 'Regional Styles',
            type: 'interactive',
            content: 'Compare petroglyph styles from different regions and time periods.',
            link: '#',
            imageExample: petroglyph1
        }
    ],
    expert: [
        {
            title: 'Advanced Analysis Techniques',
            type: 'research',
            content: 'Professional methods for documenting and analyzing rock art, including 3D scanning and digital enhancement.',
            link: '#',
            imageExample: petroglyph2
        },
        {
            title: 'Cultural Interpretation',
            type: 'article',
            content: 'Advanced guide to interpreting cultural significance, symbolism, and meaning in rock art.',
            link: '#',
            imageExample: petroglyph3
        },
        {
            title: 'Conservation Methods',
            type: 'video',
            content: 'Learn about preservation techniques and ethical considerations in rock art study.',
            link: '#',
            imageExample: petroglyph4
        }
    ]
};

// Add new styled components
const AchievementBadge = styled(motion.div)`
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4ECDC4;
    color: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
`;

const LearningPanel = styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
    max-height: 80vh;
    overflow-y: auto;

    .resources {
        display: grid;
        gap: 2rem;
        margin-top: 1rem;
    }

    .resource-card {
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;

        .content {
            h4 {
                color: #2d3436;
                margin: 0 0 0.5rem 0;
            }

            .type-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                background: #4ECDC4;
                color: white;
                border-radius: 4px;
                font-size: 0.8rem;
                margin-bottom: 0.5rem;
            }
        }

        .example-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 4px;
        }

        &:hover {
            transform: translateY(-2px);
            background: #f1f2f3;
        }
    }
`;

// Add tutorial content
const tutorials = {
    beginner: {
        steps: [
            {
                title: 'Welcome to Petroglyph Classification!',
                content: 'Learn to identify and classify ancient rock art. We\'ll start with basic shapes and figures.',
                animation: 'welcome'
            },
            {
                title: 'Animal Figures',
                content: 'Look for distinctive features like horns, tails, and body shapes. Animals were common subjects in ancient rock art.',
                animation: 'highlight-animals'
            },
            {
                title: 'Human Figures',
                content: 'Human figures often appear stick-like or simplified. Look for arms, legs, and sometimes tools or weapons they carry.',
                animation: 'highlight-humans'
            },
            {
                title: 'Geometric Patterns',
                content: 'These include circles, spirals, zigzags, and other abstract shapes. They might have had symbolic meanings.',
                animation: 'show-patterns'
            }
        ]
    },
    intermediate: {
        steps: [
            {
                title: 'Scene Analysis',
                content: 'Now we\'ll look at how figures interact. Hunting scenes, ceremonies, and daily life activities tell stories about ancient life.',
                animation: 'scene-breakdown'
            },
            {
                title: 'Cultural Context',
                content: 'Different cultures had distinct styles. Notice how similar subjects were depicted differently across regions.',
                animation: 'cultural-comparison'
            },
            {
                title: 'Dating Clues',
                content: 'Look for overlapping figures, weathering patterns, and artistic styles that help date the artwork.',
                animation: 'dating-features'
            }
        ]
    },
    expert: {
        steps: [
            {
                title: 'Advanced Interpretation',
                content: 'Consider the landscape, nearby archaeological features, and seasonal alignments.',
                animation: 'context-analysis'
            },
            {
                title: 'Technical Analysis',
                content: 'Study carving techniques, tool marks, and patina formation to understand how petroglyphs were made.',
                animation: 'technique-study'
            },
            {
                title: 'Comparative Studies',
                content: 'Compare similar motifs across different sites to understand cultural connections and migrations.',
                animation: 'comparative-view'
            }
        ]
    }
};

// Add challenge types
const challengeTypes = {
    speedRun: {
        title: 'Speed Classification',
        description: 'Classify as many petroglyphs as possible in 60 seconds',
        reward: 500
    },
    accuracyChallenge: {
        title: 'Perfect Accuracy',
        description: 'Classify 10 petroglyphs with 100% accuracy',
        reward: 1000
    },
    expertAnalysis: {
        title: 'Expert Analysis',
        description: 'Complete detailed analysis of complex scenes',
        reward: 1500
    }
};

// Add progress tracking system
const progressLevels = [
    {
        level: 1,
        title: 'Novice Observer',
        requiredPoints: 0,
        unlocks: ['Basic Tools']
    },
    {
        level: 2,
        title: 'Pattern Spotter',
        requiredPoints: 1000,
        unlocks: ['Pattern Analysis']
    },
    {
        level: 3,
        title: 'Context Analyzer',
        requiredPoints: 2500,
        unlocks: ['Context Tools']
    },
    {
        level: 4,
        title: 'Cultural Expert',
        requiredPoints: 5000,
        unlocks: ['Expert Analysis']
    },
    {
        level: 5,
        title: 'Master Archaeologist',
        requiredPoints: 10000,
        unlocks: ['All Features']
    }
];

// Add expert tips system
const expertTips = {
    beginner: [
        {
            trigger: 'first_attempt',
            tip: 'Look for distinct shapes and outlines first'
        },
        {
            trigger: 'multiple_errors',
            tip: 'Take your time to observe all details before classifying'
        }
    ],
    intermediate: [
        {
            trigger: 'good_streak',
            tip: 'Now try to identify the relationships between figures'
        },
        {
            trigger: 'complex_scene',
            tip: 'Break down the scene into smaller elements'
        }
    ],
    expert: [
        {
            trigger: 'analysis_mode',
            tip: 'Consider the cultural and historical context'
        },
        {
            trigger: 'technique_question',
            tip: 'Look for tool marks and carving depth variations'
        }
    ]
};

// Add new styled components
const ProgressHeader = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: center;
`;

const LevelIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    .level-number {
        width: 40px;
        height: 40px;
        background: #4ECDC4;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .level-info {
        h3 {
            margin: 0;
            color: #2d3436;
        }
        
        p {
            margin: 0;
            font-size: 0.9rem;
            color: #636e72;
        }
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #4ECDC4;
        width: ${props => props.progress}%;
        transition: width 0.3s ease;
    }
`;

function ClassificationChallenge() {
    const [currentImage, setCurrentImage] = useState(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [currentLevel, setCurrentLevel] = useState('beginner');
    const [showQuestion, setShowQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimeChallenge, setIsTimeChallenge] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [comparisonImages, setComparisonImages] = useState([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [showResources, setShowResources] = useState(false);
    const [expertStreak, setExpertStreak] = useState(0);
    const [showTutorial, setShowTutorial] = useState(true);
    const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
    const [userProgress, setUserProgress] = useState({
        level: 1,
        totalPoints: 0,
        unlockedFeatures: ['Basic Tools']
    });
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [showTip, setShowTip] = useState(null);

    useEffect(() => {
        // Start with a random image
        const randomIndex = Math.floor(Math.random() * petroglyphData.length);
        setCurrentImage(petroglyphData[randomIndex]);
    }, []);

    // Add level progression logic
    useEffect(() => {
        if (score >= difficultyLevels.find(l => l.id === 'intermediate').requiredScore) {
            setCurrentLevel('intermediate');
        }
        if (score >= difficultyLevels.find(l => l.id === 'expert').requiredScore) {
            setCurrentLevel('expert');
        }
    }, [score]);

    // Add timer effect
    useEffect(() => {
        if (isTimeChallenge && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isTimeChallenge, timeLeft]);

    // Update moveToNextImage function to handle level progression better
    const moveToNextImage = () => {
        const currentLevelData = difficultyLevels.find(l => l.id === currentLevel);
        const nextLevel = difficultyLevels[difficultyLevels.findIndex(l => l.id === currentLevel) + 1];

        // Show current challenge progress
        setFeedback({
            type: 'progress',
            message: `Challenge ${attempts + 1}/${currentLevelData.totalChallenges}`
        });

        // Check if current level is complete
        if (attempts + 1 >= currentLevelData.totalChallenges) {
            if (score >= currentLevelData.requiredScore) {
                // Level completed successfully
                if (nextLevel) {
                    setFeedback({
                        type: 'level_complete',
                        message: `Level Complete! You got ${score} correct answers. Moving to ${nextLevel.label}...`
                    });
                    setTimeout(() => {
                        setCurrentLevel(nextLevel.id);
                        setAttempts(0);
                        setScore(0);
                        const randomIndex = Math.floor(Math.random() * petroglyphData.length);
                        setCurrentImage(petroglyphData[randomIndex]);
                        setFeedback(null);
                    }, 2000);
                } else {
                    setGameComplete(true);
                }
            } else {
                // Failed to meet score requirement
                setFeedback({
                    type: 'level_failed',
                    message: `You need at least ${currentLevelData.requiredScore} correct answers to advance. Try again!`
                });
                setTimeout(() => {
                    setAttempts(0);
                    setScore(0);
                    const randomIndex = Math.floor(Math.random() * petroglyphData.length);
                    setCurrentImage(petroglyphData[randomIndex]);
                    setFeedback(null);
                }, 2000);
            }
        } else {
            // Continue with next image in current level
            const remainingImages = petroglyphData.filter(img => img.id !== currentImage.id);
            const nextIndex = Math.floor(Math.random() * remainingImages.length);
            setCurrentImage(remainingImages[nextIndex]);
            setTimeout(() => {
                setFeedback(null);
            }, 1500);
            setAttempts(prev => prev + 1);
        }
    };

    // Update handleTimeUp to use moveToNextImage
    const handleTimeUp = () => {
        setFeedback({
            type: 'error',
            message: 'Time\'s up! Moving to next image...'
        });
        setTimeout(() => {
            moveToNextImage();
        }, 1500);
    };

    const startTimeChallenge = (level) => {
        setIsTimeChallenge(true);
        setTimeLeft(timeChallengeLevels.find(l => l.id === level).timeLimit);
        setTotalPoints(prev => prev * timeChallengeLevels.find(l => l.id === level).pointMultiplier);
    };

    const startComparisonChallenge = () => {
        setComparisonMode(true);
        // Select two random images for comparison
        const images = petroglyphData
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
        setComparisonImages(images);
    };

    // Update handleClassification to use moveToNextImage
    const handleClassification = (category) => {
        if (!currentImage || feedback) return;

        const isCorrect = currentImage.category === category;
        const currentLevelData = difficultyLevels.find(l => l.id === currentLevel);
        const remainingChallenges = currentLevelData.totalChallenges - (attempts + 1);
        const neededScore = currentLevelData.requiredScore - (isCorrect ? score + 1 : score);

        let pointsEarned = 0;

        if (isCorrect) {
            // Base points for correct answer
            pointsEarned = 100;

            // Streak bonus
            const streakBonus = Math.floor(streak / 3) * 50;
            pointsEarned += streakBonus;

            // Level multiplier
            const levelMultiplier = currentLevel === 'beginner' ? 1 :
                currentLevel === 'intermediate' ? 1.5 : 2;
            pointsEarned *= levelMultiplier;

            // Time challenge bonus
            if (isTimeChallenge) {
                pointsEarned *= 2;
            }

            setScore(score + 1);
            setStreak(streak + 1);
            setTotalPoints(prev => prev + pointsEarned);
            updateProgress(pointsEarned);

            setFeedback({
                type: 'success',
                message: `Correct! +${pointsEarned} points${streak > 2 ? ` (includes ${streakBonus} streak bonus!)` : ''}`
            });
        } else {
            setStreak(0);
            setFeedback({
                type: 'error',
                message: `Not quite. This is a ${currentImage.category} petroglyph. Let's analyze why...`
            });
        }

        setAttempts(attempts + 1);
        checkAchievements();

        setTimeout(() => {
            moveToNextImage();
        }, 2000);
    };

    // Update handleQuestionAnswer to use moveToNextImage
    const handleQuestionAnswer = (answer) => {
        const isCorrect = answer === currentQuestion.correct;
        if (isCorrect) {
            setExpertStreak(prev => prev + 1);
            setTotalPoints(totalPoints + 200);
            setFeedback({
                type: 'success',
                message: `Excellent analysis! +200 points\n${currentQuestion.explanation}`
            });
        } else {
            setExpertStreak(0);
            setFeedback({
                type: 'error',
                message: `Not quite. ${currentQuestion.explanation}`
            });
        }
        checkAchievements();
        setShowQuestion(false);

        setTimeout(() => {
            moveToNextImage();
        }, 2000);
    };

    // Add achievement check function
    const checkAchievements = () => {
        achievements.forEach(achievement => {
            if (!unlockedAchievements.includes(achievement.id) &&
                achievement.condition(score, attempts, currentLevel, isTimeChallenge, streak, expertStreak)) {
                setUnlockedAchievements(prev => [...prev, achievement.id]);
                // Show achievement notification
                setFeedback({
                    type: 'achievement',
                    message: `🏆 Achievement Unlocked: ${achievement.title}!`
                });
            }
        });
    };

    // Add learning resources component
    const renderLearningResources = () => (
        <LearningPanel>
            <h3>Learning Resources</h3>
            <p>Enhance your knowledge with these resources:</p>
            <div className="resources">
                {learningResources[currentLevel].map((resource, index) => (
                    <motion.div
                        key={index}
                        className="resource-card"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => window.open(resource.link)}
                    >
                        <div className="content">
                            <h4>{resource.title}</h4>
                            <div className="type-badge">{resource.type}</div>
                        </div>
                        <div className="example-image">
                            <img src={resource.imageExample} alt={resource.title} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </LearningPanel>
    );

    // Add tutorial handler
    const handleTutorialProgress = () => {
        if (currentTutorialStep < tutorials[currentLevel].steps.length - 1) {
            setCurrentTutorialStep(prev => prev + 1);
        } else {
            setShowTutorial(false);
        }
    };

    // Add progress update handler
    const updateProgress = (points) => {
        const newTotal = userProgress.totalPoints + points;

        // Find the appropriate level based on total points
        const newLevel = progressLevels.find((level, index) => {
            const nextLevel = progressLevels[index + 1];
            return newTotal >= level.requiredPoints &&
                (!nextLevel || newTotal < nextLevel.requiredPoints);
        });

        if (newLevel && newLevel.level > userProgress.level) {
            // Level up!
            setFeedback({
                type: 'level_up',
                message: `🎉 Level Up! You are now a ${newLevel.title}!`
            });

            setUserProgress(prev => ({
                ...prev,
                level: newLevel.level,
                totalPoints: newTotal,
                unlockedFeatures: [...new Set([...prev.unlockedFeatures, ...newLevel.unlocks])]
            }));

            // Unlock new features based on level
            if (newLevel.level >= 2) {
                // Unlock intermediate features
                setCurrentLevel('intermediate');
            }
            if (newLevel.level >= 4) {
                // Unlock expert features
                setCurrentLevel('expert');
            }
        } else {
            // Just update points
            setUserProgress(prev => ({
                ...prev,
                totalPoints: newTotal
            }));
        }
    };

    // Add progress display helper
    const getProgressPercentage = () => {
        const currentLevelData = progressLevels[userProgress.level - 1];
        const nextLevelData = progressLevels[userProgress.level] || progressLevels[progressLevels.length - 1];

        const currentLevelPoints = currentLevelData.requiredPoints;
        const nextLevelPoints = nextLevelData.requiredPoints;
        const currentPoints = userProgress.totalPoints;

        return Math.min(
            ((currentPoints - currentLevelPoints) /
                (nextLevelPoints - currentLevelPoints)) * 100,
            100
        );
    };

    // Add challenge handler
    const startChallenge = (challengeType) => {
        setCurrentChallenge(challengeTypes[challengeType]);
        // Challenge specific setup...
    };

    // Add tip system
    const checkForTips = (trigger) => {
        const relevantTips = expertTips[currentLevel].filter(tip =>
            tip.trigger === trigger
        );
        if (relevantTips.length > 0) {
            setShowTip(relevantTips[0]);
            setTimeout(() => setShowTip(null), 5000);
        }
    };

    return (
        <GameContainer>
            <ProgressHeader>
                <LevelIndicator>
                    <div className="level-number">{userProgress.level}</div>
                    <div className="level-info">
                        <h3>{progressLevels[userProgress.level - 1].title}</h3>
                        <p>Level {userProgress.level} / {progressLevels.length}</p>
                    </div>
                </LevelIndicator>

                <div>
                    <p style={{ marginBottom: '0.5rem' }}>Progress to Next Level</p>
                    <ProgressBar progress={getProgressPercentage()}>
                        <div className="fill" />
                    </ProgressBar>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                        <span>{userProgress.totalPoints} points</span>
                        <span>Next level: {progressLevels[userProgress.level].requiredPoints} points</span>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <h3 style={{ margin: 0 }}>Current Score: {score}</h3>
                    <p style={{ margin: 0 }}>Streak: {streak} 🔥</p>
                    <p style={{ margin: 0 }}>Accuracy: {attempts > 0 ? ((score / attempts) * 100).toFixed(1) : 0}%</p>
                </div>
            </ProgressHeader>

            <h2>Petroglyph Classification Challenge</h2>
            <p>Identify the correct category for each petroglyph</p>

            {isTimeChallenge && (
                <Timer timeLeft={timeLeft}>
                    ⏱️ {timeLeft}s
                </Timer>
            )}

            <GameArea>
                {comparisonMode ? (
                    <ComparisonView>
                        {comparisonImages.map((image, index) => (
                            <ImageDisplay key={index}>
                                <PetroglyphImage
                                    src={image.image}
                                    alt={image.description}
                                />
                            </ImageDisplay>
                        ))}
                    </ComparisonView>
                ) : (
                    <>
                        <div>
                            <ImageDisplay>
                                {currentImage && (
                                    <>
                                        <PetroglyphImage
                                            src={currentImage.image}
                                            alt={currentImage.description}
                                        />
                                        <div style={{ padding: '1rem' }}>
                                            <h3>{currentImage.location}</h3>
                                            <p>{currentImage.description}</p>
                                        </div>
                                    </>
                                )}
                            </ImageDisplay>

                            <CategoryButtons>
                                {categories.map(category => (
                                    <Button
                                        key={category.id}
                                        onClick={() => handleClassification(category.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={!!feedback}
                                    >
                                        <h3>{category.label}</h3>
                                        <p>{category.description}</p>
                                    </Button>
                                ))}
                            </CategoryButtons>

                            <AnimatePresence>
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            padding: '1rem',
                                            marginTop: '1rem',
                                            background: feedback.type === 'success' ? '#4ECDC4' : '#FF6B6B',
                                            color: 'white',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {feedback.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <ScorePanel>
                            <h3>Current Level: {difficultyLevels.find(l => l.id === currentLevel).label}</h3>
                            <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#4ECDC4' }}>Level Progress:</h4>
                                <p style={{ margin: '0' }}>
                                    Challenges: {attempts}/{difficultyLevels.find(l => l.id === currentLevel).totalChallenges}
                                </p>
                                <p style={{ margin: '0' }}>
                                    Correct Answers: {score}/{difficultyLevels.find(l => l.id === currentLevel).requiredScore} needed
                                </p>
                            </div>
                            <p>Current Streak: {streak} 🔥</p>
                            <p>Accuracy: {attempts > 0 ? ((score / attempts) * 100).toFixed(1) : 0}%</p>
                        </ScorePanel>
                    </>
                )}

                {currentLevel === 'expert' && (
                    <div style={{ marginTop: '1rem' }}>
                        <Button onClick={() => startTimeChallenge('expert')}>
                            Start Time Challenge
                        </Button>
                        <Button onClick={startComparisonChallenge}>
                            Start Comparison Analysis
                        </Button>
                    </div>
                )}
            </GameArea>

            <AnimatePresence>
                {gameComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}
                        >
                            <h2>Game Complete!</h2>
                            <p>Congratulations! You've mastered all levels!</p>
                            <p>Final Score: {score}/{attempts}</p>
                            <p>Overall Accuracy: {((score / attempts) * 100).toFixed(1)}%</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                                <Button onClick={() => {
                                    setCurrentLevel('beginner');
                                    setAttempts(0);
                                    setScore(0);
                                    setGameComplete(false);
                                    const randomIndex = Math.floor(Math.random() * petroglyphData.length);
                                    setCurrentImage(petroglyphData[randomIndex]);
                                }}>
                                    Play Again
                                </Button>
                                <Button onClick={() => {
                                    // Return to game selection or show achievements
                                    window.history.back();
                                }}>
                                    Back to Games
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button onClick={() => setShowResources(!showResources)}>
                📚 Learning Resources
            </Button>

            {showResources && renderLearningResources()}

            <AnimatePresence>
                {feedback?.type === 'achievement' && (
                    <AchievementBadge
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                    >
                        {feedback.message}
                    </AchievementBadge>
                )}
            </AnimatePresence>

            {showTutorial && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}
                    >
                        <h2>Tutorial: {tutorials[currentLevel].steps[currentTutorialStep].title}</h2>
                        <p>{tutorials[currentLevel].steps[currentTutorialStep].content}</p>
                        <Button
                            onClick={handleTutorialProgress}
                            style={{ marginTop: '1rem' }}
                        >
                            Next
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            {showTip && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}
                    >
                        <h2>Expert Tip</h2>
                        <p>{showTip.tip}</p>
                        <Button
                            onClick={() => setShowTip(null)}
                            style={{ marginTop: '1rem' }}
                        >
                            Close
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            <AnimatePresence>
                {feedback?.type === 'level_complete' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: '#4ECDC4',
                            color: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            zIndex: 1000
                        }}
                    >
                        <h2>{feedback.message}</h2>
                        <p>Get ready for more challenging petroglyphs!</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default ClassificationChallenge; 