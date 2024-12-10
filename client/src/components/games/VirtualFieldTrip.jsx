import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const TourArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ViewerPanel = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Panorama = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Hotspot = styled(motion.button)`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const InfoPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const NavButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  flex: 1;
`;

const InfoCard = styled(motion.div)`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-top: 1rem;
`;

const tourStops = [
    {
        id: 1,
        name: 'Main Petroglyph Panel',
        image: 'https://images.unsplash.com/photo-1682686581030-e77f17283e04',
        description: 'A large panel featuring multiple hunting scenes and animal figures',
        hotspots: [
            {
                id: 'h1',
                x: 30,
                y: 40,
                icon: '🎯',
                title: 'Hunting Scene',
                description: 'A complex depiction of hunters pursuing deer'
            },
            {
                id: 'h2',
                x: 60,
                y: 50,
                icon: '🦌',
                title: 'Animal Group',
                description: 'A herd of deer in motion'
            }
        ],
        facts: [
            'Created approximately 3000 years ago',
            'Uses pecking and abrading techniques',
            'Shows evidence of multiple artists'
        ]
    },
    // Add more tour stops...
];

function VirtualFieldTrip() {
    const [currentStop, setCurrentStop] = useState(0);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [completedStops, setCompletedStops] = useState(new Set());

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - viewPosition.x,
            y: e.clientY - viewPosition.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        setViewPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleHotspotClick = (hotspot) => {
        setSelectedHotspot(hotspot);
        const newCompleted = new Set(completedStops);
        newCompleted.add(currentStop);
        setCompletedStops(newCompleted);
    };

    const handleNextStop = () => {
        if (currentStop < tourStops.length - 1) {
            setCurrentStop(currentStop + 1);
            setSelectedHotspot(null);
            setViewPosition({ x: 0, y: 0 });
        }
    };

    const handlePrevStop = () => {
        if (currentStop > 0) {
            setCurrentStop(currentStop - 1);
            setSelectedHotspot(null);
            setViewPosition({ x: 0, y: 0 });
        }
    };

    const stop = tourStops[currentStop];

    return (
        <GameContainer>
            <h2>Virtual Field Trip</h2>
            <p>Explore petroglyph sites with an expert guide</p>

            <TourArea>
                <ViewerPanel>
                    <Panorama
                        image={stop.image}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{
                            transform: `translate(${viewPosition.x}px, ${viewPosition.y}px)`
                        }}
                    >
                        {stop.hotspots.map(hotspot => (
                            <Hotspot
                                key={hotspot.id}
                                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                onClick={() => handleHotspotClick(hotspot)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {hotspot.icon}
                            </Hotspot>
                        ))}
                    </Panorama>

                    <Navigation>
                        <NavButton
                            onClick={handlePrevStop}
                            disabled={currentStop === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ← Previous
                        </NavButton>
                        <NavButton
                            onClick={handleNextStop}
                            disabled={currentStop === tourStops.length - 1}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next →
                        </NavButton>
                    </Navigation>
                </ViewerPanel>

                <InfoPanel>
                    <h3>{stop.name}</h3>
                    <p>{stop.description}</p>

                    {selectedHotspot && (
                        <InfoCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h4>{selectedHotspot.title}</h4>
                            <p>{selectedHotspot.description}</p>
                        </InfoCard>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <h4>Did You Know?</h4>
                        <ul>
                            {stop.facts.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h4>Progress</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {tourStops.map((_, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: completedStops.has(index) ? '#4ECDC4' : '#eee'
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>
                    </div>
                </InfoPanel>
            </TourArea>
        </GameContainer>
    );
}

export default VirtualFieldTrip; 