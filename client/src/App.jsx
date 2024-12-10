import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LandingPage from './components/home/LandingPage';
import GameCatalog from './components/games/GameCatalog';
import GamePlayer from './components/games/GamePlayer';
import AboutPage from './components/about/AboutPage';
import LearnPage from './components/learn/LearnPage';
import UserProfile from './components/profile/UserProfile';

function App() {
    return (
        <Router>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={
                    <Layout isHomePage>
                        <LandingPage />
                    </Layout>
                } />
                <Route path="/about" element={
                    <Layout>
                        <AboutPage />
                    </Layout>
                } />
                <Route path="/learn" element={
                    <Layout>
                        <LearnPage />
                    </Layout>
                } />
                <Route path="/games" element={
                    <Layout>
                        <GameCatalog />
                    </Layout>
                } />
                <Route path="/games/:gameId" element={
                    <Layout>
                        <GamePlayer />
                    </Layout>
                } />
                <Route path="/profile" element={
                    <Layout>
                        <UserProfile />
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}

export default App; 