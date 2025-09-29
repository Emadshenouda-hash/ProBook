import styled from '../utils/styled';
import SEO from '../components/SEO';

const Section = styled.section`
  margin: 3rem 0;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  max-width: 720px;
  margin: 0.5rem auto 0;
`;

export default function ThankYouPage() {
  return (
    <Section>
      <SEO title="Thank you" description="We received your request and will be in touch shortly." canonicalPath="/thank-you" />
      <Title>Thank you!</Title>
      <Text>We received your request. Our team will reach out shortly to schedule the next steps.</Text>
    </Section>
  );
}

