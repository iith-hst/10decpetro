import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const QuizCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const QuestionImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Option = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: white;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &.selected {
    border-color: #4ECDC4;
    background: #E5F9F6;
  }

  &.correct {
    border-color: #4ECDC4;
    background: #E5F9F6;
  }

  &.incorrect {
    border-color: #FF6B6B;
    background: #FFE5E5;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
`;

const Explanation = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
`;

const quizQuestions = [
    {
        id: 1,
        question: "What tools are commonly used in petroglyph documentation?",
        image: "/path/to/tools-image.jpg",
        options: [
            "Digital camera and measuring tape",
            "Paintbrush and canvas",
            "Hammer and chisel",
            "Microscope and slides"
        ],
        correctIndex: 0,
        explanation: "Digital cameras and measuring tools are essential for accurate documentation of petroglyphs without causing any damage."
    },
    {
        id: 2,
        question: "Which method is used to date petroglyphs?",
        image: "/path/to/dating-method.jpg",
        options: [
            "Carbon dating",
            "Relative dating through style analysis",
            "Tree ring counting",
            "Geological layering"
        ],
        correctIndex: 1,
        explanation: "Since petroglyphs are carved into rock, relative dating through style analysis is the primary method used to determine their age."
    },
    // Add more questions...
];

function ArchaeologyQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState([]);

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        setShowExplanation(true);

        const isCorrect = index === quizQuestions[currentQuestion].correctIndex;
        if (isCorrect) {
            setScore(score + 1);
        }

        setAnswers([...answers, {
            question: currentQuestion,
            selected: index,
            correct: isCorrect
        }]);

        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setShowExplanation(false);
            } else {
                setIsComplete(true);
            }
        }, 3000);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowExplanation(false);
        setIsComplete(false);
        setAnswers([]);
    };

    const question = quizQuestions[currentQuestion];

    return (
        <GameContainer>
            <ProgressBar>
                <Progress
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
            </ProgressBar>

            {!isComplete ? (
                <QuizCard
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <h2>{question.question}</h2>
                    {question.image && (
                        <QuestionImage src={question.image} alt="Question illustration" />
                    )}

                    <OptionList>
                        {question.options.map((option, index) => (
                            <Option
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={
                                    selectedOption === index
                                        ? index === question.correctIndex
                                            ? 'correct'
                                            : 'incorrect'
                                        : ''
                                }
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={selectedOption !== null}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionList>

                    <AnimatePresence>
                        {showExplanation && (
                            <Explanation
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {question.explanation}
                            </Explanation>
                        )}
                    </AnimatePresence>
                </QuizCard>
            ) : (
                <QuizCard
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2>Quiz Complete! 🎉</h2>
                    <p>You scored {score} out of {quizQuestions.length}!</p>

                    <div style={{ marginTop: '2rem' }}>
                        <h3>Review Your Answers:</h3>
                        {answers.map((answer, index) => (
                            <div key={index} style={{ marginBottom: '1rem' }}>
                                <p>
                                    Question {index + 1}: {answer.correct ? '✅' : '❌'}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                    {quizQuestions[index].explanation}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Option
                        onClick={handleRestart}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ marginTop: '2rem' }}
                    >
                        Try Again
                    </Option>
                </QuizCard>
            )}
        </GameContainer>
    );
}

export default ArchaeologyQuiz; 