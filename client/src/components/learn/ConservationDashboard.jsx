import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { conservationStatus } from '../../data/siteData';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  margin: 2rem 0;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StatusCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${props => props.color};

  h3 {
    color: ${props => props.color};
    margin-bottom: 1rem;
  }
`;

const SiteList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ThreatsSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
`;

const ThreatTag = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  color: #FF6B6B;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.9rem;
`;

const threats = [
    { id: 1, label: "Road Construction" },
    { id: 2, label: "Mining Activities" },
    { id: 3, label: "Plantations" },
    { id: 4, label: "Natural Erosion" },
    { id: 5, label: "Human Activity" },
    { id: 6, label: "Improper Conservation" }
];

function ConservationDashboard() {
    return (
        <DashboardContainer>
            <h2>Conservation Status</h2>
            <p>Current status and threats to the petroglyph sites</p>

            <StatusGrid>
                <StatusCard color="#4ECDC4">
                    <h3>Protected Sites</h3>
                    <SiteList>
                        {conservationStatus.protected.map(site => (
                            <li key={site}>
                                <span>✓</span> {site}
                            </li>
                        ))}
                    </SiteList>
                </StatusCard>

                <StatusCard color="#FF6B6B">
                    <h3>Sites at Risk</h3>
                    <SiteList>
                        {conservationStatus.atRisk.map(site => (
                            <li key={site}>
                                <span>⚠️</span> {site}
                            </li>
                        ))}
                    </SiteList>
                </StatusCard>

                <StatusCard color="#FFD93D">
                    <h3>Needs Attention</h3>
                    <SiteList>
                        {conservationStatus.needsAttention.map(site => (
                            <li key={site}>
                                <span>⚡</span> {site}
                            </li>
                        ))}
                    </SiteList>
                </StatusCard>
            </StatusGrid>

            <ThreatsSection>
                <h3>Current Threats</h3>
                <div>
                    {threats.map(threat => (
                        <ThreatTag
                            key={threat.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {threat.label}
                        </ThreatTag>
                    ))}
                </div>
            </ThreatsSection>
        </DashboardContainer>
    );
}

export default ConservationDashboard; 