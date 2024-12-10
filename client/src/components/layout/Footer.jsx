import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #4ECDC4;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4ECDC4;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: #4ECDC4;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #666;
  font-size: 0.9rem;
`;

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <h3>About</h3>
                    <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                        Explore the fascinating world of ancient petroglyphs through interactive
                        games and educational content. Learn about history, archaeology, and
                        cultural heritage.
                    </p>
                    <SocialLinks>
                        <SocialIcon
                            href="#"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            📱
                        </SocialIcon>
                        <SocialIcon
                            href="#"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            📸
                        </SocialIcon>
                        <SocialIcon
                            href="#"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🐦
                        </SocialIcon>
                    </SocialLinks>
                </FooterSection>

                <FooterSection>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><FooterLink to="/games">Games</FooterLink></li>
                        <li><FooterLink to="/learn">Learn</FooterLink></li>
                        <li><FooterLink to="/about">About</FooterLink></li>
                        <li><FooterLink to="/contact">Contact</FooterLink></li>
                    </ul>
                </FooterSection>

                <FooterSection>
                    <h3>Resources</h3>
                    <ul>
                        <li><FooterLink to="/research">Research</FooterLink></li>
                        <li><FooterLink to="/documentation">Documentation</FooterLink></li>
                        <li><FooterLink to="/gallery">Gallery</FooterLink></li>
                        <li><FooterLink to="/faq">FAQ</FooterLink></li>
                    </ul>
                </FooterSection>

                <FooterSection>
                    <h3>Contact</h3>
                    <ul>
                        <li style={{ color: '#ccc' }}>📧 info@petroglyphexplorer.com</li>
                        <li style={{ color: '#ccc' }}>📞 +91 123 456 7890</li>
                        <li style={{ color: '#ccc' }}>📍 Mumbai, Maharashtra, India</li>
                    </ul>
                </FooterSection>
            </FooterContent>

            <Copyright>
                © {new Date().getFullYear()} Petroglyph Explorer. All rights reserved.
            </Copyright>
        </FooterContainer>
    );
}

export default Footer; 