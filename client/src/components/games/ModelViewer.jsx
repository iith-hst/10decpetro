import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const PlaceholderContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
`;

const ComingSoonMessage = styled.div`
  color: #666;
  font-size: 1.2rem;
  margin: 2rem 0;
`;

function ThreeDModelViewer() {
    return (
        <GameContainer>
            <h2>3D Petroglyph Viewer</h2>
            <PlaceholderContainer>
                <ComingSoonMessage>
                    3D viewer functionality coming soon!
                </ComingSoonMessage>
            </PlaceholderContainer>
        </GameContainer>
    );
}

export default ThreeDModelViewer; 