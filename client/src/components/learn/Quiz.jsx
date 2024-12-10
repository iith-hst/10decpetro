import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const QuizContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
`;

const Question = styled.div`
  margin-bottom: 2rem;
`;

const Option = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${props =>
        props.selected
            ? props.correct
                ? 'var(--primary)'
                : '#FF6B6B'
            : '#eee'
    };
  border-radius: 8px;
  background: ${props =>
        props.selected
            ? props.correct
                ? 'rgba(78, 205, 196, 0.1)'
                : 'rgba(255, 107, 107, 0.1)'
            : 'white'
    };
  cursor: pointer;
  text-align: left;
`;

function Quiz({ questions, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (index) => {
        setSelectedAnswer(index);
        setShowResult(true);

        if (index === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                onComplete();
            }
        }, 1500);
    };

    return (
        <QuizContainer>
            <h3>Knowledge Check</h3>
            <Question>
                <p>{questions[currentQuestion].question}</p>
                {questions[currentQuestion].options.map((option, index) => (
                    <Option
                        key={index}
                        selected={selectedAnswer === index}
                        correct={showResult && index === questions[currentQuestion].correctAnswer}
                        onClick={() => !showResult && handleAnswer(index)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {option}
                    </Option>
                ))}
            </Question>
        </QuizContainer>
    );
}

export default Quiz; 