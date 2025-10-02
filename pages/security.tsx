import styled from '../utils/styled';
import SEO from '../components/SEO';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const ContentBlock = styled.div`
  margin-bottom: 3rem;
`;

const SectionHeading = styled.h2`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const HighlightBox = styled.div`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
  border-left: 4px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  border-radius: 8px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const ContactCTA = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 233, 0.1));
  border-radius: 12px;
`;

export default function SecurityPage() {
  return (
    <Section>
      <SEO 
        title="Security & Compliance - ProBook Solutions" 
        description="Learn about ProBook Solutions' commitment to data security, privacy compliance, and industry best practices for protecting your financial information."
        canonicalPath="/security"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Security & Compliance',
          description: 'ProBook Solutions data security and compliance information'
        }}
      />
      
      <Title>Security & Compliance</Title>
      <Intro>
        Your financial data is sensitive. We follow industry best practices to protect it and continuously improve our controls.
      </Intro>

      <ContentBlock>
        <SectionHeading>
          <Icon>🔒</Icon>
          Data Encryption & Security
        </SectionHeading>
        <Paragraph>
          All data transmitted to and from our systems is protected using bank-grade encryption standards:
        </Paragraph>
        <List>
          <ListItem><strong>TLS 1.3:</strong> All connections use the latest Transport Layer Security protocol</ListItem>
          <ListItem><strong>AES‑256:</strong> Data at rest is encrypted using strong encryption</ListItem>
          <ListItem><strong>End-to-End Security:</strong> Your data is encrypted from your browser to our secure servers</ListItem>
          <ListItem><strong>Secure File Storage:</strong> Documents and attachments are stored in encrypted, access-controlled storage</ListItem>
        </List>
        <HighlightBox>
          <strong>🔐 HTTPS Everywhere:</strong> Our entire website enforces HTTPS with HSTS (HTTP Strict Transport Security), ensuring all communications are encrypted by default.
        </HighlightBox>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>🛡️</Icon>
          Access Control & Authentication
        </SectionHeading>
        <Paragraph>
          We implement strict access controls to ensure only authorized personnel can access your data:
        </Paragraph>
        <List>
          <ListItem><strong>Multi-Factor Authentication (MFA):</strong> All team members use MFA for system access</ListItem>
          <ListItem><strong>Role-Based Access:</strong> Staff access is limited to only the data needed for their role</ListItem>
          <ListItem><strong>Access Logging:</strong> All data access is logged and monitored for unusual activity</ListItem>
          <ListItem><strong>Regular Access Reviews:</strong> We conduct quarterly reviews of user permissions</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>📋</Icon>
          Compliance & Certifications
        </SectionHeading>
        <Paragraph>
          ProBook Solutions adheres to industry standards and regulatory requirements:
        </Paragraph>
        <BadgesRow>
          <Badge>✅ GDPR Compliant</Badge>
          <Badge>✅ CCPA Compliant</Badge>
          <Badge>✅ QuickBooks ProAdvisor</Badge>
          <Badge>✅ Xero Certified</Badge>
        </BadgesRow>
        <List>
          <ListItem><strong>GDPR (General Data Protection Regulation):</strong> We align with EU data protection principles and honor data subject rights</ListItem>
          <ListItem><strong>CCPA (California Consumer Privacy Act):</strong> We honor consumer rights under California law</ListItem>
          <ListItem><strong>Data Processing Agreements:</strong> Available upon request for enterprise clients</ListItem>
          <ListItem><strong>Industry Certifications:</strong> Our team holds recognized certifications from accounting software providers</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>🔄</Icon>
          Backup & Disaster Recovery
        </SectionHeading>
        <Paragraph>
          Your data is protected against loss with comprehensive backup and recovery procedures:
        </Paragraph>
        <List>
          <ListItem><strong>Automated Daily Backups:</strong> All data is backed up daily to multiple secure locations</ListItem>
          <ListItem><strong>Geographic Redundancy:</strong> Backups are stored in geographically distributed data centers</ListItem>
          <ListItem><strong>High Availability:</strong> Our infrastructure is designed for resiliency and uptime
          </ListItem>
          <ListItem><strong>Disaster Recovery Plan:</strong> Tested recovery procedures ensure business continuity</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>👥</Icon>
          Third-Party Security
        </SectionHeading>
        <Paragraph>
          We carefully vet all third-party services and software we use:
        </Paragraph>
        <List>
          <ListItem><strong>Trusted Providers:</strong> We only work with industry-recognized platforms (QuickBooks, Xero, Supabase, Vercel)</ListItem>
          <ListItem><strong>Security Audits:</strong> All third-party integrations undergo security review</ListItem>
          <ListItem><strong>Data Processing Agreements:</strong> All vendors sign DPAs to ensure compliance</ListItem>
          <ListItem><strong>Minimal Data Sharing:</strong> We only share data necessary for service delivery</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>🎓</Icon>
          Staff Training & Policies
        </SectionHeading>
        <Paragraph>
          Our team is trained in security best practices and data protection:
        </Paragraph>
        <List>
          <ListItem><strong>Annual Security Training:</strong> All staff complete mandatory security awareness training</ListItem>
          <ListItem><strong>Confidentiality Agreements:</strong> Every team member signs NDAs</ListItem>
          <ListItem><strong>Background Checks:</strong> All employees undergo background verification</ListItem>
          <ListItem><strong>Secure Workspaces:</strong> Remote work follows strict security protocols</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>🔍</Icon>
          Monitoring & Incident Response
        </SectionHeading>
        <Paragraph>
          We actively monitor our systems and have procedures in place to respond to security incidents:
        </Paragraph>
        <List>
          <ListItem><strong>Continuous Monitoring:</strong> Automated systems watch for suspicious activity</ListItem>
          <ListItem><strong>Incident Response Plan:</strong> Clear procedures for addressing security events</ListItem>
          <ListItem><strong>Breach Notification:</strong> We strive to notify affected parties promptly in accordance with applicable laws</ListItem>
          <ListItem><strong>Regular Security Audits:</strong> Quarterly internal reviews and annual external assessments</ListItem>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>
          <Icon>📄</Icon>
          Data Retention & Deletion
        </SectionHeading>
        <Paragraph>
          We retain your data only as long as necessary and respect your right to deletion:
        </Paragraph>
        <List>
          <ListItem><strong>Retention Period:</strong> Financial data is retained for 7 years per accounting standards</ListItem>
          <ListItem><strong>Right to Deletion:</strong> You can request data deletion (subject to legal obligations)</ListItem>
          <ListItem><strong>Secure Disposal:</strong> Deleted data is securely wiped and unrecoverable</ListItem>
          <ListItem><strong>Data Portability:</strong> You can request a copy of your data at any time</ListItem>
        </List>
      </ContentBlock>

      <HighlightBox>
        <SectionHeading style={{ marginTop: 0 }}>
          <Icon>📞</Icon>
          Report a Security Concern
        </SectionHeading>
        <Paragraph>
          If you discover a security vulnerability or have concerns about data protection, please contact us immediately:
        </Paragraph>
        <Paragraph>
          <strong>Security Email:</strong> security@probooksolutions.org<br />
          <strong>Response Time:</strong> Within 24 hours
        </Paragraph>
      </HighlightBox>

      <ContactCTA>
        <h3>Have Questions About Security?</h3>
        <p>Our team is happy to discuss our security practices and provide additional documentation for enterprise clients.</p>
        <p style={{ marginTop: '1rem' }}>
          <a href="/contact" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', background: 'var(--color-primary)', color: '#fff', borderRadius: '8px', fontWeight: 600, display: 'inline-block' }}>
            Contact Our Team
          </a>
        </p>
      </ContactCTA>

      <Paragraph style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280', textAlign: 'center' }}>
        <strong>Last Updated:</strong> September 30, 2025
      </Paragraph>
    </Section>
  );
}
