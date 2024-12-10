import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { learningContent } from '../../data/learningContent';
import { MapView } from '../common/MapView';
import { Quiz } from '../learn/Quiz';

const TopicContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const ModuleList = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModuleItem = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'inherit'};
`;

const ContentArea = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }
`;

const ContentSection = styled.section`
  margin: 2rem 0;

  h2 {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    color: #444;
  }
`;

const InteractiveElement = styled.div`
  margin: 2rem 0;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
`;

function TopicDetail() {
    const { topicId, moduleId } = useParams();
    const [activeModule, setActiveModule] = useState(moduleId || 0);
    const [quizResults, setQuizResults] = useState({});

    const topic = learningContent.topics.find(t => t.id === parseInt(topicId));
    const currentModule = topic?.modules[activeModule];

    const handleModuleComplete = (moduleId) => {
        // Update progress in backend
        setQuizResults(prev => ({
            ...prev,
            [moduleId]: true
        }));
    };

    if (!topic) return <div>Topic not found</div>;

    return (
        <TopicContainer>
            <ModuleList>
                <h3>{topic.title}</h3>
                {topic.modules.map((module, index) => (
                    <ModuleItem
                        key={module.id}
                        active={index === activeModule}
                        onClick={() => setActiveModule(index)}
                        whileHover={{ x: 5 }}
                        completed={quizResults[module.id]}
                    >
                        {module.title}
                        {quizResults[module.id] && <span>✓</span>}
                    </ModuleItem>
                ))}
            </ModuleList>

            <ContentArea>
                {currentModule && (
                    <>
                        <h2>{currentModule.title}</h2>
                        <p>{currentModule.content.introduction}</p>

                        {currentModule.content.sections.map((section, index) => (
                            <ContentSection key={index}>
                                <h3>{section.title}</h3>
                                <p>{section.content}</p>
                                {section.image && (
                                    <img src={section.image} alt={section.title} />
                                )}
                                {section.mapCoordinates && (
                                    <InteractiveElement>
                                        <MapView
                                            coordinates={section.mapCoordinates}
                                            markers={section.markers}
                                        />
                                    </InteractiveElement>
                                )}
                            </ContentSection>
                        ))}

                        {currentModule.content.quiz && (
                            <Quiz
                                questions={currentModule.content.quiz}
                                onComplete={() => handleModuleComplete(currentModule.id)}
                            />
                        )}
                    </>
                )}
            </ContentArea>
        </TopicContainer>
    );
}

export default TopicDetail; 