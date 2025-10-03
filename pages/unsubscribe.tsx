import { useEffect, useState } from 'react';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';

const Section = styled.section`
  max-width: 720px;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
`;

export default function UnsubscribePage() {
  const [status, setStatus] = useState<'pending' | 'ok' | 'error'>('pending');
  const [message, setMessage] = useState('Processing your unsubscribe…');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Missing token');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`);
        if (res.ok) {
          setStatus('ok');
          setMessage('You have been unsubscribed.');
        } else {
          const text = await res.text();
          setStatus('error');
          setMessage(text || 'Invalid or expired token');
        }
      } catch (e) {
        setStatus('error');
        setMessage('Network error');
      }
    })();
  }, []);

  return (
    <Section>
      <SEO title="Unsubscribe" description="Unsubscribe from emails" canonicalPath="/unsubscribe" noindex />
      <h1>{status === 'ok' ? 'Unsubscribed' : 'Processing…'}</h1>
      <p>{message}</p>
      <p style={{ marginTop: '1rem' }}>
        <Link href="/">Go back home</Link>
      </p>
    </Section>
  );
}

