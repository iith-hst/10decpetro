import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const QuizArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const QuestionCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  max-height: 300px;
  object-fit: cover;
`;

const OptionsGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Option = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${props =>
        props.selected ? '#4ECDC4' :
            props.correct ? '#4ECDC4' :
                props.incorrect ? '#FF6B6B' : '#eee'};
  border-radius: 8px;
  background: ${props =>
        props.correct ? '#E5F9F6' :
            props.incorrect ? '#FFE5E5' : 'white'};
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
`;

const ScorePanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
`;

const questions = [
    {
        id: 1,
        question: "Which method is most appropriate for documenting petroglyphs without physical contact?",
        image: "/images/methods/documentation.jpg",
        options: [
            {
                text: "Photogrammetry and 3D scanning",
                correct: true,
                explanation: "Non-invasive digital documentation preserves site integrity while creating accurate records"
            },
            {
                text: "Rubbing with paper and charcoal",
                correct: false,
                explanation: "This method can damage the surface and should be avoided"
            },
            {
                text: "Direct tracing",
                correct: false,
                explanation: "Physical contact can harm petroglyphs and should be minimized"
            },
            {
                text: "Plaster casting",
                correct: false,
                explanation: "Too invasive and can damage the rock art surface"
            }
        ]
    },
    {
        id: 2,
        question: "What is the first step in recording a newly discovered petroglyph site?",
        image: "/images/methods/site-recording.jpg",
        options: [
            {
                text: "Start cleaning the area",
                correct: false,
                explanation: "Cleaning should only be done after proper documentation"
            },
            {
                text: "Take photographs and GPS coordinates",
                correct: true,
                explanation: "Initial documentation is crucial for site identification and protection"
            },
            {
                text: "Begin excavation",
                correct: false,
                explanation: "Excavation requires planning and proper permits"
            },
            {
                text: "Remove vegetation",
                correct: false,
                explanation: "Vegetation removal needs careful assessment first"
            }
        ]
    },
    {
        id: 3,
        question: "What tool should be used to measure the scale of petroglyphs?",
        image: "/images/methods/measuring.jpg",
        options: [
            {
                text: "Standard measuring tape",
                correct: false,
                explanation: "Not accurate enough for scientific documentation"
            },
            {
                text: "Photographic scale bar",
                correct: true,
                explanation: "Provides consistent scale reference for photographs and ensures accurate measurements"
            },
            {
                text: "Ruler",
                correct: false,
                explanation: "Too small and imprecise for archaeological documentation"
            },
            {
                text: "Estimated measurements",
                correct: false,
                explanation: "Lacks scientific accuracy required for documentation"
            }
        ]
    },
    {
        id: 4,
        question: "What is the best time of day to photograph petroglyphs?",
        image: "/images/methods/lighting.jpg",
        options: [
            {
                text: "Direct midday sunlight",
                correct: false,
                explanation: "Creates harsh shadows and can wash out details"
            },
            {
                text: "Dawn or dusk (oblique lighting)",
                correct: true,
                explanation: "Low-angle light enhances visibility of carved details"
            },
            {
                text: "Night with flash",
                correct: false,
                explanation: "Flash can create misleading shadows and reflections"
            },
            {
                text: "Cloudy midday",
                correct: false,
                explanation: "Diffused light may not reveal subtle surface details"
            }
        ]
    },
    {
        id: 5,
        question: "How should you record the context of a petroglyph site?",
        image: "/images/methods/context.jpg",
        options: [
            {
                text: "Focus only on the art",
                correct: false,
                explanation: "Misses important environmental and cultural context"
            },
            {
                text: "Document surrounding landscape and features",
                correct: true,
                explanation: "Provides crucial information about site selection and cultural significance"
            },
            {
                text: "Record only visible artifacts",
                correct: false,
                explanation: "Ignores important geographical and environmental factors"
            },
            {
                text: "Map only the main panels",
                correct: false,
                explanation: "Misses relationships between different elements of the site"
            }
        ]
    },
    {
        id: 6,
        question: "What is the primary concern when documenting petroglyphs in a humid environment?",
        image: "/images/methods/humidity.jpg",
        options: [
            {
                text: "Biological growth on rock surfaces",
                correct: true,
                explanation: "Moisture promotes algae and lichen growth that can damage petroglyphs"
            },
            {
                text: "Fading of pigments",
                correct: false,
                explanation: "While important, this is secondary to biological growth in humid conditions"
            },
            {
                text: "Wind erosion",
                correct: false,
                explanation: "Not a primary concern in humid environments"
            },
            {
                text: "Sun damage",
                correct: false,
                explanation: "Less significant in humid environments compared to biological growth"
            }
        ]
    },
    {
        id: 7,
        question: "Which method is most appropriate for creating a detailed surface map of petroglyphs?",
        image: "/images/methods/surface-mapping.jpg",
        options: [
            {
                text: "Hand drawing",
                correct: false,
                explanation: "Too subjective and lacks precise measurements"
            },
            {
                text: "RTI (Reflectance Transformation Imaging)",
                correct: true,
                explanation: "Provides detailed surface information and can reveal subtle features"
            },
            {
                text: "Single photograph",
                correct: false,
                explanation: "Insufficient for capturing surface details"
            },
            {
                text: "Video recording",
                correct: false,
                explanation: "Not precise enough for detailed surface mapping"
            }
        ]
    },
    {
        id: 8,
        question: "What is the correct procedure for documenting superimposed petroglyphs?",
        image: "/images/methods/superimposed.jpg",
        options: [
            {
                text: "Document only the clearest layer",
                correct: false,
                explanation: "Misses important chronological information"
            },
            {
                text: "Record each layer separately and their relationships",
                correct: true,
                explanation: "Preserves chronological sequence and cultural information"
            },
            {
                text: "Photograph the overall image only",
                correct: false,
                explanation: "Fails to capture layer relationships"
            },
            {
                text: "Focus on the most recent layer",
                correct: false,
                explanation: "Ignores valuable historical data"
            }
        ]
    },
    {
        id: 9,
        question: "What is the best practice for recording color in petroglyphs?",
        image: "/images/methods/color-recording.jpg",
        options: [
            {
                text: "Use standard color chart in photographs",
                correct: true,
                explanation: "Provides consistent color reference and calibration"
            },
            {
                text: "Rely on camera auto settings",
                correct: false,
                explanation: "Can lead to inconsistent color representation"
            },
            {
                text: "Describe colors in notes only",
                correct: false,
                explanation: "Too subjective and lacks standardization"
            },
            {
                text: "Match colors by eye",
                correct: false,
                explanation: "Not scientifically reliable or reproducible"
            }
        ]
    },
    {
        id: 10,
        question: "How should you document petroglyph damage or deterioration?",
        image: "/images/methods/damage-assessment.jpg",
        options: [
            {
                text: "Photograph only the damaged areas",
                correct: false,
                explanation: "Misses context and extent of damage"
            },
            {
                text: "Create detailed condition report with mapping",
                correct: true,
                explanation: "Provides comprehensive assessment for monitoring and conservation"
            },
            {
                text: "Note general condition only",
                correct: false,
                explanation: "Too vague for proper conservation planning"
            },
            {
                text: "Focus on aesthetic impact",
                correct: false,
                explanation: "Neglects scientific assessment of deterioration"
            }
        ]
    }
];

const difficultyLevels = [
    {
        level: 1,
        title: "Basic Documentation",
        description: "Learn fundamental documentation methods",
        requiredScore: 70,
        questions: [1, 2, 3],
        timeLimit: 60,
        rewards: {
            points: 100,
            achievement: "documentation_basics"
        }
    },
    {
        level: 2,
        title: "Site Analysis",
        description: "Advanced site analysis techniques",
        requiredScore: 75,
        questions: [4, 5, 6],
        timeLimit: 55,
        rewards: {
            points: 150,
            achievement: "site_analyst"
        }
    },
    {
        level: 3,
        title: "Conservation Methods",
        description: "Learn proper conservation and preservation techniques",
        requiredScore: 80,
        questions: [7, 8, 9],
        timeLimit: 50,
        rewards: {
            points: 200,
            achievement: "conservator"
        }
    },
    {
        level: 4,
        title: "Advanced Documentation",
        description: "Master complex documentation methods",
        requiredScore: 85,
        questions: [10, 11, 12],
        timeLimit: 45,
        rewards: {
            points: 250,
            achievement: "master_documenter"
        }
    },
    {
        level: 5,
        title: "Expert Analysis",
        description: "Expert-level site analysis and interpretation",
        requiredScore: 90,
        questions: [13, 14, 15],
        timeLimit: 40,
        rewards: {
            points: 300,
            achievement: "expert_analyst"
        }
    }
];

const achievements = [
    {
        id: "quick_learner",
        title: "Quick Learner",
        description: "Complete a level in under 30 seconds",
        icon: "⚡"
    },
    {
        id: "perfect_score",
        title: "Perfect Score",
        description: "Answer all questions correctly in a level",
        icon: "🎯"
    },
    {
        id: "documentation_master",
        title: "Documentation Master",
        description: "Complete all documentation levels with perfect scores",
        icon: "📸"
    },
    {
        id: "speed_archaeologist",
        title: "Speed Archaeologist",
        description: "Complete 3 levels in under 2 minutes each",
        icon: "⚡"
    },
    {
        id: "conservation_expert",
        title: "Conservation Expert",
        description: "Master all conservation-related questions",
        icon: "🏺"
    },
    {
        id: "streak_master",
        title: "Streak Master",
        description: "Maintain a 10-question correct streak",
        icon: "🔥"
    },
    {
        id: "site_guardian",
        title: "Site Guardian",
        description: "Perfect score on all site protection questions",
        icon: "🛡️"
    }
];

function ArchaeologyMethodsQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [streak, setStreak] = useState(0);

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const correct = questions[currentQuestion].options[index].correct;

        if (correct) {
            setScore(score + (streak + 1) * 10);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }

        setShowExplanation(true);

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setShowExplanation(false);
            } else {
                setQuizComplete(true);
            }
        }, 2000);
    };

    return (
        <GameContainer>
            <h2>Archaeological Methods Quiz</h2>
            <p>Test your knowledge of proper archaeological techniques</p>

            <QuizArea>
                <QuestionCard>
                    <QuestionImage
                        src={questions[currentQuestion].image}
                        alt="Archaeological method"
                    />
                    <h3>{questions[currentQuestion].question}</h3>

                    <OptionsGrid>
                        {questions[currentQuestion].options.map((option, index) => (
                            <Option
                                key={index}
                                selected={selectedOption === index}
                                correct={showExplanation && option.correct}
                                incorrect={showExplanation && selectedOption === index && !option.correct}
                                onClick={() => handleOptionSelect(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={selectedOption !== null}
                            >
                                {option.text}
                                {showExplanation && selectedOption === index && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ color: '#666', marginTop: '0.5rem' }}
                                    >
                                        {option.explanation}
                                    </motion.p>
                                )}
                            </Option>
                        ))}
                    </OptionsGrid>
                </QuestionCard>

                <ScorePanel>
                    <h3>Progress</h3>
                    <ProgressBar>
                        <Progress
                            animate={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`
                            }}
                        />
                    </ProgressBar>

                    <div>
                        <h4>Score: {score}</h4>
                        <p>Streak: {streak} 🔥</p>
                    </div>
                </ScorePanel>
            </QuizArea>

            <AnimatePresence>
                {quizComplete && (
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
                        <h2>Quiz Complete! 🎉</h2>
                        <p>Final Score: {score}</p>
                        <p>Longest Streak: {streak}</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{ marginTop: '1rem' }}
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default ArchaeologyMethodsQuiz; 