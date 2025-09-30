import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
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
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const ContentBlock = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeading = styled.h2`
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const SubHeading = styled.h3`
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
`;

const P = styled.p`
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  
  th, td {
    border: 1px solid var(--color-border);
    padding: 0.75rem;
    text-align: left;
  }
  
  th {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
    font-weight: 600;
  }
`;

const HighlightBox = styled.div`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
  border-left: 4px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
`;

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <SEO 
        title="Privacy Policy - ProBook Solutions" 
        description="How ProBook Solutions collects, uses, and protects your personal information. GDPR and CCPA compliant."
        canonicalPath="/privacy" 
      />
      <Title>Privacy Policy</Title>
      <Intro>
        <strong>Effective Date:</strong> September 30, 2025<br />
        <strong>Last Updated:</strong> September 30, 2025
      </Intro>

      <P>
        At ProBook Solutions, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
      </P>

      <HighlightBox>
        <strong>Key Points:</strong>
        <List>
          <li>We do not sell your personal information</li>
          <li>We collect only what's necessary to provide our services</li>
          <li>You have rights to access, correct, or delete your data</li>
          <li>We comply with GDPR, CCPA, and other privacy regulations</li>
        </List>
      </HighlightBox>

      <ContentBlock>
        <SectionHeading>1. Information We Collect</SectionHeading>
        
        <SubHeading>1.1 Information You Provide Directly</SubHeading>
        <P>
          When you interact with our website or request services, we may collect:
        </P>
        <List>
          <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
          <li><strong>Business Information:</strong> Company size, industry, country, services needed</li>
          <li><strong>Financial Information:</strong> When you become a client, we may collect accounting data, bank statements, invoices, and related documents</li>
          <li><strong>Communication Data:</strong> Messages, emails, and chat conversations with our team</li>
          <li><strong>Payment Information:</strong> Billing address and payment details (processed securely through third-party payment processors)</li>
        </List>

        <SubHeading>1.2 Information Collected Automatically</SubHeading>
        <P>
          When you visit our website, we automatically collect:
        </P>
        <List>
          <li><strong>Device & Browser Information:</strong> IP address, browser type, operating system, device identifiers</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, links clicked, referring website</li>
          <li><strong>Cookies & Tracking:</strong> We use cookies for analytics and functionality (see Section 8)</li>
          <li><strong>UTM Parameters:</strong> Marketing campaign data to understand how you found us</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>2. How We Use Your Information</SectionHeading>
        <P>
          We use collected information for the following purposes:
        </P>
        <Table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal Basis (GDPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Providing accounting and bookkeeping services</td>
              <td>Contract Performance</td>
            </tr>
            <tr>
              <td>Responding to inquiries and consultations</td>
              <td>Legitimate Interest</td>
            </tr>
            <tr>
              <td>Sending service updates and communications</td>
              <td>Contract Performance / Consent</td>
            </tr>
            <tr>
              <td>Improving our website and services</td>
              <td>Legitimate Interest</td>
            </tr>
            <tr>
              <td>Marketing (with your consent)</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Compliance with legal obligations</td>
              <td>Legal Obligation</td>
            </tr>
          </tbody>
        </Table>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>3. How We Share Your Information</SectionHeading>
        <P>
          We do not sell your personal information. We may share data with:
        </P>

        <SubHeading>3.1 Service Providers</SubHeading>
        <P>
          We work with trusted third-party providers who assist in delivering our services:
        </P>
        <List>
          <li><strong>Hosting & Infrastructure:</strong> Vercel (website hosting)</li>
          <li><strong>Database:</strong> Supabase (encrypted data storage)</li>
          <li><strong>Email Delivery:</strong> Resend (transactional emails)</li>
          <li><strong>CRM:</strong> HubSpot or Pipedrive (client relationship management)</li>
          <li><strong>Analytics:</strong> Google Analytics, Vercel Analytics</li>
          <li><strong>Scheduling:</strong> Calendly (appointment booking)</li>
          <li><strong>AI Chat:</strong> OpenAI or DeepSeek (optional chat support)</li>
          <li><strong>Accounting Software:</strong> QuickBooks, Xero, Zoho Books, NetSuite (as selected by you)</li>
        </List>
        <P>
          All service providers are bound by data protection agreements and are prohibited from using your data for their own purposes.
        </P>

        <SubHeading>3.2 Legal Requirements</SubHeading>
        <P>
          We may disclose information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
        </P>

        <SubHeading>3.3 Business Transfers</SubHeading>
        <P>
          In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>4. Your Privacy Rights</SectionHeading>
        
        <SubHeading>4.1 General Rights (All Users)</SubHeading>
        <List>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
          <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
        </List>

        <SubHeading>4.2 GDPR Rights (EU/EEA Users)</SubHeading>
        <P>
          If you are located in the European Union or European Economic Area, you have additional rights:
        </P>
        <List>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
          <li><strong>Right to Restrict:</strong> Request restriction of processing in certain circumstances</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing or optional processing</li>
          <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
        </List>

        <SubHeading>4.3 CCPA Rights (California Residents)</SubHeading>
        <P>
          If you are a California resident, you have rights under the California Consumer Privacy Act:
        </P>
        <List>
          <li><strong>Right to Know:</strong> Request disclosure of what personal information we collect and share</li>
          <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
          <li><strong>Right to Opt-Out:</strong> Opt-out of the "sale" of personal information (we do not sell data)</li>
          <li><strong>Non-Discrimination:</strong> We will not discriminate for exercising your rights</li>
        </List>

        <HighlightBox>
          <strong>To Exercise Your Rights:</strong><br />
          Email us at <a href="mailto:privacy@probooksolutions.com">privacy@probooksolutions.com</a> with your request. We will respond within 30 days (GDPR) or 45 days (CCPA).
        </HighlightBox>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>5. Data Retention</SectionHeading>
        <P>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy:
        </P>
        <List>
          <li><strong>Inquiry Data:</strong> Retained for 2 years after last contact</li>
          <li><strong>Client Financial Records:</strong> Retained for 7 years after engagement ends (accounting standard)</li>
          <li><strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
          <li><strong>Website Analytics:</strong> Anonymized after 26 months (Google Analytics default)</li>
        </List>
        <P>
          Data may be retained longer if required by law or to resolve disputes.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>6. Data Security</SectionHeading>
        <P>
          We implement industry-standard security measures to protect your data:
        </P>
        <List>
          <li>TLS 1.3 encryption for data in transit</li>
          <li>AES-256 encryption for data at rest</li>
          <li>Multi-factor authentication for staff access</li>
          <li>Regular security audits and monitoring</li>
          <li>Role-based access controls</li>
        </List>
        <P>
          For detailed information, see our <Link href="/security">Security & Compliance</Link> page.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>7. International Data Transfers</SectionHeading>
        <P>
          Your data may be transferred to and processed in countries outside your jurisdiction (e.g., United States for hosting). We ensure adequate protection through:
        </P>
        <List>
          <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
          <li>Data Processing Agreements with all service providers</li>
          <li>Compliance with EU-U.S. Data Privacy Framework (where applicable)</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>8. Cookies and Tracking Technologies</SectionHeading>
        <P>
          We use cookies to improve your experience and analyze website usage:
        </P>
        <Table>
          <thead>
            <tr>
              <th>Cookie Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential Cookies</td>
              <td>Enable core functionality (theme preference, language)</td>
              <td>Session / 1 year</td>
            </tr>
            <tr>
              <td>Analytics Cookies</td>
              <td>Google Analytics (track page views, user behavior)</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>Marketing Cookies</td>
              <td>Track UTM parameters for campaign attribution</td>
              <td>Session</td>
            </tr>
          </tbody>
        </Table>
        <P>
          You can manage cookie preferences through your browser settings. Note that disabling cookies may limit website functionality.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>9. Children's Privacy</SectionHeading>
        <P>
          Our services are not directed to individuals under 18. We do not knowingly collect data from children. If we learn we have collected information from a minor, we will delete it promptly.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>10. Third-Party Links</SectionHeading>
        <P>
          Our website may contain links to third-party sites (QuickBooks, Xero, Calendly, LinkedIn, etc.). We are not responsible for their privacy practices. Please review their privacy policies separately.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>11. Changes to This Policy</SectionHeading>
        <P>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Material changes will be communicated via email to active clients.
        </P>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>12. Contact Us</SectionHeading>
        <P>
          For questions, concerns, or to exercise your privacy rights, contact us:
        </P>
        <P>
          <strong>ProBook Solutions</strong><br />
          Privacy Officer<br />
          Email: <a href="mailto:privacy@probooksolutions.com">privacy@probooksolutions.com</a><br />
          Website: <Link href="/contact">Contact Form</Link>
        </P>
        <P>
          <strong>EU Representative (GDPR):</strong> [If you serve EU clients and are not EU-based, appoint a representative]<br />
          <strong>Response Time:</strong> We aim to respond within 5 business days.
        </P>
      </ContentBlock>

      <P style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
        <strong>Last Updated:</strong> September 30, 2025<br />
        By using ProBook Solutions website and services, you acknowledge that you have read and understood this Privacy Policy.
      </P>
    </Section>
  );
}

