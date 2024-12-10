import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ScenarioArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin: 2rem 0;
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

const HazardMarker = styled(motion.button)`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  background: ${props => props.identified ? '#4ECDC4' : '#FF6B6B'};
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SafetyCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'primary' ? '#4ECDC4' : '#eee'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  cursor: pointer;
  font-weight: bold;
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

const scenarios = [
    {
        id: 1,
        title: "Site Access Safety",
        image: "https://images.unsplash.com/photo-1682686581030-e77f17283e04",
        description: "Identify potential hazards and safety concerns at the site entrance",
        hazards: [
            {
                id: 'h1',
                x: 30,
                y: 40,
                type: 'physical',
                icon: '⚠️',
                description: 'Unstable ground near petroglyph panel',
                solution: 'Install safety barriers and warning signs'
            },
            {
                id: 'h2',
                x: 60,
                y: 50,
                type: 'environmental',
                icon: '🌧️',
                description: 'Water erosion risk during rainy season',
                solution: 'Implement drainage system and protective covering'
            }
        ],
        tips: [
            'Always wear appropriate safety gear',
            'Check weather conditions before visiting',
            'Follow designated paths'
        ]
    }
    // Add more scenarios...
];

function SiteSafety() {
    const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
    const [identifiedHazards, setIdentifiedHazards] = useState(new Set());
    const [selectedHazard, setSelectedHazard] = useState(null);
    const [implementedSolutions, setImplementedSolutions] = useState(new Set());
    const [score, setScore] = useState(0);

    const handleHazardClick = (hazard) => {
        setSelectedHazard(hazard);
        if (!identifiedHazards.has(hazard.id)) {
            const newIdentified = new Set(identifiedHazards);
            newIdentified.add(hazard.id);
            setIdentifiedHazards(newIdentified);
            setScore(score + 10);
        }
    };

    const handleImplementSolution = () => {
        if (selectedHazard && !implementedSolutions.has(selectedHazard.id)) {
            const newImplemented = new Set(implementedSolutions);
            newImplemented.add(selectedHazard.id);
            setImplementedSolutions(newImplemented);
            setScore(score + 20);
        }
    };

    const progress = (implementedSolutions.size / currentScenario.hazards.length) * 100;

    return (
        <GameContainer>
            <h2>Archaeological Site Safety</h2>
            <p>Identify hazards and implement safety measures to protect the site</p>

            <ScenarioArea>
                <SceneViewer>
                    <Scene image={currentScenario.image}>
                        {currentScenario.hazards.map(hazard => (
                            <HazardMarker
                                key={hazard.id}
                                identified={identifiedHazards.has(hazard.id)}
                                style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
                                onClick={() => handleHazardClick(hazard)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {hazard.icon}
                            </HazardMarker>
                        ))}
                    </Scene>

                    <ProgressBar>
                        <Progress animate={{ width: `${progress}%` }} />
                    </ProgressBar>
                </SceneViewer>

                <ControlPanel>
                    <SafetyCard>
                        <h3>Current Score: {score}</h3>
                        <p>{currentScenario.description}</p>

                        {selectedHazard && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h4>Selected Hazard</h4>
                                <p>{selectedHazard.description}</p>
                                <ActionButton
                                    variant="primary"
                                    onClick={handleImplementSolution}
                                    disabled={implementedSolutions.has(selectedHazard.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {implementedSolutions.has(selectedHazard.id)
                                        ? 'Solution Implemented ✓'
                                        : 'Implement Solution'}
                                </ActionButton>
                                {implementedSolutions.has(selectedHazard.id) && (
                                    <p style={{ color: '#4ECDC4', marginTop: '0.5rem' }}>
                                        {selectedHazard.solution}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </SafetyCard>

                    <SafetyCard>
                        <h3>Safety Tips</h3>
                        <ul>
                            {currentScenario.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </SafetyCard>
                </ControlPanel>
            </ScenarioArea>

            <AnimatePresence>
                {progress === 100 && (
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
                        <h2>Site Secured! 🎉</h2>
                        <p>You've successfully identified and addressed all safety concerns.</p>
                        <p>Final Score: {score}</p>
                        <ActionButton
                            onClick={() => window.location.reload()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Another Scenario
                        </ActionButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default SiteSafety; 