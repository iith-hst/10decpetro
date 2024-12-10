import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';

const CatalogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: white;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#4ECDC4' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const GameCard = styled(motion(Link))`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
`;

const GameInfo = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    color: #4ECDC4;
  }

  p {
    color: #ccc;
    font-size: 0.9rem;
    margin: 0;
  }
`;

const games = [
    {
        id: 'memory-game',
        title: 'Petroglyph Memory',
        description: 'Test your memory by matching ancient rock art pairs',
        image: petroglyph1,
        category: 'memory'
    },
    {
        id: 'pattern-match',
        title: 'Pattern Matcher',
        description: 'Match similar patterns in petroglyphs',
        image: petroglyph2,
        category: 'puzzle'
    },
    {
        id: 'quiz-master',
        title: 'Rock Art Quiz',
        description: 'Test your knowledge about petroglyphs',
        image: petroglyph3,
        category: 'quiz'
    },
    {
        id: 'puzzle-solve',
        title: 'Petroglyph Puzzle',
        description: 'Reconstruct fragmented petroglyphs',
        image: petroglyph4,
        category: 'puzzle'
    },
    {
        id: 'spot-difference',
        title: 'Spot the Difference',
        description: 'Find differences between petroglyph images',
        image: petroglyph5,
        category: 'puzzle'
    },
    {
        id: 'timeline-challenge',
        title: 'Timeline Challenge',
        description: 'Arrange petroglyphs in chronological order',
        image: petroglyph1,
        category: 'quiz'
    },
    {
        id: 'drawing-game',
        title: 'Rock Art Studio',
        description: 'Create your own petroglyphs',
        image: petroglyph2,
        category: 'creative'
    },
    {
        id: 'archaeology-sim',
        title: 'Archaeology Simulator',
        description: 'Experience archaeological excavation',
        image: petroglyph3,
        category: 'simulation'
    },
    {
        id: 'classification',
        title: 'Art Classifier',
        description: 'Learn to classify different types of rock art',
        image: petroglyph4,
        category: 'educational'
    },
    {
        id: 'story-builder',
        title: 'Story Builder',
        description: 'Create stories using petroglyph elements',
        image: petroglyph5,
        category: 'creative'
    },
    {
        id: 'detective',
        title: 'Petroglyph Detective',
        description: 'Solve mysteries using rock art clues',
        image: petroglyph1,
        category: 'puzzle'
    },
    {
        id: 'sound-explorer',
        title: 'Sound Explorer',
        description: 'Discover ancient sounds through petroglyphs',
        image: petroglyph2,
        category: 'simulation'
    },
    {
        id: 'climate-machine',
        title: 'Climate Time Machine',
        description: 'Explore climate effects on petroglyphs',
        image: petroglyph3,
        category: 'simulation'
    },
    {
        id: 'word-search',
        title: 'Petroglyph Word Search',
        description: 'Find hidden words related to rock art',
        image: petroglyph4,
        category: 'puzzle'
    },
    {
        id: 'symbol-decoder',
        title: 'Symbol Decoder',
        description: 'Decode ancient petroglyph symbols and their meanings',
        image: petroglyph5,
        category: 'educational'
    },
    {
        id: 'site-safety',
        title: 'Site Safety Manager',
        description: 'Learn to protect and preserve petroglyph sites',
        image: petroglyph1,
        category: 'simulation'
    },
    {
        id: 'site-manager',
        title: 'Site Management',
        description: 'Manage and protect archaeological sites',
        image: petroglyph2,
        category: 'simulation'
    },
    {
        id: 'research-journal',
        title: 'Research Journal',
        description: 'Document and analyze petroglyph discoveries',
        image: petroglyph3,
        category: 'educational'
    },
    {
        id: 'petroglyph-identifier',
        title: 'Petroglyph Identifier',
        description: 'Learn to identify different types of petroglyphs',
        image: petroglyph4,
        category: 'educational'
    },
    {
        id: 'pattern-creator',
        title: 'Pattern Creator',
        description: 'Create your own petroglyph patterns',
        image: petroglyph5,
        category: 'creative'
    },
    {
        id: 'location-matcher',
        title: 'Location Matcher',
        description: 'Match petroglyphs to their original locations',
        image: petroglyph1,
        category: 'puzzle'
    },
    {
        id: 'conservation',
        title: 'Conservation Challenge',
        description: 'Solve real conservation challenges',
        image: petroglyph2,
        category: 'simulation'
    },
    {
        id: 'artifact-restoration',
        title: 'Artifact Restoration',
        description: 'Restore damaged petroglyphs',
        image: petroglyph3,
        category: 'simulation'
    },
    {
        id: 'artifact-analysis',
        title: 'Artifact Analysis',
        description: 'Analyze and document petroglyph artifacts',
        image: petroglyph4,
        category: 'educational'
    },
    {
        id: 'archaeology-methods',
        title: 'Archaeology Methods',
        description: 'Learn proper archaeological techniques',
        image: petroglyph5,
        category: 'educational'
    },
    {
        id: 'ancient-technology',
        title: 'Ancient Technology',
        description: 'Explore tools and techniques used to create petroglyphs',
        image: petroglyph1,
        category: 'educational'
    }
];

const categories = [
    { id: 'all', label: 'All Games' },
    { id: 'memory', label: 'Memory' },
    { id: 'puzzle', label: 'Puzzle' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'creative', label: 'Creative' },
    { id: 'educational', label: 'Educational' }
];

function GameCatalog() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredGames = activeCategory === 'all'
        ? games
        : games.filter(game => game.category === activeCategory);

    return (
        <CatalogContainer>
            <Header>
                <h1>Game Catalog</h1>
                <p>Choose from our collection of educational games and start exploring the world of petroglyphs</p>
            </Header>

            <FilterBar>
                {categories.map(category => (
                    <FilterButton
                        key={category.id}
                        active={activeCategory === category.id}
                        onClick={() => setActiveCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.label}
                    </FilterButton>
                ))}
            </FilterBar>

            <GameGrid>
                {filteredGames.map(game => (
                    <GameCard
                        key={game.id}
                        to={`/games/${game.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img src={game.image} alt={game.title} />
                        <GameInfo>
                            <h3>{game.title}</h3>
                            <p>{game.description}</p>
                        </GameInfo>
                    </GameCard>
                ))}
            </GameGrid>
        </CatalogContainer>
    );
}

export default GameCatalog; 