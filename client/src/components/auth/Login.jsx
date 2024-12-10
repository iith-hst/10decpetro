import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AuthContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const AuthCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
`;

const ErrorMessage = styled(motion.div)`
  color: #FF6B6B;
  text-align: center;
  margin-top: 1rem;
`;

const LinkText = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);
        if (result.success) {
            navigate('/games');
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <AuthContainer>
            <AuthCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title>Welcome Back</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>

                {error && (
                    <ErrorMessage
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error}
                    </ErrorMessage>
                )}

                <LinkText to="/register">
                    Don't have an account? Register here
                </LinkText>
            </AuthCard>
        </AuthContainer>
    );
}

export default Login; 