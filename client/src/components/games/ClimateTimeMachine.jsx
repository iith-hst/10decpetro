import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const TimelineArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PetroglyphViewer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WeatherEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${props => props.effect};
  mix-blend-mode: ${props => props.blendMode};
  opacity: ${props => props.opacity};
  pointer-events: none;
`;

const ControlPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TimeSlider = styled.input`
  width: 100%;
  margin: 1rem 0;
`;

const WeatherInfo = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

const DamageIndicator = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const DamageLevel = styled(motion.div)`
  height: 100%;
  background: ${props =>
        props.level < 30 ? '#4ECDC4' :
            props.level < 70 ? '#FFB347' :
                '#FF6B6B'};
  border-radius: 4px;
`;

const timelineData = [
    {
        year: -3000,
        climate: 'Humid',
        effects: {
            style: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,255,0.1) 100%)',
            blendMode: 'overlay',
            opacity: 0.3
        },
        damage: 0,
        description: 'Original condition, favorable climate'
    },
    {
        year: -2000,
        climate: 'Arid',
        effects: {
            style: 'linear-gradient(180deg, rgba(255,166,0,0.2) 0%, rgba(255,69,0,0.1) 100%)',
            blendMode: 'multiply',
            opacity: 0.4
        },
        damage: 20,
        description: 'Beginning of surface erosion'
    },
    // Add more time periods...
];

function ClimateTimeMachine() {
    const [currentYear, setCurrentYear] = useState(-3000);
    const [currentPeriod, setCurrentPeriod] = useState(timelineData[0]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [damageLevel, setDamageLevel] = useState(0);

    useEffect(() => {
        const period = timelineData.find(p => p.year >= currentYear) || timelineData[timelineData.length - 1];
        setCurrentPeriod(period);
        setDamageLevel(period.damage);
    }, [currentYear]);

    const handleTimeChange = (e) => {
        setCurrentYear(parseInt(e.target.value));
    };

    const startSimulation = () => {
        setIsSimulating(true);
        const simulation = setInterval(() => {
            setCurrentYear(year => {
                if (year >= 2000) {
                    clearInterval(simulation);
                    setIsSimulating(false);
                    return 2000;
                }
                return year + 100;
            });
        }, 100);
    };

    return (
        <GameContainer>
            <h2>Climate Time Machine</h2>
            <p>Observe how climate changes have affected petroglyphs over millennia</p>

            <TimelineArea>
                <PetroglyphViewer>
                    <ImageContainer>
                        <BaseImage
                            src="https://images.unsplash.com/photo-1682686581030-e77f17283e04"
                            alt="Petroglyph"
                        />
                        <WeatherEffect
                            effect={currentPeriod.effects.style}
                            blendMode={currentPeriod.effects.blendMode}
                            opacity={currentPeriod.effects.opacity}
                            animate={{ opacity: currentPeriod.effects.opacity }}
                            transition={{ duration: 0.5 }}
                        />
                    </ImageContainer>
                </PetroglyphViewer>

                <ControlPanel>
                    <h3>Time Controls</h3>
                    <TimeSlider
                        type="range"
                        min="-3000"
                        max="2000"
                        step="100"
                        value={currentYear}
                        onChange={handleTimeChange}
                    />
                    <p>Year: {currentYear} {currentYear < 0 ? 'BCE' : 'CE'}</p>

                    <motion.button
                        onClick={startSimulation}
                        disabled={isSimulating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSimulating ? 'Simulating...' : 'Start Simulation'}
                    </motion.button>

                    <WeatherInfo
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={currentPeriod.climate}
                    >
                        <h4>Climate: {currentPeriod.climate}</h4>
                        <p>{currentPeriod.description}</p>
                        <p>Damage Level:</p>
                        <DamageIndicator>
                            <DamageLevel
                                level={damageLevel}
                                animate={{ width: `${damageLevel}%` }}
                            />
                        </DamageIndicator>
                    </WeatherInfo>
                </ControlPanel>
            </TimelineArea>
        </GameContainer>
    );
}

export default ClimateTimeMachine; 