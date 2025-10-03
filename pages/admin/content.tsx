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
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderInner = styled.div`
  max-width: 1600px;
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
  flex-wrap: wrap;
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
  white-space: nowrap;
  
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
  max-width: 1600px;
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
  flex-wrap: wrap;
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

const BilingualField = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.03), rgba(14, 165, 233, 0.03));
  border-radius: 12px;
  border: 1px solid var(--color-border);
`;

const FieldTitle = styled.div`
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 1.25rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const LanguageColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LanguageLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const LanguageFlag = styled.span`
  font-size: 1.25rem;
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
  font-family: inherit;
  
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

const CharCount = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  text-align: right;
  margin-top: 0.25rem;
`;

const Hint = styled.div`
  margin-top: 0.5rem;
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
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const InfoBox = styled.div`
  padding: 1.5rem;
  background: rgba(14, 165, 233, 0.05);
  border-left: 4px solid #0ea5e9;
  border-radius: 8px;
  margin-bottom: 2rem;
  
  p {
    margin: 0;
    line-height: 1.6;
  }
  
  strong {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  }
`;

export default function ContentEditor() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'homepage' | 'about' | 'consultation' | 'pricing' | 'services'>('editor');
  const [saved, setSaved] = useState(false);
  const [kvKeys, setKvKeys] = useState<Array<{ key: string; defaultValue: string; overrideValue: string | null }>>([]);
  const [kvLocale, setKvLocale] = useState<'en' | 'ar'>('en');
  const [kvQuery, setKvQuery] = useState('');
  const [kvOnlyOverridden, setKvOnlyOverridden] = useState(false);
  
  const [content, setContent] = useState({
    homepage: {
      en: {
        title: 'Expert Accounting Services for Better Business Decisions',
        subtitle: 'Save time and make confident financial decisions with our tailored accounting solutions for startups and SMEs.',
        socialProof: '⭐ Trusted by 100+ clients across 5 countries | 23+ years experience | CPA Exam candidate'
      },
      ar: {
        title: 'خدمات محاسبة خبراء لاتخاذ قرارات أعمال أفضل',
        subtitle: 'وفر الوقت واتخذ قرارات مالية بثقة مع حلولنا المحاسبية المخصصة للشركات الناشئة والصغيرة والمتوسطة.',
        socialProof: '⭐ موثوق به من 100+ عميل عبر 5 دول | 23+ سنة خبرة | مرشح امتحان CPA'
      }
    },
    about: {
      en: {
        intro: 'With over 23 years of hands-on accounting expertise spanning U.S.-based and Middle Eastern organizations, I founded ProBook Solutions to deliver world-class financial management and bookkeeping services to startups and SMEs worldwide.',
        mission: 'To provide startups and SMEs with the same level of financial expertise and strategic guidance that large corporations enjoy—without the enterprise price tag. I believe every business deserves clean books, timely reports, and actionable insights to drive growth.'
      },
      ar: {
        intro: 'مع أكثر من 23 عاماً من الخبرة العملية في المحاسبة عبر المنظمات الأمريكية والشرق أوسطية، أسست بروبوك سوليوشنز لتقديم خدمات إدارة مالية ومسك دفاتر عالمية المستوى للشركات الناشئة والمتوسطة في جميع أنحاء العالم.',
        mission: 'تزويد الشركات الناشئة والمتوسطة بنفس مستوى الخبرة المالية والتوجيه الاستراتيجي الذي تتمتع به الشركات الكبيرة—بدون السعر المرتفع للشركات الكبرى. أؤمن أن كل عمل يستحق دفاتر نظيفة وتقارير في الوقت المناسب ورؤى قابلة للتنفيذ لدفع النمو.'
      }
    },
    consultation: {
      en: {
        heroTitle: 'Book Your Free Consultation',
        heroSubtitle: 'Get expert advice on streamlining your accounting, improving financial reporting, and making better business decisions. No obligation, just honest guidance.'
      },
      ar: {
        heroTitle: 'احجز استشارتك المجانية',
        heroSubtitle: 'احصل على نصائح خبراء حول تبسيط محاسبتك وتحسين التقارير المالية واتخاذ قرارات تجارية أفضل. بدون التزام، فقط توجيه صادق.'
      }
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      loadKeys();
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

  const loadKeys = async () => {
    const token = localStorage.getItem('admin_token') || '';
    const params = new URLSearchParams({ locale: kvLocale, q: kvQuery });
    if (kvOnlyOverridden) params.set('overridden', 'true');
    const res = await fetch(`/api/admin/content-keys?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) setKvKeys(data.items || []);
  };

  const handleSave = async () => {
    localStorage.setItem('cms_content', JSON.stringify(content));
    
    // Update the actual translation files
    try {
      await fetch('/api/admin/update-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
    } catch (e) {
      console.error('API save failed, saved locally only');
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateBilingualContent = (section: string, field: string, lang: 'en' | 'ar', value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [lang]: {
          ...(prev[section as keyof typeof prev] as any)[lang],
          [field]: value
        }
      }
    }));
  };

  const handleInputChange = (section: string, field: string, lang: 'en' | 'ar') => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBilingualContent(section, field, lang, e.target.value);
  };

  const handleTextAreaChange = (section: string, field: string, lang: 'en' | 'ar') => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBilingualContent(section, field, lang, e.target.value);
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
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>📝 Content Editor (EN/AR)</h1>
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
        {saved && <SuccessMessage>✅ Changes saved successfully! Refresh the website to see updates.</SuccessMessage>}

        <InfoBox>
          <p><strong>💡 Bilingual Editor:</strong> Edit English and Arabic content side-by-side. Both languages are shown in the same view for easy translation and comparison.</p>
        </InfoBox>

        <Tabs>
          <Tab active={activeTab === 'editor'} onClick={() => setActiveTab('editor')}>
            ✏️ Key-Value Editor
          </Tab>
          <Tab active={activeTab === 'homepage'} onClick={() => setActiveTab('homepage')}>
            🏠 Homepage
          </Tab>
          <Tab active={activeTab === 'about'} onClick={() => setActiveTab('about')}>
            👤 About Page
          </Tab>
          <Tab active={activeTab === 'consultation'} onClick={() => setActiveTab('consultation')}>
            📅 Consultation
          </Tab>
          <Tab active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')}>
            💰 Pricing
          </Tab>
          <Tab active={activeTab === 'services'} onClick={() => setActiveTab('services')}>
            ⚙️ Services
          </Tab>
        </Tabs>

        {/* KEY-VALUE EDITOR */}
        {activeTab === 'editor' && (
          <Section>
            <SectionTitle>✏️ Edit Any Text Key</SectionTitle>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <select value={kvLocale} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setKvLocale(e.target.value as 'en' | 'ar'); setTimeout(loadKeys, 0); }}>
                <option value="en">English (en)</option>
                <option value="ar">العربية (ar)</option>
              </select>
              <input placeholder="Search key or text" value={kvQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKvQuery(e.target.value)} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" checked={kvOnlyOverridden} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKvOnlyOverridden(e.target.checked)} />
                Only overridden
              </label>
              <Button onClick={loadKeys}>Search</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              {kvKeys.map((item) => (
                <div key={item.key} style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.75rem' }}>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{item.key}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Default</div>
                      <div style={{ background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: 6, padding: '0.5rem' }}>{item.defaultValue}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Override ({kvLocale})</div>
                      <input defaultValue={item.overrideValue ?? ''} onBlur={async (e: React.ChangeEvent<HTMLInputElement>) => {
                        const token = localStorage.getItem('admin_token') || '';
                        const value = e.target.value;
                        await fetch('/api/admin/content-keys', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ locale: kvLocale, key: item.key, value })
                        });
                      }} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 6 }} />
                    </div>
                  </div>
                </div>
              ))}
              {kvKeys.length === 0 && (
                <div style={{ color: '#6b7280' }}>No keys found. Try a different search.</div>
              )}
            </div>
          </Section>
        )}

        {/* HOMEPAGE TAB */}
        {activeTab === 'homepage' && (
          <>
            <Section>
              <SectionTitle>🎯 Hero Section</SectionTitle>
              
              <BilingualField>
                <FieldTitle>📌 Main Headline</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>The primary headline visitors see first on your homepage</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-title-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <Input
                      id="home-title-en"
                      value={content.homepage.en.title}
                      onChange={handleInputChange('homepage', 'title', 'en')}
                      placeholder="Expert Accounting Services..."
                      dir="ltr"
                    />
                    <CharCount>{content.homepage.en.title.length} characters</CharCount>
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-title-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <Input
                      id="home-title-ar"
                      value={content.homepage.ar.title}
                      onChange={handleInputChange('homepage', 'title', 'ar')}
                      placeholder="خدمات محاسبة خبراء..."
                      dir="rtl"
                    />
                    <CharCount dir="rtl">{content.homepage.ar.title.length} حرف</CharCount>
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>

              <BilingualField>
                <FieldTitle>📄 Subtitle / Value Proposition</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Supporting text that explains what you offer</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-subtitle-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <TextArea
                      id="home-subtitle-en"
                      value={content.homepage.en.subtitle}
                      onChange={handleTextAreaChange('homepage', 'subtitle', 'en')}
                      dir="ltr"
                    />
                    <CharCount>{content.homepage.en.subtitle.length} characters</CharCount>
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-subtitle-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <TextArea
                      id="home-subtitle-ar"
                      value={content.homepage.ar.subtitle}
                      onChange={handleTextAreaChange('homepage', 'subtitle', 'ar')}
                      dir="rtl"
                    />
                    <CharCount dir="rtl">{content.homepage.ar.subtitle.length} حرف</CharCount>
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>

              <BilingualField>
                <FieldTitle>⭐ Social Proof Tagline</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Trust indicators shown below the subtitle</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-social-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <Input
                      id="home-social-en"
                      value={content.homepage.en.socialProof}
                      onChange={handleInputChange('homepage', 'socialProof', 'en')}
                      dir="ltr"
                    />
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="home-social-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <Input
                      id="home-social-ar"
                      value={content.homepage.ar.socialProof}
                      onChange={handleInputChange('homepage', 'socialProof', 'ar')}
                      dir="rtl"
                    />
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>
            </Section>
          </>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <>
            <Section>
              <SectionTitle>👤 About Page Content</SectionTitle>

              <BilingualField>
                <FieldTitle>📖 Introduction Paragraph</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Opening paragraph about your background and expertise</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="about-intro-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <TextArea
                      id="about-intro-en"
                      value={content.about.en.intro}
                      onChange={handleTextAreaChange('about', 'intro', 'en')}
                      style={{ minHeight: '150px' }}
                      dir="ltr"
                    />
                    <CharCount>{content.about.en.intro.length} characters</CharCount>
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="about-intro-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <TextArea
                      id="about-intro-ar"
                      value={content.about.ar.intro}
                      onChange={handleTextAreaChange('about', 'intro', 'ar')}
                      style={{ minHeight: '150px' }}
                      dir="rtl"
                    />
                    <CharCount dir="rtl">{content.about.ar.intro.length} حرف</CharCount>
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>

              <BilingualField>
                <FieldTitle>🎯 Mission Statement</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Your mission and what drives ProBook Solutions</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="about-mission-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <TextArea
                      id="about-mission-en"
                      value={content.about.en.mission}
                      onChange={handleTextAreaChange('about', 'mission', 'en')}
                      style={{ minHeight: '120px' }}
                      dir="ltr"
                    />
                    <CharCount>{content.about.en.mission.length} characters</CharCount>
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="about-mission-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <TextArea
                      id="about-mission-ar"
                      value={content.about.ar.mission}
                      onChange={handleTextAreaChange('about', 'mission', 'ar')}
                      style={{ minHeight: '120px' }}
                      dir="rtl"
                    />
                    <CharCount dir="rtl">{content.about.ar.mission.length} حرف</CharCount>
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>
            </Section>
          </>
        )}

        {/* CONSULTATION TAB */}
        {activeTab === 'consultation' && (
          <>
            <Section>
              <SectionTitle>📅 Consultation Page</SectionTitle>

              <BilingualField>
                <FieldTitle>🎯 Hero Title</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Main headline on the consultation booking page</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="consultation-title-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <Input
                      id="consultation-title-en"
                      value={content.consultation.en.heroTitle}
                      onChange={handleInputChange('consultation', 'heroTitle', 'en')}
                      dir="ltr"
                    />
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="consultation-title-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <Input
                      id="consultation-title-ar"
                      value={content.consultation.ar.heroTitle}
                      onChange={handleInputChange('consultation', 'heroTitle', 'ar')}
                      dir="rtl"
                    />
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>

              <BilingualField>
                <FieldTitle>📄 Hero Subtitle</FieldTitle>
                <Hint style={{ marginBottom: '1rem' }}>Value proposition for booking a consultation</Hint>
                <LanguageGrid>
                  <LanguageColumn>
                    <LanguageLabel htmlFor="consultation-subtitle-en">
                      <LanguageFlag>🇬🇧</LanguageFlag> English
                    </LanguageLabel>
                    <TextArea
                      id="consultation-subtitle-en"
                      value={content.consultation.en.heroSubtitle}
                      onChange={handleTextAreaChange('consultation', 'heroSubtitle', 'en')}
                      dir="ltr"
                    />
                    <CharCount>{content.consultation.en.heroSubtitle.length} characters</CharCount>
                  </LanguageColumn>

                  <LanguageColumn>
                    <LanguageLabel htmlFor="consultation-subtitle-ar">
                      <LanguageFlag>🇸🇦</LanguageFlag> العربية (Arabic)
                    </LanguageLabel>
                    <TextArea
                      id="consultation-subtitle-ar"
                      value={content.consultation.ar.heroSubtitle}
                      onChange={handleTextAreaChange('consultation', 'heroSubtitle', 'ar')}
                      dir="rtl"
                    />
                    <CharCount dir="rtl">{content.consultation.ar.heroSubtitle.length} حرف</CharCount>
                  </LanguageColumn>
                </LanguageGrid>
              </BilingualField>
            </Section>
          </>
        )}

        {/* PRICING TAB */}
        {activeTab === 'pricing' && (
          <Section>
            <SectionTitle>💰 Pricing Content</SectionTitle>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Edit pricing tiers, features, and descriptions. Coming soon...
            </p>
          </Section>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <Section>
            <SectionTitle>⚙️ Services Content</SectionTitle>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Edit service descriptions and details. Coming soon...
            </p>
          </Section>
        )}

        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(109, 40, 217, 0.05)', 
          borderRadius: '12px',
          border: '1px dashed var(--color-primary)',
          marginTop: '2rem'
        }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>🔧 How It Works:</p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280' }}>
            <li>Edit content in both languages side-by-side</li>
            <li>Changes are saved to localStorage immediately</li>
            <li>Click "Save Changes" to persist to database (when configured)</li>
            <li>In production, changes update the JSON files automatically</li>
            <li>Refresh your website to see changes instantly</li>
          </ul>
        </div>
      </Main>
    </Container>
  );
}
