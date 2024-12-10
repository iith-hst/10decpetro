import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import styled from '@emotion/styled';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const MarkerPoint = styled.div`
  width: 20px;
  height: 20px;
  background: var(--primary);
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
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

function MapView({ coordinates, markers = [] }) {
    const [viewport, setViewport] = useState({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        zoom: coordinates.zoom || 9
    });
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <MapContainer>
            <Map
                {...viewport}
                onMove={evt => setViewport(evt.viewport)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                    >
                        <MarkerPoint onClick={() => setSelectedMarker(marker)} />
                    </Marker>
                ))}

                {selectedMarker && (
                    <Popup
                        latitude={selectedMarker.latitude}
                        longitude={selectedMarker.longitude}
                        onClose={() => setSelectedMarker(null)}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <PopupContent>
                            <h4>{selectedMarker.title}</h4>
                            <p>{selectedMarker.description}</p>
                            {selectedMarker.image && (
                                <img src={selectedMarker.image} alt={selectedMarker.title} />
                            )}
                        </PopupContent>
                    </Popup>
                )}
            </Map>
        </MapContainer>
    );
}

export default MapView; 