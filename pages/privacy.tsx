import styled from '../utils/styled';
import SEO from '../components/SEO';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: start;
  margin-bottom: 1rem;
`;

const P = styled.p`
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
`;

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <SEO title="Privacy Policy" description="How we collect, use, and protect your information." canonicalPath="/privacy" />
      <Title>Privacy Policy</Title>
      <P>
        We collect information you provide in our contact and consultation forms to respond to your inquiries and
        provide services. We may store submissions in our CRM and database providers. We do not sell personal data.
      </P>
      <P>
        Data processors we may use include website hosting, analytics, email delivery, CRM, file storage, and
        scheduling providers. We take reasonable measures to protect your information and limit access to authorized
        personnel.
      </P>
      <P>
        You can request access, correction, or deletion of your information by contacting us at the email on our
        contact page. We will retain data as necessary to provide services and comply with legal obligations.
      </P>
      <P>
        This policy may be updated from time to time. If you have questions, please contact us.
      </P>
    </Section>
  );
}

