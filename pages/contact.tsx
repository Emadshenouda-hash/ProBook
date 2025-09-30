import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

// Card-like container for the contact form. Adds padding, rounded corners and a subtle shadow.
const FormCard = styled.div`
  max-width: 640px;
  margin: 0 auto;
  background-color: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border: 1px solid var(--color-border);
  /* Accent border to tie into the brand colour */
  border-left: 4px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

// The form itself is a flex column with generous spacing between fields.
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

// Wrapper for each form field to position icons inside inputs
const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

// Icon container positioned inside the input fields
const IconWrapper = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(12, 94, 215, 0.15);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg);
  font-size: 1rem;
  resize: vertical;
  min-height: 140px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(12, 94, 215, 0.15);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  background-image: linear-gradient(90deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary} 0%, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary} 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export default function ContactPage() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ name: '', email: '', message: '', website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formState.website) return 'Spam detected.'; // honeypot
    if (!formState.name || formState.name.trim().length < 2) return 'Please enter your full name.';
    const emailOk = /.+@.+\..+/.test(formState.email);
    if (!emailOk) return 'Please enter a valid email address.';
    if (!formState.message || formState.message.trim().length < 10) return 'Please write a brief message (10+ chars).';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formState.name, email: formState.email, message: formState.message, website: formState.website })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess('Thanks! We will get back to you soon.');
      setFormState({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section>
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        canonicalPath={t('seo.contact.path')}
      />
      <Title>{t('contact.title')}</Title>
      <Intro>{t('contact.intro')}</Intro>
      <FormCard>
        <Form onSubmit={handleSubmit} noValidate>
          {/* Honeypot field */}
          <input type="text" name="website" value={formState.website} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          {/* Feedback messages with aria-live to announce updates */}
          {error && (
            <div role="alert" style={{ color: '#dc3545' }} aria-live="assertive">{error}</div>
          )}
          {success && (
            <div role="status" style={{ color: '#198754' }} aria-live="polite">{success}</div>
          )}
          <label htmlFor="name" style={{ fontWeight: 500 }}>{t('contact.name')}</label>
          <Field>
            <IconWrapper>
              {/* User icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </IconWrapper>
            <Input
              id="name"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </Field>
          <label htmlFor="email" style={{ fontWeight: 500 }}>{t('contact.email')}</label>
          <Field>
            <IconWrapper>
              {/* Envelope icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
              </svg>
            </IconWrapper>
            <Input
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </Field>
          <label htmlFor="message" style={{ fontWeight: 500 }}>{t('contact.message')}</label>
          <Field>
            <IconWrapper>
              {/* Message icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v20l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </IconWrapper>
            <TextArea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </Field>
          <SubmitButton type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Sending…' : t('contact.submit')}
          </SubmitButton>
        </Form>
      </FormCard>
    </Section>
  );
}