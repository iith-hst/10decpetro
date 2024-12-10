import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MapView } from '../common/MapView';
import { sites, siteCategories, conservationStatus } from '../../data/siteData';

const ExplorerContainer = styled.div`
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  margin: 2rem 0;
`;

const SiteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SiteCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const SiteInfo = styled.div`
  padding: 1rem;

  h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const DetailPanel = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--primary)' : 'var(--card-bg)'};
  color: white;
  cursor: pointer;
`;

function SiteExplorer() {
    const [selectedSite, setSelectedSite] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredSites = activeCategory === 'all'
        ? sites
        : sites.filter(site => siteCategories[activeCategory].sites.includes(site.name));

    return (
        <ExplorerContainer>
            <h2>Explore UNESCO Sites</h2>

            <CategoryFilter>
                <FilterButton
                    active={activeCategory === 'all'}
                    onClick={() => setActiveCategory('all')}
                >
                    All Sites
                </FilterButton>
                {Object.entries(siteCategories).map(([key, category]) => (
                    <FilterButton
                        key={key}
                        active={activeCategory === key}
                        onClick={() => setActiveCategory(key)}
                    >
                        {category.title}
                    </FilterButton>
                ))}
            </CategoryFilter>

            <MapView
                coordinates={selectedSite?.coordinates || { lat: 16.7667, lng: 73.3086, zoom: 8 }}
                markers={filteredSites}
                onMarkerClick={setSelectedSite}
            />

            <SiteGrid>
                {filteredSites.map(site => (
                    <SiteCard
                        key={site.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedSite(site)}
                    >
                        <img src={site.details.image} alt={site.name} />
                        <SiteInfo>
                            <h3>{site.name}</h3>
                            <p>{site.description}</p>
                            {conservationStatus.atRisk.includes(site.name) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ color: '#FF6B6B', marginTop: '0.5rem' }}
                                >
                                    ⚠️ Site at risk
                                </motion.div>
                            )}
                        </SiteInfo>
                    </SiteCard>
                ))}
            </SiteGrid>

            {selectedSite && (
                <DetailPanel
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2>{selectedSite.name}</h2>
                    <p><strong>Coordinates:</strong> {selectedSite.coordinates.coordinates}</p>
                    <h3>Key Features</h3>
                    <ul>
                        {selectedSite.details.uniqueElements.map((element, index) => (
                            <li key={index}>{element}</li>
                        ))}
                    </ul>
                    {selectedSite.details.significance && (
                        <>
                            <h3>Significance</h3>
                            <p>{selectedSite.details.significance}</p>
                        </>
                    )}
                </DetailPanel>
            )}
        </ExplorerContainer>
    );
}

export default SiteExplorer; 