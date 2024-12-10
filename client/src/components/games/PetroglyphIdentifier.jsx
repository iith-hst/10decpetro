import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const AnalyzerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageAnalyzer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropZone = styled(motion.div)`
  border: 3px dashed #eee;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    border-color: #4ECDC4;
    background: #f9f9f9;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin: 1rem 0;
`;

const ResultsPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnalysisResult = styled(motion.div)`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

const ConfidenceBar = styled(motion.div)`
  height: 8px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
  margin-top: 0.5rem;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: 12px;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

// Simulated AI analysis results
const analyzeImage = (image) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    type: 'Animal Figure',
                    confidence: 0.92,
                    details: 'Likely depicts a deer or similar hoofed animal',
                    period: 'Early Period (3000-2000 BCE)',
                    style: 'Naturalistic'
                },
                {
                    type: 'Hunting Scene',
                    confidence: 0.85,
                    details: 'Shows human figures with weapons near animal figures',
                    period: 'Middle Period (2000-1000 BCE)',
                    style: 'Dynamic'
                },
                {
                    type: 'Geometric Pattern',
                    confidence: 0.45,
                    details: 'Some geometric elements present in background',
                    period: 'Various Periods',
                    style: 'Abstract'
                }
            ]);
        }, 2000);
    });
};

function PetroglyphIdentifier() {
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        const analysisResults = await analyzeImage(image);
        setResults(analysisResults);
        setIsAnalyzing(false);
    };

    return (
        <GameContainer>
            <h2>Petroglyph Identifier</h2>
            <p>Upload an image to analyze and identify petroglyph elements</p>

            <AnalyzerArea>
                <ImageAnalyzer>
                    <DropZone
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        {!image ? (
                            <>
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    📸
                                </motion.div>
                                <p>Click or drop an image here to analyze</p>
                            </>
                        ) : (
                            <PreviewImage src={image} alt="Uploaded petroglyph" />
                        )}

                        <AnimatePresence>
                            {isAnalyzing && (
                                <LoadingOverlay
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    >
                                        🔄
                                    </motion.div>
                                    <p>Analyzing image...</p>
                                </LoadingOverlay>
                            )}
                        </AnimatePresence>
                    </DropZone>

                    {image && !isAnalyzing && results.length === 0 && (
                        <Button
                            onClick={handleAnalyze}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ marginTop: '1rem' }}
                        >
                            Analyze Image
                        </Button>
                    )}
                </ImageAnalyzer>

                <ResultsPanel>
                    <h3>Analysis Results</h3>
                    {results.length > 0 ? (
                        <AnimatePresence>
                            {results.map((result, index) => (
                                <AnalysisResult
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <h4>{result.type}</h4>
                                    <ConfidenceBar
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.confidence * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Confidence: {(result.confidence * 100).toFixed(1)}%
                                    </p>
                                    <p>{result.details}</p>
                                    <p>
                                        <strong>Period:</strong> {result.period}
                                        <br />
                                        <strong>Style:</strong> {result.style}
                                    </p>
                                </AnalysisResult>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <p style={{ color: '#666' }}>
                            Upload and analyze an image to see results
                        </p>
                    )}
                </ResultsPanel>
            </AnalyzerArea>
        </GameContainer>
    );
}

export default PetroglyphIdentifier; 