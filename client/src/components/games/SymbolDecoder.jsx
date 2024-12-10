import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const GameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SymbolDisplay = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SymbolImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 1rem;
`;

const DecoderPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: ${props => props.selected ? '#E5F9F6' : 'white'};
  border: 2px solid ${props => props.selected ? '#4ECDC4' : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &.correct {
    background: #E5F9F6;
    border-color: #4ECDC4;
  }

  &.incorrect {
    background: #FFE5E5;
    border-color: #FF6B6B;
  }
`;

const HintButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #4ECDC4;
  border-radius: 8px;
  color: #4ECDC4;
  cursor: pointer;
  margin-top: 1rem;
`;

const Hint = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: #E5F9F6;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 2rem 0;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
`;

const symbols = [
    {
        id: 1,
        image: '/path/to/symbol1.jpg',
        name: 'Hunter Symbol',
        meaning: 'Represents hunting activities',
        hint: 'Look at the posture and tools being held',
        options: [
            'Represents hunting activities',
            'Shows farming methods',
            'Depicts warfare',
            'Indicates religious ceremony'
        ],
        correctIndex: 0
    },
    {
        id: 2,
        image: '/path/to/symbol2.jpg',
        name: 'Ritual Symbol',
        meaning: 'Indicates ceremonial practices',
        hint: 'Notice the circular arrangement of figures',
        options: [
            'Shows daily life',
            'Indicates ceremonial practices',
            'Represents trade',
            'Depicts animal migration'
        ],
        correctIndex: 1
    },
    // Add more symbols...
];

function SymbolDecoder() {
    const [currentSymbol, setCurrentSymbol] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const isCorrect = index === symbols[currentSymbol].correctIndex;

        if (isCorrect) {
            setScore(score + (showHint ? 5 : 10));
        }

        setShowResult(true);

        setTimeout(() => {
            if (currentSymbol < symbols.length - 1) {
                setCurrentSymbol(currentSymbol + 1);
                setSelectedOption(null);
                setShowHint(false);
                setShowResult(false);
            }
        }, 2000);
    };

    const handleHint = () => {
        setShowHint(true);
        setHintsUsed(hintsUsed + 1);
    };

    const symbol = symbols[currentSymbol];

    return (
        <GameContainer>
            <ProgressBar>
                <Progress
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSymbol + 1) / symbols.length) * 100}%` }}
                />
            </ProgressBar>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Score: {score}</h2>
                <p>Decode the meaning of petroglyph symbols</p>
            </div>

            <GameArea>
                <SymbolDisplay>
                    <SymbolImage src={symbol.image} />
                    <h3>{symbol.name}</h3>
                    {!showResult && (
                        <HintButton
                            onClick={handleHint}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={showHint}
                        >
                            💡 Use Hint (-5 points)
                        </HintButton>
                    )}
                    <AnimatePresence>
                        {showHint && (
                            <Hint
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {symbol.hint}
                            </Hint>
                        )}
                    </AnimatePresence>
                </SymbolDisplay>

                <DecoderPanel>
                    <h3>What does this symbol represent?</h3>
                    <OptionList>
                        {symbol.options.map((option, index) => (
                            <Option
                                key={index}
                                selected={selectedOption === index}
                                onClick={() => handleOptionSelect(index)}
                                className={
                                    showResult
                                        ? index === symbol.correctIndex
                                            ? 'correct'
                                            : selectedOption === index
                                                ? 'incorrect'
                                                : ''
                                        : ''
                                }
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionList>
                </DecoderPanel>
            </GameArea>

            <AnimatePresence>
                {currentSymbol === symbols.length - 1 && showResult && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: 'center', marginTop: '2rem' }}
                    >
                        <h2>Decoding Complete! 🎉</h2>
                        <p>Final Score: {score}</p>
                        <p>Hints Used: {hintsUsed}</p>
                        <button onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default SymbolDecoder; 