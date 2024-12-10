import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
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

const IntroScreen = styled(motion.div)`
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    margin-bottom: 2rem;

    h2 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    .timeline-intro {
        display: flex;
        gap: 2rem;
        margin: 2rem 0;
        overflow-x: auto;
        padding: 1rem;

        .period {
            min-width: 250px;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            
            img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 1rem;
            }
        }
    }
`;

// Define the educational content and levels
const timelinePeriods = [
    {
        era: "Early Period (10,000-8,000 BCE)",
        description: "Simple geometric patterns and basic animal figures marked the beginning of rock art.",
        characteristics: [
            "Basic geometric shapes",
            "Simple animal outlines",
            "Limited tool use"
        ],
        image: petroglyph1,
        example: "Notice the basic elephant outline without complex details"
    },
    {
        era: "Middle Period (8,000-6,000 BCE)",
        description: "More complex scenes with human figures and detailed animals emerged.",
        characteristics: [
            "Human figures appear",
            "More detailed animals",
            "Hunting scenes"
        ],
        image: petroglyph2,
        example: "Observe the hunting scene with multiple figures"
    },
    {
        era: "Late Period (6,000-4,000 BCE)",
        description: "Advanced artistic techniques and complex compositions developed.",
        characteristics: [
            "Complex compositions",
            "Multiple scene elements",
            "Advanced tool techniques"
        ],
        image: petroglyph3,
        example: "See the intricate details and multiple elements in one scene"
    }
];

const gameLevels = [
    {
        level: 1,
        title: "Tutorial Level",
        description: "Learn to identify basic timeline features",
        items: [
            {
                id: 1,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Look for simple shapes", "Basic outlines only"],
                explanation: "This is from the Early Period due to its simple geometric patterns."
            },
            {
                id: 2,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Notice the human figures", "More detailed animals"],
                explanation: "Middle Period artwork shows more complex scenes with humans."
            }
        ],
        timeLimit: 120,
        showHints: true
    },
    {
        level: 2,
        title: "Basic Challenge",
        description: "Arrange three periods in order",
        items: [
            {
                id: 3,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Complex compositions", "Multiple elements"]
            },
            {
                id: 4,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Simple outlines", "Basic shapes"]
            },
            {
                id: 5,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Human figures", "Hunting scenes"]
            }
        ],
        timeLimit: 90,
        showHints: true
    },
    {
        level: 3,
        title: "Mixed Periods",
        description: "Identify and arrange four petroglyphs",
        items: [
            {
                id: 6,
                image: petroglyph4,
                period: "Middle Period",
                hints: ["Multiple figures", "Hunting scene details"]
            },
            {
                id: 7,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Basic shapes", "Simple outlines"]
            },
            {
                id: 8,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Complex patterns", "Advanced techniques"]
            },
            {
                id: 9,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Human figures", "Animal interactions"]
            }
        ],
        timeLimit: 75,
        showHints: true,
        mechanics: {
            timerSpeed: 1.2 // Timer runs 20% faster
        }
    },
    {
        level: 4,
        title: "Quick Sort",
        description: "Race against time with limited hints",
        items: [
            {
                id: 10,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Look for artistic complexity"]
            },
            {
                id: 11,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Notice the simplicity"]
            },
            {
                id: 12,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Advanced composition"]
            },
            {
                id: 13,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Intermediate complexity"]
            }
        ],
        timeLimit: 60,
        showHints: false,
        mechanics: {
            timerSpeed: 1.5,
            limitedHints: true // Only show hints briefly
        }
    },
    {
        level: 5,
        title: "Expert Challenge",
        description: "Complex arrangement with time pressure",
        items: [
            {
                id: 14,
                image: petroglyph4,
                period: "Middle Period",
                hints: ["Study the artistic style"]
            },
            {
                id: 15,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Basic technique indicators"]
            },
            {
                id: 16,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Complex artistic elements"]
            },
            {
                id: 17,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Mid-period characteristics"]
            },
            {
                id: 18,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Advanced period features"]
            }
        ],
        timeLimit: 45,
        showHints: false,
        mechanics: {
            timerSpeed: 2,
            limitedHints: true,
            shuffleInterval: 15 // Shuffle remaining items every 15 seconds
        }
    },
    {
        level: 6,
        title: "Time Pressure",
        description: "Race against a faster timer with multiple items",
        items: [
            {
                id: 19,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Basic geometric patterns"]
            },
            {
                id: 20,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Hunting scene elements"]
            },
            {
                id: 21,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Complex artistic details"]
            },
            {
                id: 22,
                image: petroglyph4,
                period: "Middle Period",
                hints: ["Multiple figure interaction"]
            },
            {
                id: 23,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Advanced composition"]
            }
        ],
        timeLimit: 40,
        showHints: false,
        mechanics: {
            timerSpeed: 2.5,
            limitedHints: true,
            shuffleInterval: 10
        }
    },
    {
        level: 7,
        title: "Memory Challenge",
        description: "Images fade after viewing",
        items: [
            {
                id: 24,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Study quickly before fade"]
            },
            {
                id: 25,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Remember the basic patterns"]
            },
            {
                id: 26,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Note the complexity"]
            },
            {
                id: 27,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Complex scene composition"]
            }
        ],
        timeLimit: 50,
        showHints: true,
        mechanics: {
            timerSpeed: 2,
            fadeImages: true, // Images fade after 3 seconds
            limitedHints: true
        }
    },
    {
        level: 8,
        title: "Double Time",
        description: "Sort two timelines simultaneously",
        items: [
            {
                id: 28,
                image: petroglyph1,
                period: "Early Period",
                timeline: "A",
                hints: ["Timeline A - Early"]
            },
            {
                id: 29,
                image: petroglyph2,
                period: "Middle Period",
                timeline: "A",
                hints: ["Timeline A - Middle"]
            },
            {
                id: 30,
                image: petroglyph3,
                period: "Early Period",
                timeline: "B",
                hints: ["Timeline B - Early"]
            },
            {
                id: 31,
                image: petroglyph4,
                period: "Late Period",
                timeline: "B",
                hints: ["Timeline B - Late"]
            }
        ],
        timeLimit: 60,
        showHints: true,
        mechanics: {
            timerSpeed: 1.5,
            dualTimelines: true,
            shuffleInterval: 12
        }
    },
    {
        level: 9,
        title: "Speed Master",
        description: "Ultra-fast sorting with minimal hints",
        items: [
            {
                id: 32,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Quick! Basic patterns"]
            },
            {
                id: 33,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Fast! Note details"]
            },
            {
                id: 34,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Hurry! Complex art"]
            },
            {
                id: 35,
                image: petroglyph4,
                period: "Middle Period",
                hints: ["Swift! Multiple figures"]
            },
            {
                id: 36,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Rapid! Advanced style"]
            }
        ],
        timeLimit: 30,
        showHints: false,
        mechanics: {
            timerSpeed: 3,
            flashingTimer: true,
            limitedHints: true,
            shuffleInterval: 8
        }
    },
    {
        level: 10,
        title: "Grand Master Challenge",
        description: "The ultimate timeline test",
        items: [
            {
                id: 37,
                image: petroglyph1,
                period: "Early Period",
                hints: ["Master challenge begins"]
            },
            {
                id: 38,
                image: petroglyph2,
                period: "Middle Period",
                hints: ["Show your expertise"]
            },
            {
                id: 39,
                image: petroglyph3,
                period: "Late Period",
                hints: ["Prove your mastery"]
            },
            {
                id: 40,
                image: petroglyph4,
                period: "Middle Period",
                hints: ["Test your knowledge"]
            },
            {
                id: 41,
                image: petroglyph5,
                period: "Late Period",
                hints: ["Final challenge"]
            }
        ],
        timeLimit: 25,
        showHints: false,
        mechanics: {
            timerSpeed: 3.5,
            fadeImages: true,
            flashingTimer: true,
            shuffleInterval: 5,
            limitedHints: true,
            dualTimelines: true
        }
    }
];

// Add new styled components
const TutorialScreen = styled(motion.div)`
    padding: 2rem;
    background: white;
    border-radius: 12px;

    .tutorial-content {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
    }

    .characteristics {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            &:before {
                content: "•";
                color: #4ECDC4;
            }
        }
    }
`;

const GameScreen = styled(motion.div)`
    .timeline-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
    }
`;

const TimelineItem = styled(motion.div)`
    background: white;
    padding: 1rem;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
    }

    .info {
        h3 {
            margin: 0 0 0.5rem;
            color: #2d3436;
        }

        .hints {
            color: #666;
            font-size: 0.9rem;
        }
    }

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const ScoreBoard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 2rem;
`;

function TimelineChallenge() {
    const [gameState, setGameState] = useState('intro'); // intro, tutorial, playing
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showPeriodInfo, setShowPeriodInfo] = useState(null);
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showHints, setShowHints] = useState(true);
    const [hintTimeLeft, setHintTimeLeft] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);

    // Add initialization function
    const initializeLevel = (levelIndex) => {
        const level = gameLevels[levelIndex];
        // Shuffle items for the level
        const shuffledItems = [...level.items].sort(() => Math.random() - 0.5);
        setItems(shuffledItems);
        setTimeLeft(level.timeLimit);
        setShowHints(level.showHints);

        // Handle limited hints
        if (level.mechanics?.limitedHints) {
            setShowHints(true);
            setTimeout(() => setShowHints(false), 5000); // Show hints for 5 seconds
        }

        // Handle shuffle interval
        if (level.mechanics?.shuffleInterval) {
            const interval = setInterval(() => {
                setItems(prev => {
                    const unplaced = prev.filter(item => !item.isPlaced);
                    return [
                        ...prev.filter(item => item.isPlaced),
                        ...unplaced.sort(() => Math.random() - 0.5)
                    ];
                });
            }, level.mechanics.shuffleInterval * 1000);

            return () => clearInterval(interval);
        }
    };

    // Update handleStartGame
    const handleStartGame = () => {
        setGameState('tutorial');
    };

    // Add startLevel function
    const startLevel = () => {
        setGameState('playing');
        initializeLevel(currentLevel);
    };

    // Update useEffect to handle timer correctly
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const level = gameLevels[currentLevel];
            const timerSpeed = level?.mechanics?.timerSpeed || 1;

            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - timerSpeed;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [gameState, timeLeft, currentLevel]);

    const renderIntroScreen = () => (
        <IntroScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2>Journey Through Time: Petroglyph Evolution</h2>
            <p>Learn how petroglyphs evolved over thousands of years</p>

            <div className="timeline-intro">
                {timelinePeriods.map((period, index) => (
                    <motion.div
                        className="period"
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setShowPeriodInfo(period)}
                    >
                        <img src={period.image} alt={period.era} />
                        <h3>{period.era}</h3>
                        <p>{period.description}</p>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartGame}
                style={{
                    padding: '1rem 2rem',
                    background: '#4ECDC4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '2rem'
                }}
            >
                Start Learning Journey
            </motion.button>
        </IntroScreen>
    );

    const renderTutorialScreen = () => (
        <TutorialScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2>Tutorial: Understanding Petroglyph Timeline</h2>
            <div className="tutorial-content">
                <div>
                    <p>Learn how to identify petroglyphs from different periods:</p>
                    {timelinePeriods.map((period, index) => (
                        <div key={index} className="characteristics">
                            <h3>{period.era}</h3>
                            <img src={period.image} alt={period.era} style={{ width: '100%', marginBottom: '1rem' }} />
                            <ul>
                                {period.characteristics.map((char, i) => (
                                    <li key={i}>{char}</li>
                                ))}
                            </ul>
                            <p><strong>Example:</strong> {period.example}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>How to Play</h3>
                    <ul>
                        <li>Drag and drop petroglyphs to arrange them chronologically</li>
                        <li>Use visual clues to identify the period</li>
                        <li>Complete the arrangement before time runs out</li>
                        <li>Earn points for correct placements</li>
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startLevel}  // Changed from setGameState to startLevel
                        style={{
                            padding: '1rem 2rem',
                            background: '#4ECDC4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '2rem'
                        }}
                    >
                        Start First Level
                    </motion.button>
                </div>
            </div>
        </TutorialScreen>
    );

    // Update checkOrder function
    const checkOrder = () => {
        const correctOrder = items.every((item, index, array) => {
            const prevItem = index > 0 ? array[index - 1] : null;

            // For first item, just check it's not Late Period
            if (!prevItem) {
                return item.period !== "Late Period";
            }

            // Check if current item's period is same or later than previous item
            const periods = ["Early Period", "Middle Period", "Late Period"];
            const prevIndex = periods.indexOf(prevItem.period);
            const currentIndex = periods.indexOf(item.period);

            return currentIndex >= prevIndex;
        });

        if (correctOrder) {
            const level = gameLevels[currentLevel];
            const timeBonus = Math.floor(timeLeft * 10);
            const difficultyBonus = level?.mechanics?.timerSpeed ?
                Math.floor(1000 * level.mechanics.timerSpeed) : 0;

            const totalBonus = timeBonus + difficultyBonus;
            setScore(prev => prev + 1000 + totalBonus);

            // Show success feedback
            alert(`Level ${currentLevel + 1} Complete! +${totalBonus} bonus points!`);

            if (currentLevel < gameLevels.length - 1) {
                setCurrentLevel(prev => prev + 1);
                initializeLevel(currentLevel + 1);
            } else {
                setIsGameComplete(true);
                setGameState('complete');
            }
        } else {
            // Show error feedback
            alert("Not quite right! Try arranging from earliest to latest period.");
            setScore(prev => Math.max(0, prev - 100));
        }
    };

    const renderGameScreen = () => (
        <GameScreen>
            <ScoreBoard>
                <div>Level: {currentLevel + 1}</div>
                <div>Score: {score}</div>
                <div>Time: {timeLeft}s</div>
                <button onClick={() => setShowHints(!showHints)}>
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>
            </ScoreBoard>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="timeline-items">
                {items.map(item => (
                    <Reorder.Item key={item.id} value={item}>
                        <TimelineItem>
                            <img src={item.image} alt={item.period} />
                            <div className="info">
                                <h3>{item.period}</h3>
                                {showHints && (
                                    <div className="hints">
                                        {item.hints.map((hint, index) => (
                                            <p key={index}>💡 {hint}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TimelineItem>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <motion.button
                onClick={checkOrder}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '1rem 2rem',
                    background: '#4ECDC4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    margin: '2rem auto',
                    display: 'block'
                }}
            >
                Check Order
            </motion.button>
        </GameScreen>
    );

    // Add game completion screen
    const renderCompletionScreen = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'white',
                borderRadius: '12px'
            }}
        >
            <h2>Congratulations! 🎉</h2>
            <p>You've completed all levels!</p>
            <p>Final Score: {score}</p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                style={{
                    padding: '1rem 2rem',
                    background: '#4ECDC4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '2rem'
                }}
            >
                Play Again
            </motion.button>
        </motion.div>
    );

    return (
        <GameContainer>
            {gameState === 'intro' && renderIntroScreen()}
            {gameState === 'tutorial' && renderTutorialScreen()}
            {gameState === 'playing' && renderGameScreen()}
            {gameState === 'complete' && renderCompletionScreen()}
        </GameContainer>
    );
}

export default TimelineChallenge; 