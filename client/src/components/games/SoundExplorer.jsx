import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ExplorerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SceneViewer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Scene = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
`;

const SoundPoint = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  background: ${props => props.active ? '#4ECDC4' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SoundPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SoundControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Control = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeSlider = styled.input`
  width: 100%;
  margin: 1rem 0;
`;

// Add Button component with the other styled components
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

// Add tutorial components
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

    h2 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    .example {
        margin: 2rem 0;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        display: grid;
        gap: 1rem;
    }
`;

// Add tutorial content
const tutorialSteps = [
    {
        title: "Welcome to Sound Explorer",
        content: "Journey into the acoustic world of ancient petroglyphs. Discover how our ancestors might have used sound in their rituals and ceremonies.",
        image: petroglyph1
    },
    {
        title: "Sound Points",
        content: "Look for interactive sound points () on the petroglyphs. Each point represents different types of ancient sounds:",
        examples: [
            { icon: "🥁", label: "Ritual Drums", description: "Deep, resonant beats used in ceremonies" },
            { icon: "🎶", label: "Chants", description: "Vocal harmonies and group singing" },
            { icon: "🔔", label: "Bells", description: "Metallic sounds from ancient instruments" },
            { icon: "🌬️", label: "Wind Instruments", description: "Flutes and whistles made from natural materials" }
        ]
    },
    {
        title: "Sound Combinations",
        content: "Create ancient soundscapes by combining different sound points. Discover how different combinations create unique ceremonial atmospheres.",
        image: petroglyph2
    },
    {
        title: "Scene Analysis",
        content: "Study the petroglyph scenes to understand the context of the sounds. Dancing figures might suggest rhythmic music, while hunting scenes might have different sound patterns.",
        image: petroglyph3
    }
];

// Add scene categories
const sceneCategories = {
    RITUAL: "Ritual & Ceremony",
    HUNTING: "Hunting Scenes",
    DAILY: "Daily Life",
    CELESTIAL: "Celestial Events"
};

// Update scenes with our petroglyph images
const scenes = [
    {
        id: 1,
        name: 'Ceremonial Dance',
        category: sceneCategories.RITUAL,
        image: petroglyph1,
        description: 'A group of figures in a circular dance formation, suggesting ritualistic movement and rhythm.',
        soundPoints: [
            {
                id: 'sp1',
                x: 30,
                y: 40,
                icon: '🥁',
                sound: 'drum',
                description: 'Deep ceremonial drumming',
                frequency: 100,
                pattern: 'ritual'
            },
            {
                id: 'sp2',
                x: 60,
                y: 50,
                icon: '🎶',
                sound: 'chant',
                description: 'Group chanting in harmony',
                frequency: 200,
                pattern: 'chant'
            },
            {
                id: 'sp3',
                x: 45,
                y: 70,
                icon: '🔔',
                sound: 'bells',
                description: 'Ceremonial bells and rattles',
                frequency: 300,
                pattern: 'bells'
            }
        ],
        context: "This scene depicts a major ritual ceremony where the community gathered for important celebrations.",
        suggestedCombinations: [
            {
                name: "Opening Ritual",
                points: ['sp1', 'sp2'],
                description: "Start with drums followed by chanting"
            },
            {
                name: "Peak Ceremony",
                points: ['sp1', 'sp2', 'sp3'],
                description: "All sounds combined at maximum intensity"
            }
        ]
    }
    // More scenes to be added...
];

// Add level progression system
const gameLevels = [
    {
        id: 1,
        title: "Basic Rhythms",
        description: "Learn the fundamental sounds of ancient ceremonies",
        requiredScore: 100,
        unlocks: ['basic_drums', 'basic_chants'],
        challenge: {
            type: 'match_pattern',
            description: 'Recreate the basic ceremonial rhythm'
        }
    },
    {
        id: 2,
        title: "Ritual Harmonies",
        description: "Combine different sounds to create ritual atmospheres",
        requiredScore: 250,
        unlocks: ['advanced_drums', 'bells', 'wind_instruments'],
        challenge: {
            type: 'create_atmosphere',
            description: 'Create a peaceful ritual atmosphere'
        }
    },
    {
        id: 3,
        title: "Sacred Ceremonies",
        description: "Master complex ceremonial sound combinations",
        requiredScore: 500,
        unlocks: ['all_instruments'],
        challenge: {
            type: 'full_ceremony',
            description: 'Conduct a complete ceremonial sequence'
        }
    }
];

// Add sound patterns for challenges
const soundPatterns = [
    {
        id: 'ritual_opening',
        name: 'Ritual Opening',
        sequence: ['drum', 'drum', 'chant', 'bells'],
        timing: [0, 1000, 2000, 3000],
        points: 100
    },
    {
        id: 'harvest_celebration',
        name: 'Harvest Celebration',
        sequence: ['chant', 'drum', 'bells', 'drum', 'chant'],
        timing: [0, 500, 1000, 1500, 2000],
        points: 150
    }
];

// Add achievements
const achievements = [
    {
        id: 'first_rhythm',
        title: 'First Steps',
        description: 'Successfully recreate your first rhythm pattern',
        icon: '🎵'
    },
    {
        id: 'harmony_master',
        title: 'Harmony Master',
        description: 'Create perfect harmony with all sound types',
        icon: '🎶'
    }
];

function SoundExplorer() {
    const [showTutorial, setShowTutorial] = useState(true);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [currentScene, setCurrentScene] = useState(scenes[0]);
    const [activePoints, setActivePoints] = useState([]);
    const [volume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef({});
    const [currentLevel, setCurrentLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [unlockedSounds, setUnlockedSounds] = useState(['basic_drums']);
    const [currentPattern, setCurrentPattern] = useState(null);
    const [recordedSequence, setRecordedSequence] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [earnedAchievements, setEarnedAchievements] = useState(new Set());
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    useEffect(() => {
        // Initialize Web Audio API
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const createSound = (type) => {
        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = type === 'drum' ? 'triangle' : 'sine';
        oscillator.frequency.setValueAtTime(
            type === 'drum' ? 100 : 200,
            ctx.currentTime
        );

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        return { oscillator, gainNode };
    };

    const handlePointClick = (point) => {
        if (activePoints.includes(point.id)) {
            setActivePoints(activePoints.filter(id => id !== point.id));
            if (oscillatorsRef.current[point.id]) {
                oscillatorsRef.current[point.id].oscillator.stop();
                delete oscillatorsRef.current[point.id];
            }
        } else {
            setActivePoints([...activePoints, point.id]);
            const { oscillator, gainNode } = createSound(point.sound);
            oscillatorsRef.current[point.id] = { oscillator, gainNode };
            oscillator.start();
        }
    };

    const handlePlayAll = () => {
        if (isPlaying) {
            Object.values(oscillatorsRef.current).forEach(({ oscillator }) => {
                oscillator.stop();
            });
            oscillatorsRef.current = {};
            setActivePoints([]);
            setIsPlaying(false);
        } else {
            currentScene.soundPoints.forEach(point => {
                const { oscillator, gainNode } = createSound(point.sound);
                oscillatorsRef.current[point.id] = { oscillator, gainNode };
                oscillator.start();
            });
            setActivePoints(currentScene.soundPoints.map(p => p.id));
            setIsPlaying(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        Object.values(oscillatorsRef.current).forEach(({ gainNode }) => {
            gainNode.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
        });
    };

    // Add tutorial rendering
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
                <h2>{tutorialSteps[tutorialStep].title}</h2>
                <p>{tutorialSteps[tutorialStep].content}</p>

                {tutorialSteps[tutorialStep].examples && (
                    <div className="example">
                        {tutorialSteps[tutorialStep].examples.map((example, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '2rem' }}>{example.icon}</span>
                                <div>
                                    <h4>{example.label}</h4>
                                    <p>{example.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tutorialSteps[tutorialStep].image && (
                    <img
                        src={tutorialSteps[tutorialStep].image}
                        alt="Tutorial example"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            marginTop: '1rem'
                        }}
                    />
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {tutorialStep > 0 && (
                        <Button onClick={() => setTutorialStep(prev => prev - 1)}>
                            ← Previous
                        </Button>
                    )}
                    <Button onClick={() => {
                        if (tutorialStep < tutorialSteps.length - 1) {
                            setTutorialStep(prev => prev + 1);
                        } else {
                            setShowTutorial(false);
                        }
                    }}>
                        {tutorialStep === tutorialSteps.length - 1 ? 'Start Exploring' : 'Next →'}
                    </Button>
                </div>
            </TutorialContent>
        </TutorialOverlay>
    );

    // Add new styled components
    const ChallengeModal = styled(motion.div)`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 90%;
        max-width: 500px;
    `;

    const PatternVisualizer = styled.div`
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
        overflow-x: auto;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;

        .beat {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${props => props.active ? '#4ECDC4' : '#eee'};
            transition: all 0.3s;
        }
    `;

    // Add challenge handling
    const startChallenge = (pattern) => {
        setCurrentPattern(pattern);
        setRecordedSequence([]);
        setIsRecording(true);
        setShowChallengeModal(true);
    };

    const handleSoundRecording = (sound) => {
        if (isRecording) {
            const newSequence = [...recordedSequence, {
                sound,
                timestamp: Date.now()
            }];
            setRecordedSequence(newSequence);

            // Check if sequence matches pattern
            if (newSequence.length === currentPattern.sequence.length) {
                checkSequence(newSequence);
            }
        }
    };

    const checkSequence = (sequence) => {
        const isCorrect = sequence.every((item, index) =>
            item.sound === currentPattern.sequence[index]
        );

        if (isCorrect) {
            handleSuccess();
        } else {
            handleFailure();
        }
    };

    const handleSuccess = () => {
        setScore(prev => prev + currentPattern.points);
        checkLevelProgress();
        checkAchievements();
        // Show success animation/feedback
    };

    // Add achievement checking
    const checkAchievements = () => {
        if (score >= 100 && !earnedAchievements.has('first_rhythm')) {
            earnAchievement('first_rhythm');
        }
        // Add more achievement checks
    };

    const earnAchievement = (achievementId) => {
        setEarnedAchievements(prev => new Set([...prev, achievementId]));
        // Show achievement notification
    };

    // Add level progress checking
    const checkLevelProgress = () => {
        const currentLevelData = gameLevels[currentLevel];
        if (score >= currentLevelData.requiredScore) {
            if (currentLevel < gameLevels.length - 1) {
                // Level up!
                setCurrentLevel(prev => prev + 1);
                // Unlock new sounds
                setUnlockedSounds(prev => [...prev, ...gameLevels[currentLevel + 1].unlocks]);
                // Show level up celebration
                showLevelUpMessage();
            }
        }
    };

    // Add failure handling
    const handleFailure = () => {
        // Visual feedback for incorrect pattern
        setRecordedSequence([]);
        // Optional: Reduce score or add penalty
        setScore(prev => Math.max(0, prev - 20));

        // Show feedback message
        showFeedbackMessage({
            type: 'error',
            message: 'Pattern did not match. Try again!'
        });
    };

    // Add feedback message handling
    const showFeedbackMessage = (message) => {
        setFeedbackMessage(message);
        setTimeout(() => setFeedbackMessage(null), 2000);
    };

    const showLevelUpMessage = () => {
        showFeedbackMessage({
            type: 'success',
            message: `Level Up! You've reached ${gameLevels[currentLevel + 1].title}`
        });
    };

    // Add feedback message component
    const FeedbackMessage = styled(motion.div)`
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 8px;
        background: ${props => props.type === 'success' ? '#4ECDC4' : '#FF6B6B'};
        color: white;
        z-index: 1000;
    `;

    return (
        <GameContainer>
            <AnimatePresence>
                {showTutorial && renderTutorial()}
            </AnimatePresence>

            <h2>Sound Explorer</h2>
            <p>Discover the sounds of ancient ceremonies and rituals</p>

            <ExplorerArea>
                <SceneViewer>
                    <Scene image={currentScene.image}>
                        {currentScene.soundPoints.map(point => (
                            <SoundPoint
                                key={point.id}
                                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                active={activePoints.includes(point.id)}
                                onClick={() => handlePointClick(point)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {point.icon}
                            </SoundPoint>
                        ))}
                    </Scene>
                    <p>{currentScene.description}</p>
                </SceneViewer>

                <SoundPanel>
                    <h3>Sound Controls</h3>
                    <SoundControls>
                        <Control
                            onClick={handlePlayAll}
                            active={isPlaying}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isPlaying ? '⏹️ Stop All' : '▶️ Play All'}
                        </Control>

                        <div>
                            <h4>Volume</h4>
                            <VolumeSlider
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>

                        <div>
                            <h4>Active Sounds</h4>
                            {currentScene.soundPoints.map(point => (
                                <div key={point.id}>
                                    {point.icon} {point.description}
                                    {activePoints.includes(point.id) && ' (Playing)'}
                                </div>
                            ))}
                        </div>
                    </SoundControls>
                </SoundPanel>
            </ExplorerArea>

            <div className="game-header">
                <div className="level-info">
                    <h3>Level {currentLevel + 1}: {gameLevels[currentLevel].title}</h3>
                    <p>Score: {score}</p>
                </div>
                <Button onClick={() => startChallenge(soundPatterns[0])}>
                    Start Challenge
                </Button>
            </div>

            <AnimatePresence>
                {showChallengeModal && (
                    <ChallengeModal>
                        <h3>{currentPattern.name}</h3>
                        <p>Recreate this pattern:</p>
                        <PatternVisualizer>
                            {currentPattern.sequence.map((sound, index) => (
                                <div key={index} className="beat">
                                    {sound === 'drum' ? '🥁' :
                                        sound === 'chant' ? '🎶' : '🔔'}
                                </div>
                            ))}
                        </PatternVisualizer>
                        <div className="recorded-sequence">
                            {recordedSequence.map((item, index) => (
                                <div key={index} className="beat">
                                    {item.sound}
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => setShowChallengeModal(false)}>
                            Close
                        </Button>
                    </ChallengeModal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {feedbackMessage && (
                    <FeedbackMessage
                        type={feedbackMessage.type}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {feedbackMessage.message}
                    </FeedbackMessage>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default SoundExplorer; 