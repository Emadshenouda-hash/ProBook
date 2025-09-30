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
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const ContentBlock = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeading = styled.h2`
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ol`
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.75rem;
  }
`;

export default function TermsPage() {
  return (
    <Section>
      <SEO 
        title="Terms of Service - ProBook Solutions" 
        description="Terms and conditions for using ProBook Solutions services and website."
        canonicalPath="/terms"
        noindex
      />
      
      <Title>Terms of Service</Title>
      <Intro>
        Effective Date: September 30, 2025
      </Intro>

      <Paragraph>
        Welcome to ProBook Solutions. By accessing our website or using our services, you agree to these Terms of Service. Please read them carefully.
      </Paragraph>

      <ContentBlock>
        <SectionHeading>1. Services</SectionHeading>
        <Paragraph>
          ProBook Solutions provides accounting, bookkeeping, financial reporting, CFO advisory, and related financial services (collectively, "Services") to businesses and organizations.
        </Paragraph>
        <Paragraph>
          Services are provided on a subscription or project basis as agreed in writing with the client. Service scope, deliverables, timeline, and fees are detailed in separate engagement agreements or proposals.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>2. Acceptance of Terms</SectionHeading>
        <Paragraph>
          By using our website, submitting forms, or engaging our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
        </Paragraph>
        <Paragraph>
          If you are entering into these Terms on behalf of a company or organization, you represent that you have the authority to bind that entity.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>3. Client Responsibilities</SectionHeading>
        <Paragraph>
          As a client, you agree to:
        </Paragraph>
        <List>
          <li>Provide accurate, complete, and timely information and documentation as requested</li>
          <li>Maintain your own accounting records and source documents in compliance with applicable laws</li>
          <li>Review deliverables (reports, reconciliations, etc.) promptly and notify us of any discrepancies</li>
          <li>Pay invoices according to the agreed payment terms</li>
          <li>Maintain appropriate insurance and legal compliance for your business</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>4. Fees and Payment</SectionHeading>
        <Paragraph>
          Fees are outlined in your engagement agreement or proposal. Unless otherwise specified:
        </Paragraph>
        <List>
          <li>Monthly retainer fees are due on the 1st of each month</li>
          <li>Project fees are invoiced according to milestones or completion</li>
          <li>Late payments may incur interest charges of 1.5% per month</li>
          <li>Services may be suspended for accounts more than 30 days past due</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>5. Intellectual Property</SectionHeading>
        <Paragraph>
          All deliverables, reports, analyses, and recommendations we provide become your property upon full payment. However, our methodologies, templates, processes, and proprietary tools remain our intellectual property.
        </Paragraph>
        <Paragraph>
          You may not share, resell, or distribute our work products to third parties without written consent.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>6. Confidentiality</SectionHeading>
        <Paragraph>
          We maintain strict confidentiality of your financial data and business information. We will not disclose your information to third parties except:
        </Paragraph>
        <List>
          <li>With your explicit consent</li>
          <li>To service providers necessary for delivering Services (under confidentiality agreements)</li>
          <li>As required by law, regulation, or court order</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>7. Limitations of Liability</SectionHeading>
        <Paragraph>
          To the fullest extent permitted by law:
        </Paragraph>
        <List>
          <li>Our liability for any claim arising from Services is limited to the fees paid in the 12 months preceding the claim</li>
          <li>We are not liable for indirect, consequential, or punitive damages</li>
          <li>We are not responsible for errors resulting from inaccurate or incomplete information provided by you</li>
          <li>We carry professional liability insurance; claims should be made within the policy period</li>
        </List>
        <Paragraph>
          <strong>Important:</strong> We provide bookkeeping and financial management services but do not provide legal or tax advice. We recommend consulting licensed attorneys and tax professionals for such matters.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>8. Termination</SectionHeading>
        <Paragraph>
          Either party may terminate the engagement:
        </Paragraph>
        <List>
          <li><strong>For Convenience:</strong> With 30 days' written notice</li>
          <li><strong>For Cause:</strong> Immediately for material breach (non-payment, violation of terms, etc.)</li>
        </List>
        <Paragraph>
          Upon termination, you will receive all work completed to date and must pay for all services rendered. We will return or securely destroy your documents as requested.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>9. Data Security and Breach Notification</SectionHeading>
        <Paragraph>
          We implement industry-standard security measures to protect your data. In the event of a data breach affecting your information, we will notify you within 72 hours and take appropriate remedial action.
        </Paragraph>
        <Paragraph>
          See our <a href="/security">Security & Compliance</a> page for detailed information about our data protection practices.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>10. Dispute Resolution</SectionHeading>
        <Paragraph>
          Any disputes arising from these Terms or our Services will be resolved through:
        </Paragraph>
        <List>
          <li><strong>Good Faith Negotiation:</strong> Parties agree to attempt resolution through discussion</li>
          <li><strong>Mediation:</strong> If negotiation fails, disputes will be submitted to binding mediation</li>
          <li><strong>Arbitration:</strong> If mediation is unsuccessful, disputes will be resolved through binding arbitration</li>
        </List>
        <Paragraph>
          These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>11. Website Use and Restrictions</SectionHeading>
        <Paragraph>
          When using our website, you agree not to:
        </Paragraph>
        <List>
          <li>Attempt unauthorized access to our systems or other users' data</li>
          <li>Use automated tools to scrape or collect data from the site</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Impersonate ProBook Solutions or its employees</li>
          <li>Use the site for unlawful purposes</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>12. Third-Party Links and Services</SectionHeading>
        <Paragraph>
          Our website may contain links to third-party websites (e.g., QuickBooks, Xero, Calendly). We are not responsible for the content, privacy practices, or terms of these external sites. Your use of third-party services is subject to their respective terms.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>13. Professional Standards</SectionHeading>
        <Paragraph>
          We adhere to professional accounting standards and ethical guidelines. However, our services do not constitute:
        </Paragraph>
        <List>
          <li>A financial audit or attestation under GAAS (Generally Accepted Auditing Standards)</li>
          <li>Legal advice or representation</li>
          <li>Tax return preparation (unless explicitly agreed)</li>
          <li>Investment advice or securities recommendations</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>14. Indemnification</SectionHeading>
        <Paragraph>
          You agree to indemnify and hold ProBook Solutions harmless from any claims, damages, or expenses arising from:
        </Paragraph>
        <List>
          <li>Your violation of these Terms</li>
          <li>Your misuse of our Services or deliverables</li>
          <li>Inaccurate information you provide to us</li>
          <li>Your business operations and compliance (or non-compliance) with applicable laws</li>
        </List>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>15. Changes to Terms</SectionHeading>
        <Paragraph>
          We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Continued use of our Services after changes constitutes acceptance of the revised Terms.
        </Paragraph>
        <Paragraph>
          Material changes affecting existing engagements will be communicated directly to active clients.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>16. Severability</SectionHeading>
        <Paragraph>
          If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <SectionHeading>17. Contact Information</SectionHeading>
        <Paragraph>
          For questions about these Terms, please contact us:
        </Paragraph>
        <Paragraph>
          <strong>ProBook Solutions</strong><br />
          Email: legal@probooksolutions.com<br />
          Website: <a href="/">www.probooksolutions.com</a>
        </Paragraph>
      </ContentBlock>

      <Paragraph style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
        <strong>Last Updated:</strong> September 30, 2025<br />
        By using ProBook Solutions services, you acknowledge that you have read and agree to these Terms of Service.
      </Paragraph>
    </Section>
  );
}
