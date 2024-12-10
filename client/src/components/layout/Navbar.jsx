import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  padding: 1rem 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  padding: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: rgba(26, 26, 26, 0.98);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/learn', label: 'Learn' },
    { path: '/games', label: 'Games' },
  ];

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo to="/">
          <span>Petroglyph</span> Explorer
        </Logo>

        <NavLinks>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={location.pathname === item.path ? {
                color: '#4ECDC4'
              } : {}}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          ☰
        </MobileMenuButton>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween' }}
            >
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'white' }}
              >
                ✕
              </motion.button>
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 