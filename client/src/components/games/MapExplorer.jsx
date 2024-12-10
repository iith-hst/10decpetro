import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const MapArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  aspect-ratio: 16/9;
  position: relative;
`;

const InfoPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

const SiteCard = styled(motion.div)`
  padding: 1rem;
  background: ${props => props.selected ? '#E5F9F6' : '#f5f5f5'};
  border-radius: 8px;
  cursor: pointer;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

const MarkerIcon = styled(motion.div)`
  width: 30px;
  height: 30px;
  background: ${props => props.discovered ? '#4ECDC4' : '#FF6B6B'};
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PopupContent = styled.div`
  padding: 1rem;
  max-width: 200px;

  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
    color: #666;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const sites = [
    {
        id: 1,
        name: 'Ratnagiri Site A',
        coordinates: [73.3, 17.0],
        type: 'hunting',
        period: 'Early Period',
        description: 'Complex hunting scenes with multiple animal figures',
        image: '/path/to/site1.jpg',
        discovered: true
    },
    {
        id: 2,
        name: 'Sindhudurg Site B',
        coordinates: [73.5, 16.8],
        type: 'ritual',
        period: 'Middle Period',
        description: 'Ceremonial scenes with human figures',
        image: '/path/to/site2.jpg',
        discovered: false
    },
    // Add more sites...
];

const filters = [
    { id: 'all', label: 'All Sites' },
    { id: 'hunting', label: 'Hunting Scenes' },
    { id: 'ritual', label: 'Ritual Sites' },
    { id: 'discovered', label: 'Discovered' },
    { id: 'undiscovered', label: 'Undiscovered' }
];

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function MapExplorer() {
    const [viewport, setViewport] = useState({
        latitude: 17.0,
        longitude: 73.4,
        zoom: 9
    });
    const [selectedSite, setSelectedSite] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [discoveredSites, setDiscoveredSites] = useState(
        sites.filter(site => site.discovered).map(site => site.id)
    );

    const filteredSites = sites.filter(site => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'discovered') return discoveredSites.includes(site.id);
        if (activeFilter === 'undiscovered') return !discoveredSites.includes(site.id);
        return site.type === activeFilter;
    });

    const handleSiteClick = (site) => {
        setSelectedSite(site);
        if (!discoveredSites.includes(site.id)) {
            setDiscoveredSites([...discoveredSites, site.id]);
        }
        setViewport({
            ...viewport,
            latitude: site.coordinates[1],
            longitude: site.coordinates[0],
            zoom: 11
        });
    };

    return (
        <GameContainer>
            <h2>Petroglyph Map Explorer</h2>
            <p>Discover and explore petroglyph sites across the Konkan region</p>

            <MapArea>
                <MapContainer>
                    <Map
                        {...viewport}
                        onMove={evt => setViewport(evt.viewport)}
                        style={{ width: '100%', height: '100%' }}
                        mapStyle="mapbox://styles/mapbox/outdoors-v11"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        {filteredSites.map(site => (
                            <Marker
                                key={site.id}
                                latitude={site.coordinates[1]}
                                longitude={site.coordinates[0]}
                            >
                                <MarkerIcon
                                    discovered={discoveredSites.includes(site.id)}
                                    onClick={() => handleSiteClick(site)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </Marker>
                        ))}

                        {selectedSite && (
                            <Popup
                                latitude={selectedSite.coordinates[1]}
                                longitude={selectedSite.coordinates[0]}
                                onClose={() => setSelectedSite(null)}
                                closeButton={true}
                                closeOnClick={false}
                                anchor="bottom"
                            >
                                <PopupContent>
                                    <img src={selectedSite.image} alt={selectedSite.name} />
                                    <h3>{selectedSite.name}</h3>
                                    <p>{selectedSite.description}</p>
                                    <p><strong>Period:</strong> {selectedSite.period}</p>
                                </PopupContent>
                            </Popup>
                        )}
                    </Map>
                </MapContainer>

                <InfoPanel>
                    <FilterGroup>
                        <h3>Filter Sites</h3>
                        {filters.map(filter => (
                            <FilterButton
                                key={filter.id}
                                active={activeFilter === filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {filter.label}
                            </FilterButton>
                        ))}
                    </FilterGroup>

                    <h3>Petroglyph Sites</h3>
                    <SiteList>
                        {filteredSites.map(site => (
                            <SiteCard
                                key={site.id}
                                selected={selectedSite?.id === site.id}
                                onClick={() => handleSiteClick(site)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <h3>{site.name}</h3>
                                <p>{site.description}</p>
                                <p>
                                    <strong>Status:</strong> {' '}
                                    {discoveredSites.includes(site.id) ? 'Discovered' : 'Undiscovered'}
                                </p>
                            </SiteCard>
                        ))}
                    </SiteList>
                </InfoPanel>
            </MapArea>
        </GameContainer>
    );
}

export default MapExplorer; 