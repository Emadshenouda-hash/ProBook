import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import Link from 'next/link';
import type { DefaultTheme } from 'styled-components';

const FooterContainer = styled('footer')`
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 3rem 1rem 1.5rem;
  margin-top: 4rem;
`;

const FooterContent = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterColumn = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterHeading = styled('h3')`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
`;

const FooterText = styled('p')`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
`;

const SocialLinks = styled('div')`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled('a')`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 1.5rem;
  transition: color 0.2s ease, transform 0.2s ease;
  &:hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const TrustBadgesFooter = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Badge = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const FooterBottom = styled('div')`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.85rem;
`;

const FooterBottomLinks = styled('div')`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const CookieSettingsButton = styled('button')`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}; }
`;

export default function Footer() {
  const { t } = useTranslation();
  const [ConsentCtx, setCtx] = React.useState<any>(null);
  React.useEffect(() => {
    import('../context/ConsentContext').then((m) => setCtx(m));
  }, []);
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        {/* Company Info */}
        <FooterColumn>
          <FooterHeading>{t('seo.siteName', { defaultValue: 'ProBook Solutions' })}</FooterHeading>
          <FooterText>
            {t('footer.company_description', { defaultValue: 'Expert accounting and financial services for startups and SMEs. Over 23 years of experience in delivering tailored bookkeeping, CFO services, and financial reporting.' })}
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://www.linkedin.com/company/probook-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              🔗
            </SocialLink>
            <SocialLink href="https://twitter.com/probooksolutions" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              🐦
            </SocialLink>
                <SocialLink href="mailto:info@probooksolutions.org" aria-label={t('footer.email_label', { defaultValue: 'Email' })}>
                  ✉️
                </SocialLink>
          </SocialLinks>
        </FooterColumn>

        {/* Services */}
        <FooterColumn>
          <FooterHeading>{t('footer.services_heading', { defaultValue: 'Services' })}</FooterHeading>
          <FooterLink href="/services">{t('footer.all_services', { defaultValue: 'All Services' })}</FooterLink>
          <FooterLink href="/services#bookkeeping">{t('footer.bookkeeping', { defaultValue: 'Bookkeeping' })}</FooterLink>
          <FooterLink href="/services#cfo">{t('footer.cfo', { defaultValue: 'CFO-as-a-Service' })}</FooterLink>
          <FooterLink href="/services#reporting">{t('footer.reporting', { defaultValue: 'Financial Reporting' })}</FooterLink>
          <FooterLink href="/services#tax">{t('footer.tax', { defaultValue: 'Tax & Compliance' })}</FooterLink>
          <FooterLink href="/services#ecommerce">{t('footer.ecommerce', { defaultValue: 'E-commerce Accounting' })}</FooterLink>
        </FooterColumn>

        {/* Company */}
        <FooterColumn>
          <FooterHeading>{t('footer.company_heading', { defaultValue: 'Company' })}</FooterHeading>
          <FooterLink href="/about">{t('footer.about_us', { defaultValue: 'About Us' })}</FooterLink>
          <FooterLink href="/case-studies">{t('footer.case_studies', { defaultValue: 'Case Studies' })}</FooterLink>
          <FooterLink href="/industries">{t('footer.industries', { defaultValue: 'Industries' })}</FooterLink>
          <FooterLink href="/pricing">{t('footer.pricing', { defaultValue: 'Pricing' })}</FooterLink>
          <FooterLink href="/resources">{t('footer.resources', { defaultValue: 'Resources' })}</FooterLink>
          <FooterLink href="/portal">{t('footer.client_portal', { defaultValue: 'Client Portal' })}</FooterLink>
        </FooterColumn>

        {/* Contact & Legal */}
        <FooterColumn>
          <FooterHeading>{t('footer.get_started_heading', { defaultValue: 'Get Started' })}</FooterHeading>
          <FooterLink href="/consultation">{t('cta.book_consultation', { defaultValue: 'Book Consultation' })}</FooterLink>
          <FooterLink href="/contact">{t('footer.contact_us', { defaultValue: 'Contact Us' })}</FooterLink>
              <FooterText style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                <strong>{t('footer.email_label', { defaultValue: 'Email' })}:</strong><br />
                    info@probooksolutions.org
              </FooterText>
          <TrustBadgesFooter>
            <Badge>🔐 {t('footer.secure', { defaultValue: 'Secure' })}</Badge>
            <Badge>🏆 {t('footer.years_experience', { defaultValue: '23+ Years' })}</Badge>
            <Badge>🛡️ {t('footer.soc2', { defaultValue: 'SOC 2 Compliant' })}</Badge>
            <Badge>🔒 {t('footer.encrypted', { defaultValue: '256-bit SSL' })}</Badge>
          </TrustBadgesFooter>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <div>© {currentYear} {t('seo.siteName', { defaultValue: 'ProBook Solutions' })}. {t('footer.all_rights', { defaultValue: 'All rights reserved.' })}</div>
        <FooterBottomLinks>
          <FooterLink href="/privacy">{t('footer.privacy_policy', { defaultValue: 'Privacy Policy' })}</FooterLink>
          <FooterLink href="/cookies">{t('footer.cookie_policy', { defaultValue: 'Cookie Policy' })}</FooterLink>
          {ConsentCtx?.useConsent && (
            <CookieSettingsButton onClick={() => ConsentCtx.useConsent().reopen()} aria-label="Open cookie settings">Cookie Settings</CookieSettingsButton>
          )}
          <FooterLink href="/terms">{t('footer.terms_of_service', { defaultValue: 'Terms of Service' })}</FooterLink>
          <FooterLink href="/security">{t('footer.security_compliance', { defaultValue: 'Security & Compliance' })}</FooterLink>
          <FooterLink href="/sitemap.xml">{t('footer.sitemap', { defaultValue: 'Sitemap' })}</FooterLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
}