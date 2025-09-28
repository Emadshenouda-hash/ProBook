import Link from 'next/link';
import SEO from '../components/SEO';
import styled from '../utils/styled';

const Wrap = styled('section')`
  text-align: center;
  padding: 4rem 1rem;
`;

export default function NotFound() {
  return (
    <Wrap>
      <SEO title="Page Not Found" description="This page does not exist." noindex />
      <h1>404</h1>
      <p>Sorry, we can’t find that page.</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </Wrap>
  );
}

