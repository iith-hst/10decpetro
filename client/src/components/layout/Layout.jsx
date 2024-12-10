import styled from '@emotion/styled';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: 100vh;
  background: #1a1a1a;
`;

const Content = styled.div`
  padding-top: ${props => props.isHomePage ? '0' : '80px'};
`;

function Layout({ children, isHomePage = false }) {
    return (
        <Main>
            <Navbar />
            <Content isHomePage={isHomePage}>
                {children}
            </Content>
            <Footer />
        </Main>
    );
}

export default Layout; 