import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LearnContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TopicCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const TopicContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;

  div {
    width: ${props => props.progress}%;
    height: 100%;
    background: var(--primary);
    transition: width 0.3s ease;
  }
`;

const topics = [
    {
        id: 1,
        title: "Introduction to Petroglyphs",
        description: "Learn about the basics of rock art and its significance",
        image: "/images/intro.jpg",
        progress: 0,
        modules: [
            "What are Petroglyphs?",
            "Historical Significance",
            "Dating Methods",
            "Types of Rock Art"
        ]
    },
    {
        id: 2,
        title: "Konkan Region Petroglyphs",
        description: "Explore the unique petroglyphs found in the Konkan region",
        image: "/images/konkan.jpg",
        progress: 0,
        modules: [
            "Geographic Distribution",
            "Cultural Context",
            "Common Motifs",
            "Recent Discoveries"
        ]
    },
    // Add more topics...
];

function LearnHub() {
    const [selectedTopic, setSelectedTopic] = useState(null);

    return (
        <LearnContainer>
            <h2>Learning Center</h2>
            <p>Explore comprehensive guides about petroglyphs and rock art</p>

            <TopicsGrid>
                {topics.map(topic => (
                    <TopicCard
                        key={topic.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedTopic(topic)}
                    >
                        <img src={topic.image} alt={topic.title} />
                        <TopicContent>
                            <h3>{topic.title}</h3>
                            <p>{topic.description}</p>
                            <ProgressBar progress={topic.progress}>
                                <div />
                            </ProgressBar>
                            <small>{topic.progress}% Complete</small>
                        </TopicContent>
                    </TopicCard>
                ))}
            </TopicsGrid>
        </LearnContainer>
    );
}

export default LearnHub; 