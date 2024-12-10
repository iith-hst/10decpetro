import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { images } from '../../services/imageService';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  h2 {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const ImageContainer = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TeamSection = styled.div`
  margin-top: 4rem;

  h2 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 2rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled(motion.div)`
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
    object-fit: cover;
  }

  h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

function AboutPage() {
    return (
        <AboutContainer>
            <Hero>
                <h1>About Petroglyph Explorer</h1>
                <p>
                    Discover the fascinating world of ancient rock art through interactive
                    learning experiences and cutting-edge technology.
                </p>
            </Hero>

            <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <TextContent>
                    <h2>Our Mission</h2>
                    <p>
                        Following in the footsteps of pioneers like Sudhir Risbud and the Adgalnavarche
                        Konkan group, we are dedicated to preserving and sharing the rich cultural
                        heritage of petroglyphs found in the Konkan region. Through interactive games,
                        educational content, and virtual experiences, we aim to make these ancient
                        artworks accessible and engaging for everyone.
                    </p>
                    <p>
                        With over 52 confirmed sites and more than 1,000 petroglyphs discovered,
                        our platform combines archaeological expertise with modern technology to
                        create immersive learning experiences that bring this mesolithic and
                        neolithic history to life.
                    </p>
                </TextContent>
                <ImageContainer
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={images.mission.main} alt="Archaeological site" />
                </ImageContainer>
            </Section>

            <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <ImageContainer>
                    <img src={images.technology.overview} alt="3D scanning technology" />
                </ImageContainer>
                <TextContent>
                    <h2>Our Technology</h2>
                    <p>
                        We utilize state-of-the-art technology including 3D scanning,
                        photogrammetry, and interactive mapping to document and present
                        petroglyphs in unprecedented detail.
                    </p>
                    <p>
                        Our platform features interactive games, virtual tours, and
                        educational modules designed to make learning about archaeology
                        engaging and accessible.
                    </p>
                </TextContent>
            </Section>

            <TeamSection>
                <h2>Our Team</h2>
                <TeamGrid>
                    {teamMembers.map(member => (
                        <TeamMember
                            key={member.id}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img src={member.image} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                            <p>{member.description}</p>
                        </TeamMember>
                    ))}
                </TeamGrid>
            </TeamSection>
        </AboutContainer>
    );
}

const teamMembers = [
    {
        id: 1,
        name: "Sudhir Risbud",
        role: "Lead Explorer & Founder",
        image: images.team.sudhir,
        description: "Electrical engineer and avid bird watcher who discovered the first petroglyphs in the 1980s",
        contact: "bhairisbud@gmail.com"
    },
    {
        id: 2,
        name: "Dhananjay Marathe",
        role: "Explorer & Researcher",
        image: images.team.dhananjay,
        description: "Key member in systematic exploration of Konkan petroglyphs"
    },
    {
        id: 3,
        name: "Surendra Thakurdesai",
        role: "Explorer & Researcher",
        image: images.team.surendra,
        description: "Contributed to the discovery and documentation of petroglyph sites"
    },
    {
        id: 4,
        name: "Rutwij Apte",
        role: "State Archaeology Department",
        image: images.team.rutwij,
        description: "Leading official documentation and preservation efforts",
        contact: "rutwigapte@gmail.com"
    }
];

export default AboutPage; 