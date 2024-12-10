import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ChallengeArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ScenarioPanel = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ScenarioImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResourceCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResourceBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ResourceLevel = styled(motion.div)`
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.selected ? '#4ECDC4' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`;

const ResultMessage = styled(motion.div)`
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

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const scenarios = [
    {
        id: 1,
        title: 'Water Damage Prevention',
        description: 'Recent rains have caused water to flow near valuable petroglyphs. What measures should be taken?',
        image: '/path/to/water-damage.jpg',
        options: [
            {
                id: 'drainage',
                text: 'Install drainage system',
                cost: 30,
                effectiveness: 90,
                explanation: 'A proper drainage system will redirect water away from the petroglyphs.'
            },
            {
                id: 'cover',
                text: 'Build protective cover',
                cost: 50,
                effectiveness: 95,
                explanation: 'A permanent cover will protect from all weather conditions.'
            },
            {
                id: 'barrier',
                text: 'Place temporary barriers',
                cost: 20,
                effectiveness: 60,
                explanation: 'Temporary solution that requires regular maintenance.'
            }
        ]
    },
    // Add more scenarios...
];

function ConservationChallenge() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [resources, setResources] = useState(100);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);

    const handleOptionSelect = (option) => {
        if (resources < option.cost) {
            setResult({
                success: false,
                message: 'Not enough resources for this action!'
            });
            setShowResult(true);
            return;
        }

        setSelectedOption(option);
        setResources(resources - option.cost);

        const success = option.effectiveness > 70;
        setScore(score + (success ? option.effectiveness : 0));

        setResult({
            success,
            message: option.explanation,
            effectiveness: option.effectiveness
        });
        setShowResult(true);
    };

    const handleNextScenario = () => {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
            setSelectedOption(null);
            setShowResult(false);
        } else {
            setResult({
                success: true,
                message: `Conservation Challenge Complete! Final Score: ${score}`,
                final: true
            });
            setShowResult(true);
        }
    };

    const scenario = scenarios[currentScenario];

    return (
        <GameContainer>
            <h2>Conservation Challenge</h2>
            <p>Solve conservation problems to protect petroglyph sites</p>

            <ChallengeArea>
                <ScenarioPanel>
                    <ScenarioImage src={scenario.image} alt={scenario.title} />
                    <h3>{scenario.title}</h3>
                    <p>{scenario.description}</p>
                </ScenarioPanel>

                <ControlPanel>
                    <ResourceCard>
                        <h3>Resources</h3>
                        <ResourceBar>
                            <ResourceLevel
                                color="#4ECDC4"
                                animate={{ width: `${resources}%` }}
                            />
                        </ResourceBar>
                        <p>Available: {resources} points</p>
                    </ResourceCard>

                    <ResourceCard>
                        <h3>Conservation Actions</h3>
                        {scenario.options.map(option => (
                            <ActionButton
                                key={option.id}
                                selected={selectedOption?.id === option.id}
                                onClick={() => handleOptionSelect(option)}
                                disabled={showResult}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>{option.text}</span>
                                <span style={{ marginLeft: 'auto' }}>Cost: {option.cost}</span>
                            </ActionButton>
                        ))}
                    </ResourceCard>
                </ControlPanel>
            </ChallengeArea>

            <AnimatePresence>
                {showResult && (
                    <>
                        <Overlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <ResultMessage
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                        >
                            <h3>{result.success ? '✅ Good Choice!' : '❌ Could Be Better'}</h3>
                            <p>{result.message}</p>
                            {result.effectiveness && (
                                <p>Effectiveness: {result.effectiveness}%</p>
                            )}
                            {!result.final && (
                                <ActionButton
                                    onClick={handleNextScenario}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Next Challenge
                                </ActionButton>
                            )}
                            {result.final && (
                                <ActionButton
                                    onClick={() => window.location.reload()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Play Again
                                </ActionButton>
                            )}
                        </ResultMessage>
                    </>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default ConservationChallenge; 