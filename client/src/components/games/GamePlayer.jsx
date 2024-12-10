import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import MemoryGame from './MemoryGame';
import PatternMatch from './PatternMatch';
import QuizMaster from './QuizMaster';
import PuzzleSolve from './PuzzleSolve';
import SpotDifference from './SpotDifference';
import TimelineChallenge from './TimelineChallenge';
import DrawingGame from './DrawingGame';
import ArchaeologySimulator from './ArchaeologySimulator';
import ClassificationChallenge from './ClassificationChallenge';
import StoryBuilder from './StoryBuilder';
import PetroglyphDetective from './PetroglyphDetective';
import SoundExplorer from './SoundExplorer';
import ClimateMachine from './ClimateTimeMachine';
import WordSearch from './WordSearch';
import SymbolDecoder from './SymbolDecoder';
import SiteSafety from './SiteSafety';
import SiteManager from './SiteManager';
import ResearchJournal from './ResearchJournal';
import PetroglyphIdentifier from './PetroglyphIdentifier';
import PatternCreator from './PatternCreator';
import LocationMatcher from './LocationMatcher';
import ConservationChallenge from './ConservationChallenge';
import ArtifactRestoration from './ArtifactRestoration';
import ArtifactAnalysis from './ArtifactAnalysis';
import ArchaeologyMethodsQuiz from './ArchaeologyMethodsQuiz';
import AncientTechnology from './AncientTechnology';

const GameContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameArea = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  min-height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function GamePlayer() {
    const { gameId } = useParams();

    const renderGame = () => {
        switch (gameId) {
            case 'memory-game':
                return <MemoryGame />;
            case 'pattern-match':
                return <PatternMatch />;
            case 'quiz-master':
                return <QuizMaster />;
            case 'puzzle-solve':
                return <PuzzleSolve />;
            case 'spot-difference':
                return <SpotDifference />;
            case 'timeline-challenge':
                return <TimelineChallenge />;
            case 'drawing-game':
                return <DrawingGame />;
            case 'archaeology-sim':
                return <ArchaeologySimulator />;
            case 'classification':
                return <ClassificationChallenge />;
            case 'story-builder':
                return <StoryBuilder />;
            case 'detective':
                return <PetroglyphDetective />;
            case 'sound-explorer':
                return <SoundExplorer />;
            case 'climate-machine':
                return <ClimateMachine />;
            case 'word-search':
                return <WordSearch />;
            case 'symbol-decoder':
                return <SymbolDecoder />;
            case 'site-safety':
                return <SiteSafety />;
            case 'site-manager':
                return <SiteManager />;
            case 'research-journal':
                return <ResearchJournal />;
            case 'petroglyph-identifier':
                return <PetroglyphIdentifier />;
            case 'pattern-creator':
                return <PatternCreator />;
            case 'location-matcher':
                return <LocationMatcher />;
            case 'conservation':
                return <ConservationChallenge />;
            case 'artifact-restoration':
                return <ArtifactRestoration />;
            case 'artifact-analysis':
                return <ArtifactAnalysis />;
            case 'archaeology-methods':
                return <ArchaeologyMethodsQuiz />;
            case 'ancient-technology':
                return <AncientTechnology />;
            default:
                return <div>Game not found</div>;
        }
    };

    return (
        <GameContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GameArea>
                    {renderGame()}
                </GameArea>
            </motion.div>
        </GameContainer>
    );
}

export default GamePlayer; 