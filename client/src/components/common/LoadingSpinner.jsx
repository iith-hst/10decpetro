import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid var(--primary);
  border-top: 3px solid transparent;
  border-radius: 50%;
`;

function LoadingSpinner({ fullScreen }) {
    return (
        <SpinnerContainer fullScreen={fullScreen}>
            <Spinner
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </SpinnerContainer>
    );
}

export default LoadingSpinner; 