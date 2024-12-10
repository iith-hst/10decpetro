import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';
import petroglyph6 from '../../assets/images/6.jpg';

const GameContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PuzzleArea = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  aspect-ratio: ${props => props.aspectRatio};
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  gap: 2px;
  background: #333;
  padding: 2px;
  border-radius: 12px;
`;

const PuzzlePiece = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: ${props => `${props.totalWidth}px ${props.totalHeight}px`};
  background-position: ${props => props.backgroundPosition};
  cursor: pointer;
  border-radius: 2px;
  border: 2px solid ${props => props.isSelected ? '#4ECDC4' : 'transparent'};
  transition: border-color 0.3s ease;
  opacity: ${props => props.fadeOut ? 0.3 : 1};
  filter: ${props => props.invisible ? 'opacity(0)' : 'none'};
  pointer-events: ${props => props.frozen ? 'none' : 'auto'};
  transform: ${props => props.mirrored ? 'scaleX(-1)' : 'none'};
  visibility: ${props => props.blinking ? 'hidden' : 'visible'};
  transform: ${props => `
    translate(${props.offset?.x || 0}px, ${props.offset?.y || 0}px)
    ${props.mirrored ? 'scaleX(-1)' : 'none'}
  `};
  transition: transform 2s ease;
  
  &:hover {
    filter: none;
    opacity: 1;
  }

  &::after {
    content: '❄️';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    opacity: ${props => props.frozen ? 1 : 0};
  }
`;

const InfoPanel = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #2d3436;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #636e72;
  }
`;

const Timer = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
  color: ${props => props.isLow ? '#FF6B6B' : '#4ECDC4'};
  font-weight: bold;
`;

const difficultyLevels = [
    {
        level: 1,
        gridSize: 3,
        timeLimit: 120,
        description: 'Simple 3x3 puzzle - Learn the basics'
    },
    {
        level: 2,
        gridSize: 4,
        timeLimit: 180,
        rotatable: true,
        description: '4x4 puzzle - Pieces can be rotated (right-click)'
    },
    {
        level: 3,
        gridSize: 4,
        timeLimit: 150,
        rotatable: true,
        fadePreview: true,
        description: 'Preview image fades over time'
    },
    {
        level: 4,
        gridSize: 5,
        timeLimit: 240,
        rotatable: true,
        shuffleInterval: 15000, // Shuffle every 15 seconds
        description: 'Board shuffles periodically - Be quick!'
    },
    {
        level: 5,
        gridSize: 5,
        timeLimit: 300,
        rotatable: true,
        freezingPieces: true, // Some pieces randomly freeze
        description: 'Some pieces freeze temporarily'
    },
    {
        level: 6,
        gridSize: 6,
        timeLimit: 360,
        rotatable: true,
        fadeOutPieces: true, // Pieces slowly fade out
        description: 'Pieces fade out - Match them before they disappear!'
    },
    {
        level: 7,
        gridSize: 6,
        timeLimit: 420,
        rotatable: true,
        mirrorMode: true, // Pieces can be mirrored
        description: 'Pieces can be mirrored (middle-click)'
    },
    {
        level: 8,
        gridSize: 7,
        timeLimit: 480,
        rotatable: true,
        shuffleInterval: 12000,
        fadeOutPieces: true,
        description: 'Fading pieces with periodic shuffles'
    },
    {
        level: 9,
        gridSize: 7,
        timeLimit: 540,
        rotatable: true,
        invisiblePieces: true, // Some pieces are invisible until hovered
        description: 'Some pieces are invisible - Hover to reveal'
    },
    {
        level: 10,
        gridSize: 8,
        timeLimit: 600,
        rotatable: true,
        shuffleInterval: 10000,
        fadeOutPieces: true,
        freezingPieces: true,
        description: 'Ultimate challenge - All mechanics combined!'
    },
    {
        level: 11,
        gridSize: 8,
        timeLimit: 480,
        rotatable: true,
        mirrorMode: true,
        invisiblePieces: true,
        description: 'Invisible mirrored pieces that can rotate!'
    },
    {
        level: 12,
        gridSize: 9,
        timeLimit: 600,
        rotatable: true,
        shuffleInterval: 8000,
        freezingPieces: true,
        invisiblePieces: true,
        description: 'Invisible pieces that freeze and shuffle!'
    },
    {
        level: 13,
        gridSize: 9,
        timeLimit: 540,
        rotatable: true,
        fadeOutPieces: true,
        mirrorMode: true,
        shuffleInterval: 10000,
        description: 'Fading mirrored pieces with shuffling!'
    },
    {
        level: 14,
        gridSize: 10,
        timeLimit: 660,
        rotatable: true,
        fadeOutPieces: true,
        invisiblePieces: true,
        freezingPieces: true,
        mirrorMode: true,
        description: 'Master Challenge - Fading, invisible, freezing, and mirrored!'
    },
    {
        level: 15,
        gridSize: 10,
        timeLimit: 720,
        rotatable: true,
        shuffleInterval: 7000,
        fadeOutPieces: true,
        invisiblePieces: true,
        freezingPieces: true,
        mirrorMode: true,
        blinkingPieces: true, // New mechanic: pieces blink randomly
        description: 'Ultimate Challenge - All mechanics plus blinking pieces!'
    },
    {
        level: 16,
        gridSize: 12,
        timeLimit: 900,
        rotatable: true,
        shuffleInterval: 6000,
        fadeOutPieces: true,
        invisiblePieces: true,
        freezingPieces: true,
        mirrorMode: true,
        blinkingPieces: true,
        movingPieces: true, // New mechanic: pieces slowly drift
        description: 'Grand Master - Moving pieces with all challenges!'
    }
];

const puzzleImages = [
    { src: petroglyph1, name: 'Ancient Petroglyph 1' },
    { src: petroglyph2, name: 'Ancient Petroglyph 2' },
    { src: petroglyph3, name: 'Ancient Petroglyph 3' },
    { src: petroglyph4, name: 'Ancient Petroglyph 4' },
    { src: petroglyph5, name: 'Ancient Petroglyph 5' },
    { src: petroglyph6, name: 'Ancient Petroglyph 6' }
];

function PuzzleSolve() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [pieces, setPieces] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [timeLeft, setTimeLeft] = useState(difficultyLevels[0].timeLimit);
    const [isComplete, setIsComplete] = useState(false);
    const [currentImage, setCurrentImage] = useState(puzzleImages[0]);
    const [showPreview, setShowPreview] = useState(true);
    const [hoveredPiece, setHoveredPiece] = useState(null);
    const [imageAspectRatio, setImageAspectRatio] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [gridDimensions, setGridDimensions] = useState({ columns: 3, rows: 3 });
    const [puzzleSize, setPuzzleSize] = useState({ width: 0, height: 0 });
    const [frozenPieces, setFrozenPieces] = useState(new Set());
    const [fadingPieces, setFadingPieces] = useState(new Set());
    const [invisiblePieces, setInvisiblePieces] = useState(new Set());
    const [mirroredPieces, setMirroredPieces] = useState(new Set());
    const [blinkingPieces, setBlinkingPieces] = useState(new Set());
    const [pieceOffsets, setPieceOffsets] = useState({});

    useEffect(() => {
        const setupGame = () => {
            initializePuzzle();
        };
        setupGame();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentLevel]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.shuffleInterval) {
            const shuffleTimer = setInterval(() => {
                const newPieces = [...pieces].sort(() => Math.random() - 0.5);
                newPieces.forEach((piece, index) => {
                    piece.currentPosition = index;
                });
                setPieces(newPieces);
            }, level.shuffleInterval);

            return () => clearInterval(shuffleTimer);
        }
    }, [currentLevel, pieces]);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            setImageAspectRatio(aspectRatio);

            // Calculate puzzle dimensions maintaining aspect ratio
            const maxWidth = 800;
            const width = maxWidth;
            const height = maxWidth / aspectRatio;

            setPuzzleSize({ width, height });
            setImageLoaded(true);
            initializePuzzle();
        };
        img.src = currentImage.src;
    }, [currentImage]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.freezingPieces) {
            const freezeTimer = setInterval(() => {
                const newFrozenPieces = new Set();
                pieces.forEach(piece => {
                    if (Math.random() < 0.2) { // 20% chance to freeze
                        newFrozenPieces.add(piece.id);
                    }
                });
                setFrozenPieces(newFrozenPieces);

                // Unfreeze after 3 seconds
                setTimeout(() => {
                    setFrozenPieces(new Set());
                }, 3000);
            }, 8000);

            return () => clearInterval(freezeTimer);
        }
    }, [currentLevel, pieces]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.blinkingPieces) {
            const blinkTimer = setInterval(() => {
                const newBlinkingPieces = new Set();
                pieces.forEach(piece => {
                    if (Math.random() < 0.15) { // 15% chance to blink
                        newBlinkingPieces.add(piece.id);
                    }
                });
                setBlinkingPieces(newBlinkingPieces);

                // Clear blink after short duration
                setTimeout(() => {
                    setBlinkingPieces(new Set());
                }, 200);
            }, 2000);

            return () => clearInterval(blinkTimer);
        }
    }, [currentLevel, pieces]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level.movingPieces) {
            const moveTimer = setInterval(() => {
                setPieceOffsets(prev => {
                    const newOffsets = { ...prev };
                    pieces.forEach(piece => {
                        newOffsets[piece.id] = {
                            x: (Math.random() - 0.5) * 10,
                            y: (Math.random() - 0.5) * 10
                        };
                    });
                    return newOffsets;
                });
            }, 3000);

            return () => clearInterval(moveTimer);
        }
    }, [currentLevel, pieces]);

    const initializePuzzle = () => {
        const level = difficultyLevels[currentLevel];
        const gridSize = level.gridSize;
        const totalPieces = gridSize * gridSize;

        const newPieces = Array.from({ length: totalPieces }, (_, index) => ({
            id: index,
            currentIndex: index,
            targetIndex: index
        }));

        // Shuffle pieces
        const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
        shuffled.forEach((piece, index) => {
            piece.currentIndex = index;
        });

        setPieces(shuffled);
        setGridDimensions({ columns: gridSize, rows: gridSize });
    };

    const handlePieceClick = (clickedIndex) => {
        if (selectedPiece === null) {
            setSelectedPiece(clickedIndex);
        } else {
            const newPieces = [...pieces];
            const piece1 = newPieces.find(p => p.currentIndex === selectedPiece);
            const piece2 = newPieces.find(p => p.currentIndex === clickedIndex);

            // Swap positions
            const tempIndex = piece1.currentIndex;
            piece1.currentIndex = piece2.currentIndex;
            piece2.currentIndex = tempIndex;

            setPieces(newPieces);
            setSelectedPiece(null);

            // Check completion
            const isComplete = newPieces.every(piece => piece.currentIndex === piece.id);
            if (isComplete) {
                handleLevelComplete();
            }
        }
    };

    const getBackgroundPosition = (pieceId) => {
        const { columns, rows } = gridDimensions;
        const pieceWidth = puzzleSize.width / columns;
        const pieceHeight = puzzleSize.height / rows;
        const x = -(pieceId % columns) * pieceWidth;
        const y = -Math.floor(pieceId / columns) * pieceHeight;
        return `${x}px ${y}px`;
    };

    // Sort pieces by their current position for display
    const sortedPieces = [...pieces].sort((a, b) => a.currentIndex - b.currentIndex);

    const handlePieceRotate = (piece) => {
        if (!difficultyLevels[currentLevel].rotatable) return;

        const newPieces = [...pieces];
        const targetPiece = newPieces.find(p => p.id === piece.id);
        targetPiece.rotation = (targetPiece.rotation + 90) % 360;
        setPieces(newPieces);
    };

    const handleLevelComplete = () => {
        setIsComplete(true);
        if (currentLevel < difficultyLevels.length - 1) {
            setTimeout(() => {
                setCurrentLevel(currentLevel + 1);
                setIsComplete(false);
                setTimeLeft(difficultyLevels[currentLevel + 1].timeLimit);
                initializePuzzle();
            }, 2000);
        }
    };

    const handlePieceMirror = (piece) => {
        if (!difficultyLevels[currentLevel].mirrorMode) return;

        setMirroredPieces(prev => {
            const newSet = new Set(prev);
            if (newSet.has(piece.id)) {
                newSet.delete(piece.id);
            } else {
                newSet.add(piece.id);
            }
            return newSet;
        });
    };

    // Update preview image styling
    const previewStyle = {
        maxWidth: '300px',
        maxHeight: '300px',
        width: imageAspectRatio > 1 ? '300px' : 'auto',
        height: imageAspectRatio > 1 ? 'auto' : '300px',
        margin: '0 auto 1rem',
        display: 'block',
        borderRadius: '8px',
        objectFit: 'contain'
    };

    if (!imageLoaded) {
        return <div>Loading puzzle...</div>;
    }

    return (
        <GameContainer>
            <InfoPanel>
                <h2>Level {currentLevel + 1}</h2>
                <p>{difficultyLevels[currentLevel].description}</p>
            </InfoPanel>

            <Timer isLow={timeLeft <= 30}>{timeLeft}s</Timer>

            {showPreview && (
                <motion.img
                    src={currentImage.src}
                    alt="Preview"
                    style={previewStyle}
                    animate={{
                        opacity: difficultyLevels[currentLevel].fadePreview ? [1, 0.2] : 1
                    }}
                    transition={{
                        duration: 5,
                        repeat: difficultyLevels[currentLevel].fadePreview ? Infinity : 0
                    }}
                />
            )}

            <PuzzleArea
                columns={gridDimensions.columns}
                rows={gridDimensions.rows}
                aspectRatio={imageAspectRatio}
            >
                {sortedPieces.map((piece) => (
                    <PuzzlePiece
                        key={piece.id}
                        image={currentImage.src}
                        totalWidth={puzzleSize.width}
                        totalHeight={puzzleSize.height}
                        backgroundPosition={getBackgroundPosition(piece.id)}
                        isSelected={selectedPiece === piece.currentIndex}
                        onClick={() => handlePieceClick(piece.currentIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        frozen={frozenPieces.has(piece.id)}
                        fadeOut={fadingPieces.has(piece.id)}
                        invisible={invisiblePieces.has(piece.id)}
                        mirrored={mirroredPieces.has(piece.id)}
                        blinking={blinkingPieces.has(piece.id)}
                        offset={pieceOffsets[piece.id]}
                        onAuxClick={(e) => {
                            e.preventDefault();
                            handlePieceMirror(piece);
                        }}
                    />
                ))}
            </PuzzleArea>

            <button
                onClick={() => setShowPreview(prev => !prev)}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#4ECDC4',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    margin: '1rem auto',
                    display: 'block'
                }}
            >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p>Level {currentLevel + 1} Mechanics:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {difficultyLevels[currentLevel].rotatable &&
                        <li>🔄 Right-click to rotate pieces</li>}
                    {difficultyLevels[currentLevel].mirrorMode &&
                        <li>🪞 Middle-click to mirror pieces</li>}
                    {difficultyLevels[currentLevel].freezingPieces &&
                        <li>❄️ Watch out for freezing pieces!</li>}
                    {difficultyLevels[currentLevel].fadeOutPieces &&
                        <li>👻 Pieces will fade over time</li>}
                    {difficultyLevels[currentLevel].invisiblePieces &&
                        <li>👀 Hover to reveal invisible pieces</li>}
                    {difficultyLevels[currentLevel].shuffleInterval &&
                        <li>🔀 Board shuffles every ${difficultyLevels[currentLevel].shuffleInterval / 1000} seconds</li>}
                    {difficultyLevels[currentLevel].blinkingPieces &&
                        <li>✨ Watch for blinking pieces!</li>}
                    {difficultyLevels[currentLevel].movingPieces &&
                        <li>🌊 Pieces drift slowly!</li>}
                </ul>
            </div>

            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}
                        >
                            <h2>Level Complete!</h2>
                            <p>Time remaining: {timeLeft}s</p>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#4ECDC4',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }}
                            >
                                Play Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default PuzzleSolve; 