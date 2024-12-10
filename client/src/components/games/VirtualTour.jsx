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

const ViewportContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Viewport = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  cursor: move;
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
  height: fit-content;
`;

const NavigationControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoCard = styled(motion.div)`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const tourLocations = [
    {
        id: 1,
        name: 'Main Petroglyph Panel',
        image: '/path/to/location1.jpg',
        description: 'The main panel features a complex arrangement of hunting scenes and animal figures.',
        hotspots: [
            {
                id: 'h1',
                x: 30,
                y: 40,
                icon: '🎯',
                title: 'Hunter Figure',
                description: 'A well-preserved figure of a hunter with bow and arrow'
            },
            {
                id: 'h2',
                x: 60,
                y: 50,
                icon: '🦌',
                title: 'Deer Group',
                description: 'A group of deer in motion, likely depicting a hunting scene'
            }
        ]
    },
    // Add more locations...
];

function VirtualTour() {
    const [currentLocation, setCurrentLocation] = useState(0);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleHotspotClick = (hotspot) => {
        setSelectedHotspot(hotspot);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - pan.x,
            y: e.clientY - pan.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        setPan({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoom = (delta) => {
        setZoom(Math.min(Math.max(zoom + delta, 1), 3));
    };

    const location = tourLocations[currentLocation];

    return (
        <GameContainer>
            <TourArea>
                <ViewportContainer>
                    <Viewport
                        image={location.image}
                        style={{
                            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {location.hotspots.map(hotspot => (
                            <Hotspot
                                key={hotspot.id}
                                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                onClick={() => handleHotspotClick(hotspot)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {hotspot.icon}
                            </Hotspot>
                        ))}
                    </Viewport>

                    <NavigationControls>
                        <NavButton
                            onClick={() => handleZoom(-0.2)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ➖
                        </NavButton>
                        <NavButton
                            onClick={() => handleZoom(0.2)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ➕
                        </NavButton>
                        <NavButton
                            onClick={() => setPan({ x: 0, y: 0 })}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🔄
                        </NavButton>
                    </NavigationControls>
                </ViewportContainer>

                <InfoPanel>
                    <h2>{location.name}</h2>
                    <p>{location.description}</p>

                    <AnimatePresence mode="wait">
                        {selectedHotspot && (
                            <InfoCard
                                key={selectedHotspot.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h3>{selectedHotspot.title}</h3>
                                <p>{selectedHotspot.description}</p>
                            </InfoCard>
                        )}
                    </AnimatePresence>
                </InfoPanel>
            </TourArea>
        </GameContainer>
    );
}

export default VirtualTour; 