import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import { FadeIn } from '../components/Animate';
import nextDynamic from 'next/dynamic';
const LogosBar = nextDynamic(() => import('../components/LogosBar'), { ssr: true });
import SEO from '../components/SEO';
import Button from '../components/Button';
import { track } from '../utils/analytics';
import { ConversionEvents } from '../utils/conversionTracking';
import LazyImage from '../components/LazyImage';
import EmailCapture from '../components/EmailCapture';
const TrustBadges = nextDynamic(() => import('../components/TrustBadges'), { ssr: true });
/*
 * Emojis used in the benefits section act as simple yet expressive icons.
 * They avoid adding extra dependencies while still conveying meaning.
 */

/*
 * The hero section now uses a full-bleed background image with a color overlay.
 * The gradient overlay ensures contrast for the headline and calls to action. The
 * section is responsive and centers its content both vertically and
 * horizontally. To change the background image, replace the path below with
 * another file in the /public directory.
 */
const Hero = styled.section`
  position: relative;
  color: #ffffff;
  min-height: 80vh;
  padding: 8rem 2rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  
  @media (max-width: 968px) {
    min-height: 70vh;
    padding: 6rem 1.5rem 4rem;
  }
  
  @media (max-width: 640px) {
    min-height: 65vh;
    padding: 4.5rem 1rem 3rem;
  }
`;

const HeroBg = styled('div')`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.85) 0%,
      rgba(30, 41, 59, 0.75) 50%,
      rgba(51, 65, 85, 0.85) 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
  max-width: 900px;
  
  background: linear-gradient(
    to bottom,
    #ffffff 0%,
    #f8fafc 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 640px) {
    font-size: 2rem;
    line-height: 1.2;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  margin: 0 0 2.5rem;
  max-width: 700px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`;

const HeroButton = Button;

const Section = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  text-align: center;
  margin: 0 auto 1rem;
  max-width: 700px;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  @media (min-width: 640px) {
    gap: 2rem;
  }
  overflow-x: hidden;
`;

const ServiceCard = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  height: 100%;
  /* Enable 3D transforms on hover */
  transform-style: preserve-3d;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
  &:hover {
    /*
     * On hover, lift the card and tilt it slightly to give a sense of
     * depth. We also scale it up a bit to emphasise the interaction. The
     * combination of translation, rotation and scale forms a subtle 3D
     * effect without overwhelming the user.
     */
    transform: perspective(1000px) rotateX(3deg) translateY(-4px) scale(1.02);
    background-color: rgba(67, 56, 202, 0.08);
    border-color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  }
`;

const ServiceTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.p`
  margin-bottom: 0.5rem;
`;

const ServiceLink = styled.a`
  color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.link};
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.linkHover};
  }
`;

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  padding: 4rem 1rem;
  margin: 4rem 0;
`;

const NewsletterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const NewsletterText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 640px) {
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

const HeroSocialProof = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.875rem 1.75rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    padding: 0.75rem 1.25rem;
  }
`;

const HeroSocialItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:not(:last-child)::after {
    content: '•';
    margin-left: 1.5rem;
    opacity: 0.6;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const CTAGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const PrimaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6d28d9 0%, #0ea5e9 100%);
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(109, 40, 217, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 640px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 640px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

/* HeroColText and HeroColVisual are no longer used; their functionality has been merged
 * into the simplified hero layout above. */

const ProcessSection = styled.section`
  margin: 3rem 0;
`;

const ProcessTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  @media (min-width: 640px) {
    gap: 1.75rem;
  }
  overflow-x: hidden;
`;

const ProcessCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  transform-style: preserve-3d;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
  &:hover {
    transform: perspective(1000px) rotateX(3deg) translateY(-4px) scale(1.02);
    background-color: rgba(67, 56, 202, 0.08);
    border-color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  }
`;

const TestimonialsSection = styled.section`
  margin: 3rem 0;
`;

const TestimonialsTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  @media (min-width: 640px) {
    gap: 1.75rem;
  }
  overflow-x: hidden;
`;

const TestimonialCard = styled.blockquote`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  margin: 0;
  transform-style: preserve-3d;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
  &:hover {
    transform: perspective(1000px) rotateX(3deg) translateY(-4px) scale(1.02);
    background-color: rgba(67, 56, 202, 0.08);
    border-color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  }
`;

// --- Benefits Section ---
const BenefitsSection = styled.section`
  margin: 3rem 0;
`;

const BenefitsTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  max-width: 1024px;
  margin: 0 auto;
  @media (min-width: 640px) {
    gap: 2rem;
  }
  overflow-x: hidden;
`;

const BenefitCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transform-style: preserve-3d;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
  &:hover {
    transform: perspective(1000px) rotateX(3deg) translateY(-4px) scale(1.02);
    background-color: rgba(67, 56, 202, 0.08);
    border-color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  }
`;

const BenefitIconWrapper = styled.div`
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  background-color: rgba(109, 40, 217, 0.1);
  color: ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.primary};
`;


export default function HomePage() {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const benefits = t('home.benefits.items', { returnObjects: true }) as Array<{ icon: string; title: string; description: string }>;
  return (
    <>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        canonicalPath={t('seo.home.path')}
        ogType="website"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ProBook Solutions',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://probooksolutions.org'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ProBook Solutions',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://probooksolutions.org'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'ProBook Solutions',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://probooksolutions.org',
            areaServed: 'Global',
            serviceType: ['Bookkeeping','CFO-as-a-Service','Financial Reporting','Tax & Compliance','Payroll','ERP Setup','Process Optimization']
          }
        ]}
      />
          <Hero>
            <HeroBg aria-hidden="true">
              <Image
                src="/hero-accounting-office.jpg"
                alt="Professional accounting office"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </HeroBg>
        <HeroInner>
          <FadeIn>
            <HeroSocialProof>
              <HeroSocialItem>
                <span aria-hidden="true">⭐</span>
                <span>100+ Clients</span>
              </HeroSocialItem>
              <HeroSocialItem>
                <span aria-hidden="true">🏆</span>
                <span>23+ Years Experience</span>
              </HeroSocialItem>
            </HeroSocialProof>
          </FadeIn>
          <FadeIn>
            <HeroTitle>{t('home.title')}</HeroTitle>
          </FadeIn>
          <FadeIn>
            <HeroSubtitle>{t('home.subtitle')}</HeroSubtitle>
          </FadeIn>
          <FadeIn>
            <CTAGroup>
              <Link href="/consultation" passHref legacyBehavior>
                <PrimaryCTA onClick={() => {
                  track({ name: 'cta_click', label: 'hero_consultation', href: '/consultation' });
                  ConversionEvents.consultationBooked('hero_cta');
                }}>
                  <span aria-hidden="true">📅</span>
                  {t('cta.book_consultation')}
                </PrimaryCTA>
              </Link>
              <Link href="/services" passHref legacyBehavior>
                <SecondaryCTA onClick={() => {
                  track({ name: 'cta_click', label: 'hero_services', href: '/services' });
                  ConversionEvents.servicePageEngaged('services_overview');
                }}>
                  <span aria-hidden="true">→</span>
                  {t('home.cta_secondary')}
                </SecondaryCTA>
              </Link>
            </CTAGroup>
          </FadeIn>
        </HeroInner>
      </Hero>
      <LogosBar />

      {/* Benefits section highlighting key value propositions */}
      <BenefitsSection>
        <BenefitsTitle>{t('home.benefits.title')}</BenefitsTitle>
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIconWrapper aria-hidden="true">{benefit.icon}</BenefitIconWrapper>
              <h3 style={{ marginBottom: '0.5rem', marginTop: 0 }}>{benefit.title}</h3>
              <p style={{ margin: 0 }}>{benefit.description}</p>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsSection>
      <ProcessSection>
        <ProcessTitle>{t('home.process.title')}</ProcessTitle>
        <ProcessGrid>
          {(t('home.process.steps', { returnObjects: true }) as Array<{ title: string; description: string }>).map((step, idx) => (
            <ProcessCard key={idx}>
              <h3 style={{ marginTop: 0 }}>{step.title}</h3>
              <p style={{ marginBottom: 0 }}>{step.description}</p>
            </ProcessCard>
          ))}
        </ProcessGrid>
      </ProcessSection>
      <TrustBadges />
      <TestimonialsSection>
        <TestimonialsTitle>{t('home.testimonials.title')}</TestimonialsTitle>
        <TestimonialsGrid>
          {(t('home.testimonials.list', { returnObjects: true }) as Array<{ quote: string; author: string }>).map((tm, idx) => (
            <TestimonialCard key={idx}>
              <p style={{ marginTop: 0 }}>“{tm.quote}”</p>
              <footer style={{ color: '#6b7280' }}>— {tm.author}</footer>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>
      <Section>
        <SectionTitle>{t('home.overview_title')}</SectionTitle>
        <SectionText>{t('home.overview_description')}</SectionText>
        <ServicesGrid>
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={index}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/services" passHref legacyBehavior>
            <ServiceLink>{t('home.services_link')}</ServiceLink>
          </Link>
        </div>
      </Section>
          <Section>
            <SectionTitle>{t('home.case_studies_title', { defaultValue: 'Case Studies' })}</SectionTitle>
            <SectionText>{t('home.case_studies_description', { defaultValue: 'See how we improved close times, reporting accuracy, and decision‑making.' })}</SectionText>
            <div style={{ textAlign: 'center' }}>
              <Link href="/case-studies" passHref legacyBehavior>
                <ServiceLink>{t('home.case_studies_link', { defaultValue: 'View Case Studies' })}</ServiceLink>
              </Link>
            </div>
          </Section>
          <Section>
            <SectionTitle>{t('home.about_title')}</SectionTitle>
            <SectionText>{t('home.about_description')}</SectionText>
            <div style={{ textAlign: 'center' }}>
              <Link href="/about" passHref legacyBehavior>
                <ServiceLink>{t('home.about_link')}</ServiceLink>
              </Link>
            </div>
          </Section>

          {/* Email Newsletter Section */}
          <NewsletterSection>
            <NewsletterContainer>
              <NewsletterTitle>{t('newsletter.title', { defaultValue: 'Stay Updated with ProBook Solutions' })}</NewsletterTitle>
              <NewsletterText>
                {t('newsletter.subtitle', { defaultValue: 'Get expert accounting tips, industry insights, and exclusive offers delivered to your inbox.' })}
              </NewsletterText>
              <EmailCapture
                placeholder={t('newsletter.placeholder', { defaultValue: 'Enter your email address' }) as string}
                buttonText={t('newsletter.cta', { defaultValue: 'Subscribe Now' }) as string}
                source="homepage_newsletter"
                tags={['newsletter', 'homepage']}
                onSuccess={() => ConversionEvents.emailSignup('homepage_newsletter')}
              />
            </NewsletterContainer>
          </NewsletterSection>
    </>
  );
}