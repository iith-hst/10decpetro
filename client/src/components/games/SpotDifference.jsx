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

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  cursor: crosshair;
`;

const Marker = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid ${props => props.found ? '#4ECDC4' : '#FF6B6B'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const ScoreBoard = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`;

const Timer = styled.div`
  font-size: 2rem;
  color: ${props => props.isLow ? '#FF6B6B' : '#4ECDC4'};
  font-weight: bold;
`;

const DifferenceOverlay = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.found ? '#4ECDC4' : 'rgba(255, 255, 0, 0.5)'};
  background: ${props => props.found ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255, 255, 0, 0.1)'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
  text-shadow: 0 0 2px black;
`;

const DifferenceDescription = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  pointer-events: none;
  max-width: 150px;
  z-index: 10;
`;

const MagnifyingGlass = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid #4ECDC4;
  border-radius: 50%;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%) scale(1.5);
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 5;
  overflow: hidden;
`;

const ScoreDisplay = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 1rem;

  div {
    text-align: center;
    
    h3 {
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4ECDC4;
    }
  }
`;

const ComboDisplay = styled(motion.div)`
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #4ECDC4, #FF6B6B);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    font-weight: bold;
    z-index: 1000;
`;

const AchievementPopup = styled(motion.div)`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
        font-size: 2rem;
    }

    .text {
        h3 {
            margin: 0;
            color: #4ECDC4;
        }
        p {
            margin: 0.5rem 0 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }
    }
`;

const SettingsButton = styled(motion.button)`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #4ECDC4;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 1000;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SettingsPanel = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    min-width: 300px;
`;

const SettingRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
`;

const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;

        &:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
    }

    input:checked + span {
        background-color: #4ECDC4;
    }

    input:checked + span:before {
        transform: translateX(26px);
    }
`;

const difficultyLevels = [
    {
        level: 1,
        timeLimit: 120,
        differences: [
            { x: 25, y: 30, radius: 20, description: 'Missing line in elephant pattern' },
            { x: 45, y: 55, radius: 20, description: 'Extra dot near the trunk' },
            { x: 75, y: 40, radius: 20, description: 'Different ear shape' }
        ],
        images: {
            original: petroglyph1,
            modified: petroglyph1
        }
    },
    {
        level: 2,
        timeLimit: 100,
        differences: [
            { x: 20, y: 25, radius: 15, description: 'Missing symbol in the corner' },
            { x: 40, y: 60, radius: 15, description: 'Different tiger pattern' },
            { x: 70, y: 45, radius: 15, description: 'Extra marking' },
            { x: 85, y: 30, radius: 15, description: 'Modified tail shape' }
        ],
        images: {
            original: petroglyph2,
            modified: petroglyph2
        }
    },
    {
        level: 3,
        timeLimit: 90,
        differences: [
            { x: 30, y: 35, radius: 15, description: 'Different human figure pose' },
            { x: 50, y: 50, radius: 15, description: 'Missing tool' },
            { x: 65, y: 40, radius: 15, description: 'Extra geometric pattern' },
            { x: 80, y: 70, radius: 15, description: 'Modified animal horns' }
        ],
        images: {
            original: petroglyph3,
            modified: petroglyph3
        }
    },
    {
        level: 4,
        timeLimit: 80,
        differences: [
            { x: 15, y: 25, radius: 15, description: 'Different circle pattern' },
            { x: 35, y: 45, radius: 15, description: 'Missing small animal' },
            { x: 60, y: 30, radius: 15, description: 'Extra line in design' },
            { x: 75, y: 65, radius: 15, description: 'Modified shape' },
            { x: 90, y: 40, radius: 15, description: 'Different texture' }
        ],
        images: {
            original: petroglyph4,
            modified: petroglyph4
        }
    },
    {
        level: 5,
        timeLimit: 70,
        differences: [
            { x: 25, y: 20, radius: 15, description: 'Missing detail in pattern' },
            { x: 45, y: 40, radius: 15, description: 'Different animal head' },
            { x: 65, y: 60, radius: 15, description: 'Extra symbol' },
            { x: 80, y: 35, radius: 15, description: 'Modified line pattern' },
            { x: 35, y: 75, radius: 15, description: 'Different geometric shape' }
        ],
        images: {
            original: petroglyph5,
            modified: petroglyph5
        }
    },
    {
        level: 6,
        timeLimit: 60,
        differences: [
            // ... differences for level 6
        ],
        images: {
            original: petroglyph1,
            modified: petroglyph1
        },
        mechanics: {
            timerSpeed: 1.5, // Timer runs 1.5x faster
            blurredImage: true // Second image is slightly blurred
        }
    },
    {
        level: 7,
        timeLimit: 90,
        differences: [
            // ... differences for level 7
        ],
        images: {
            original: petroglyph2,
            modified: petroglyph2
        },
        mechanics: {
            flashingImage: true, // Image flashes occasionally
            reducedTime: true // Less time per difference
        }
    },
    {
        level: 8,
        timeLimit: 75,
        differences: [
            // ... differences for level 8
        ],
        images: {
            original: petroglyph3,
            modified: petroglyph3
        },
        mechanics: {
            movingImage: true, // Image shifts slightly
            noHints: true // Hints disabled
        }
    },
    {
        level: 9,
        timeLimit: 65,
        differences: [
            { x: 20, y: 30, radius: 15, description: 'Hidden symbol in pattern' },
            { x: 35, y: 45, radius: 15, description: 'Modified animal tail' },
            { x: 50, y: 60, radius: 15, description: 'Different texture pattern' },
            { x: 65, y: 25, radius: 15, description: 'Missing geometric shape' },
            { x: 80, y: 50, radius: 15, description: 'Extra decorative element' },
            { x: 90, y: 70, radius: 15, description: 'Changed line direction' }
        ],
        images: {
            original: petroglyph4,
            modified: petroglyph4
        },
        mechanics: {
            timerSpeed: 2, // Timer runs 2x faster
            blurredImage: true, // Second image is blurred
            movingImage: true, // Image shifts slightly
            noHints: true // Hints disabled
        }
    },
    {
        level: 10,
        timeLimit: 60,
        differences: [
            { x: 15, y: 25, radius: 15, description: 'Modified elephant trunk' },
            { x: 30, y: 40, radius: 15, description: 'Different eye shape' },
            { x: 45, y: 60, radius: 15, description: 'Missing tribal mark' },
            { x: 60, y: 35, radius: 15, description: 'Changed pattern direction' },
            { x: 75, y: 55, radius: 15, description: 'Extra symbolic element' },
            { x: 85, y: 70, radius: 15, description: 'Different border style' },
            { x: 95, y: 45, radius: 15, description: 'Hidden ancient symbol' }
        ],
        images: {
            original: petroglyph5,
            modified: petroglyph5
        },
        mechanics: {
            timerSpeed: 2.5, // Timer runs even faster
            blurredImage: true, // Second image is blurred
            movingImage: true, // Image shifts
            noHints: true, // No hints allowed
            flashingImage: true, // Image flashes occasionally
            reducedTime: true // Less time per difference
        }
    }
];

function SpotDifference() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [foundDifferences, setFoundDifferences] = useState([]);
    const [timeLeft, setTimeLeft] = useState(difficultyLevels[0].timeLimit);
    const [markers, setMarkers] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hoveredDifference, setHoveredDifference] = useState(null);
    const [score, setScore] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [powerUps, setPowerUps] = useState({
        freezeTime: 2,
        showAll: 1,
        extraTime: 1
    });
    const [timerPaused, setTimerPaused] = useState(false);
    const [combo, setCombo] = useState(0);
    const [achievements, setAchievements] = useState([]);
    const [showAchievement, setShowAchievement] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
        useMagnifier: true,
        soundEnabled: true,
        showHints: true
    });

    const level = difficultyLevels[currentLevel];

    useEffect(() => {
        if (!timerPaused) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [currentLevel, timerPaused]);

    const handleImageClick = (e, imageIndex) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const foundDiff = level.differences.find(diff =>
            !foundDifferences.includes(diff) &&
            Math.hypot(diff.x - x, diff.y - y) < diff.radius
        );

        if (foundDiff) {
            // Increment combo for correct finds
            setCombo(prev => prev + 1);
            setTimeout(() => setCombo(0), 3000); // Reset combo after 3 seconds

            // Check for achievements
            if (foundDifferences.length === 0) {
                unlockAchievement('FIRST_FIND');
            }
            if (combo === 2) {
                unlockAchievement('COMBO_3');
            }

            setFoundDifferences(prev => [...prev, foundDiff]);
            const timeBonus = Math.floor(timeLeft / 2);
            const comboBonus = combo * 50; // Add combo bonus
            const points = 100 + timeBonus + comboBonus;
            setScore(prev => prev + points);

            if (foundDifferences.length + 1 === level.differences.length) {
                if (markers.length === 0) {
                    unlockAchievement('PERFECT_LEVEL');
                }
                handleLevelComplete();
            }
        } else {
            setCombo(0); // Reset combo on mistakes
            setScore(prev => Math.max(0, prev - 20));
            const markerId = Date.now();
            setMarkers(prev => [...prev, {
                x, y, imageIndex,
                found: false,
                id: markerId
            }]);
            setTimeout(() => {
                setMarkers(prev => prev.filter(m => m.id !== markerId));
            }, 500);
        }
    };

    const handleLevelComplete = () => {
        if (currentLevel < difficultyLevels.length - 1) {
            setTimeout(() => {
                setCurrentLevel(prev => prev + 1);
                setFoundDifferences([]);
                setMarkers([]);
                setTimeLeft(difficultyLevels[currentLevel + 1].timeLimit);
            }, 2000);
        } else {
            setIsGameOver(true);
        }
    };

    const handleMouseMove = (e, wrapper) => {
        if (!settings.useMagnifier) return;
        const rect = wrapper.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handlePowerUp = (type) => {
        switch (type) {
            case 'freezeTime':
                if (powerUps.freezeTime > 0) {
                    setPowerUps(prev => ({ ...prev, freezeTime: prev.freezeTime - 1 }));
                    setTimerPaused(true);
                    setTimeout(() => setTimerPaused(false), 5000);
                }
                break;
            case 'showAll':
                if (powerUps.showAll > 0) {
                    setPowerUps(prev => ({ ...prev, showAll: prev.showAll - 1 }));
                    setShowHint(true);
                    setTimeout(() => setShowHint(false), 3000);
                }
                break;
            case 'extraTime':
                if (powerUps.extraTime > 0) {
                    setPowerUps(prev => ({ ...prev, extraTime: prev.extraTime - 1 }));
                    setTimeLeft(prev => prev + 30);
                }
                break;
            default:
                console.log('Unknown power-up type:', type);
                break;
        }
    };

    const PowerUpsBar = styled.div`
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0;
    `;

    const PowerUpButton = styled(motion.button)`
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background: ${props => props.disabled ? '#ccc' : '#4ECDC4'};
        color: white;
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
        opacity: ${props => props.disabled ? 0.5 : 1};
    `;

    // Define achievements
    const achievementsList = {
        FIRST_FIND: {
            id: 'FIRST_FIND',
            title: 'First Discovery!',
            description: 'Found your first difference',
            icon: '🎯'
        },
        COMBO_3: {
            id: 'COMBO_3',
            title: 'Combo Master',
            description: 'Found 3 differences in quick succession',
            icon: '🔥'
        },
        SPEED_DEMON: {
            id: 'SPEED_DEMON',
            title: 'Speed Demon',
            description: 'Found a difference in under 2 seconds',
            icon: '⚡'
        },
        PERFECT_LEVEL: {
            id: 'PERFECT_LEVEL',
            title: 'Perfect Clear!',
            description: 'Completed a level without mistakes',
            icon: '✨'
        }
    };

    // Add achievement handler
    const unlockAchievement = (achievementId) => {
        if (!achievements.includes(achievementId)) {
            setAchievements(prev => [...prev, achievementId]);
            setShowAchievement(achievementsList[achievementId]);
            setTimeout(() => setShowAchievement(null), 3000);
        }
    };

    // Add settings component
    const Settings = () => (
        <AnimatePresence>
            {showSettings && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 1000
                        }}
                        onClick={() => setShowSettings(false)}
                    />
                    <SettingsPanel
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <h2>Game Settings</h2>

                        <SettingRow>
                            <span>Magnifying Lens</span>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.useMagnifier}
                                    onChange={e => setSettings(prev => ({
                                        ...prev,
                                        useMagnifier: e.target.checked
                                    }))}
                                />
                                <span />
                            </ToggleSwitch>
                        </SettingRow>

                        <SettingRow>
                            <span>Sound Effects</span>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.soundEnabled}
                                    onChange={e => setSettings(prev => ({
                                        ...prev,
                                        soundEnabled: e.target.checked
                                    }))}
                                />
                                <span />
                            </ToggleSwitch>
                        </SettingRow>

                        <SettingRow>
                            <span>Show Hints</span>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.showHints}
                                    onChange={e => setSettings(prev => ({
                                        ...prev,
                                        showHints: e.target.checked
                                    }))}
                                />
                                <span />
                            </ToggleSwitch>
                        </SettingRow>

                        <button
                            onClick={() => setShowSettings(false)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#4ECDC4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                marginTop: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Close Settings
                        </button>
                    </SettingsPanel>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <GameContainer>
            <SettingsButton
                onClick={() => setShowSettings(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                ⚙️ Settings
            </SettingsButton>

            <Settings />

            <ScoreBoard>
                <h2>Level {currentLevel + 1}</h2>
                <Timer isLow={timeLeft <= 30}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Timer>
                <p>Found {foundDifferences.length} of {level.differences.length} differences</p>

                {/* Game Controls Section */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    margin: '1rem 0',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => setShowHint(!showHint)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: showHint ? '#FF6B6B' : '#4ECDC4',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>

                    <button
                        onClick={() => setSettings(prev => ({ ...prev, useMagnifier: !prev.useMagnifier }))}
                        style={{
                            padding: '0.5rem 1rem',
                            background: settings.useMagnifier ? '#4ECDC4' : '#ccc',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        🔍 Magnifier: {settings.useMagnifier ? 'ON' : 'OFF'}
                    </button>

                    <button
                        onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                        style={{
                            padding: '0.5rem 1rem',
                            background: settings.soundEnabled ? '#4ECDC4' : '#ccc',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        🔊 Sound: {settings.soundEnabled ? 'ON' : 'OFF'}
                    </button>
                </div>

                <ScoreDisplay>
                    <div>
                        <h3>Score</h3>
                        <p>{score}</p>
                    </div>
                    <div>
                        <h3>Time Bonus</h3>
                        <p>+{Math.floor(timeLeft / 2)}</p>
                    </div>
                </ScoreDisplay>
                <PowerUpsBar>
                    <PowerUpButton
                        disabled={powerUps.freezeTime === 0}
                        onClick={() => handlePowerUp('freezeTime')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ⏸️ Freeze Time ({powerUps.freezeTime})
                    </PowerUpButton>
                    <PowerUpButton
                        disabled={powerUps.showAll === 0}
                        onClick={() => handlePowerUp('showAll')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        👁️ Show All ({powerUps.showAll})
                    </PowerUpButton>
                    <PowerUpButton
                        disabled={powerUps.extraTime === 0}
                        onClick={() => handlePowerUp('extraTime')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ⏰ +30s ({powerUps.extraTime})
                    </PowerUpButton>
                </PowerUpsBar>
            </ScoreBoard>

            <ImagesContainer>
                {[0, 1].map(index => (
                    <ImageWrapper
                        key={index}
                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                        onMouseEnter={() => setShowMagnifier(true)}
                        onMouseLeave={() => setShowMagnifier(false)}
                    >
                        <Image
                            src={level.images.original}
                            onClick={(e) => handleImageClick(e, index)}
                        />

                        <MagnifyingGlass
                            show={showMagnifier && settings.useMagnifier}
                            style={{
                                left: mousePos.x,
                                top: mousePos.y,
                                backgroundImage: `url(${level.images.original})`,
                                backgroundPosition: `-${mousePos.x * 2}px -${mousePos.y * 2}px`,
                                backgroundSize: '200%'
                            }}
                        />

                        {index === 1 && level.differences.map((diff, i) => (
                            <DifferenceOverlay
                                key={i}
                                found={foundDifferences.includes(diff)}
                                style={{
                                    left: `${diff.x}%`,
                                    top: `${diff.y}%`,
                                    opacity: showHint || foundDifferences.includes(diff) ? 1 : 0
                                }}
                                onMouseEnter={() => setHoveredDifference(diff)}
                                onMouseLeave={() => setHoveredDifference(null)}
                                animate={foundDifferences.includes(diff) ?
                                    { scale: [1, 1.2, 1] } :
                                    { scale: 1 }
                                }
                                transition={{ duration: 0.5 }}
                            >
                                {foundDifferences.includes(diff) && '✓'}
                            </DifferenceOverlay>
                        ))}

                        {hoveredDifference && (
                            <DifferenceDescription
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    left: `${hoveredDifference.x}%`,
                                    top: `${hoveredDifference.y + 30}%`
                                }}
                            >
                                {hoveredDifference.description}
                            </DifferenceDescription>
                        )}

                        <AnimatePresence>
                            {markers
                                .filter(m => m.imageIndex === index)
                                .map(marker => (
                                    <Marker
                                        key={marker.id}
                                        found={marker.found}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        style={{
                                            left: `${marker.x}%`,
                                            top: `${marker.y}%`
                                        }}
                                    />
                                ))}
                        </AnimatePresence>
                    </ImageWrapper>
                ))}
            </ImagesContainer>

            <AnimatePresence>
                {isGameOver && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '12px',
                            marginTop: '2rem'
                        }}
                    >
                        <h2>
                            {foundDifferences.length === level.differences.length
                                ? 'Congratulations! 🎉'
                                : 'Time\'s Up! ⏰'}
                        </h2>
                        <p>You found {foundDifferences.length} differences!</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add combo display */}
            <AnimatePresence>
                {combo > 1 && (
                    <ComboDisplay
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        {combo}x Combo! 🔥
                    </ComboDisplay>
                )}
            </AnimatePresence>

            {/* Add achievement popup */}
            <AnimatePresence>
                {showAchievement && (
                    <AchievementPopup
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                    >
                        <div className="icon">{showAchievement.icon}</div>
                        <div className="text">
                            <h3>{showAchievement.title}</h3>
                            <p>{showAchievement.description}</p>
                        </div>
                    </AchievementPopup>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default SpotDifference; 