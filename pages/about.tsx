import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
import Image from 'next/image';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 3/4;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    max-width: 200px;
    margin: 0 auto;
  }
`;

const HeroContent = styled.div``;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const CredentialsBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const ContentBlock = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExperienceCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CompanyName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const JobTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const DateRange = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin-bottom: 0.75rem;
`;

const Location = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-style: italic;
`;

const AchievementsList = styled.ul`
  margin: 0.75rem 0 0 0;
  padding-left: 1.25rem;
  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
  border-left: 4px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const CTASection = styled.div`
  text-align: center;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  margin-top: 3rem;
`;

export default function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <Section>
      <SEO
        title="About Emad Shenouda - ProBook Solutions"
        description="Meet Emad Shenouda, founder of ProBook Solutions with 23+ years of accounting expertise. CPA exam candidate specializing in QuickBooks, financial reporting, and remote bookkeeping services."
        canonicalPath="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Emad Shenouda',
          jobTitle: 'Financial Manager & Founder',
          worksFor: {
            '@type': 'Organization',
            name: 'ProBook Solutions'
          },
          alumniOf: 'Ain Shams University',
          knowsAbout: ['Accounting', 'QuickBooks', 'Financial Management', 'Bookkeeping', 'GAAP'],
          knowsLanguage: ['en', 'ar']
        }}
      />

      <HeroSection>
        <PhotoContainer>
          <Image 
            src="/emad-shenouda-headshot.jpg" 
            alt="Emad Shenouda - Founder & Financial Manager, ProBook Solutions" 
            fill
            sizes="(max-width: 768px) 200px, 300px"
            style={{ objectFit: 'cover', borderRadius: '12px' }}
            priority
          />
        </PhotoContainer>
        
        <HeroContent>
          <Title>{t('about.title', { defaultValue: 'About Emad Shenouda' })}</Title>
          <Tagline>{t('about.tagline', { defaultValue: 'Founder & Financial Manager' })}</Tagline>
          <Intro>
            {t('about.intro', { defaultValue: 'With over 23 years of hands-on accounting expertise spanning U.S.-based and Middle Eastern organizations, I founded ProBook Solutions to deliver world-class financial management and bookkeeping services to startups and SMEs worldwide.' })}
          </Intro>
          <CredentialsBadges>
            <Badge>✓ 23+ Years Experience</Badge>
            <Badge>✓ CPA Exam Candidate</Badge>
            <Badge>✓ QuickBooks Expert</Badge>
            <Badge>✓ Bilingual (EN/AR)</Badge>
          </CredentialsBadges>
        </HeroContent>
      </HeroSection>

      <StatRow>
        <Stat>
          <StatNumber>23+</StatNumber>
          <StatLabel>Years Experience</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>100+</StatNumber>
          <StatLabel>Clients Served</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>5</StatNumber>
          <StatLabel>Countries</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>15%</StatNumber>
          <StatLabel>Avg Cost Reduction</StatLabel>
        </Stat>
      </StatRow>

      <ContentBlock>
        <SectionTitle>{t('about.my_story_title', { defaultValue: 'My Story' })}</SectionTitle>
        <Paragraph>
          {t('about.story_para1', { defaultValue: 'I began my accounting career in 2001 in Cairo, Egypt, and have since built a diverse portfolio of experience across nonprofit organizations, media companies, PR agencies, and e-commerce businesses. My journey has taken me from local accounting roles to managing finances for international organizations with operations spanning the U.S., Middle East, and Europe.' })}
        </Paragraph>
        <Paragraph>
          {t('about.story_para2', { defaultValue: 'In 2003, I took the CPA Exam in California, passing the Audit section and scoring 67% in Business Law, which solidified my understanding of U.S. GAAP and financial regulations. This foundation has been instrumental in serving U.S.-based clients remotely while maintaining the highest standards of accuracy and compliance.' })}
        </Paragraph>
        <Paragraph>
          {t('about.story_para3', { defaultValue: 'Over the years, I\'ve specialized in QuickBooks (Desktop and Online), financial reporting, e-commerce accounting, and remote team collaboration. I\'ve helped organizations reduce expenses by up to 15%, improve reporting accuracy by 20%, and streamline month-end close processes from 10 days to 3 days.' })}
        </Paragraph>
        <HighlightBox>
          <strong>{t('about.mission_title', { defaultValue: 'My Mission:' })}</strong> {t('about.mission_description', { defaultValue: 'To provide startups and SMEs with the same level of financial expertise and strategic guidance that large corporations enjoy—without the enterprise price tag. I believe every business deserves clean books, timely reports, and actionable insights to drive growth.' })}
        </HighlightBox>
      </ContentBlock>

      <ContentBlock>
        <SectionTitle>{t('about.experience_title', { defaultValue: 'Professional Experience' })}</SectionTitle>
        
        <ExperienceCard>
          <CompanyName>Approach PR & Media</CompanyName>
          <JobTitle>Remote Financial Manager</JobTitle>
          <DateRange>January 2024 – Present</DateRange>
          <Location>Saudi Arabia (Remote)</Location>
          <AchievementsList>
            <li>Manage full-cycle bookkeeping including journal entries, bank reconciliations, VAT, and financial reporting</li>
            <li>Oversee Zoho Books implementation with customized chart of accounts</li>
            <li>Collaborate with project and media teams to track cost centers and campaign budgets</li>
          </AchievementsList>
        </ExperienceCard>

        <ExperienceCard>
          <CompanyName>PR Consultants</CompanyName>
          <JobTitle>Bookkeeper (Remote)</JobTitle>
          <DateRange>September 2021 – Present</DateRange>
          <Location>Washington, D.C., USA (Remote)</Location>
          <AchievementsList>
            <li>Maintain accurate books using QuickBooks Online and Desktop for multiple U.S.-based companies</li>
            <li>Extract and process e-commerce sales data from Amazon, Shopify, Target, and Walmart</li>
            <li>Manage AP and inventory using Bill.com and DEAR systems</li>
            <li>Serve clients including Sunwink Healthy Foods and Everywhere Apparel</li>
          </AchievementsList>
        </ExperienceCard>

        <ExperienceCard>
          <CompanyName>Horizons International</CompanyName>
          <JobTitle>Financial Manager (Remote)</JobTitle>
          <DateRange>April 2019 – August 2023</DateRange>
          <Location>USA/Lebanon (Remote)</Location>
          <AchievementsList>
            <li>Processed monthly financials in QuickBooks Enterprise for international nonprofit</li>
            <li>Reconciled multi-currency bank accounts and generated P&L, balance sheets, and fund reports</li>
            <li>Prepared grant-specific financial reports for U.S.-based donors and stakeholders</li>
          </AchievementsList>
        </ExperienceCard>

        <ExperienceCard>
          <CompanyName>Al Sawt Al Hurr (Arab Network for Media Support)</CompanyName>
          <JobTitle>Finance & Administration Manager</JobTitle>
          <DateRange>May 2011 – December 2015</DateRange>
          <Location>Cairo, Egypt</Location>
          <AchievementsList>
            <li>Managed all financial matters, HR, and compliance for the organization</li>
            <li>Handled work permits and visas for foreign employees</li>
            <li><strong>Reduced organizational expenses by 15%</strong> through process improvements</li>
            <li>Recruited and trained a team that <strong>increased project capacity by 20%</strong></li>
          </AchievementsList>
        </ExperienceCard>

        <TwoColumnGrid>
          <ExperienceCard>
            <CompanyName>Middle East Media USA-Trust</CompanyName>
            <JobTitle>Head of International Relations</JobTitle>
            <DateRange>January 2009 – April 2011</DateRange>
            <AchievementsList>
              <li>Prepared project reports for external stakeholders</li>
              <li>Increased international partnerships by 15%</li>
              <li>Developed fundraising strategy resulting in 25% funding increase</li>
            </AchievementsList>
          </ExperienceCard>

          <ExperienceCard>
            <CompanyName>Arab Vision Trust</CompanyName>
            <JobTitle>Financial Manager</JobTitle>
            <DateRange>January 2007 – December 2008</DateRange>
            <AchievementsList>
              <li>Supervised accounting and sales teams</li>
              <li>Improved financial reporting accuracy by 20%</li>
              <li>Reduced expenses by 10% through cost controls</li>
            </AchievementsList>
          </ExperienceCard>
        </TwoColumnGrid>
      </ContentBlock>

      <ContentBlock>
        <SectionTitle>{t('about.education_title', { defaultValue: 'Education & Certifications' })}</SectionTitle>
        <ExperienceCard>
          <CompanyName>CPA Exam (California)</CompanyName>
          <DateRange>2003</DateRange>
          <AchievementsList>
            <li><strong>Passed Audit Section</strong> – Demonstrates proficiency in auditing standards and procedures</li>
            <li><strong>Scored 67% in Business Law</strong> – Solid understanding of legal frameworks for financial management</li>
            <li>Foundation in U.S. GAAP and financial regulations</li>
          </AchievementsList>
        </ExperienceCard>

        <ExperienceCard>
          <CompanyName>Bachelor of Science in Accounting and Business Management</CompanyName>
          <DateRange>Graduated June 1997</DateRange>
          <Location>Ain Shams University – Cairo, Egypt</Location>
        </ExperienceCard>

        <ExperienceCard>
          <CompanyName>Strategic Planning Certificate</CompanyName>
          <DateRange>2009-2010</DateRange>
          <Location>Calvin Edwards & Company, Strategic Planning Institute</Location>
        </ExperienceCard>
      </ContentBlock>

      <ContentBlock>
        <SectionTitle>{t('about.expertise_title', { defaultValue: 'Core Expertise' })}</SectionTitle>
        <SkillsGrid>
          <SkillCard>QuickBooks Desktop & Online</SkillCard>
          <SkillCard>Financial Reporting & Analysis</SkillCard>
          <SkillCard>Month-End & Year-End Close</SkillCard>
          <SkillCard>E-commerce Accounting</SkillCard>
          <SkillCard>Budgeting & Forecasting</SkillCard>
          <SkillCard>Inventory Management</SkillCard>
          <SkillCard>Grant & Donor Reporting</SkillCard>
          <SkillCard>AP/AR Management</SkillCard>
          <SkillCard>VAT & Tax Compliance</SkillCard>
          <SkillCard>Multi-Currency Accounting</SkillCard>
          <SkillCard>Remote Team Collaboration</SkillCard>
          <SkillCard>Excel & Data Analysis</SkillCard>
        </SkillsGrid>
      </ContentBlock>

      <ContentBlock>
        <SectionTitle>{t('about.software_title', { defaultValue: 'Software & Tools' })}</SectionTitle>
        <Paragraph>
          {t('about.software_intro', { defaultValue: 'I\'m proficient in a wide range of accounting software and business tools:' })}
        </Paragraph>
        <SkillsGrid>
          <SkillCard>QuickBooks Enterprise/Pro/Premier</SkillCard>
          <SkillCard>QuickBooks Online</SkillCard>
          <SkillCard>Xero</SkillCard>
          <SkillCard>Zoho Books</SkillCard>
          <SkillCard>NetSuite</SkillCard>
          <SkillCard>DEAR Inventory</SkillCard>
          <SkillCard>Bill.com</SkillCard>
          <SkillCard>Shopify</SkillCard>
          <SkillCard>Amazon Seller Central</SkillCard>
          <SkillCard>Stripe & Square</SkillCard>
          <SkillCard>Google Workspace</SkillCard>
          <SkillCard>Microsoft Excel (Advanced)</SkillCard>
          <SkillCard>Slack</SkillCard>
          <SkillCard>Asana</SkillCard>
          <SkillCard>Notion</SkillCard>
        </SkillsGrid>
      </ContentBlock>

      <ContentBlock>
        <SectionTitle>{t('about.why_work_title', { defaultValue: 'Why Work With Me?' })}</SectionTitle>
        <TwoColumnGrid>
          <div>
            <h3>Deep Expertise</h3>
            <Paragraph>
              23+ years across diverse industries means I've seen (and solved) most accounting challenges. From nonprofit grant reporting to e-commerce multi-channel reconciliation, I bring proven solutions.
            </Paragraph>
          </div>
          <div>
            <h3>U.S. Standards</h3>
            <Paragraph>
              CPA exam experience and years serving U.S. clients means your books will follow GAAP and meet investor/lender expectations.
            </Paragraph>
          </div>
          <div>
            <h3>Bilingual Service</h3>
            <Paragraph>
              Fluent in English and Arabic, I can serve clients across North America, Europe, and the Middle East with cultural understanding.
            </Paragraph>
          </div>
          <div>
            <h3>Remote-First</h3>
            <Paragraph>
              I've been working remotely since 2011. I know how to collaborate asynchronously, meet deadlines, and deliver quality without micromanagement.
            </Paragraph>
          </div>
        </TwoColumnGrid>
      </ContentBlock>

      <CTASection>
        <h2 style={{ marginTop: 0 }}>{t('about.ready_cta_title', { defaultValue: 'Ready to Get Your Books in Order?' })}</h2>
        <Paragraph>
          {t('about.ready_cta_desc', { defaultValue: 'Whether you need ongoing bookkeeping, a one-time cleanup, or fractional CFO services, I\'d love to discuss how ProBook Solutions can support your business.' })}
        </Paragraph>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/consultation" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', background: 'var(--color-primary)', color: '#fff', borderRadius: '8px', fontWeight: 600 }}>
            Book a Consultation
          </Link>
          <Link href="/services" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', borderRadius: '8px', fontWeight: 600 }}>
            View Services
          </Link>
        </div>
      </CTASection>
    </Section>
  );
}