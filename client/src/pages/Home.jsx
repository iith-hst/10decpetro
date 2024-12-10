import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import WelcomeScreen from '../components/home/WelcomeScreen';
import MainDashboard from '../components/home/MainDashboard';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

function Home() {
    const [showWelcome, setShowWelcome] = useState(true);

    const handleExplore = () => {
        setShowWelcome(false);
    };

    return (
        <HomeContainer>
            <AnimatePresence mode="wait">
                {showWelcome ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <WelcomeScreen onExplore={handleExplore} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <MainDashboard />
                    </motion.div>
                )}
            </AnimatePresence>
        </HomeContainer>
    );
}

export default Home; 