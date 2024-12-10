import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents } from '../../data/timelineData';

const TimelineContainer = styled.div`
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  margin: 2rem 0;
`;

const TimelineTrack = styled.div`
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: var(--primary);
    transform: translateX(-50%);
  }
`;

const TimelineEvent = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding: 1rem;
  margin: 2rem 0;
  width: 50%;
  position: relative;
  
  ${props => props.position === 'left' ? 'padding-right: 3rem;' : 'padding-left: 3rem; margin-left: 50%;'}
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--primary);
    border-radius: 50%;
    ${props => props.position === 'left' ? 'right: -10px;' : 'left: -10px;'}
    top: 50%;
    transform: translateY(-50%);
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 400px;
  
  h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

function Timeline() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredEvents = activeCategory === 'all'
        ? timelineEvents
        : timelineEvents.filter(event => event.category === activeCategory);

    return (
        <TimelineContainer>
            <h2>Historical Timeline</h2>

            <div style={{ marginBottom: '2rem' }}>
                <button onClick={() => setActiveCategory('all')}>
                    All
                </button>
                <button onClick={() => setActiveCategory('prehistoric')}>
                    Prehistoric
                </button>
                <button onClick={() => setActiveCategory('artistic')}>
                    Artistic
                </button>
                <button onClick={() => setActiveCategory('modern')}>
                    Modern
                </button>
            </div>

            <TimelineTrack>
                {filteredEvents.map(event => (
                    <TimelineEvent
                        key={event.id}
                        position={event.position}
                        onClick={() => setSelectedEvent(event)}
                    >
                        <EventCard
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: event.position === 'left' ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3>{event.date}</h3>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                        </EventCard>
                    </TimelineEvent>
                ))}
            </TimelineTrack>
        </TimelineContainer>
    );
}

export default Timeline; 