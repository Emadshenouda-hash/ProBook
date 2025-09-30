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
  gap: 1rem;
  flex-wrap: wrap;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  
  a {
    color: #fff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
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

const SaveButton = styled(Button)`
  background: rgba(34, 197, 94, 0.9);
  border-color: rgba(34, 197, 94, 1);
  
  &:hover {
    background: rgba(34, 197, 94, 1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
  overflow-x: auto;
  padding-bottom: 0;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 0.875rem 1.5rem;
  background: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? '#fff' : theme.colors.text};
  border: none;
  border-bottom: 3px solid ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  border-radius: ${({ active }: { active?: boolean }) => (active ? '6px 6px 0 0' : '0')};
  
  &:hover {
    background: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
      active ? theme.colors.primary : `${theme.colors.primary}10`};
    color: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
      active ? '#fff' : theme.colors.primary};
  }
`;

const Section = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const Hint = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-style: italic;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid #22c55e;
  border-radius: 8px;
  color: #22c55e;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

export default function ContentEditor() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('homepage');
  const [saved, setSaved] = useState(false);
  
  // Homepage content
  const [content, setContent] = useState({
    homepage: {
      title: 'Expert Accounting Services for Better Business Decisions',
      subtitle: 'Save time and make confident financial decisions with our tailored accounting solutions for startups and SMEs.',
      socialProof: '⭐ Trusted by 100+ clients across 5 countries | 23+ years experience | CPA Exam candidate'
    },
    about: {
      intro: 'With over 23 years of hands-on accounting expertise spanning U.S.-based and Middle Eastern organizations, I founded ProBook Solutions to deliver world-class financial management and bookkeeping services to startups and SMEs worldwide.',
      mission: 'To provide startups and SMEs with the same level of financial expertise and strategic guidance that large corporations enjoy—without the enterprise price tag.'
    },
    consultation: {
      heroTitle: 'Book Your Free Consultation',
      heroSubtitle: 'Get expert advice on streamlining your accounting, improving financial reporting, and making better business decisions. No obligation, just honest guidance.'
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      // Load saved content from localStorage or database
      const savedContent = localStorage.getItem('cms_content');
      if (savedContent) {
        try {
          setContent(JSON.parse(savedContent));
        } catch (e) {
          console.error('Failed to load saved content');
        }
      }
    }
  }, [router]);

  const handleSave = () => {
    // Save to localStorage (in production, save to database)
    localStorage.setItem('cms_content', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // TODO: Send to API endpoint to save to database
    // fetch('/api/admin/content', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(content)
    // });
  };

  const updateContent = (section: string, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
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
          <div>
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>📝 Content Editor</h1>
            <Breadcrumb>
              <Link href="/admin/dashboard">Dashboard</Link>
              <span>→</span>
              <span>Content Editor</span>
            </Breadcrumb>
          </div>
          <HeaderActions>
            <SaveButton onClick={handleSave}>
              💾 Save Changes
            </SaveButton>
            <Link href="/admin/dashboard" passHref legacyBehavior>
              <Button as="a">← Back</Button>
            </Link>
          </HeaderActions>
        </HeaderInner>
      </Header>

      <Main>
        {saved && <SuccessMessage>✅ Changes saved successfully!</SuccessMessage>}

        <Tabs>
          <Tab active={activeTab === 'homepage'} onClick={() => setActiveTab('homepage')}>
            🏠 Homepage
          </Tab>
          <Tab active={activeTab === 'about'} onClick={() => setActiveTab('about')}>
            👤 About
          </Tab>
          <Tab active={activeTab === 'consultation'} onClick={() => setActiveTab('consultation')}>
            📅 Consultation
          </Tab>
        </Tabs>

        {/* HOMEPAGE TAB */}
        {activeTab === 'homepage' && (
          <>
            <Section>
              <SectionTitle>🎯 Hero Section</SectionTitle>
              <Field>
                <Label htmlFor="home-title">Main Headline</Label>
                <Input
                  id="home-title"
                  value={content.homepage.title}
                  onChange={(e) => updateContent('homepage', 'title', e.target.value)}
                  placeholder="Expert Accounting Services for Better Business Decisions"
                />
                <Hint>The main headline visitors see first</Hint>
              </Field>

              <Field>
                <Label htmlFor="home-subtitle">Subtitle</Label>
                <TextArea
                  id="home-subtitle"
                  value={content.homepage.subtitle}
                  onChange={(e) => updateContent('homepage', 'subtitle', e.target.value)}
                  placeholder="Save time and make confident financial decisions..."
                />
                <Hint>Subtitle that explains your value proposition</Hint>
              </Field>

              <Field>
                <Label htmlFor="home-social-proof">Social Proof Tagline</Label>
                <Input
                  id="home-social-proof"
                  value={content.homepage.socialProof}
                  onChange={(e) => updateContent('homepage', 'socialProof', e.target.value)}
                  placeholder="⭐ Trusted by 100+ clients..."
                />
                <Hint>Trust indicators shown below the subtitle</Hint>
              </Field>
            </Section>
          </>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <>
            <Section>
              <SectionTitle>👤 About Page Content</SectionTitle>
              <Field>
                <Label htmlFor="about-intro">Introduction</Label>
                <TextArea
                  id="about-intro"
                  value={content.about.intro}
                  onChange={(e) => updateContent('about', 'intro', e.target.value)}
                  style={{ minHeight: '150px' }}
                />
                <Hint>Opening paragraph about your background</Hint>
              </Field>

              <Field>
                <Label htmlFor="about-mission">Mission Statement</Label>
                <TextArea
                  id="about-mission"
                  value={content.about.mission}
                  onChange={(e) => updateContent('about', 'mission', e.target.value)}
                  style={{ minHeight: '120px' }}
                />
                <Hint>Your mission and what drives ProBook Solutions</Hint>
              </Field>
            </Section>
          </>
        )}

        {/* CONSULTATION TAB */}
        {activeTab === 'consultation' && (
          <>
            <Section>
              <SectionTitle>📅 Consultation Page</SectionTitle>
              <Field>
                <Label htmlFor="consultation-title">Hero Title</Label>
                <Input
                  id="consultation-title"
                  value={content.consultation.heroTitle}
                  onChange={(e) => updateContent('consultation', 'heroTitle', e.target.value)}
                />
                <Hint>Main headline on consultation page</Hint>
              </Field>

              <Field>
                <Label htmlFor="consultation-subtitle">Hero Subtitle</Label>
                <TextArea
                  id="consultation-subtitle"
                  value={content.consultation.heroSubtitle}
                  onChange={(e) => updateContent('consultation', 'heroSubtitle', e.target.value)}
                />
                <Hint>Value proposition for the consultation</Hint>
              </Field>
            </Section>
          </>
        )}

        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(109, 40, 217, 0.05)', 
          borderRadius: '12px',
          border: '1px dashed var(--color-primary)'
        }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>💡 Pro Tip:</p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#6b7280' }}>
            Changes are saved to localStorage for now. In production, these will be saved to your Supabase database and reflected on the live site immediately.
          </p>
        </div>
      </Main>
    </Container>
  );
}
