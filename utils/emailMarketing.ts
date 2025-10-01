// Email marketing integration utilities
export interface EmailSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface EmailCampaign {
  name: string;
  subject: string;
  content: string;
  listId: string;
  scheduledAt?: Date;
}

// Email service providers integration
export class EmailMarketingService {
  private provider: 'mailchimp' | 'convertkit' | 'sendgrid' | 'resend';
  private apiKey: string;
  private listId?: string;

  constructor(provider: 'mailchimp' | 'convertkit' | 'sendgrid' | 'resend', apiKey: string, listId?: string) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.listId = listId;
  }

  // Subscribe user to email list
  async subscribe(subscriber: EmailSubscriber): Promise<{ success: boolean; message: string }> {
    try {
      switch (this.provider) {
        case 'mailchimp':
          return await this.subscribeToMailchimp(subscriber);
        case 'convertkit':
          return await this.subscribeToConvertKit(subscriber);
        case 'sendgrid':
          return await this.subscribeToSendGrid(subscriber);
        case 'resend':
          return await this.subscribeToResend(subscriber);
        default:
          throw new Error('Unsupported email provider');
      }
    } catch (error) {
      console.error('Email subscription error:', error);
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
  }

  // Mailchimp integration
  private async subscribeToMailchimp(subscriber: EmailSubscriber) {
    const response = await fetch(`/api/email/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'mailchimp',
        subscriber,
        listId: this.listId
      })
    });

    const result = await response.json();
    return result;
  }

  // ConvertKit integration
  private async subscribeToConvertKit(subscriber: EmailSubscriber) {
    const response = await fetch(`/api/email/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'convertkit',
        subscriber,
        listId: this.listId
      })
    });

    const result = await response.json();
    return result;
  }

  // SendGrid integration
  private async subscribeToSendGrid(subscriber: EmailSubscriber) {
    const response = await fetch(`/api/email/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'sendgrid',
        subscriber,
        listId: this.listId
      })
    });

    const result = await response.json();
    return result;
  }

  // Resend integration
  private async subscribeToResend(subscriber: EmailSubscriber) {
    const response = await fetch(`/api/email/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'resend',
        subscriber,
        listId: this.listId
      })
    });

    const result = await response.json();
    return result;
  }
}

// Default email marketing service instance
export const emailMarketing = new EmailMarketingService(
  (process.env.EMAIL_PROVIDER as any) || 'resend',
  process.env.EMAIL_API_KEY || '',
  process.env.EMAIL_LIST_ID
);

// Email capture form component props
export interface EmailCaptureProps {
  placeholder?: string;
  buttonText?: string;
  source?: string;
  tags?: string[];
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Email capture form data
export interface EmailCaptureData {
  email: string;
  firstName?: string;
  source?: string;
  tags?: string[];
}

// Track email signup conversion
export function trackEmailSignup(source: string, success: boolean) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'email_signup', {
      event_category: 'email_marketing',
      event_label: source,
      value: success ? 1 : 0,
      custom_parameters: {
        source: source,
        success: success
      }
    });
  }
}

// Email templates for different sources
export const EmailTemplates = {
  consultation: {
    subject: 'Thank you for your consultation request',
    tags: ['consultation', 'lead']
  },
  newsletter: {
    subject: 'Welcome to ProBook Solutions Newsletter',
    tags: ['newsletter', 'subscriber']
  },
  resource: {
    subject: 'Your accounting resource is ready',
    tags: ['resource', 'download']
  },
  pricing: {
    subject: 'Pricing information for your business',
    tags: ['pricing', 'lead']
  }
};

// Email list segmentation
export const EmailSegments = {
  leads: 'leads',
  customers: 'customers',
  newsletter: 'newsletter',
  prospects: 'prospects'
};