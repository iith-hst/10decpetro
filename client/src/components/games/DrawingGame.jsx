import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import petroglyph1 from '../../assets/images/1.jpg';
import petroglyph2 from '../../assets/images/2.JPG';
import petroglyph3 from '../../assets/images/3.JPG';
import petroglyph4 from '../../assets/images/4.jpg';
import petroglyph5 from '../../assets/images/5.JPG';

const GameContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`;

const DrawingArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
`;

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  aspect-ratio: 1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

const ReferenceImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Tool = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4ECDC4' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#4ECDC4' : '#e0e0e0'};
  }
`;

const ColorPicker = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SizeSlider = styled.input`
  width: 100px;
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

const InstructionsBar = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: #4ECDC4;
    margin-bottom: 1rem;
  }

  .steps {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .step {
    background: ${props => props.currentStep === props.index ? '#4ECDC4' : 'white'};
    color: ${props => props.currentStep === props.index ? 'white' : '#333'};
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const drawingLessons = [
    {
        id: 1,
        title: "Basic Shapes and Lines",
        description: "Learn the fundamental shapes used in petroglyphs",
        reference: petroglyph1,
        steps: [
            "Start with basic geometric shapes",
            "Practice straight and curved lines",
            "Create simple animal outlines",
            "Add basic details"
        ],
        difficulty: "Beginner"
    },
    {
        id: 2,
        title: "Animal Figures",
        description: "Learn to draw common animal figures found in petroglyphs",
        reference: petroglyph2,
        steps: [
            "Sketch the basic animal shape",
            "Add characteristic features",
            "Include movement lines",
            "Add texture details"
        ],
        difficulty: "Intermediate"
    },
    {
        id: 3,
        title: "Human Figures",
        description: "Master drawing human figures in petroglyph style",
        reference: petroglyph3,
        steps: [
            "Draw stick figure base",
            "Add body shape",
            "Include cultural elements",
            "Add tools or weapons"
        ],
        difficulty: "Advanced"
    },
    {
        id: 4,
        title: "Geometric Patterns",
        description: "Create intricate geometric patterns found in petroglyphs",
        reference: petroglyph4,
        steps: [
            "Draw basic circles and squares",
            "Create repeating patterns",
            "Add connecting lines",
            "Include spiral elements"
        ],
        difficulty: "Intermediate"
    },
    {
        id: 5,
        title: "Hunting Scenes",
        description: "Compose dynamic hunting scene petroglyphs",
        reference: petroglyph5,
        steps: [
            "Sketch the hunters",
            "Add prey animals",
            "Include weapons and tools",
            "Show movement and action"
        ],
        difficulty: "Advanced"
    },
    {
        id: 6,
        title: "Rock Surface Practice",
        description: "Draw on realistic rock textures",
        reference: petroglyph1,
        steps: [
            "Understand rock surface",
            "Adapt to texture",
            "Use proper pressure",
            "Create depth effect"
        ],
        difficulty: "Expert",
        specialCanvas: 'rock'
    }
];

const LessonSelect = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

const LessonCard = styled(motion.div)`
    background: white;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        color: #4ECDC4;
        margin-bottom: 0.5rem;
    }

    .difficulty {
        font-size: 0.9rem;
        color: #666;
    }
`;

const RockCanvas = styled(Canvas)`
    background-image: url('/textures/rock-texture.jpg');
    background-size: cover;
    background-position: center;
    mix-blend-mode: multiply;
`;

const TextureOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/textures/rock-overlay.png');
    background-size: cover;
    opacity: 0.1;
    pointer-events: none;
`;

const GridOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(#4ECDC422 1px, transparent 1px),
                      linear-gradient(90deg, #4ECDC422 1px, transparent 1px);
    background-size: ${props => props.size}px ${props => props.size}px;
    pointer-events: none;
    opacity: ${props => props.show ? 0.5 : 0};
    transition: opacity 0.3s;
`;

const ToolsExpanded = styled(ToolBar)`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .tool-group {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;

        h4 {
            color: #4ECDC4;
            margin: 0;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .tools-row {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            align-items: center;
        }
    }
`;

const TextureSelector = styled.div`
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem;

    .texture {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        border: 2px solid ${props => props.selected ? '#4ECDC4' : 'transparent'};
        background-size: cover;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

const achievements = {
    FIRST_DRAWING: {
        id: 'FIRST_DRAWING',
        title: 'First Masterpiece',
        description: 'Complete your first drawing',
        icon: '🎨'
    },
    TEXTURE_MASTER: {
        id: 'TEXTURE_MASTER',
        title: 'Texture Master',
        description: 'Try all rock textures',
        icon: '🗿'
    },
    LEVEL_COMPLETE: {
        id: 'LEVEL_COMPLETE',
        title: 'Level Complete',
        description: 'Complete all steps in a lesson',
        icon: '🌟'
    }
};

// Use temporary textures until we have real ones
const rockTextures = [
    {
        id: 'sandstone',
        name: 'Sandstone',
        image: 'https://via.placeholder.com/200x200/f4a460/000000?text=Sandstone',
        overlay: 'https://via.placeholder.com/200x200/ffffff/000000?text=Overlay'
    },
    {
        id: 'granite',
        name: 'Granite',
        image: 'https://via.placeholder.com/200x200/808080/000000?text=Granite',
        overlay: 'https://via.placeholder.com/200x200/ffffff/000000?text=Overlay'
    },
    {
        id: 'limestone',
        name: 'Limestone',
        image: 'https://via.placeholder.com/200x200/d3d3d3/000000?text=Limestone',
        overlay: 'https://via.placeholder.com/200x200/ffffff/000000?text=Overlay'
    },
    {
        id: 'slate',
        name: 'Slate',
        image: 'https://via.placeholder.com/200x200/2f4f4f/000000?text=Slate',
        overlay: 'https://via.placeholder.com/200x200/ffffff/000000?text=Overlay'
    }
];

const ShapesPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;

    button {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background: #f0f0f0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #e0e0e0;
        }

        &.active {
            background: #4ECDC4;
            color: white;
        }
    }
`;

const GuideOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-image: ${props => props.guideType === 'center' ?
        'linear-gradient(#4ECDC422 1px, transparent 1px), linear-gradient(90deg, #4ECDC422 1px, transparent 1px)' :
        'none'};
    background-size: 50% 50%;
    background-position: center;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: ${props => props.showSymmetry ? '#4ECDC444' : 'transparent'};
    }
`;

const TexturePreview = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-image: url(${props => props.texture});
    background-size: cover;
    opacity: 0.8;
    transition: all 0.3s;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
`;

// Add new brush types
const brushTypes = {
    NORMAL: 'normal',
    CHALK: 'chalk',
    ROUGH: 'rough',
    DOTTED: 'dotted',
    PATTERN: 'pattern',
    PETROGLYPH: 'petroglyph',
    STONE_CHISEL: 'stone_chisel',
    WEATHERED: 'weathered',
    ANCIENT: 'ancient',
    CARVED: 'carved'
};

// Add new shapes
const shapes = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    STAR: 'star',
    SPIRAL: 'spiral',
    ZIGZAG: 'zigzag'
};

const BrushTypeSelector = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
    padding: 0.5rem;
    max-width: 400px;

    button {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background: #f0f0f0;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        font-size: 0.9rem;

        &:hover {
            background: #e0e0e0;
            transform: translateY(-1px);
        }

        &.active {
            background: #4ECDC4;
            color: white;
        }
    }
`;

// Add pattern stamps
const stampPatterns = [
    { id: 'handprint', icon: '✋', name: 'Handprint' },
    { id: 'footprint', icon: '👣', name: 'Footprint' },
    { id: 'spiral', icon: '🌀', name: 'Spiral' },
    { id: 'sun', icon: '☀️', name: 'Sun' },
    { id: 'moon', icon: '🌙', name: 'Moon' }
];

// Add new styled components
const StampSelector = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;

    button {
        padding: 0.5rem;
        font-size: 1.5rem;
        border: none;
        border-radius: 4px;
        background: #f0f0f0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }

        &.active {
            background: #4ECDC4;
            color: white;
        }
    }
`;

const PressureSensitivity = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    input[type="range"] {
        width: 100px;
    }
`;

// Add these helper functions before the DrawingGame component
const drawHandprint = (ctx, size) => {
    // Draw palm
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Draw fingers
    const fingerPositions = [
        { angle: -Math.PI / 3, length: size * 0.7 },    // Thumb
        { angle: -Math.PI / 6, length: size * 0.8 },    // Index
        { angle: 0, length: size * 0.9 },               // Middle
        { angle: Math.PI / 6, length: size * 0.8 },     // Ring
        { angle: Math.PI / 3, length: size * 0.7 }      // Pinky
    ];

    fingerPositions.forEach(({ angle, length }) => {
        ctx.beginPath();
        ctx.ellipse(
            Math.cos(angle) * size * 0.3,
            Math.sin(angle) * size * 0.3 - size * 0.1,
            length * 0.2,
            length * 0.4,
            angle,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
};

const drawFootprint = (ctx, size) => {
    // Draw heel
    ctx.beginPath();
    ctx.ellipse(0, size * 0.3, size * 0.3, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw arch and ball of foot
    ctx.beginPath();
    ctx.moveTo(-size * 0.3, size * 0.1);
    ctx.quadraticCurveTo(
        -size * 0.2, -size * 0.2,
        0, -size * 0.4
    );
    ctx.quadraticCurveTo(
        size * 0.2, -size * 0.2,
        size * 0.3, size * 0.1
    );
    ctx.fill();

    // Draw toes
    const toePositions = [
        { x: -size * 0.25, y: -size * 0.5, size: size * 0.15 },
        { x: -size * 0.1, y: -size * 0.55, size: size * 0.15 },
        { x: size * 0.05, y: -size * 0.53, size: size * 0.14 },
        { x: size * 0.2, y: -size * 0.48, size: size * 0.13 },
        { x: size * 0.3, y: -size * 0.43, size: size * 0.12 }
    ];

    toePositions.forEach(toe => {
        ctx.beginPath();
        ctx.arc(toe.x, toe.y, toe.size, 0, Math.PI * 2);
        ctx.fill();
    });
};

function DrawingGame() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState('brush');
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [showSteps, setShowSteps] = useState(true);
    const [useRockCanvas, setUseRockCanvas] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [gridSize, setGridSize] = useState(20);
    const [selectedTexture, setSelectedTexture] = useState(rockTextures[0]);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [showAchievement, setShowAchievement] = useState(null);
    const [symmetryEnabled, setSymmetryEnabled] = useState(false);
    const [selectedShape, setSelectedShape] = useState(null);
    const [showGuides, setShowGuides] = useState(false);
    const [guideType, setGuideType] = useState('center');
    const [brushType, setBrushType] = useState(brushTypes.NORMAL);
    const [selectedStamp, setSelectedStamp] = useState(null);
    const [pressure, setPressure] = useState(1);
    const [isStampMode, setIsStampMode] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [lastPinchDistance, setLastPinchDistance] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [showTouchInstructions, setShowTouchInstructions] = useState(false);

    useEffect(() => {
        if (!showIntro && canvasRef.current) {
            const canvas = canvasRef.current;
            requestAnimationFrame(() => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetWidth;

                const context = canvas.getContext('2d');
                context.lineCap = 'round';
                context.strokeStyle = color;
                context.fillStyle = color;
                context.lineWidth = brushSize;

                if (currentLesson?.specialCanvas === 'rock') {
                    context.globalCompositeOperation = 'soft-light';
                    setUseRockCanvas(true);
                } else {
                    context.globalCompositeOperation = 'source-over';
                    setUseRockCanvas(false);
                }

                contextRef.current = context;
                setIsCanvasReady(true);
                saveCanvasState();
            });
        }
    }, [showIntro, color, brushSize, currentLesson]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey || e.metaKey) {  // Ctrl/Cmd key combinations
                switch (e.key.toLowerCase()) {
                    case 'z':
                        if (e.shiftKey) {
                            handleRedo();  // Ctrl+Shift+Z for Redo
                        } else {
                            handleUndo();  // Ctrl+Z for Undo
                        }
                        e.preventDefault();
                        break;
                    case 's':
                        saveDrawing();     // Ctrl+S for Save
                        e.preventDefault();
                        break;
                }
            } else {  // Single key shortcuts
                switch (e.key.toLowerCase()) {
                    case 'b':
                        handleToolChange('brush');  // B for Brush
                        break;
                    case 'e':
                        handleToolChange('eraser'); // E for Eraser
                        break;
                    case 'g':
                        setShowGrid(!showGrid);     // G for Grid
                        break;
                    case '[':
                        setBrushSize(prev => Math.max(1, prev - 1));  // [ to decrease size
                        break;
                    case ']':
                        setBrushSize(prev => Math.min(20, prev + 1)); // ] to increase size
                        break;
                    case 'h':
                        setShowGuides(!showGuides); // H for Guides
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showGrid, showGuides]);

    const saveCanvasState = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            setUndoStack(prev => [...prev, canvas.toDataURL()]);
            setRedoStack([]);
        }
    };

    const startDrawing = (event) => {
        if (isStampMode && selectedStamp) {
            drawStamp(event);
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        const x = (event.clientX || event.touches?.[0]?.clientX || 0) - rect.left;
        const y = (event.clientY || event.touches?.[0]?.clientY || 0) - rect.top;

        if (selectedShape) {
            drawShape(event);
        } else {
            contextRef.current.beginPath();
            contextRef.current.moveTo(x, y);
            setIsDrawing(true);
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing || selectedShape) return;

        const { offsetX, offsetY } = nativeEvent;

        if (selectedTool === 'brush') {
            if (brushType === brushTypes.NORMAL) {
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.stroke();
            } else {
                applyBrushEffect(contextRef.current, offsetX, offsetY);
            }
        } else if (selectedTool === 'eraser') {
            contextRef.current.save();
            contextRef.current.globalCompositeOperation = 'destination-out';
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
            contextRef.current.restore();
        }
    };

    const stopDrawing = () => {
        if (!selectedShape) {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
        saveCanvasState();
    };

    const handleUndo = () => {
        if (undoStack.length > 1 && contextRef.current) {
            const previousState = undoStack[undoStack.length - 2];
            const currentState = undoStack[undoStack.length - 1];

            setUndoStack(undoStack.slice(0, -1));
            setRedoStack([...redoStack, currentState]);

            const img = new window.Image();
            img.src = previousState;
            img.onload = () => {
                contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                contextRef.current.drawImage(img, 0, 0);
            };
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0 && contextRef.current) {
            const nextState = redoStack[redoStack.length - 1];

            setRedoStack(redoStack.slice(0, -1));
            setUndoStack([...undoStack, nextState]);

            const img = new window.Image();
            img.src = nextState;
            img.onload = () => {
                contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                contextRef.current.drawImage(img, 0, 0);
            };
        }
    };

    const handleClear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        saveCanvasState();
    };

    const handleToolChange = (tool) => {
        setSelectedTool(tool);
        setSelectedShape(null); // Reset shape selection when changing tools
        contextRef.current.strokeStyle = tool === 'brush' ? color : '#000000';
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
        if (selectedTool === 'brush') {
            contextRef.current.strokeStyle = e.target.value;
        }
    };

    const handleSizeChange = (e) => {
        setBrushSize(e.target.value);
        contextRef.current.lineWidth = e.target.value;
    };

    const renderIntro = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2>Learn Petroglyph Drawing Techniques</h2>
            <p>Discover how ancient artists created these remarkable rock art pieces</p>

            <LessonSelect>
                {drawingLessons.map(lesson => (
                    <LessonCard
                        key={lesson.id}
                        onClick={() => {
                            setCurrentLesson(lesson);
                            setShowIntro(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3>{lesson.title}</h3>
                        <p>{lesson.description}</p>
                        <div className="difficulty">
                            Difficulty: {lesson.difficulty}
                        </div>
                    </LessonCard>
                ))}
            </LessonSelect>
        </motion.div>
    );

    const unlockAchievement = (achievementId) => {
        if (!unlockedAchievements.includes(achievementId)) {
            setUnlockedAchievements(prev => [...prev, achievementId]);
            setShowAchievement(achievements[achievementId]);
            setTimeout(() => setShowAchievement(null), 3000);
        }
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `petroglyph-drawing-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        unlockAchievement('FIRST_DRAWING');
    };

    const drawShape = (event) => {
        // Get coordinates from either mouse or touch event
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (event.clientX || event.touches?.[0]?.clientX || 0) - rect.left;
        const y = (event.clientY || event.touches?.[0]?.clientY || 0) - rect.top;

        const ctx = contextRef.current;

        ctx.beginPath();
        switch (selectedShape) {
            case shapes.CIRCLE:
                ctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
                break;
            case shapes.SQUARE:
                const size = brushSize * 4;
                ctx.rect(x - size / 2, y - size / 2, size, size);
                break;
            case shapes.TRIANGLE:
                const side = brushSize * 4;
                ctx.moveTo(x, y - side / 2);
                ctx.lineTo(x + side / 2, y + side / 2);
                ctx.lineTo(x - side / 2, y + side / 2);
                ctx.closePath();
                break;
            case shapes.STAR:
                drawStar(ctx, x, y);
                break;
            case shapes.SPIRAL:
                drawSpiral(ctx, x, y);
                break;
            case shapes.ZIGZAG:
                const width = brushSize * 8;
                const height = brushSize * 4;
                ctx.moveTo(x - width / 2, y);
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(x - width / 2 + width / 3 * (i + 1), y + (i % 2 ? height : -height));
                }
                break;
            default:
                return;
        }

        if (symmetryEnabled) {
            // Draw mirrored shape
            ctx.save();
            ctx.scale(1, -1);
            ctx.translate(0, -canvasRef.current.height);
            // Repeat the same shape drawing code
            // ... (copy the switch statement here)
            ctx.restore();
        }

        ctx.fill();
        saveCanvasState();
    };

    const handleShapeSelect = (shape) => {
        setSelectedShape(shape);
        setSelectedTool('brush'); // Reset to brush when selecting a shape
        contextRef.current.fillStyle = color; // Use current color for shapes
    };

    const renderExpandedToolbar = () => (
        <ToolsExpanded>
            {/* Basic Tools Group */}
            <div className="tool-group">
                <h4>Basic Tools</h4>
                <div className="tools-row">
                    <Tool
                        active={selectedTool === 'brush'}
                        onClick={() => handleToolChange('brush')}
                    >
                        <ToolWithTooltip tooltip="Brush Tool" shortcut="B">
                            🖌️ Brush
                        </ToolWithTooltip>
                    </Tool>
                    <Tool
                        active={selectedTool === 'eraser'}
                        onClick={() => handleToolChange('eraser')}
                    >
                        <ToolWithTooltip tooltip="Eraser Tool" shortcut="E">
                            ⚪ Eraser
                        </ToolWithTooltip>
                    </Tool>
                    <ColorPicker
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                        title="Color"
                    />
                </div>
                <div className="tools-row">
                    <span>Size:</span>
                    <SizeSlider
                        type="range"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={handleSizeChange}
                    />
                </div>
            </div>

            {/* Brush Effects Group */}
            <div className="tool-group">
                <h4>Brush Effects</h4>
                <div className="tools-row">
                    {Object.entries(brushTypes).map(([key, value]) => (
                        <Tool
                            key={key}
                            active={brushType === value}
                            onClick={() => setBrushType(value)}
                        >
                            {key === 'NORMAL' ? '🖌️' : '🎨'} {key.toLowerCase()}
                        </Tool>
                    ))}
                </div>
                <div className="tools-row">
                    <span>Pressure:</span>
                    <SizeSlider
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.1"
                        value={pressure}
                        onChange={(e) => setPressure(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            {/* Shapes Group */}
            <div className="tool-group">
                <h4>Shapes</h4>
                <div className="tools-row">
                    {Object.entries(shapes).map(([key, value]) => (
                        <Tool
                            key={key}
                            active={selectedShape === value}
                            onClick={() => handleShapeSelect(value)}
                        >
                            {key === 'CIRCLE' ? '⭕' :
                                key === 'SQUARE' ? '⬛' :
                                    key === 'TRIANGLE' ? '📐' :
                                        key === 'STAR' ? '⭐' :
                                            key === 'SPIRAL' ? '🌀' : '〽️'}
                        </Tool>
                    ))}
                </div>
            </div>

            {/* Stamps Group */}
            <div className="tool-group">
                <h4>Stamps</h4>
                <div className="tools-row">
                    {stampPatterns.map(stamp => (
                        <Tool
                            key={stamp.id}
                            active={selectedStamp === stamp.id}
                            onClick={() => {
                                setSelectedStamp(stamp.id);
                                setIsStampMode(true);
                            }}
                            title={stamp.name}
                        >
                            {stamp.icon}
                        </Tool>
                    ))}
                </div>
            </div>

            {/* Guides Group */}
            <div className="tool-group">
                <h4>Guides & Helpers</h4>
                <div className="tools-row">
                    <Tool
                        active={showGrid}
                        onClick={() => setShowGrid(!showGrid)}
                    >
                        <ToolWithTooltip tooltip="Toggle Grid" shortcut="G">
                            📏 Grid
                        </ToolWithTooltip>
                    </Tool>
                    <Tool
                        active={symmetryEnabled}
                        onClick={() => setSymmetryEnabled(!symmetryEnabled)}
                    >
                        <ToolWithTooltip tooltip="Toggle Symmetry" shortcut="H">
                            🔄 Symmetry
                        </ToolWithTooltip>
                    </Tool>
                    <Tool
                        active={showGuides}
                        onClick={() => setShowGuides(!showGuides)}
                    >
                        <ToolWithTooltip tooltip="Toggle Guides" shortcut="H">
                            📐 Guides
                        </ToolWithTooltip>
                    </Tool>
                </div>
                {showGrid && (
                    <div className="tools-row">
                        <span>Grid Size:</span>
                        <SizeSlider
                            type="range"
                            min="10"
                            max="50"
                            value={gridSize}
                            onChange={(e) => setGridSize(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Actions Group */}
            <div className="tool-group">
                <h4>Actions</h4>
                <div className="tools-row">
                    <Button onClick={handleUndo} disabled={undoStack.length <= 1}>
                        <ToolWithTooltip tooltip="Undo" shortcut="Ctrl+Z">
                            ↩️ Undo
                        </ToolWithTooltip>
                    </Button>
                    <Button onClick={handleRedo} disabled={redoStack.length === 0}>
                        <ToolWithTooltip tooltip="Redo" shortcut="Ctrl+Shift+Z">
                            ↪️ Redo
                        </ToolWithTooltip>
                    </Button>
                    <Button onClick={handleClear}>
                        <ToolWithTooltip tooltip="Clear Canvas" shortcut="Ctrl+S">
                            🗑️ Clear
                        </ToolWithTooltip>
                    </Button>
                    <Button onClick={saveDrawing}>
                        <ToolWithTooltip tooltip="Save Drawing" shortcut="Ctrl+S">
                            💾 Save
                        </ToolWithTooltip>
                    </Button>
                </div>
            </div>
        </ToolsExpanded>
    );

    // Add brush effect functions
    const applyBrushEffect = (ctx, x, y) => {
        const currentPressure = pressure * (Math.random() * 0.4 + 0.8); // Add randomness

        switch (brushType) {
            case brushTypes.CHALK:
                // Create chalk-like effect
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        x + Math.random() * 4 - 2,
                        y + Math.random() * 4 - 2,
                        brushSize / 2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }
                break;

            case brushTypes.ROUGH:
                // Create rough, scratchy effect
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(
                        x + Math.random() * brushSize - brushSize / 2,
                        y + Math.random() * brushSize - brushSize / 2
                    );
                    ctx.stroke();
                }
                break;

            case brushTypes.DOTTED:
                // Create dotted effect
                ctx.beginPath();
                ctx.arc(x, y, brushSize / 3, 0, Math.PI * 2);
                ctx.fill();
                break;

            case brushTypes.PATTERN:
                // Create pattern effect (e.g., small crosses)
                ctx.beginPath();
                ctx.moveTo(x - brushSize / 2, y);
                ctx.lineTo(x + brushSize / 2, y);
                ctx.moveTo(x, y - brushSize / 2);
                ctx.lineTo(x, y + brushSize / 2);
                ctx.stroke();
                break;

            case brushTypes.PETROGLYPH:
                // Create authentic petroglyph effect
                for (let i = 0; i < 5; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = brushSize * currentPressure;
                    ctx.beginPath();
                    ctx.arc(
                        x + Math.cos(angle) * radius * 0.3,
                        y + Math.sin(angle) * radius * 0.3,
                        radius * 0.2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }
                break;

            case brushTypes.STONE_CHISEL:
                // Create chisel-like marks
                const chiselWidth = brushSize * currentPressure;
                const chiselLength = brushSize * 2;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.random() * Math.PI);
                ctx.fillRect(-chiselWidth / 2, -chiselLength / 2, chiselWidth, chiselLength);
                ctx.restore();
                break;

            case brushTypes.WEATHERED:
                // Create weathered, eroded effect
                for (let i = 0; i < 8; i++) {
                    const radius = brushSize * currentPressure * (Math.random() * 0.5 + 0.5);
                    ctx.beginPath();
                    ctx.arc(
                        x + (Math.random() - 0.5) * brushSize,
                        y + (Math.random() - 0.5) * brushSize,
                        radius * 0.3,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }
                break;

            default:
                return;
        }
    };

    // Add new shape drawing functions
    const drawStar = (ctx, x, y, spikes = 5, outerRadius = brushSize * 3, innerRadius = brushSize * 1.5) => {
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
            rot += step;
            ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
            rot += step;
        }

        ctx.closePath();
    };

    const drawSpiral = (ctx, x, y, revolutions = 3) => {
        const spacing = brushSize;
        const steps = 50 * revolutions;

        ctx.beginPath();
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const angle = t * revolutions * 2 * Math.PI;
            const radius = t * brushSize * 10;

            const pointX = x + radius * Math.cos(angle);
            const pointY = y + radius * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        ctx.stroke();
    };

    // Add stamp drawing function
    const drawStamp = (event) => {
        // Get coordinates from either mouse or touch event
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (event.clientX || event.touches[0].clientX) - rect.left;
        const y = (event.clientY || event.touches[0].clientY) - rect.top;

        const ctx = contextRef.current;
        const stampSize = brushSize * 3;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(pressure, pressure);

        switch (selectedStamp) {
            case 'handprint':
                drawHandprint(ctx, stampSize);
                break;
            case 'footprint':
                drawFootprint(ctx, stampSize);
                break;
            case 'spiral':
                drawSpiral(ctx, 0, 0, 3); // Draw spiral at stamp position
                break;
            case 'sun':
                drawSun(ctx, stampSize);
                break;
            case 'moon':
                drawMoon(ctx, stampSize);
                break;
            default:
                break;
        }

        ctx.restore();
        saveCanvasState();
    };

    // Add new stamp patterns
    const drawSun = (ctx, size) => {
        // Draw center circle
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Draw rays
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
            ctx.lineTo(Math.cos(angle) * size * 0.7, Math.sin(angle) * size * 0.7);
            ctx.lineWidth = size * 0.1;
            ctx.stroke();
        }
    };

    const drawMoon = (ctx, size) => {
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Create crescent effect
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(size * 0.2, 0, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    // Add styled tooltip component
    const Tooltip = styled.div`
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        pointer-events: none;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s;

        &.show {
            opacity: 1;
        }

        &:after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
    `;

    // Add tooltip wrapper component
    const TooltipWrapper = styled.div`
        position: relative;
        display: inline-block;
    `;

    // Create tooltip component
    const ToolWithTooltip = ({ children, tooltip, shortcut }) => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            <TooltipWrapper
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
                <Tooltip className={showTooltip ? 'show' : ''}>
                    {tooltip} {shortcut && <span style={{ opacity: 0.7 }}>[{shortcut}]</span>}
                </Tooltip>
            </TooltipWrapper>
        );
    };

    // Add keyboard shortcuts info panel
    const ShortcutsPanel = styled(motion.div)`
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 300px;

        h4 {
            color: #4ECDC4;
            margin-bottom: 0.5rem;
        }

        .shortcuts-list {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.5rem;
            font-size: 0.9rem;

            .key {
                background: #f0f0f0;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                font-family: monospace;
            }
        }
    `;

    // Add touch gesture handlers
    const getDistance = (touch1, touch2) => {
        return Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            // Two finger gesture - start pinch/pan
            setLastPinchDistance(getDistance(e.touches[0], e.touches[1]));
            setIsPanning(true);
            e.preventDefault();
        } else {
            // Single finger - draw
            const touch = e.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (touch.clientX - rect.left - offset.x) / scale;
            const y = (touch.clientY - rect.top - offset.y) / scale;

            if (isStampMode && selectedStamp) {
                drawStamp({ clientX: touch.clientX, clientY: touch.clientY });
            } else {
                contextRef.current.beginPath();
                contextRef.current.moveTo(x, y);
                setIsDrawing(true);
            }
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            // Handle pinch/pan
            const currentDistance = getDistance(e.touches[0], e.touches[1]);

            if (lastPinchDistance) {
                // Pinch to zoom
                const delta = currentDistance - lastPinchDistance;
                const newScale = Math.max(0.5, Math.min(4, scale + delta * 0.01));
                setScale(newScale);

                // Two-finger pan
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                if (isPanning) {
                    setOffset(prev => ({
                        x: prev.x + (midX - prev.x) * 0.1,
                        y: prev.y + (midY - prev.y) * 0.1
                    }));
                }
            }

            setLastPinchDistance(currentDistance);
            e.preventDefault();
        } else if (isDrawing) {
            // Handle drawing
            const touch = e.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (touch.clientX - rect.left - offset.x) / scale;
            const y = (touch.clientY - rect.top - offset.y) / scale;

            if (selectedTool === 'brush') {
                if (brushType === brushTypes.NORMAL) {
                    contextRef.current.lineTo(x, y);
                    contextRef.current.stroke();
                } else {
                    applyBrushEffect(contextRef.current, x, y);
                }
            }
        }
    };

    const handleTouchEnd = () => {
        setIsDrawing(false);
        setIsPanning(false);
        setLastPinchDistance(null);
        contextRef.current?.closePath();
        saveCanvasState();
    };

    // Update Canvas component to include transform and new touch handlers
    <Canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
            display: isCanvasReady ? 'block' : 'none',
            width: '100%',
            height: '100%',
            touchAction: 'none',
            transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
            transformOrigin: '0 0'
        }}
    />

    // Add touch controls UI
    const TouchControls = styled(motion.div)`
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;

        @media (min-width: 768px) {
            display: none;
        }
    `;

    // Add touch controls to the UI
    {
        window.matchMedia('(max-width: 767px)').matches && (
            <TouchControls
                initial={{ y: 100 }}
                animate={{ y: 0 }}
            >
                <Button onClick={() => setScale(1)}>
                    🔍 Reset Zoom
                </Button>
                <Button onClick={() => setOffset({ x: 0, y: 0 })}>
                    ⟲ Reset Position
                </Button>
                <Button onClick={() => {
                    setScale(1);
                    setOffset({ x: 0, y: 0 });
                }}>
                    ↺ Reset All
                </Button>
            </TouchControls>
        )
    }

    // Add touch gesture instructions
    const TouchInstructions = styled(motion.div)`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        z-index: 1001;

        .gesture {
            margin: 1rem 0;
            font-size: 1.2rem;
        }
    `;

    // Show touch instructions on first visit
    useEffect(() => {
        const hasSeenInstructions = localStorage.getItem('hasSeenTouchInstructions');
        if (!hasSeenInstructions && window.matchMedia('(max-width: 767px)').matches) {
            setShowTouchInstructions(true);
            localStorage.setItem('hasSeenTouchInstructions', 'true');
        }
    }, []);

    {
        showTouchInstructions && (
            <TouchInstructions
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <h3>Touch Gestures</h3>
                <div className="gesture">👆 One finger to draw</div>
                <div className="gesture">✌️ Two fingers to pan</div>
                <div className="gesture">🤏 Pinch to zoom</div>
                <Button onClick={() => setShowTouchInstructions(false)}>
                    Got it!
                </Button>
            </TouchInstructions>
        )
    }

    return (
        <GameContainer>
            {showIntro ? (
                renderIntro()
            ) : (
                <>
                    <InstructionsBar currentStep={currentStep}>
                        <h3>{currentLesson.title}</h3>
                        <div className="steps">
                            {currentLesson.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="step"
                                    onClick={() => setCurrentStep(index)}
                                >
                                    {index + 1}. {step}
                                </div>
                            ))}
                        </div>
                    </InstructionsBar>

                    <ToolBar>
                        {renderExpandedToolbar()}
                    </ToolBar>

                    <DrawingArea>
                        <CanvasWrapper>
                            {!isCanvasReady && (
                                <div style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    color: '#666'
                                }}>
                                    Loading canvas...
                                </div>
                            )}
                            {useRockCanvas ? (
                                <>
                                    <RockCanvas
                                        ref={canvasRef}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        style={{
                                            display: isCanvasReady ? 'block' : 'none',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                    <TextureOverlay />
                                </>
                            ) : (
                                <Canvas
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onTouchStart={startDrawing}
                                    onMouseMove={draw}
                                    onTouchMove={draw}
                                    onMouseUp={stopDrawing}
                                    onTouchEnd={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchCancel={stopDrawing}
                                    style={{
                                        display: isCanvasReady ? 'block' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        touchAction: 'none' // Prevent scrolling while drawing
                                    }}
                                />
                            )}
                            <GridOverlay show={showGrid} size={gridSize} />
                            <GuideOverlay
                                showSymmetry={symmetryEnabled}
                                guideType={guideType}
                                style={{ opacity: showGuides ? 1 : 0 }}
                            />
                            {useRockCanvas && (
                                <TexturePreview texture={selectedTexture.image} />
                            )}
                        </CanvasWrapper>
                        <ReferenceImage src={currentLesson?.reference} />
                    </DrawingArea>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Button onClick={() => setShowIntro(true)}>
                            Choose Different Lesson
                        </Button>
                    </div>

                    {showShortcuts && (
                        <ShortcutsPanel
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <h4>Keyboard Shortcuts</h4>
                            <div className="shortcuts-list">
                                <span className="key">B</span> <span>Brush Tool</span>
                                <span className="key">E</span> <span>Eraser Tool</span>
                                <span className="key">G</span> <span>Toggle Grid</span>
                                <span className="key">H</span> <span>Toggle Guides</span>
                                <span className="key">[</span> <span>Decrease Brush Size</span>
                                <span className="key">]</span> <span>Increase Brush Size</span>
                                <span className="key">Ctrl+Z</span> <span>Undo</span>
                                <span className="key">Ctrl+Shift+Z</span> <span>Redo</span>
                                <span className="key">Ctrl+S</span> <span>Save Drawing</span>
                            </div>
                        </ShortcutsPanel>
                    )}
                </>
            )}
        </GameContainer>
    );
}

export default DrawingGame; 