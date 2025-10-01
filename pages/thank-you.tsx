import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 3rem auto;
  text-align: center;
  max-width: 800px;
  padding: 0 1rem;
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: scaleIn 0.5s ease-out;
  
  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin: 0 auto 2rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const TimelineBox = styled.div`
  background: var(--color-surface);
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
`;

const TimelineTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineHeading = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
`;

const TimelineText = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  line-height: 1.6;
`;

const ResourcesSection = styled.div`
  margin: 3rem 0;
`;

const ResourcesTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ResourceCard = styled(Link)`
  display: block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
`;

const ResourceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ResourceTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const ResourceDescription = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.95rem;
`;

const SocialProof = styled.div`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
`;

const TestimonialQuote = styled.blockquote`
  font-size: 1.125rem;
  font-style: italic;
  margin: 0 0 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  line-height: 1.8;
`;

const TestimonialAuthor = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  text-align: right;
`;

export default function ThankYouPage() {
  const { t } = useTranslation();
  return (
    <Section>
      <SEO 
        title={t('thank_you.title', { defaultValue: 'Thank You - ProBook Solutions' })}
        description={t('thank_you.subtitle', { defaultValue: 'We received your consultation request and will be in touch within 24 hours.' })}
        canonicalPath="/thank-you"
        noindex 
      />
      
      <SuccessIcon>✅</SuccessIcon>
      <Title>{t('thank_you.title', { defaultValue: 'Thank You!' })}</Title>
      <Subtitle>
        {t('thank_you.subtitle', { defaultValue: 'We\'ve received your consultation request and will be in touch within 24 hours.' })}
      </Subtitle>

      <TimelineBox>
        <TimelineTitle>{t('thank_you.timeline_title', { defaultValue: '📋 What Happens Next' })}</TimelineTitle>
        
        <TimelineItem>
          <TimelineNumber>1</TimelineNumber>
          <TimelineContent>
            <TimelineHeading>{t('thank_you.step1_title', { defaultValue: 'Confirmation Email (Within 5 minutes)' })}</TimelineHeading>
            <TimelineText>
              {t('thank_you.step1_desc', { defaultValue: 'Check your inbox for a confirmation email with your request details. If you don\'t see it, check your spam folder.' })}
            </TimelineText>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineNumber>2</TimelineNumber>
          <TimelineContent>
            <TimelineHeading>{t('thank_you.step2_title', { defaultValue: 'Personal Response (Within 24 hours)' })}</TimelineHeading>
            <TimelineText>
              {t('thank_you.step2_desc', { defaultValue: 'Emad Shenouda will personally review your information and send you an email with initial thoughts and next steps.' })}
            </TimelineText>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineNumber>3</TimelineNumber>
          <TimelineContent>
            <TimelineHeading>{t('thank_you.step3_title', { defaultValue: 'Discovery Call (Within 2-3 days)' })}</TimelineHeading>
            <TimelineText>
              {t('thank_you.step3_desc', { defaultValue: 'We\'ll schedule a 20-30 minute call to dive deeper into your needs, answer questions, and discuss how we can help.' })}
            </TimelineText>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineNumber>4</TimelineNumber>
          <TimelineContent>
            <TimelineHeading>{t('thank_you.step4_title', { defaultValue: 'Custom Proposal (Within 48 hours of call)' })}</TimelineHeading>
            <TimelineText>
              {t('thank_you.step4_desc', { defaultValue: 'Receive a detailed proposal with scope of work, timeline, pricing, and expected outcomes tailored to your business.' })}
            </TimelineText>
          </TimelineContent>
        </TimelineItem>
      </TimelineBox>

      <SocialProof>
        <TestimonialQuote>
          {t('thank_you.testimonial', { defaultValue: '"ProBook Solutions cleaned up 18 months of messy books in 3 weeks. Our investors were impressed with the quality of our financials, which helped us close our Series A."' })}
        </TestimonialQuote>
        <TestimonialAuthor>{t('thank_you.testimonial_author', { defaultValue: '— Lisa T., Founder & CEO, SaaS Startup' })}</TestimonialAuthor>
      </SocialProof>

      <ResourcesSection>
        <ResourcesTitle>{t('thank_you.resources_title', { defaultValue: 'While You Wait, Explore Our Resources' })}</ResourcesTitle>
        <ResourcesGrid>
          <ResourceCard href="/case-studies">
            <ResourceIcon>📈</ResourceIcon>
            <ResourceTitle>{t('thank_you.case_studies_title', { defaultValue: 'Case Studies' })}</ResourceTitle>
            <ResourceDescription>
              {t('thank_you.case_studies_desc', { defaultValue: 'See how we\'ve helped other businesses reduce close time, improve accuracy, and scale operations.' })}
            </ResourceDescription>
          </ResourceCard>

          <ResourceCard href="/pricing">
            <ResourceIcon>💰</ResourceIcon>
            <ResourceTitle>{t('thank_you.pricing_title', { defaultValue: 'Pricing Guide' })}</ResourceTitle>
            <ResourceDescription>
              {t('thank_you.pricing_desc', { defaultValue: 'Review our transparent pricing tiers and feature comparison to see what fits your needs.' })}
            </ResourceDescription>
          </ResourceCard>

          <ResourceCard href="/about">
            <ResourceIcon>👤</ResourceIcon>
            <ResourceTitle>{t('thank_you.about_emad_title', { defaultValue: 'About Emad' })}</ResourceTitle>
            <ResourceDescription>
              {t('thank_you.about_emad_desc', { defaultValue: 'Learn about our founder\'s 23+ years of experience, CPA exam credentials, and proven track record.' })}
            </ResourceDescription>
          </ResourceCard>
        </ResourcesGrid>
      </ResourcesSection>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        <p style={{ margin: '0 0 1rem', fontWeight: 600 }}>{t('thank_you.need_sooner_title', { defaultValue: '⏱️ Need to talk sooner?' })}</p>
        <p style={{ margin: '0 0 1rem', fontSize: '0.95rem' }}>
          {t('thank_you.need_sooner_desc', { defaultValue: 'If your request is urgent, feel free to email us directly at' })}{' '}
          <a href="mailto:info@probooksolutions.org" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            info@probooksolutions.org
          </a>{' '}
          {t('thank_you.urgent_subject', { defaultValue: 'and mention "URGENT" in the subject line.' })}
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>
          {t('thank_you.response_time', { defaultValue: 'Typical response time: 2-4 hours during business hours (9am-6pm Egypt Time, GMT+2)' })}
        </p>
      </div>
    </Section>
  );
}


