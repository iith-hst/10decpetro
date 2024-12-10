import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LevelInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;

  h2 {
    color: #2d3436;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }

  p {
    color: #636e72;
    font-size: 1.1rem;
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #4ECDC4;
  border-radius: 12px;
  color: white;

  div {
    text-align: center;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const Timer = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
  color: ${props => props.isLow ? '#FF6B6B' : '#4ECDC4'};
  font-weight: bold;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h3 {
    color: #2d3436;
    margin-bottom: 1rem;
  }
`;

const AnswerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const AnswerButton = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props =>
        props.isCorrect ? '#4ECDC4' :
            props.isWrong ? '#FF6B6B' :
                '#f8f9fa'};
  color: ${props => props.isCorrect || props.isWrong ? 'white' : '#2d3436'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const DiagramOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const DiagramContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
`;

const DiagramImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const DiagramAnnotation = styled.div`
  position: absolute;
  background: #4ECDC4;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transform: translate(-50%, -50%);
  cursor: help;
  
  &:hover {
    background: #FF6B6B;
  }
`;

const questionBank = [
    {
        level: 1,
        questions: [
            {
                id: 1,
                image: '/images/petroglyphs/kasheli-elephant.jpg',
                question: 'What type of animal is predominantly featured in this petroglyph?',
                options: ['Elephant', 'Tiger', 'Horse', 'Lion'],
                correctAnswer: 'Elephant',
                explanation: 'This is the famous Kasheli elephant petroglyph, containing 70-80 animal figures within its outline.'
            },
            {
                id: 2,
                image: '/images/petroglyphs/barsu-tigers.jpg',
                question: 'What unique feature can be observed in the Barsu petroglyph?',
                options: ['Rectangular tiger forms', 'Circular patterns', 'Human figures', 'Bird motifs'],
                correctAnswer: 'Rectangular tiger forms',
                explanation: 'The Barsu site is known for its unique rectangular stylized tiger forms.'
            },
            {
                id: 3,
                image: '/images/petroglyphs/ukshi-elephant.jpg',
                question: 'Which artistic technique is demonstrated in this petroglyph?',
                options: ['Detailed carving', 'Paint application', 'Surface scratching', 'Mosaic work'],
                correctAnswer: 'Detailed carving',
                explanation: 'The Ukshi elephant shows advanced carving techniques with intricate details.'
            },
            {
                id: 4,
                image: '/images/petroglyphs/devache-gothane.jpg',
                question: 'What is the primary subject matter in this petroglyph?',
                options: ['Animal figures', 'Human figures', 'Geometric patterns', 'Celestial bodies'],
                correctAnswer: 'Animal figures',
                explanation: 'The Devache Gothane site primarily features animal figures in various forms.'
            },
            {
                id: 5,
                image: '/images/petroglyphs/niwali-figures.jpg',
                question: 'What is unique about the Niwali petroglyph site?',
                options: ['Narrative scenes', 'Abstract patterns', 'Single large figure', 'Color usage'],
                correctAnswer: 'Narrative scenes',
                explanation: 'Niwali petroglyphs are known for their narrative scenes depicting daily life and activities.'
            }
        ]
    },
    {
        level: 2,
        questions: [
            {
                id: 6,
                image: '/images/petroglyphs/pattern1.jpg',
                question: 'What historical period do these petroglyphs likely belong to?',
                options: ['Mesolithic', 'Neolithic', 'Chalcolithic', 'Iron Age'],
                correctAnswer: 'Mesolithic',
                explanation: 'The style and technique suggest these are from the Mesolithic period.'
            },
            {
                id: 7,
                image: '/images/petroglyphs/pattern2.jpg',
                question: 'What tool was likely used to create these petroglyphs?',
                options: ['Stone tools', 'Metal chisels', 'Wooden implements', 'Bone tools'],
                correctAnswer: 'Stone tools',
                explanation: 'The marks and techniques indicate the use of stone tools for carving.'
            },
            {
                id: 8,
                image: '/images/petroglyphs/pattern3.jpg',
                question: 'What does this geometric pattern likely represent?',
                options: ['Celestial objects', 'Hunting grounds', 'Water sources', 'Tribal boundaries'],
                correctAnswer: 'Celestial objects',
                explanation: 'These geometric patterns often represented celestial observations and astronomical events.'
            },
            {
                id: 9,
                image: '/images/petroglyphs/pattern4.jpg',
                question: 'What type of scene is depicted here?',
                options: ['Hunting scene', 'Dancing ritual', 'Agricultural work', 'Battle scene'],
                correctAnswer: 'Dancing ritual',
                explanation: 'The arrangement of figures suggests a ritualistic dance or ceremony.'
            },
            {
                id: 10,
                image: '/images/petroglyphs/pattern5.jpg',
                question: 'What environmental condition helped preserve these petroglyphs?',
                options: ['Rock overhang', 'Desert climate', 'Cave location', 'Forest cover'],
                correctAnswer: 'Rock overhang',
                explanation: 'The natural rock overhang protected these petroglyphs from weathering.'
            }
        ]
    },
    {
        level: 3,
        questions: [
            {
                id: 11,
                image: '/images/petroglyphs/dating1.jpg',
                question: 'Which dating method is most appropriate for these petroglyphs?',
                options: ['Relative dating', 'Carbon-14 dating', 'Thermoluminescence', 'Potassium-argon dating'],
                correctAnswer: 'Relative dating',
                explanation: 'Relative dating using archaeological context and style analysis is most appropriate for rock art.'
            },
            {
                id: 12,
                image: '/images/petroglyphs/context1.jpg',
                question: 'What period does the hunting scene style suggest?',
                options: ['Early Mesolithic', 'Late Mesolithic', 'Early Neolithic', 'Chalcolithic'],
                correctAnswer: 'Late Mesolithic',
                explanation: 'The dynamic hunting scenes with multiple figures are characteristic of Late Mesolithic period.'
            },
            {
                id: 13,
                image: '/images/petroglyphs/layers1.jpg',
                question: 'What does the overlapping of figures indicate?',
                options: ['Multiple time periods', 'Single event', 'Artistic style', 'Random placement'],
                correctAnswer: 'Multiple time periods',
                explanation: 'Overlapping figures often indicate multiple phases of creation over different time periods.'
            },
            {
                id: 14,
                image: '/images/petroglyphs/style1.jpg',
                question: 'Which cultural phase is represented by these geometric patterns?',
                options: ['Pre-pastoral', 'Early pastoral', 'Advanced pastoral', 'Early agricultural'],
                correctAnswer: 'Early pastoral',
                explanation: 'The geometric patterns and animal motifs are typical of early pastoral communities.'
            },
            {
                id: 15,
                image: '/images/petroglyphs/compare1.jpg',
                question: 'What does the patina development suggest about age?',
                options: ['Over 10,000 years', '5,000-8,000 years', '2,000-4,000 years', 'Under 2,000 years'],
                correctAnswer: '5,000-8,000 years',
                explanation: 'The degree of patina development suggests creation during the mid-Holocene period.'
            }
        ]
    },
    {
        level: 4,
        questions: [
            {
                id: 16,
                image: '/images/petroglyphs/technique1.jpg',
                question: 'What pecking technique was used here?',
                options: ['Direct percussion', 'Indirect percussion', 'Abrasion', 'Incision'],
                correctAnswer: 'Direct percussion',
                explanation: 'The round, regular impact marks indicate direct percussion technique with a stone tool.'
            },
            {
                id: 17,
                image: '/images/petroglyphs/depth1.jpg',
                question: 'What does the varying depth of pecking indicate?',
                options: ['Different artists', 'Tool variation', 'Intentional shading', 'Random patterns'],
                correctAnswer: 'Intentional shading',
                explanation: 'The deliberate variation in pecking depth was used to create visual depth and shading effects.'
            },
            {
                id: 18,
                image: '/images/petroglyphs/tool1.jpg',
                question: 'What type of stone tool created these marks?',
                options: ['Quartz point', 'Basalt hammer', 'Granite scraper', 'Sandstone abrader'],
                correctAnswer: 'Quartz point',
                explanation: 'The sharp, precise marks are characteristic of quartz point tools.'
            },
            {
                id: 19,
                image: '/images/petroglyphs/surface1.jpg',
                question: 'Why was this rock surface chosen for petroglyphs?',
                options: ['Desert varnish presence', 'Smooth texture', 'Mineral composition', 'Random selection'],
                correctAnswer: 'Desert varnish presence',
                explanation: 'The dark desert varnish provided ideal contrast for petroglyph creation.'
            },
            {
                id: 20,
                image: '/images/petroglyphs/wear1.jpg',
                question: 'What caused the weathering pattern visible here?',
                options: ['Wind erosion', 'Water runoff', 'Chemical weathering', 'Biological activity'],
                correctAnswer: 'Water runoff',
                explanation: 'The vertical streaking pattern indicates damage from seasonal water runoff.'
            }
        ]
    },
    {
        level: 5,
        questions: [
            {
                id: 21,
                image: '/images/petroglyphs/ritual1.jpg',
                question: 'What ritual activity is depicted in this scene?',
                options: ['Hunting ceremony', 'Fertility ritual', 'Rain dance', 'Burial rite'],
                correctAnswer: 'Fertility ritual',
                explanation: 'The arrangement and symbolism of figures suggests a fertility ritual common in early agricultural societies.'
            },
            {
                id: 22,
                image: '/images/petroglyphs/symbols1.jpg',
                question: 'What do these recurring symbols represent?',
                options: ['Seasonal changes', 'Tribal territories', 'Celestial events', 'Migration routes'],
                correctAnswer: 'Seasonal changes',
                explanation: 'These symbols were used to track and record seasonal changes affecting the community.'
            },
            {
                id: 23,
                image: '/images/petroglyphs/social1.jpg',
                question: 'What social structure is indicated by this composition?',
                options: ['Hierarchical society', 'Egalitarian group', 'Family unit', 'Warrior class'],
                correctAnswer: 'Hierarchical society',
                explanation: 'The size and positioning of figures indicates a clear social hierarchy within the community.'
            },
            {
                id: 24,
                image: '/images/petroglyphs/belief1.jpg',
                question: 'Which belief system is reflected in these motifs?',
                options: ['Animistic', 'Totemic', 'Shamanic', 'Ancestral worship'],
                correctAnswer: 'Totemic',
                explanation: 'The repeated animal symbols suggest a totemic belief system where specific animals held spiritual significance.'
            },
            {
                id: 25,
                image: '/images/petroglyphs/daily1.jpg',
                question: 'What daily activity is being recorded here?',
                options: ['Food gathering', 'Tool making', 'Textile production', 'Pottery making'],
                correctAnswer: 'Food gathering',
                explanation: 'The scene depicts organized food gathering activities with multiple participants.'
            }
        ]
    },
    {
        level: 6,
        questions: [
            {
                id: 26,
                image: '/images/petroglyphs/compare1.jpg',
                question: 'Which other cultural tradition shows similar motifs?',
                options: ['Indus Valley', 'Mesopotamian', 'Egyptian', 'Chinese'],
                correctAnswer: 'Indus Valley',
                explanation: 'These motifs share striking similarities with Indus Valley symbolic representations.'
            },
            {
                id: 27,
                image: '/images/petroglyphs/influence1.jpg',
                question: 'What cultural influence is evident in this style?',
                options: ['Coastal trading', 'Mountain communities', 'Desert nomads', 'Forest dwellers'],
                correctAnswer: 'Coastal trading',
                explanation: 'The artistic style shows clear influence from coastal trading communities.'
            },
            {
                id: 28,
                image: '/images/petroglyphs/evolution1.jpg',
                question: 'How did this artistic style evolve over time?',
                options: ['Simplification', 'Greater complexity', 'Size increase', 'Color addition'],
                correctAnswer: 'Greater complexity',
                explanation: 'The style evolved towards greater complexity in composition and symbolism.'
            },
            {
                id: 29,
                image: '/images/petroglyphs/regional1.jpg',
                question: 'What regional variation is shown here?',
                options: ['Tool technique', 'Subject matter', 'Symbol size', 'Rock selection'],
                correctAnswer: 'Tool technique',
                explanation: 'The tool technique used here is distinctive to this regional variation.'
            },
            {
                id: 30,
                image: '/images/petroglyphs/tradition1.jpg',
                question: 'Which artistic tradition continued into later periods?',
                options: ['Animal motifs', 'Geometric patterns', 'Human figures', 'Celestial symbols'],
                correctAnswer: 'Geometric patterns',
                explanation: 'The geometric pattern tradition continued into later historical periods.'
            }
        ]
    },
    {
        level: 7,
        questions: [
            {
                id: 31,
                image: '/images/petroglyphs/site1.jpg',
                question: 'What type of archaeological site surrounds these petroglyphs?',
                options: ['Settlement site', 'Burial ground', 'Trading post', 'Religious center'],
                correctAnswer: 'Settlement site',
                explanation: 'The surrounding artifacts and structures indicate this was a permanent settlement area.'
            },
            {
                id: 32,
                image: '/images/petroglyphs/stratigraphy1.jpg',
                question: 'What does the stratigraphic context reveal?',
                options: ['Multiple occupations', 'Single use period', 'Natural formation', 'Modern disturbance'],
                correctAnswer: 'Multiple occupations',
                explanation: 'The layered deposits indicate multiple periods of human occupation and petroglyph creation.'
            },
            {
                id: 33,
                image: '/images/petroglyphs/artifacts1.jpg',
                question: 'Which associated artifacts help date these petroglyphs?',
                options: ['Stone tools', 'Pottery shards', 'Metal objects', 'Bone tools'],
                correctAnswer: 'Stone tools',
                explanation: 'The stone tool assemblage found nearby provides crucial dating evidence.'
            },
            {
                id: 34,
                image: '/images/petroglyphs/landscape1.jpg',
                question: 'How did the landscape influence petroglyph placement?',
                options: ['Water proximity', 'Defensive position', 'Solar alignment', 'Rock quality'],
                correctAnswer: 'Solar alignment',
                explanation: 'The petroglyphs were strategically placed to align with significant solar events.'
            },
            {
                id: 35,
                image: '/images/petroglyphs/excavation1.jpg',
                question: 'What excavation method is most appropriate here?',
                options: ['Grid system', 'Vertical trenching', 'Open area', 'Test pits'],
                correctAnswer: 'Grid system',
                explanation: 'A grid system allows precise mapping of petroglyphs and associated artifacts.'
            }
        ]
    },
    {
        level: 8,
        questions: [
            {
                id: 36,
                image: '/images/petroglyphs/damage1.jpg',
                question: 'What is the primary threat to this petroglyph?',
                options: ['Weathering', 'Vandalism', 'Development', 'Vegetation'],
                correctAnswer: 'Weathering',
                explanation: 'Natural weathering processes pose the most significant threat to this petroglyph.'
            },
            {
                id: 37,
                image: '/images/petroglyphs/conservation1.jpg',
                question: 'Which conservation method is most appropriate?',
                options: ['Surface stabilization', 'Chemical treatment', 'Physical barrier', 'Digital recording'],
                correctAnswer: 'Surface stabilization',
                explanation: 'Surface stabilization techniques will best preserve the existing petroglyph.'
            },
            {
                id: 38,
                image: '/images/petroglyphs/monitoring1.jpg',
                question: 'What monitoring technique is shown here?',
                options: ['3D scanning', 'Photography', 'Manual tracing', 'Satellite imaging'],
                correctAnswer: '3D scanning',
                explanation: '3D scanning provides detailed documentation for monitoring changes over time.'
            },
            {
                id: 39,
                image: '/images/petroglyphs/protection1.jpg',
                question: 'Which site protection measure is most urgent?',
                options: ['Visitor management', 'Climate control', 'Fencing', 'Documentation'],
                correctAnswer: 'Visitor management',
                explanation: 'Controlling visitor access is crucial to prevent further damage to this site.'
            },
            {
                id: 40,
                image: '/images/petroglyphs/restoration1.jpg',
                question: 'What restoration approach is shown?',
                options: ['Minimal intervention', 'Full reconstruction', 'Digital enhancement', 'Chemical cleaning'],
                correctAnswer: 'Minimal intervention',
                explanation: 'The minimal intervention approach preserves authenticity while stabilizing the petroglyph.'
            }
        ]
    },
    {
        level: 9,
        questions: [
            {
                id: 41,
                image: '/images/petroglyphs/research1.jpg',
                question: 'Which research methodology is demonstrated here?',
                options: ['Comparative analysis', 'Experimental archaeology', 'Ethnographic study', 'Statistical sampling'],
                correctAnswer: 'Experimental archaeology',
                explanation: 'The recreation of petroglyph-making techniques demonstrates experimental archaeology methods.'
            },
            {
                id: 42,
                image: '/images/petroglyphs/documentation1.jpg',
                question: 'What advanced documentation technique is being used?',
                options: ['Photogrammetry', 'Laser scanning', 'RTI imaging', 'Thermal imaging'],
                correctAnswer: 'RTI imaging',
                explanation: 'Reflectance Transformation Imaging (RTI) reveals subtle surface details invisible to the naked eye.'
            },
            {
                id: 43,
                image: '/images/petroglyphs/analysis1.jpg',
                question: 'Which analytical tool is most appropriate for this research question?',
                options: ['GIS mapping', 'Chemical analysis', 'Stylistic comparison', 'Demographic study'],
                correctAnswer: 'GIS mapping',
                explanation: 'Geographic Information Systems help analyze spatial relationships between petroglyph sites.'
            },
            {
                id: 44,
                image: '/images/petroglyphs/dating2.jpg',
                question: 'What modern dating technique is shown here?',
                options: ['XRF analysis', 'Microerosion dating', 'Varnish microlamination', 'Lichenometry'],
                correctAnswer: 'Varnish microlamination',
                explanation: 'Varnish microlamination dating analyzes rock varnish layers to establish chronology.'
            },
            {
                id: 45,
                image: '/images/petroglyphs/interpretation1.jpg',
                question: 'Which interpretative framework is being applied?',
                options: ['Contextual analysis', 'Structural analysis', 'Cognitive archaeology', 'Post-processual'],
                correctAnswer: 'Cognitive archaeology',
                explanation: 'Cognitive archaeological approach examines ancient thought processes and symbolism.'
            }
        ]
    },
    {
        level: 10,
        questions: [
            {
                id: 46,
                image: '/images/petroglyphs/expert1.jpg',
                question: 'What complex preservation issue is shown here?',
                options: ['Biofilm growth', 'Salt crystallization', 'Thermal stress', 'UV damage'],
                correctAnswer: 'Salt crystallization',
                explanation: 'Salt crystallization within rock pores causes significant deterioration of petroglyphs.'
            },
            {
                id: 47,
                image: '/images/petroglyphs/expert2.jpg',
                question: 'Which advanced imaging technique reveals hidden details?',
                options: ['Multispectral', 'X-ray fluorescence', 'Infrared', 'UV fluorescence'],
                correctAnswer: 'Multispectral',
                explanation: 'Multispectral imaging reveals layers of modification and reuse not visible to naked eye.'
            },
            {
                id: 48,
                image: '/images/petroglyphs/expert3.jpg',
                question: 'What specialized conservation treatment is being applied?',
                options: ['Biocide application', 'Consolidation', 'Desalination', 'Micro-grouting'],
                correctAnswer: 'Micro-grouting',
                explanation: 'Micro-grouting stabilizes micro-cracks while maintaining visual integrity.'
            },
            {
                id: 49,
                image: '/images/petroglyphs/expert4.jpg',
                question: 'Which digital reconstruction method is demonstrated?',
                options: ['AI enhancement', 'Manual tracing', 'Photometric stereo', 'DStretch'],
                correctAnswer: 'Photometric stereo',
                explanation: 'Photometric stereo reconstruction reveals fine details of tool marks and techniques.'
            },
            {
                id: 50,
                image: '/images/petroglyphs/expert5.jpg',
                question: 'What cutting-edge research method is shown?',
                options: ['DNA analysis', 'Isotope analysis', 'Wear pattern study', 'Residue analysis'],
                correctAnswer: 'Residue analysis',
                explanation: 'Microscopic residue analysis reveals information about tools and pigments used.'
            }
        ]
    }
    // ... I'll continue with more levels and questions
];

const difficultyLevels = [
    {
        level: 1,
        timeLimit: 30,
        pointsPerQuestion: 100,
        description: 'Basic petroglyph identification',
        questionCount: 5
    },
    {
        level: 2,
        timeLimit: 25,
        pointsPerQuestion: 150,
        description: 'Advanced patterns and symbols',
        questionCount: 5
    },
    {
        level: 3,
        timeLimit: 20,
        pointsPerQuestion: 200,
        description: 'Historical context and dating',
        questionCount: 5
    },
    {
        level: 4,
        timeLimit: 20,
        pointsPerQuestion: 250,
        description: 'Technical analysis',
        questionCount: 5
    },
    {
        level: 5,
        timeLimit: 15,
        pointsPerQuestion: 300,
        description: 'Cultural interpretation',
        questionCount: 5
    },
    {
        level: 6,
        timeLimit: 15,
        pointsPerQuestion: 350,
        description: 'Comparative analysis',
        questionCount: 5
    },
    {
        level: 7,
        timeLimit: 12,
        pointsPerQuestion: 400,
        description: 'Archaeological context',
        questionCount: 5
    },
    {
        level: 8,
        timeLimit: 12,
        pointsPerQuestion: 450,
        description: 'Conservation challenges',
        questionCount: 5
    },
    {
        level: 9,
        timeLimit: 10,
        pointsPerQuestion: 500,
        description: 'Research methodology',
        questionCount: 5
    },
    {
        level: 10,
        timeLimit: 10,
        pointsPerQuestion: 600,
        description: 'Expert level analysis',
        questionCount: 5
    }
];

function QuizMaster() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [streak, setStreak] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [showDiagram, setShowDiagram] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    useEffect(() => {
        // Load questions for current level
        const levelQuestions = questionBank.find(q => q.level === currentLevel + 1).questions;
        // Shuffle questions
        const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5);
        setCurrentQuestions(shuffled);
    }, [currentLevel]);

    // Add timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion]);

    const handleAnswerClick = (answer, isCorrect) => {
        setSelectedAnswer(answer);
        setIsAnswerCorrect(isCorrect);

        if (isCorrect) {
            const level = difficultyLevels[currentLevel];
            const timeBonus = Math.floor(timeLeft * 2);
            const streakBonus = streak * 50;
            const points = level.pointsPerQuestion + timeBonus + streakBonus;

            setScore(prev => prev + points);
            setStreak(prev => prev + 1);
            setCorrectAnswers(prev => prev + 1);
        } else {
            setStreak(0);
        }

        setTotalQuestions(prev => prev + 1);

        // Move to next question after delay
        setTimeout(() => {
            handleNextQuestion();
        }, 1500);
    };

    const handleNextQuestion = () => {
        const level = difficultyLevels[currentLevel];
        if (currentQuestion >= level.questionCount - 1) {
            handleLevelComplete();
        } else {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            setTimeLeft(level.timeLimit);
        }
    };

    const handleLevelComplete = () => {
        setIsLevelComplete(true);
        if (currentLevel < difficultyLevels.length - 1) {
            setTimeout(() => {
                setCurrentLevel(prev => prev + 1);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setIsAnswerCorrect(null);
                setTimeLeft(difficultyLevels[currentLevel + 1].timeLimit);
                setIsLevelComplete(false);
            }, 2000);
        }
    };

    const handleTimeUp = () => {
        setStreak(0);
        handleNextQuestion();
    };

    const handleNextLevel = () => {
        if (currentLevel < difficultyLevels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            setTimeLeft(difficultyLevels[currentLevel + 1].timeLimit);
            setIsLevelComplete(false);
        } else {
            // Reset game
            setCurrentLevel(0);
            setScore(0);
            setStreak(0);
            setTotalQuestions(0);
            setCorrectAnswers(0);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            setTimeLeft(difficultyLevels[0].timeLimit);
            setIsLevelComplete(false);
        }
    };

    return (
        <GameContainer>
            <LevelInfo>
                <h2>Level {currentLevel + 1}</h2>
                <p>{difficultyLevels[currentLevel].description}</p>
            </LevelInfo>

            <ScoreBoard>
                <div>
                    <h3>Score</h3>
                    <p>{score}</p>
                </div>
                <div>
                    <h3>Streak</h3>
                    <p>{streak}🔥</p>
                </div>
                <div>
                    <h3>Accuracy</h3>
                    <p>{totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%</p>
                </div>
            </ScoreBoard>

            <Timer isLow={timeLeft <= 10}>{timeLeft}s</Timer>

            <QuestionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <div style={{ position: 'relative' }}>
                    <img
                        src={currentQuestions[currentQuestion]?.image}
                        alt="Petroglyph"
                    />
                    {currentQuestions[currentQuestion]?.diagram && (
                        <button
                            onClick={() => setShowDiagram(true)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: '#4ECDC4',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            📊
                        </button>
                    )}
                </div>
                <h3>{currentQuestions[currentQuestion]?.question}</h3>

                <AnswerGrid>
                    {currentQuestions[currentQuestion]?.options.map((option, index) => (
                        <AnswerButton
                            key={index}
                            onClick={() => handleAnswerClick(option, option === currentQuestions[currentQuestion].correctAnswer)}
                            disabled={selectedAnswer !== null}
                            isCorrect={selectedAnswer === option && option === currentQuestions[currentQuestion].correctAnswer}
                            isWrong={selectedAnswer === option && option !== currentQuestions[currentQuestion].correctAnswer}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {option}
                        </AnswerButton>
                    ))}
                </AnswerGrid>

                {selectedAnswer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: isAnswerCorrect ? '#E8FFF8' : '#FFF3F3',
                            borderRadius: '8px',
                            color: isAnswerCorrect ? '#2D3436' : '#FF6B6B'
                        }}
                    >
                        <p>{currentQuestions[currentQuestion].explanation}</p>
                    </motion.div>
                )}
            </QuestionCard>

            <AnimatePresence>
                {showDiagram && currentQuestions[currentQuestion]?.diagram && (
                    <DiagramOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDiagram(false)}
                    >
                        <DiagramContainer
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <DiagramImage
                                src={currentQuestions[currentQuestion].diagram.image}
                                alt="Technique Diagram"
                            />
                            {currentQuestions[currentQuestion].diagram.annotations.map((annotation, index) => (
                                <DiagramAnnotation
                                    key={index}
                                    style={{
                                        left: `${annotation.x}%`,
                                        top: `${annotation.y}%`
                                    }}
                                    title={annotation.text}
                                >
                                    {index + 1}
                                </DiagramAnnotation>
                            ))}
                            <button
                                onClick={() => setShowDiagram(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </DiagramContainer>
                    </DiagramOverlay>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLevelComplete && (
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
                            <p>Score: {score}</p>
                            <p>Accuracy: {Math.round((correctAnswers / totalQuestions) * 100)}%</p>
                            <button
                                onClick={handleNextLevel}
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
                                {currentLevel < difficultyLevels.length - 1 ? 'Next Level' : 'Play Again'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default QuizMaster; 