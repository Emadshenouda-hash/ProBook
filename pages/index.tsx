import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import { FadeIn } from '../components/Animate';
import LogosBar from '../components/LogosBar';
import SEO from '../components/SEO';
import Button from '../components/Button';
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
  /*
   * The gradient overlay uses even lower opacity (~0.45) to let more of the
   * underlying photo through, increasing contrast and clarity. The hero
   * background is fixed to create a subtle parallax effect as the page
   * scrolls.
   */
  background-image: linear-gradient(140deg, rgba(67, 56, 202, 0.45), rgba(109, 40, 217, 0.45)), url('/hero.jpg');
  /* Avoid fixed attachment on small screens to prevent jank */
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 640px) {
    min-height: 70vh;
    padding: 4rem 1rem;
    background-attachment: scroll;
    background-position: center top;
    overflow: hidden;
  }
`;

const HeroTitle = styled.h1`
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  margin-bottom: 2rem;
  max-width: 600px;
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
      />
      <Hero>
        <HeroInner>
          <FadeIn>
            <HeroTitle>{t('home.title')}</HeroTitle>
          </FadeIn>
          <FadeIn>
            <HeroSubtitle>{t('home.subtitle')}</HeroSubtitle>
          </FadeIn>
          <FadeIn>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/contact" passHref legacyBehavior>
                <HeroButton>{t('home.cta_primary')}</HeroButton>
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
              <BenefitIconWrapper>{benefit.icon}</BenefitIconWrapper>
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