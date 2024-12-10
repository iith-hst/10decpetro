import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  aspect-ratio: 1;
  background: ${props => props.isFlipped ? props.background : 'linear-gradient(45deg, #1a1a1a, #333)'};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  user-select: none;
  position: relative;
  transform-style: preserve-3d;
`;

const ScoreBoard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Score = styled.div`
  text-align: center;
  
  h3 {
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.color};
  }
`;

const RestartButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
`;

const VictoryMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin-bottom: 1.5rem;
    color: #666;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;

const CompletionStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  .stat {
    text-align: center;
    
    h4 {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    span {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--primary);
    }
  }
`;

const difficultyLevels = [
    {
        level: 1,
        pairs: 4,
        timeLimit: 60,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
        ]
    },
    {
        level: 2,
        pairs: 6,
        timeLimit: 90,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
        ]
    },
    {
        level: 3,
        pairs: 8,
        timeLimit: 120,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
        ]
    },
    {
        level: 4,
        pairs: 8,
        timeLimit: 100,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
        ],
        hideMatchedCards: true // New mechanic: matched cards disappear
    },
    {
        level: 5,
        pairs: 10,
        timeLimit: 150,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
        ]
    },
    {
        level: 6,
        pairs: 10,
        timeLimit: 120,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
        ],
        cardFlipSpeed: 800 // Cards flip back faster
    },
    {
        level: 7,
        pairs: 12,
        timeLimit: 180,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
        ],
        shuffleInterval: 10000 // Cards shuffle every 10 seconds
    },
    {
        level: 8,
        pairs: 12,
        timeLimit: 150,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
        ],
        hideMatchedCards: true,
        shuffleInterval: 8000
    },
    {
        level: 9,
        pairs: 14,
        timeLimit: 210,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
        ],
        hideMatchedCards: true,
        shuffleInterval: 7000,
        cardFlipSpeed: 600
    },
    {
        level: 10,
        pairs: 16,
        timeLimit: 240,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
        ],
        hideMatchedCards: true,
        shuffleInterval: 6000,
        cardFlipSpeed: 500,
        requirePerfectMatch: true // Must complete without mistakes
    },
    {
        level: 11,
        pairs: 18,
        timeLimit: 300,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
        ],
        hideMatchedCards: true,
        shuffleInterval: 5000,
        cardFlipSpeed: 400,
        freezeCards: true // Some cards will be temporarily frozen
    },
    {
        level: 12,
        pairs: 18,
        timeLimit: 270,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
        ],
        rotatingBoard: true, // Entire board slowly rotates
        hideMatchedCards: true,
        cardFlipSpeed: 400
    },
    {
        level: 13,
        pairs: 20,
        timeLimit: 330,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
        ],
        movingCards: true, // Cards slowly drift around
        hideMatchedCards: true,
        cardFlipSpeed: 400
    },
    {
        level: 14,
        pairs: 20,
        timeLimit: 300,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
        ],
        flashingCards: true, // Cards briefly reveal themselves
        shuffleInterval: 8000,
        cardFlipSpeed: 350
    },
    {
        level: 15,
        pairs: 22,
        timeLimit: 360,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
        ],
        mirrorMode: true, // Board is mirrored horizontally
        hideMatchedCards: true,
        cardFlipSpeed: 400
    },
    {
        level: 16,
        pairs: 24,
        timeLimit: 400,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
            { id: 23, emoji: '🦛', background: '#81ECEC' },
            { id: 24, emoji: '🦓', background: '#636E72' },
        ],
        hideMatchedCards: true,
        cardFlipSpeed: 350,
        rotatingBoard: true,
        flashingCards: true // Combination of mechanics
    },
    {
        level: 17,
        pairs: 24,
        timeLimit: 380,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
            { id: 23, emoji: '🦛', background: '#81ECEC' },
            { id: 24, emoji: '🦓', background: '#636E72' },
        ],
        invertedControls: true, // Clicking a card flips its neighbor instead
        hideMatchedCards: true,
        cardFlipSpeed: 300
    },
    {
        level: 18,
        pairs: 26,
        timeLimit: 420,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
            { id: 23, emoji: '🦛', background: '#81ECEC' },
            { id: 24, emoji: '🦓', background: '#636E72' },
            { id: 25, emoji: '🦙', background: '#B2BEC3' },
            { id: 26, emoji: '🦘', background: '#DFE6E9' },
        ],
        darkMode: true, // Cards are only visible when hovered
        hideMatchedCards: true,
        cardFlipSpeed: 300
    },
    {
        level: 19,
        pairs: 26,
        timeLimit: 400,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
            { id: 23, emoji: '🦛', background: '#81ECEC' },
            { id: 24, emoji: '🦓', background: '#636E72' },
            { id: 25, emoji: '🦙', background: '#B2BEC3' },
            { id: 26, emoji: '🦘', background: '#DFE6E9' },
        ],
        shuffleOnMatch: true, // Board shuffles after each successful match
        hideMatchedCards: true,
        cardFlipSpeed: 250
    },
    {
        level: 20,
        pairs: 28,
        timeLimit: 450,
        cards: [
            { id: 1, emoji: '🦌', background: '#FFD93D' },
            { id: 2, emoji: '🐘', background: '#6C5CE7' },
            { id: 3, emoji: '🐅', background: '#FF6B6B' },
            { id: 4, emoji: '🐊', background: '#4ECDC4' },
            { id: 5, emoji: '🦏', background: '#A8E6CF' },
            { id: 6, emoji: '🐆', background: '#FF8B94' },
            { id: 7, emoji: '🐟', background: '#45B7D1' },
            { id: 8, emoji: '🦈', background: '#2D3436' },
            { id: 9, emoji: '🦅', background: '#E17055' },
            { id: 10, emoji: '🦃', background: '#00B894' },
            { id: 11, emoji: '🦁', background: '#E84393' },
            { id: 12, emoji: '🐯', background: '#0984E3' },
            { id: 13, emoji: '🦒', background: '#6C5CE7' },
            { id: 14, emoji: '🦘', background: '#FF7675' },
            { id: 15, emoji: '🦬', background: '#B2BEC3' },
            { id: 16, emoji: '🦣', background: '#636E72' },
            { id: 17, emoji: '🦩', background: '#FD79A8' },
            { id: 18, emoji: '🦚', background: '#00CEC9' },
            { id: 19, emoji: '🦫', background: '#B2BEC3' },
            { id: 20, emoji: '🦘', background: '#DFE6E9' },
            { id: 21, emoji: '🦦', background: '#74B9FF' },
            { id: 22, emoji: '🦥', background: '#A0522D' },
            { id: 23, emoji: '🦛', background: '#81ECEC' },
            { id: 24, emoji: '🦓', background: '#636E72' },
            { id: 25, emoji: '🦙', background: '#B2BEC3' },
            { id: 26, emoji: '🦘', background: '#DFE6E9' },
            { id: 27, emoji: '🦭', background: '#74B9FF' },
            { id: 28, emoji: '🦦', background: '#A0522D' },
        ],
        multiMatch: true, // Must find 3 matching cards instead of 2
        hideMatchedCards: true,
        cardFlipSpeed: 300
    }
];

// Add new styled components
const Timer = styled.div`
  font-size: 1.5rem;
  color: ${props => props.timeRunningOut ? '#FF6B6B' : '#666'};
  text-align: center;
  margin-bottom: 1rem;
`;

const LevelInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h2 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

// Add new styled components for special effects
const RotatingGameBoard = styled(GameBoard)`
  transform-origin: center center;
  animation: ${props => props.rotating ? 'rotate 20s linear infinite' : 'none'};

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const MovingCard = styled(Card)`
  animation: ${props => props.moving ? 'float 3s ease-in-out infinite' : 'none'};
  
  @keyframes float {
    0% { transform: translate(0, 0); }
    50% { transform: translate(${props => Math.random() * 20 - 10}px, ${props => Math.random() * 20 - 10}px); }
    100% { transform: translate(0, 0); }
  }
`;

const FlashingCard = styled(Card)`
  animation: ${props => props.flashing ? 'flash 5s linear infinite' : 'none'};
  
  @keyframes flash {
    0%, 98%, 100% { filter: brightness(1); }
    99% { filter: brightness(1.5); }
  }
`;

const MirroredGameBoard = styled(GameBoard)`
  transform: ${props => props.mirrored ? 'scaleX(-1)' : 'none'};
`;

const DarkModeCard = styled(Card)`
  opacity: 0.1;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ShufflingBoard = styled(GameBoard)`
  transition: transform 0.5s ease;
  &.shuffling {
    transform: scale(0.95) rotate(3deg);
  }
`;

// Double the cards and shuffle them
const createGameCards = (cards) => {
    const doubled = [...cards, ...cards].map((card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}`,
        isFlipped: false,
        isMatched: false,
    }));

    return doubled.sort(() => Math.random() - 0.5);
};

function MemoryGame() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [showVictory, setShowVictory] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [mistakes, setMistakes] = useState(0);
    const [frozenCards, setFrozenCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        if (currentLevel < difficultyLevels.length) {
            const level = difficultyLevels[currentLevel];
            const gameCards = createGameCards(level.cards);
            setCards(gameCards);
            setTimeLeft(level.timeLimit);
        }
    }, [currentLevel]);

    useEffect(() => {
        let timer;
        if (gameStarted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleGameOver();
        }
        return () => clearInterval(timer);
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level?.shuffleInterval) {
            const shuffleTimer = setInterval(() => {
                if (gameStarted) {
                    shuffleCards();
                }
            }, level.shuffleInterval);
            return () => clearInterval(shuffleTimer);
        }
    }, [currentLevel, gameStarted]);

    useEffect(() => {
        const level = difficultyLevels[currentLevel];
        if (level?.freezeCards && gameStarted) {
            const freezeInterval = setInterval(() => {
                const numCardsToFreeze = Math.floor(Math.random() * 3) + 1;
                const newFrozenCards = cards
                    .filter(card => !card.isMatched)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, numCardsToFreeze)
                    .map(card => card.uniqueId);
                setFrozenCards(newFrozenCards);

                // Unfreeze after 2 seconds
                setTimeout(() => {
                    setFrozenCards([]);
                }, 2000);
            }, 5000);

            return () => clearInterval(freezeInterval);
        }
    }, [currentLevel, gameStarted]);

    const shuffleCards = () => {
        setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    const handleGameOver = () => {
        setGameStarted(false);
        setShowVictory(false);
        // Show game over message and option to retry level
    };

    const handleCardClick = (clickedCard) => {
        if (frozenCards.includes(clickedCard.uniqueId)) {
            return;
        }

        if (!gameStarted) {
            setGameStarted(true);
        }

        if (
            isChecking ||
            flippedCards.length === (difficultyLevels[currentLevel].multiMatch ? 3 : 2) ||
            clickedCard.isMatched ||
            flippedCards.find(card => card.uniqueId === clickedCard.uniqueId)
        ) {
            return;
        }

        const cardToFlip = difficultyLevels[currentLevel].invertedControls
            ? cards.find(c => c.uniqueId !== clickedCard.uniqueId && !c.isMatched && !c.isFlipped)
            : clickedCard;

        const newCards = cards.map(card =>
            card.uniqueId === cardToFlip.uniqueId
                ? { ...card, isFlipped: true }
                : card
        );

        setCards(newCards);
        setFlippedCards([...flippedCards, cardToFlip]);
    };

    useEffect(() => {
        const matchSize = difficultyLevels[currentLevel].multiMatch ? 3 : 2;

        if (flippedCards.length === matchSize) {
            setIsChecking(true);
            setMoves(moves + 1);

            const allMatch = flippedCards.every(card => card.id === flippedCards[0].id);

            if (allMatch) {
                setMatches(matches + 1);
                setCards(cards.map(card =>
                    flippedCards.find(f => f.uniqueId === card.uniqueId)
                        ? { ...card, isMatched: true }
                        : card
                ));
                setFlippedCards([]);
                setIsChecking(false);

                if (difficultyLevels[currentLevel].shuffleOnMatch) {
                    setIsShuffling(true);
                    setTimeout(() => {
                        shuffleCards();
                        setIsShuffling(false);
                    }, 500);
                }

                if (matches + 1 === difficultyLevels[currentLevel].pairs) {
                    setTimeout(() => {
                        setShowVictory(true);
                        setGameStarted(false);
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    setCards(cards.map(card =>
                        flippedCards.find(f => f.uniqueId === card.uniqueId)
                            ? { ...card, isFlipped: false }
                            : card
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flippedCards]);

    const handleRestart = () => {
        setCards(createGameCards(difficultyLevels[currentLevel].cards));
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsChecking(false);
        setShowVictory(false);
    };

    const handleNextLevel = () => {
        if (currentLevel < difficultyLevels.length - 1) {
            setCurrentLevel(currentLevel + 1);
            setCards([]);
            setFlippedCards([]);
            setMoves(0);
            setMatches(0);
            setIsChecking(false);
            setShowVictory(false);
            setGameStarted(false);
            setMistakes(0);
        }
    };

    return (
        <div>
            <LevelInfo>
                <h2>Level {currentLevel + 1}</h2>
                <p>Match {difficultyLevels[currentLevel].pairs} pairs</p>
            </LevelInfo>

            <Timer timeRunningOut={timeLeft <= 10}>
                Time: {timeLeft}s
            </Timer>

            <ScoreBoard>
                <Score color="#4ECDC4">
                    <h3>Moves</h3>
                    <span>{moves}</span>
                </Score>
                <Score color="#FF6B6B">
                    <h3>Matches</h3>
                    <span>{matches} / {difficultyLevels[currentLevel].pairs}</span>
                </Score>
                {difficultyLevels[currentLevel].requirePerfectMatch && (
                    <Score color="#FFD93D">
                        <h3>Mistakes</h3>
                        <span>{mistakes}</span>
                    </Score>
                )}
            </ScoreBoard>

            {difficultyLevels[currentLevel].rotatingBoard ? (
                <RotatingGameBoard rotating={gameStarted}>
                    <AnimatePresence>
                        {cards.map(card => (
                            <MovingCard
                                key={card.uniqueId}
                                isFlipped={card.isFlipped || card.isMatched}
                                background={card.background}
                                onClick={() => handleCardClick(card)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                                    opacity: card.isMatched && difficultyLevels[currentLevel].hideMatchedCards ? 0 : 1,
                                }}
                                transition={{ duration: difficultyLevels[currentLevel].cardFlipSpeed / 1000 || 0.3 }}
                                moving={frozenCards.includes(card.uniqueId)}
                            >
                                {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                            </MovingCard>
                        ))}
                    </AnimatePresence>
                </RotatingGameBoard>
            ) : difficultyLevels[currentLevel].mirrorMode ? (
                <MirroredGameBoard mirrored={true}>
                    <AnimatePresence>
                        {cards.map(card => (
                            <MovingCard
                                key={card.uniqueId}
                                isFlipped={card.isFlipped || card.isMatched}
                                background={card.background}
                                onClick={() => handleCardClick(card)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                                    opacity: card.isMatched && difficultyLevels[currentLevel].hideMatchedCards ? 0 : 1,
                                }}
                                transition={{ duration: difficultyLevels[currentLevel].cardFlipSpeed / 1000 || 0.3 }}
                                moving={frozenCards.includes(card.uniqueId)}
                            >
                                {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                            </MovingCard>
                        ))}
                    </AnimatePresence>
                </MirroredGameBoard>
            ) : (
                <GameBoard>
                    <AnimatePresence>
                        {cards.map(card => {
                            const CardComponent = difficultyLevels[currentLevel].movingCards
                                ? MovingCard
                                : difficultyLevels[currentLevel].flashingCards
                                    ? FlashingCard
                                    : Card;

                            return (
                                <CardComponent
                                    key={card.uniqueId}
                                    isFlipped={card.isFlipped || card.isMatched}
                                    background={card.background}
                                    onClick={() => handleCardClick(card)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    moving={difficultyLevels[currentLevel].movingCards}
                                    flashing={difficultyLevels[currentLevel].flashingCards}
                                    style={{
                                        filter: frozenCards.includes(card.uniqueId)
                                            ? 'brightness(0.7) saturate(0.5)'
                                            : 'none',
                                        pointerEvents: frozenCards.includes(card.uniqueId)
                                            ? 'none'
                                            : 'auto'
                                    }}
                                    animate={{
                                        rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                                        opacity: card.isMatched && difficultyLevels[currentLevel].hideMatchedCards ? 0 : 1,
                                    }}
                                    transition={{
                                        duration: difficultyLevels[currentLevel].cardFlipSpeed / 1000 || 0.3
                                    }}
                                >
                                    {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                                </CardComponent>
                            );
                        })}
                    </AnimatePresence>
                </GameBoard>
            )}

            <div style={{ textAlign: 'center' }}>
                <RestartButton
                    onClick={handleRestart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Restart Game
                </RestartButton>
            </div>

            <AnimatePresence>
                {showVictory && (
                    <VictoryMessage
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <h2>Level Complete! 🎉</h2>
                        <CompletionStats>
                            <div className="stat">
                                <h4>Moves</h4>
                                <span>{moves}</span>
                            </div>
                            <div className="stat">
                                <h4>Time</h4>
                                <span>{difficultyLevels[currentLevel].timeLimit - timeLeft}s</span>
                            </div>
                            {difficultyLevels[currentLevel].requirePerfectMatch && (
                                <div className="stat">
                                    <h4>Mistakes</h4>
                                    <span>{mistakes}</span>
                                </div>
                            )}
                        </CompletionStats>
                        <div className="buttons">
                            <RestartButton
                                onClick={handleRestart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Retry Level
                            </RestartButton>
                            {currentLevel < difficultyLevels.length - 1 && (
                                <RestartButton
                                    onClick={handleNextLevel}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'linear-gradient(45deg, #4ECDC4, #2ECC71)'
                                    }}
                                >
                                    Next Level →
                                </RestartButton>
                            )}
                        </div>
                        {currentLevel === difficultyLevels.length - 1 && (
                            <p style={{ marginTop: '1rem', color: '#4ECDC4' }}>
                                🏆 Congratulations! You've completed all levels!
                            </p>
                        )}
                    </VictoryMessage>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MemoryGame; 