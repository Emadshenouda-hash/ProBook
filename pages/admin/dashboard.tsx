import { useState, useEffect } from 'react';
import styled from '../../utils/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { DefaultTheme } from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
`;

const Header = styled.header`
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WelcomeSection = styled.div`
  background: var(--color-surface);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
`;

const WelcomeTitle = styled.h2`
  margin: 0 0 1rem;
`;

const WelcomeText = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled(Link)`
  display: block;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(109, 40, 217, 0.15);
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 0.5rem;
`;

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_login_time');
    router.push('/admin');
  };

  if (!authenticated) {
    return (
      <Container>
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <p>🔄 Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderInner>
          <HeaderTitle>🎨 ProBook CMS Admin</HeaderTitle>
          <LogoutButton onClick={handleLogout}>
            🚪 Logout
          </LogoutButton>
        </HeaderInner>
      </Header>

      <Main>
        <WelcomeSection>
          <WelcomeTitle>👋 Welcome, Emad!</WelcomeTitle>
          <WelcomeText>
            Manage your website content, photos, translations, and settings from this dashboard. 
            All changes are saved to your database and reflected on the live site immediately.
          </WelcomeText>
        </WelcomeSection>

        <Grid>
          <Card href="/admin/content">
            <CardIcon>📝</CardIcon>
            <CardTitle>Content Editor</CardTitle>
            <CardDescription>
              Edit homepage content, services, benefits, testimonials, and process steps.
            </CardDescription>
          </Card>

          <Card href="/admin/photos">
            <CardIcon>📸</CardIcon>
            <CardTitle>Photo Manager</CardTitle>
            <CardDescription>
              Upload and manage photos: hero image, your headshot, case study images, and logos.
            </CardDescription>
          </Card>

          <Card href="/admin/translations">
            <CardIcon>🌍</CardIcon>
            <CardTitle>Translations <Badge>EN/AR</Badge></CardTitle>
            <CardDescription>
              Edit English and Arabic translations for all pages. Manage bilingual content.
            </CardDescription>
          </Card>

          <Card href="/admin/case-studies">
            <CardIcon>📊</CardIcon>
            <CardTitle>Case Studies</CardTitle>
            <CardDescription>
              Add, edit, or delete case studies. Manage metrics, testimonials, and results.
            </CardDescription>
          </Card>

          <Card href="/admin/pricing">
            <CardIcon>💰</CardIcon>
            <CardTitle>Pricing Editor</CardTitle>
            <CardDescription>
              Update pricing tiers, features, FAQs, and comparison table.
            </CardDescription>
          </Card>

          <Card href="/admin/about">
            <CardIcon>👤</CardIcon>
            <CardTitle>About Page</CardTitle>
            <CardDescription>
              Edit your bio, experience, education, skills, and professional background.
            </CardDescription>
          </Card>

          <Card href="/admin/integrations">
            <CardIcon>🔌</CardIcon>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Manage software platforms, add new integrations, update descriptions.
            </CardDescription>
          </Card>

          <Card href="/admin/testimonials">
            <CardIcon>💬</CardIcon>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>
              Add client testimonials, manage quotes, upload client photos.
            </CardDescription>
          </Card>

          <Card href="/admin/settings">
            <CardIcon>⚙️</CardIcon>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure site settings, contact info, analytics, and integrations.
            </CardDescription>
          </Card>
        </Grid>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'var(--color-surface)', 
          borderRadius: '12px',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ margin: '0 0 1rem' }}>📊 Quick Stats</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>5</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Case Studies</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>2</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Languages</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>35+</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Integrations</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>93%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Translated</div>
            </div>
          </div>
        </div>
      </Main>
    </Container>
  );
}
