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
  /*
   * Full‑width hero section with a translucent colour overlay. We reduce the alpha
   * values of the gradient stops to allow more of the underlying photo to show
   * through, making the composition feel lighter and less oppressive. The
   * background image still covers the entire viewport width.
   */
  position: relative;
  color: #ffffff;
  min-height: 75vh;
  padding: 6rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 640px) {
    min-height: 70vh;
    padding: 4rem 1rem;
    overflow: hidden;
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
    background-image:
      linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
      linear-gradient(140deg, rgba(67, 56, 202, 0.55), rgba(109, 40, 217, 0.55));
  }
`;

const HeroTitle = styled.h1`
  margin-bottom: 1rem;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
`;

const HeroSubtitle = styled.p`
  margin-bottom: 2rem;
  max-width: 600px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.45);
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

const HeroInner = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
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
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ProBook Solutions',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'ProBook Solutions',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com',
            areaServed: 'Global',
            serviceType: ['Bookkeeping','CFO-as-a-Service','Financial Reporting','Tax & Compliance','Payroll','ERP Setup','Process Optimization']
          }
        ]}
      />
      <Hero>
        <HeroBg aria-hidden="true">
          <Image 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80" 
            alt="" 
            fill 
            priority 
            sizes="100vw" 
            style={{ objectFit: 'cover' }} 
          />
        </HeroBg>
        <HeroInner>
          <FadeIn>
            <HeroTitle>{t('home.title')}</HeroTitle>
          </FadeIn>
          <FadeIn>
            <HeroSubtitle>{t('home.subtitle')}</HeroSubtitle>
            <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', marginTop: '0.75rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              ⭐ Trusted by 100+ clients across 5 countries | 23+ years experience | CPA Exam candidate
            </div>
          </FadeIn>
          <FadeIn>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/consultation" passHref legacyBehavior>
                <HeroButton onClick={() => track({ name: 'cta_click', label: 'hero_consultation', href: '/consultation' })}>{t('cta.book_consultation')}</HeroButton>
              </Link>
              <Link href="/services" passHref legacyBehavior>
                <HeroButton variant="ghost">{t('home.cta_secondary')}</HeroButton>
              </Link>
            </div>
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
        <SectionTitle>Case Studies</SectionTitle>
        <SectionText>See how we improved close times, reporting accuracy, and decision‑making.</SectionText>
        <div style={{ textAlign: 'center' }}>
          <Link href="/case-studies" passHref legacyBehavior>
            <ServiceLink>View Case Studies</ServiceLink>
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
    </>
  );
}