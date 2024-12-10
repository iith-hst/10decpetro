import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const PhotoArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;
`;

const ViewfinderContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Viewfinder = styled.div`
  width: 100%;
  aspect-ratio: 3/2;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  cursor: crosshair;
`;

const CameraOverlay = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid #4ECDC4;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const GridLine = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.5);
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CameraControls = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Slider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const PhotoButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #4ECDC4;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PhotoGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TakenPhoto = styled(motion.div)`
  aspect-ratio: 3/2;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

const ScoreIndicator = styled(motion.div)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${props => props.score > 80 ? '#4ECDC4' : props.score > 50 ? '#FFB347' : '#FF6B6B'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const challenges = [
    {
        id: 1,
        title: "Hunting Scene Documentation",
        image: "https://images.unsplash.com/photo-1682686581030-e77f17283e04",
        description: "Capture the entire hunting scene with proper lighting and composition",
        requirements: [
            "Use rule of thirds",
            "Ensure even lighting",
            "Include scale reference",
            "Maintain sharp focus"
        ],
        optimalSettings: {
            exposure: 0,
            contrast: 0,
            scale: 1
        }
    }
    // Add more challenges...
];

function PhotographyChallenge() {
    const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
    const [cameraSettings, setCameraSettings] = useState({
        exposure: 0,
        contrast: 0,
        scale: 1
    });
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const viewfinderRef = useRef(null);

    const handleSettingChange = (setting, value) => {
        setCameraSettings({
            ...cameraSettings,
            [setting]: parseFloat(value)
        });
    };

    const calculatePhotoScore = () => {
        // Calculate score based on how close settings are to optimal
        const settingScores = Object.keys(cameraSettings).map(setting => {
            const diff = Math.abs(cameraSettings[setting] - currentChallenge.optimalSettings[setting]);
            return Math.max(0, 100 - diff * 20);
        });
        return Math.round(settingScores.reduce((a, b) => a + b) / settingScores.length);
    };

    const takePhoto = () => {
        const score = calculatePhotoScore();
        const newPhoto = {
            id: Date.now(),
            image: currentChallenge.image,
            settings: { ...cameraSettings },
            score
        };
        setPhotos([newPhoto, ...photos]);
    };

    return (
        <GameContainer>
            <h2>Petroglyph Photography Challenge</h2>
            <p>Master the art of archaeological photography</p>

            <PhotoArea>
                <ViewfinderContainer>
                    <Viewfinder
                        ref={viewfinderRef}
                        image={currentChallenge.image}
                        style={{
                            filter: `
                brightness(${100 + cameraSettings.exposure * 10}%)
                contrast(${100 + cameraSettings.contrast * 10}%)
              `,
                            transform: `scale(${cameraSettings.scale})`
                        }}
                    >
                        <CameraOverlay>
                            <GridLine />
                            <GridLine />
                            <GridLine />
                            <GridLine />
                        </CameraOverlay>
                    </Viewfinder>

                    <PhotoButton
                        onClick={takePhoto}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📸 Take Photo
                    </PhotoButton>
                </ViewfinderContainer>

                <ControlPanel>
                    <CameraControls>
                        <h3>Camera Settings</h3>

                        <div>
                            <label>Exposure</label>
                            <Slider
                                type="range"
                                min="-2"
                                max="2"
                                step="0.1"
                                value={cameraSettings.exposure}
                                onChange={(e) => handleSettingChange('exposure', e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Contrast</label>
                            <Slider
                                type="range"
                                min="-2"
                                max="2"
                                step="0.1"
                                value={cameraSettings.contrast}
                                onChange={(e) => handleSettingChange('contrast', e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Scale</label>
                            <Slider
                                type="range"
                                min="0.5"
                                max="1.5"
                                step="0.1"
                                value={cameraSettings.scale}
                                onChange={(e) => handleSettingChange('scale', e.target.value)}
                            />
                        </div>
                    </CameraControls>

                    <CameraControls>
                        <h3>Requirements</h3>
                        <ul>
                            {currentChallenge.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </CameraControls>

                    <CameraControls>
                        <h3>Photo Gallery</h3>
                        <PhotoGallery>
                            {photos.map(photo => (
                                <TakenPhoto
                                    key={photo.id}
                                    image={photo.image}
                                    onClick={() => setSelectedPhoto(photo)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <ScoreIndicator score={photo.score}>
                                        {photo.score}%
                                    </ScoreIndicator>
                                </TakenPhoto>
                            ))}
                        </PhotoGallery>
                    </CameraControls>
                </ControlPanel>
            </PhotoArea>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                maxWidth: '80%'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h3>Photo Analysis</h3>
                            <p>Score: {selectedPhoto.score}%</p>
                            <div>
                                <h4>Settings Used:</h4>
                                <ul>
                                    {Object.entries(selectedPhoto.settings).map(([key, value]) => (
                                        <li key={key}>{key}: {value}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default PhotographyChallenge; 