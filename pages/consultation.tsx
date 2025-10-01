import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { track } from '../utils/analytics';
import type { DefaultTheme } from 'styled-components';

// ===== HERO SECTION =====
const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.95), rgba(14, 165, 233, 0.95));
  color: #fff;
  padding: 4rem 1rem 3rem;
  text-align: center;
  margin: -2rem 0 3rem;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 5rem 2rem 4rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin: 0 auto 2rem;
  max-width: 700px;
  opacity: 0.95;
  line-height: 1.6;
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StatBox = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

// ===== MAIN CONTENT =====
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  overflow-x: hidden;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
  overflow-x: hidden;
  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
  }
`;

// ===== CALENDLY CARD =====
const CalendlyCard = styled.div`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.15);
  position: sticky;
  top: 2rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  @media (max-width: 1023px) {
    position: static;
  }
`;

const CalendlyHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const CalendlyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CalendlyTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const CalendlyDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const CalendlyBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  
  &:before {
    content: '✓';
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;

const CalendlyEmbed = styled.div`
  background: var(--color-surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-top: 1.5rem;
`;

const CalendlyFallback = styled.div`
  text-align: center;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 2px dashed var(--color-border);
`;

// ===== FORM CARD =====
const FormCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const FormDescription = styled.p`
  margin: 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${({ fullWidth }: { fullWidth?: boolean }) => fullWidth ? '1 / -1' : 'auto'};
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Required = styled.span`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.danger};
`;

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  &:hover {
    background-color: rgba(109, 40, 217, 0.05);
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    flex-shrink: 0;
  }
  
  span {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

const Hint = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-style: italic;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(109, 40, 217, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.danger};
  border-radius: 8px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.danger};
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.success};
  border-radius: 8px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.success};
  margin-bottom: 1rem;
`;

const PrivacyNote = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin-top: 1rem;
  
  a {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// ===== BENEFITS SECTION =====
const BenefitsSection = styled.section`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.03), rgba(14, 165, 233, 0.03));
  padding: 3rem 1rem;
  margin: 3rem -1rem 0;
  border-radius: 16px;
`;

const BenefitsTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
`;

const BenefitDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  line-height: 1.6;
`;

export default function ConsultationPage() {
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
    website: '', // honeypot
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
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

  const industryOptions = [
    'SaaS', 'Fintech', 'eCommerce', 'Retail', 'Wholesale', 'Professional Services',
    'Agency/Consulting', 'Manufacturing', 'Healthcare', 'Pharmaceuticals', 'Logistics',
    'Real Estate', 'Construction', 'Hospitality', 'Education', 'Media & Entertainment',
    'Agriculture', 'Energy', 'Nonprofit', 'Government', 'Other'
  ];

  const countryOptions = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Egypt', 'Jordan',
    'India', 'Singapore', 'Australia', 'New Zealand', 'Mexico', 'Brazil', 'Other'
  ];

  const updateField = (name: string, value: any) => setForm((p) => ({ ...p, [name]: value }));
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.name || e.target.id, e.target.value);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(e.target.name || e.target.id, e.target.value);
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField(e.target.name || e.target.id, e.target.value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pick = (k: string) => sessionStorage.getItem(k) || '';
      setForm((p) => ({
        ...p,
        utm_source: pick('utm_source'),
        utm_medium: pick('utm_medium'),
        utm_campaign: pick('utm_campaign'),
        utm_term: pick('utm_term'),
        utm_content: pick('utm_content')
      }));
    }
  }, []);

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
    track({ name: 'form_submit', form: 'consultation' });
    
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
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Book a Free Consultation - ProBook Solutions" 
        description="Schedule a free consultation with Emad Shenouda to discuss your accounting needs. Get a tailored plan for bookkeeping, financial reporting, or CFO services."
        canonicalPath="/consultation" 
      />

      <HeroSection>
        <HeroTitle>{t('consultation.hero_title', { defaultValue: 'Book Your Free Consultation' })}</HeroTitle>
        <HeroSubtitle>
          {t('consultation.hero_subtitle', { defaultValue: 'Get expert advice on streamlining your accounting, improving financial reporting, and making better business decisions. No obligation, just honest guidance.' })}
        </HeroSubtitle>
        <HeroStats>
          <StatBox>
            <StatNumber>{t('consultation.hero_stats.free_call_time', { defaultValue: '20 min' })}</StatNumber>
            <StatLabel>{t('consultation.hero_stats.free_call', { defaultValue: 'Free Call' })}</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>{t('consultation.hero_stats.years_number', { defaultValue: '23+ Years' })}</StatNumber>
            <StatLabel>{t('consultation.hero_stats.years_exp', { defaultValue: 'Experience' })}</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>{t('consultation.hero_stats.clients_number', { defaultValue: '100+' })}</StatNumber>
            <StatLabel>{t('consultation.hero_stats.clients', { defaultValue: 'Clients Served' })}</StatLabel>
          </StatBox>
        </HeroStats>
      </HeroSection>

      <Container>
        <TwoColumnLayout>
          {/* MAIN FORM */}
          <FormCard>
            <FormHeader>
              <FormTitle>{t('consultation.form_title', { defaultValue: 'Tell Us About Your Business' })}</FormTitle>
              <FormDescription>
                {t('consultation.form_description', { defaultValue: 'Fill out the form below and we\'ll get back to you within 24 hours with a customized plan and pricing estimate.' })}
              </FormDescription>
            </FormHeader>

            <form onSubmit={onSubmit} noValidate>
              {/* UTM Hidden Fields */}
              <input type="hidden" name="utm_source" value={form.utm_source} />
              <input type="hidden" name="utm_medium" value={form.utm_medium} />
              <input type="hidden" name="utm_campaign" value={form.utm_campaign} />
              <input type="hidden" name="utm_term" value={form.utm_term} />
              <input type="hidden" name="utm_content" value={form.utm_content} />
              
              {/* Honeypot */}
              <input type="text" name="website" value={form.website} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('website', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
              {success && <SuccessMessage role="status">{success}</SuccessMessage>}

              {/* Contact Information */}
              <FormSection>
                <SectionTitle>📋 {t('consultation.contact_info', { defaultValue: 'Contact Information' })}</SectionTitle>
                <Grid>
                  <Field>
                    <Label htmlFor="fullName">{t('consultation.full_name_label', { defaultValue: 'Full Name' })} <Required>*</Required></Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      value={form.fullName} 
                      onChange={handleInputChange} 
                      placeholder="John Doe"
                      required 
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="email">{t('consultation.email_label', { defaultValue: 'Email Address' })} <Required>*</Required></Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={form.email} 
                      onChange={handleInputChange} 
                      placeholder="john@company.com"
                      required 
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="phone">{t('consultation.phone_label', { defaultValue: 'Phone Number' })}</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={form.phone} 
                      onChange={handleInputChange} 
                      placeholder="+1 (555) 123-4567"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="company">{t('consultation.company_label', { defaultValue: 'Company Name' })} <Required>*</Required></Label>
                    <Input 
                      id="company" 
                      name="company"
                      value={form.company} 
                      onChange={handleInputChange} 
                      placeholder="Acme Inc."
                      required 
                    />
                  </Field>
                </Grid>
              </FormSection>

              {/* Company Details */}
              <FormSection>
                <SectionTitle>🏢 {t('consultation.company_details', { defaultValue: 'Company Details' })}</SectionTitle>
                <Grid>
                  <Field>
                    <Label htmlFor="companySize">{t('consultation.company_size_label', { defaultValue: 'Company Size' })}</Label>
                    <Select 
                      id="companySize" 
                      name="companySize"
                      value={form.companySize} 
                      onChange={handleSelectChange}
                    >
                      <option value="">Select size...</option>
                      {sizeOptions.map((o) => <option key={o} value={o}>{o} employees</option>)}
                    </Select>
                  </Field>
                  <Field>
                    <Label htmlFor="industry">{t('consultation.industry_label', { defaultValue: 'Industry' })}</Label>
                    <Select 
                      id="industry" 
                      name="industry"
                      value={form.industry} 
                      onChange={handleSelectChange}
                    >
                      <option value="">Select industry...</option>
                      {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </Field>
                  <Field>
                    <Label htmlFor="country">{t('consultation.country_label', { defaultValue: 'Country' })}</Label>
                    <Select 
                      id="country" 
                      name="country"
                      value={form.country} 
                      onChange={handleSelectChange}
                    >
                      <option value="">Select country...</option>
                      {countryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </Field>
                  <Field>
                    <Label htmlFor="urgency">{t('consultation.urgency_label', { defaultValue: 'When do you need to start?' })}</Label>
                    <Select 
                      id="urgency" 
                      name="urgency"
                      value={form.urgency} 
                      onChange={handleSelectChange}
                    >
                      <option value="">Select timeline...</option>
                      {urgencyOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                  </Field>
                </Grid>
              </FormSection>

              {/* Services Needed */}
              <FormSection>
                <SectionTitle>🎯 {t('consultation.services_needed', { defaultValue: 'What Services Do You Need?' })}</SectionTitle>
                <CheckboxGroup>
                  {serviceOptions.map((s) => (
                    <CheckboxLabel key={s}>
                      <input 
                        type="checkbox" 
                        checked={form.services.includes(s)} 
                        onChange={() => toggleMulti('services', s)} 
                      />
                      <span>{s}</span>
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormSection>

              {/* Current Systems */}
              <FormSection>
                <SectionTitle>💻 {t('consultation.current_systems', { defaultValue: 'Current Accounting Software' })}</SectionTitle>
                <CheckboxGroup>
                  {systemOptions.map((s) => (
                    <CheckboxLabel key={s}>
                      <input 
                        type="checkbox" 
                        checked={form.systems.includes(s)} 
                        onChange={() => toggleMulti('systems', s)} 
                      />
                      <span>{s}</span>
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormSection>

              {/* Budget */}
              <FormSection>
                <SectionTitle>💰 {t('consultation.budget_goals', { defaultValue: 'Budget & Goals' })}</SectionTitle>
                <Grid>
                  <Field>
                    <Label htmlFor="budget">{t('consultation.budget_label', { defaultValue: 'Monthly Budget' })}</Label>
                    <Select 
                      id="budget" 
                      name="budget"
                      value={form.budget} 
                      onChange={handleSelectChange}
                    >
                      <option value="">Select budget...</option>
                      {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select>
                    <Hint>{t('consultation.budget_hint', { defaultValue: 'Helps us recommend the right plan' })}</Hint>
                  </Field>
                </Grid>
              </FormSection>

              {/* Goals */}
              <FormSection>
                <Field fullWidth>
                  <Label htmlFor="goals">{t('consultation.goals_label', { defaultValue: 'What are your top 3 goals for the next 6-12 months?' })}</Label>
                  <TextArea 
                    id="goals" 
                    name="goals"
                    value={form.goals} 
                    onChange={handleTextAreaChange} 
                    placeholder={t('consultation.goals_placeholder', { defaultValue: 'e.g., Clean up historical books, set up monthly reporting, prepare for fundraising, reduce month-end close time...' })}
                  />
                </Field>
              </FormSection>

              {/* Additional Notes */}
              <FormSection>
                <Field fullWidth>
                  <Label htmlFor="notes">{t('consultation.notes_label', { defaultValue: 'Anything else we should know?' })}</Label>
                  <TextArea 
                    id="notes" 
                    name="notes"
                    value={form.notes} 
                    onChange={handleTextAreaChange} 
                    placeholder={t('consultation.notes_placeholder', { defaultValue: 'Current challenges, specific questions, or any other details...' })}
                  />
                </Field>
              </FormSection>

              {/* File Upload */}
              <FormSection>
                <Field fullWidth>
                  <Label htmlFor="attachment">📎 {t('consultation.attach_file', { defaultValue: 'Attach a File (Optional)' })}</Label>
                  <Input 
                    id="attachment" 
                    type="file" 
                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    }} 
                  />
                  {form.attachmentUrl && <Hint>{t('consultation.file_uploaded', { defaultValue: '✓ File uploaded successfully' })}</Hint>}
                  <Hint>{t('consultation.file_hint', { defaultValue: 'P&L, balance sheet, or any relevant documents' })}</Hint>
                </Field>
              </FormSection>

              <SubmitButton type="submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? t('consultation.submitting', { defaultValue: '🔄 Submitting...' }) : t('consultation.submit_button', { defaultValue: '🚀 Request Free Consultation' })}
              </SubmitButton>

              <PrivacyNote>
                By submitting, you agree to our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>. We'll never share your information.
              </PrivacyNote>
            </form>
          </FormCard>

          {/* CALENDLY CARD */}
          <div>
            <CalendlyCard>
              <CalendlyHeader>
                <CalendlyIcon>📅</CalendlyIcon>
                <CalendlyTitle>{t('consultation.calendly_title', { defaultValue: 'Or Schedule Directly' })}</CalendlyTitle>
                <CalendlyDescription>
                  {t('consultation.calendly_description', { defaultValue: 'Pick a time that works for you and book a 20-minute consultation call instantly.' })}
                </CalendlyDescription>
              </CalendlyHeader>

              <CalendlyBenefits>
                <BenefitItem>No commitment required</BenefitItem>
                <BenefitItem>Free, honest advice</BenefitItem>
                <BenefitItem>Get a custom plan & pricing</BenefitItem>
                <BenefitItem>Ask anything about your accounting</BenefitItem>
                <BenefitItem>Available via phone or video call</BenefitItem>
              </CalendlyBenefits>

              {calendlyUrl ? (
                <>
                  <Head>
                    <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
                  </Head>
                  <CalendlyEmbed>
                    <iframe
                      title="Schedule consultation with ProBook Solutions"
                      src={`${calendlyUrl}?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'www.probooksolutions.com'}&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1`}
                      width="100%"
                      height="700"
                      frameBorder="0"
                      style={{ borderRadius: '12px' }}
                    />
                  </CalendlyEmbed>
                </>
              ) : (
                <CalendlyFallback>
                  <p style={{ margin: '0 0 1rem' }}>📧 Email us directly:</p>
                  <a 
                    href="mailto:info@probooksolutions.com?subject=Consultation Request" 
                    style={{ 
                      display: 'inline-block',
                      padding: '0.75rem 1.5rem',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    info@probooksolutions.com
                  </a>
                </CalendlyFallback>
              )}
            </CalendlyCard>
          </div>
        </TwoColumnLayout>

        {/* BENEFITS SECTION */}
        <BenefitsSection>
          <BenefitsTitle>{t('consultation.what_happens_next', { defaultValue: 'What Happens Next?' })}</BenefitsTitle>
          <BenefitsGrid>
            <BenefitCard>
              <BenefitIcon>📞</BenefitIcon>
              <BenefitTitle>{t('consultation.step1_title', { defaultValue: '1. Discovery Call' })}</BenefitTitle>
              <BenefitDescription>
                {t('consultation.step1_desc', { defaultValue: 'We\'ll discuss your current situation, challenges, and goals in a 20-minute conversation.' })}
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>📊</BenefitIcon>
              <BenefitTitle>{t('consultation.step2_title', { defaultValue: '2. Custom Proposal' })}</BenefitTitle>
              <BenefitDescription>
                {t('consultation.step2_desc', { defaultValue: 'Receive a tailored plan with scope, timeline, and transparent pricing within 48 hours.' })}
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>🚀</BenefitIcon>
              <BenefitTitle>{t('consultation.step3_title', { defaultValue: '3. Get Started' })}</BenefitTitle>
              <BenefitDescription>
                {t('consultation.step3_desc', { defaultValue: 'If it\'s a good fit, we\'ll onboard you and start improving your financials immediately.' })}
              </BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </BenefitsSection>
      </Container>
    </>
  );
}
