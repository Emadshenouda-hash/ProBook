import { useState } from 'react';
import Head from 'next/head';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const Card = styled.div`
  max-width: 840px;
  margin: 0 auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  padding: 1.25rem;
`;

const Scheduler = styled.div`
  max-width: 1024px;
  margin: 0 auto 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 120px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
`;

const Hint = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  background: var(--color-primary);
`;

export default function ConsultationPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    industry: '',
    country: '',
    services: [] as string[],
    systems: [] as string[],
    budget: '',
    urgency: '',
    goals: '',
    notes: '',
    attachmentUrl: '',
    website: '' // honeypot
  });

  const serviceOptions = [
    'Bookkeeping',
    'CFO-as-a-Service',
    'Financial Reporting & Analysis',
    'Tax & Compliance',
    'Payroll',
    'ERP Setup / Migration',
    'Process Optimization'
  ];

  const systemOptions = ['QuickBooks', 'Xero', 'Zoho Books', 'Odoo', 'NetSuite', 'Other'];

  const sizeOptions = ['1-10', '11-50', '51-200', '201-500', '500+'];
  const budgetOptions = ['< $1k/mo', '$1k–$3k/mo', '$3k–$10k/mo', '$10k+/mo'];
  const urgencyOptions = ['ASAP (1–2 weeks)', 'Soon (1–2 months)', 'Later (3+ months)'];

  // Curated industry and country lists to avoid free text
  const industryOptions = [
    'SaaS', 'Fintech', 'eCommerce', 'Retail', 'Wholesale', 'Professional Services',
    'Agency/Consulting', 'Manufacturing', 'Healthcare', 'Pharmaceuticals', 'Logistics',
    'Real Estate', 'Construction', 'Hospitality', 'Education', 'Media & Entertainment',
    'Agriculture', 'Energy', 'Nonprofit', 'Government', 'Other'
  ];

  const countryOptions = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Ireland', 'Switzerland',
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Egypt', 'Jordan', 'Lebanon', 'Morocco', 'Tunisia',
    'India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'China', 'Japan', 'South Korea', 'Australia', 'New Zealand',
    'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Ethiopia',
    'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia'
  ];

  const updateField = (name: string, value: any) => setForm((p) => ({ ...p, [name]: value }));

  const toggleMulti = (name: 'services' | 'systems', value: string) => {
    setForm((p) => {
      const set = new Set(p[name]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...p, [name]: Array.from(set) };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // basic validation
    if (!form.fullName || form.fullName.trim().length < 2) return setError('Please enter your full name.');
    if (!/.+@.+\..+/.test(form.email)) return setError('Please enter a valid email address.');
    if (!form.company.trim()) return setError('Please enter your company name.');
    setSubmitting(true);
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to submit');
      if (typeof window !== 'undefined') {
        window.location.href = '/thank-you';
        return;
      }
      setSuccess('Thanks! We will contact you shortly to schedule your consultation.');
      setForm({
        fullName: '', email: '', phone: '', company: '', companySize: '', industry: '', country: '',
        services: [], systems: [], budget: '', urgency: '', goals: '', notes: '', attachmentUrl: '', website: ''
      });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section>
      <SEO title="Book a Consultation" description="Tell us about your business goals. We'll tailor an accounting and finance plan for you." canonicalPath="/consultation" />
      <Title>Book a Consultation</Title>
      <Subtitle>Tell us about your business, current tools, and goals. We’ll recommend a tailored plan.</Subtitle>
      {calendlyUrl ? (
        <>
          <Head>
            <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
          </Head>
          <Scheduler>
            <iframe
              title="Schedule consultation"
              src={`${calendlyUrl}?embed_domain=www.probooksolutions.org&embed_type=Inline`}
              width="100%"
              height="740"
              frameBorder="0"
            />
          </Scheduler>
        </>
      ) : null}
      <Card>
        <form onSubmit={onSubmit} noValidate>
          <Field>
            <Label htmlFor="attachment">Attach a file (optional)</Label>
            <Input id="attachment" type="file" onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('file', file);
              try {
                const up = await fetch('/api/consultation-upload', { method: 'POST', body: formData });
                const data = await up.json();
                if (up.ok && data.url) {
                  updateField('attachmentUrl', data.url);
                } else {
                  setError('File upload failed.');
                }
              } catch {
                setError('File upload failed.');
              }
            }} />
            {form.attachmentUrl && <Hint>Uploaded: {form.attachmentUrl}</Hint>}
          </Field>
          {error && <div role="alert" style={{ color: '#dc2626', marginBottom: '0.75rem' }}>{error}</div>}
          {success && <div role="status" style={{ color: '#198754', marginBottom: '0.75rem' }}>{success}</div>}

          {/* Honeypot */}
          <input type="text" name="website" value={form.website} onChange={(e) => updateField('website', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <Grid>
            <Field>
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" value={form.fullName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('fullName', e.target.value)} required />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('email', e.target.value)} required />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('phone', e.target.value)} />
            </Field>
            <Field>
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={form.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('company', e.target.value)} required />
            </Field>
            <Field>
              <Label htmlFor="companySize">Company size</Label>
              <Select id="companySize" value={form.companySize} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('companySize', e.target.value)}>
                <option value="">Select…</option>
                {sizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="industry">Industry</Label>
              <Select id="industry" value={form.industry} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('industry', e.target.value)}>
                <option value="">Select…</option>
                {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="country">Country</Label>
              <Select id="country" value={form.country} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('country', e.target.value)}>
                <option value="">Select…</option>
                {countryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field>
              <Label htmlFor="budget">Monthly budget</Label>
              <Select id="budget" value={form.budget} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('budget', e.target.value)}>
                <option value="">Select…</option>
                {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
              <Hint>Helps us recommend the right engagement model.</Hint>
            </Field>
            <Field>
              <Label htmlFor="urgency">When would you like to start?</Label>
              <Select id="urgency" value={form.urgency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('urgency', e.target.value)}>
                <option value="">Select…</option>
                {urgencyOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
          </Grid>

          <Field style={{ marginTop: '1rem' }}>
            <Label>Which services are you interested in?</Label>
            <CheckboxGroup>
              {serviceOptions.map((s) => (
                <label key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={form.services.includes(s)} onChange={() => toggleMulti('services', s)} />
                  <span>{s}</span>
                </label>
              ))}
            </CheckboxGroup>
          </Field>

          <Field>
            <Label>Which finance/accounting systems do you use?</Label>
            <CheckboxGroup>
              {systemOptions.map((s) => (
                <label key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={form.systems.includes(s)} onChange={() => toggleMulti('systems', s)} />
                  <span>{s}</span>
                </label>
              ))}
            </CheckboxGroup>
          </Field>

          <Field>
            <Label htmlFor="goals">What are your top 3 goals for the next 6–12 months?</Label>
            <TextArea id="goals" value={form.goals} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('goals', e.target.value)} placeholder="e.g., Clean up historical books, monthly reporting, cash flow planning" />
          </Field>

          <Field>
            <Label htmlFor="notes">Anything else we should know?</Label>
            <TextArea id="notes" value={form.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('notes', e.target.value)} />
          </Field>

          <Actions>
            <Button type="submit" disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Submitting…' : 'Request Consultation'}
            </Button>
          </Actions>
        </form>
      </Card>
    </Section>
  );
}

