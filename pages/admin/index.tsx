import { useState, useEffect } from 'react';
import styled from '../../utils/styled';
import { useRouter } from 'next/router';
import type { DefaultTheme } from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
`;

const LoginCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Card = styled.div`
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #6d28d9, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin: 0 0 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(109, 40, 217, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: 0.875rem;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.danger};
  border-radius: 8px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.danger};
  text-align: center;
`;

const InfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(109, 40, 217, 0.05);
  border-radius: 8px;
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  text-align: center;
`;

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token === process.env.NEXT_PUBLIC_ADMIN_TOKEN && token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple password-based authentication
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'probook2025admin';
    
    if (password === adminPassword) {
      const token = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_login_time', Date.now().toString());
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Card>
          <Title>ProBook CMS</Title>
          <Subtitle>Content Management System</Subtitle>
          
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Field>
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                required
              />
            </Field>

            <Button type="submit" disabled={loading}>
              {loading ? '🔄 Logging in...' : '🔐 Access CMS'}
            </Button>
          </Form>

          <InfoBox>
            🔒 Secure admin access. Set your password in environment variables (NEXT_PUBLIC_ADMIN_PASSWORD).
          </InfoBox>
        </Card>
      </LoginCard>
    </Container>
  );
}
