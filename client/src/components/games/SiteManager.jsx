import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
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

const SiteMap = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const MapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 4px;
  height: 100%;
`;

const Cell = styled(motion.div)`
  background: ${props => props.type === 'petroglyph' ? '#4ECDC4' :
        props.type === 'threat' ? '#FF6B6B' :
            props.type === 'protection' ? '#FFD93D' : '#f5f5f5'};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '${props => props.icon}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatusCard = styled.div`
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
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
`;

const AlertMessage = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const actions = [
    { id: 'fence', name: 'Install Fence', icon: '🚧', cost: 20 },
    { id: 'camera', name: 'Setup Camera', icon: '📷', cost: 30 },
    { id: 'sign', name: 'Place Sign', icon: '🚫', cost: 10 },
    { id: 'restore', name: 'Restore Site', icon: '🔨', cost: 50 }
];

function SiteManager() {
    const [resources, setResources] = useState(100);
    const [siteHealth, setSiteHealth] = useState(100);
    const [selectedAction, setSelectedAction] = useState(null);
    const [grid, setGrid] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Initialize grid with petroglyphs and random threats
        const initialGrid = Array(48).fill(null).map((_, index) => ({
            id: index,
            type: Math.random() < 0.2 ? 'petroglyph' :
                Math.random() < 0.1 ? 'threat' : null,
            protection: null
        }));
        setGrid(initialGrid);
    }, []);

    useEffect(() => {
        // Periodic threat assessment
        const interval = setInterval(() => {
            const threats = grid.filter(cell => cell.type === 'threat' && !cell.protection);
            if (threats.length > 0) {
                setSiteHealth(prev => Math.max(0, prev - threats.length * 5));
                showAlert('⚠️ Site damage detected!');
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [grid]);

    const handleCellClick = (index) => {
        if (!selectedAction) return;

        const cell = grid[index];
        const action = actions.find(a => a.id === selectedAction);

        if (resources < action.cost) {
            showAlert('❌ Not enough resources!');
            return;
        }

        const newGrid = [...grid];
        newGrid[index] = {
            ...cell,
            protection: selectedAction
        };

        setGrid(newGrid);
        setResources(prev => prev - action.cost);
        showAlert('✅ Protection measure installed!');
    };

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => setAlert(null), 2000);
    };

    return (
        <GameContainer>
            <h2>Archaeological Site Manager</h2>
            <p>Protect and preserve petroglyph sites from various threats</p>

            <GameArea>
                <SiteMap>
                    <MapGrid>
                        {grid.map((cell, index) => (
                            <Cell
                                key={index}
                                type={cell.type}
                                icon={cell.protection ?
                                    actions.find(a => a.id === cell.protection)?.icon :
                                    cell.type === 'petroglyph' ? '🗿' :
                                        cell.type === 'threat' ? '⚠️' : ''}
                                onClick={() => handleCellClick(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        ))}
                    </MapGrid>
                </SiteMap>

                <ControlPanel>
                    <StatusCard>
                        <h3>Site Status</h3>
                        <p>Health</p>
                        <ResourceBar>
                            <ResourceLevel
                                color="#4ECDC4"
                                animate={{ width: `${siteHealth}%` }}
                            />
                        </ResourceBar>
                        <p>Resources</p>
                        <ResourceBar>
                            <ResourceLevel
                                color="#FFD93D"
                                animate={{ width: `${resources}%` }}
                            />
                        </ResourceBar>
                    </StatusCard>

                    <StatusCard>
                        <h3>Protection Measures</h3>
                        {actions.map(action => (
                            <ActionButton
                                key={action.id}
                                active={selectedAction === action.id}
                                onClick={() => setSelectedAction(action.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={resources < action.cost}
                            >
                                {action.icon} {action.name} ({action.cost} 💎)
                            </ActionButton>
                        ))}
                    </StatusCard>
                </ControlPanel>
            </GameArea>

            <AnimatePresence>
                {alert && (
                    <AlertMessage
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {alert}
                    </AlertMessage>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default SiteManager; 