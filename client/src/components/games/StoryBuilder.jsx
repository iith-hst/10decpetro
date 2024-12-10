import { useState } from 'react';
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
  padding: 1rem;
`;

const StoryArea = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PetroglyphPalette = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const PetroglyphItem = styled(motion.div)`
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100px;
    object-fit: contain;
    border-radius: 4px;
  }

  &:active {
    cursor: grabbing;
  }
`;

const StoryBoard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;

const StoryScene = styled(motion.div)`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  align-items: center;
`;

const SceneImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 4px;
`;

const SceneText = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 2px solid #eee;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4ECDC4;
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
`;

const SharePanel = styled(motion.div)`
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
  z-index: 1000;
`;

const TutorialOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const TutorialPanel = styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;

    h2 {
        color: #4ECDC4;
        margin-bottom: 1rem;
    }

    .steps {
        margin: 2rem 0;
        display: grid;
        gap: 1rem;
    }

    .step {
        display: flex;
        gap: 1rem;
        align-items: start;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;

        .number {
            background: #4ECDC4;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
    }
`;

const ChallengeModal = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ChallengeCard = styled(motion.div)`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 1rem;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .requirements, .bonus {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .reward {
        color: #4ECDC4;
        font-weight: bold;
        margin-top: 0.5rem;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    margin: 1rem 0;
    overflow: hidden;

    .fill {
        height: 100%;
        background: #4ECDC4;
        width: ${props => props.progress}%;
        transition: width 0.3s ease;
    }
`;

const petroglyphElements = [
    {
        id: 1,
        image: petroglyph1,
        title: 'Hunter',
        suggestedText: 'A skilled hunter tracking prey...'
    },
    {
        id: 2,
        image: petroglyph2,
        title: 'Ceremony',
        suggestedText: 'The community gathered for an important ritual...'
    },
    {
        id: 3,
        image: petroglyph3,
        title: 'Animals',
        suggestedText: 'A herd of animals moving across the landscape...'
    },
    {
        id: 4,
        image: petroglyph4,
        title: 'Symbols',
        suggestedText: 'Ancient symbols telling a story of...'
    },
    {
        id: 5,
        image: petroglyph5,
        title: 'Daily Life',
        suggestedText: 'Scenes from everyday life in ancient times...'
    }
];

// Add story challenges and levels
const storyLevels = [
    {
        id: 'beginner',
        title: 'Basic Storyteller',
        description: 'Create simple stories with 3-4 scenes',
        requirements: {
            minScenes: 3,
            minWordsPerScene: 10,
            themes: ['daily_life', 'hunting'],
            requiredElements: ['human', 'animal']
        },
        reward: 100
    },
    {
        id: 'intermediate',
        title: 'Narrative Weaver',
        description: 'Create complex stories with multiple characters',
        requirements: {
            minScenes: 5,
            minWordsPerScene: 20,
            themes: ['ceremony', 'community'],
            requiredElements: ['human', 'animal', 'symbol'],
            requiredTransitions: true
        },
        reward: 200
    },
    {
        id: 'expert',
        title: 'Master Storyteller',
        description: 'Create epic tales with cultural significance',
        requirements: {
            minScenes: 7,
            minWordsPerScene: 30,
            themes: ['mythology', 'ritual'],
            requiredElements: ['all'],
            requiredTransitions: true,
            culturalContext: true
        },
        reward: 300
    }
];

// Add story prompts for challenges
const storyPrompts = [
    {
        id: 'hunt',
        title: 'The Great Hunt',
        description: 'Tell a story about a community preparing for and conducting a hunt',
        requiredElements: ['Hunter', 'Animals'],
        bonusElements: ['Symbols'],
        reward: 150
    },
    {
        id: 'ritual',
        title: 'Sacred Ceremony',
        description: 'Create a narrative about an important ritual or ceremony',
        requiredElements: ['Ceremony', 'Symbols'],
        bonusElements: ['Daily Life'],
        reward: 200
    },
    {
        id: 'journey',
        title: 'The Migration',
        description: "Tell a story of a community's journey to new lands",
        requiredElements: ['Daily Life', 'Animals'],
        bonusElements: ['Symbols', 'Hunter'],
        reward: 250
    }
];

function StoryBuilder() {
    const [storyScenes, setStoryScenes] = useState([]);
    const [showShare, setShowShare] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const [currentLevel, setCurrentLevel] = useState('beginner');
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [score, setScore] = useState(0);
    const [achievements, setAchievements] = useState([]);
    const [showChallengeModal, setShowChallengeModal] = useState(false);

    const handleElementClick = (element) => {
        setStoryScenes([...storyScenes, {
            id: Date.now(),
            image: element.image,
            text: element.suggestedText
        }]);
    };

    const handleTextChange = (id, text) => {
        setStoryScenes(scenes =>
            scenes.map(scene =>
                scene.id === id ? { ...scene, text } : scene
            )
        );
    };

    const handleShare = () => {
        // Here you could implement actual sharing functionality
        setShowShare(true);
        setTimeout(() => setShowShare(false), 3000);
    };

    const handleSave = () => {
        const story = {
            title: 'My Petroglyph Story',
            scenes: storyScenes,
            date: new Date().toISOString()
        };
        localStorage.setItem(`story-${Date.now()}`, JSON.stringify(story));
    };

    const renderTutorial = () => (
        <TutorialOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <TutorialPanel
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <h2>Welcome to Petroglyph Story Builder!</h2>
                <p>Create your own stories using ancient rock art elements.</p>

                <div className="steps">
                    <div className="step">
                        <div className="number">1</div>
                        <div>
                            <h4>Choose Story Elements</h4>
                            <p>Click and drag petroglyph elements from the left panel into your story board.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="number">2</div>
                        <div>
                            <h4>Arrange Your Story</h4>
                            <p>Drag elements up or down to rearrange them and create your narrative sequence.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="number">3</div>
                        <div>
                            <h4>Add Descriptions</h4>
                            <p>Write descriptions for each scene to tell your story. Use the suggested text or create your own.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="number">4</div>
                        <div>
                            <h4>Save & Share</h4>
                            <p>Save your story to keep it or share it with others!</p>
                        </div>
                    </div>
                </div>

                <Button onClick={() => setShowTutorial(false)}>
                    Start Creating
                </Button>
            </TutorialPanel>
        </TutorialOverlay>
    );

    // Add challenge selection modal
    const renderChallengeModal = () => (
        <motion.div className="challenge-modal">
            <h3>Choose Your Challenge</h3>
            {storyPrompts.map(prompt => (
                <motion.div
                    key={prompt.id}
                    className="challenge-card"
                    onClick={() => startChallenge(prompt)}
                >
                    <h4>{prompt.title}</h4>
                    <p>{prompt.description}</p>
                    <div className="requirements">
                        <strong>Required:</strong> {prompt.requiredElements.join(', ')}
                    </div>
                    <div className="bonus">
                        <strong>Bonus:</strong> {prompt.bonusElements.join(', ')}
                    </div>
                    <div className="reward">Reward: {prompt.reward} points</div>
                </motion.div>
            ))}
        </motion.div>
    );

    // Add story evaluation function
    const evaluateStory = () => {
        const currentLevelData = storyLevels.find(l => l.id === currentLevel);
        let points = 0;
        let feedback = [];

        // Check scene count
        if (storyScenes.length >= currentLevelData.requirements.minScenes) {
            points += 50;
            feedback.push('✅ Sufficient number of scenes');
        }

        // Check word count per scene
        const allScenesHaveMinWords = storyScenes.every(
            scene => scene.text.split(' ').length >= currentLevelData.requirements.minWordsPerScene
        );
        if (allScenesHaveMinWords) {
            points += 50;
            feedback.push('✅ Good scene descriptions');
        }

        // Check required elements
        const hasRequiredElements = currentLevelData.requirements.requiredElements.every(
            element => storyScenes.some(scene => scene.text.toLowerCase().includes(element))
        );
        if (hasRequiredElements) {
            points += 100;
            feedback.push('✅ Used all required elements');
        }

        return { points, feedback };
    };

    // Add challenge completion handler
    const completeChallenge = () => {
        const evaluation = evaluateStory();
        setScore(prev => prev + evaluation.points);

        // Check for level progression
        const nextLevel = storyLevels[storyLevels.findIndex(l => l.id === currentLevel) + 1];
        if (nextLevel && score + evaluation.points >= nextLevel.requirements.minScore) {
            setCurrentLevel(nextLevel.id);
            setAchievements(prev => [...prev, `Reached ${nextLevel.title}!`]);
        }

        return evaluation;
    };

    // Add function to start a challenge
    const startChallenge = (prompt) => {
        setCurrentChallenge(prompt);
        setShowChallengeModal(false);
        // Reset story for new challenge
        setStoryScenes([]);
    };

    return (
        <GameContainer>
            <AnimatePresence>
                {showTutorial && renderTutorial()}
            </AnimatePresence>

            <div className="game-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h2>Level: {storyLevels.find(l => l.id === currentLevel).title}</h2>
                    <p>Score: {score} points</p>
                    <ProgressBar progress={(score / storyLevels.find(l => l.id === currentLevel).reward) * 100}>
                        <div className="fill" />
                    </ProgressBar>
                </div>
                <Button onClick={() => setShowChallengeModal(true)}>
                    Start New Challenge
                </Button>
            </div>

            {currentChallenge && (
                <div className="challenge-info" style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                }}>
                    <h3>{currentChallenge.title}</h3>
                    <p>{currentChallenge.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <div>Required: {currentChallenge.requiredElements.map(el =>
                            <span key={el} style={{
                                padding: '0.25rem 0.5rem',
                                background: storyScenes.some(scene =>
                                    scene.text.toLowerCase().includes(el.toLowerCase())
                                ) ? '#4ECDC4' : '#eee',
                                borderRadius: '4px',
                                margin: '0 0.25rem',
                                color: storyScenes.some(scene =>
                                    scene.text.toLowerCase().includes(el.toLowerCase())
                                ) ? 'white' : 'black'
                            }}>{el}</span>
                        )}</div>
                        <div>Bonus: {currentChallenge.bonusElements.map(el =>
                            <span key={el} style={{
                                padding: '0.25rem 0.5rem',
                                background: '#FFD93D',
                                borderRadius: '4px',
                                margin: '0 0.25rem'
                            }}>{el}</span>
                        )}</div>
                    </div>
                </div>
            )}

            <h2>Create Your Petroglyph Story</h2>
            <p>Click on elements to add them to your story and create your narrative</p>

            <StoryArea>
                <PetroglyphPalette>
                    <h3>Story Elements</h3>
                    {petroglyphElements.map(element => (
                        <PetroglyphItem
                            key={element.id}
                            onClick={() => handleElementClick(element)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img src={element.image} alt={element.title} />
                            <p>{element.title}</p>
                        </PetroglyphItem>
                    ))}
                </PetroglyphPalette>

                <StoryBoard>
                    <Reorder.Group axis="y" values={storyScenes} onReorder={setStoryScenes}>
                        {storyScenes.map(scene => (
                            <Reorder.Item key={scene.id} value={scene}>
                                <StoryScene
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <SceneImage src={scene.image} alt="Scene" />
                                    <SceneText
                                        value={scene.text}
                                        onChange={(e) => handleTextChange(scene.id, e.target.value)}
                                        placeholder="Tell your story..."
                                    />
                                </StoryScene>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                    {storyScenes.length > 0 && (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Button
                                onClick={handleSave}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                💾 Save Story
                            </Button>
                            <Button
                                onClick={handleShare}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📤 Share Story
                            </Button>
                        </div>
                    )}
                </StoryBoard>
            </StoryArea>

            <AnimatePresence>
                {showShare && (
                    <SharePanel
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <h3>Story Shared! 🎉</h3>
                        <p>Your story has been saved and can now be shared with others.</p>
                    </SharePanel>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showChallengeModal && (
                    <ChallengeModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            maxWidth: '600px',
                            width: '90%'
                        }}>
                            <h3>Choose Your Challenge</h3>
                            {storyPrompts.map(prompt => (
                                <ChallengeCard
                                    key={prompt.id}
                                    onClick={() => startChallenge(prompt)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h4>{prompt.title}</h4>
                                    <p>{prompt.description}</p>
                                    <div className="requirements">
                                        Required: {prompt.requiredElements.join(', ')}
                                    </div>
                                    <div className="bonus">
                                        Bonus: {prompt.bonusElements.join(', ')}
                                    </div>
                                    <div className="reward">
                                        Reward: {prompt.reward} points
                                    </div>
                                </ChallengeCard>
                            ))}
                            <Button onClick={() => setShowChallengeModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </ChallengeModal>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default StoryBuilder; 