/**
 * CRM integration utilities for HubSpot and Pipedrive.
 * Provider is selected via CRM_PROVIDER env: 'hubspot' | 'pipedrive'.
 */

type CrmProvider = 'hubspot' | 'pipedrive';

export interface CrmLeadPayload {
  source: 'contact' | 'consultation';
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  country?: string;
  budget?: string;
  urgency?: string;
  goals?: string;
  notes?: string;
}

function parseName(fullName?: string): { firstname?: string; lastname?: string } {
  const name = (fullName || '').trim();
  if (!name) return {};
  const parts = name.split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] };
  return { firstname: parts.slice(0, -1).join(' '), lastname: parts.slice(-1)[0] };
}

async function createHubSpotContactAndDeal(payload: CrmLeadPayload) {
  const token = process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('Missing HUBSPOT_API_KEY');

  const { firstname, lastname } = parseName(payload.fullName);
  const contactRes = await fetch('https://api.hubspot.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      properties: {
        email: payload.email || undefined,
        firstname: firstname || undefined,
        lastname: lastname || undefined,
        phone: payload.phone || undefined,
        company: payload.company || undefined,
        industry: payload.industry || undefined,
        country: payload.country || undefined,
        lifecyclestage: 'lead',
        source: payload.source
      }
    })
  });
  if (!contactRes.ok) {
    const txt = await contactRes.text();
    throw new Error(`HubSpot contact error: ${contactRes.status} ${txt}`);
  }
  const contact = await contactRes.json();
  const contactId: string | undefined = contact?.id;

  const pipelineId = process.env.HUBSPOT_PIPELINE_ID;
  const dealstageId = process.env.HUBSPOT_DEALSTAGE_ID;
  if (pipelineId && dealstageId) {
    const dealName = `${payload.source === 'consultation' ? 'Consultation' : 'Contact'} – ${payload.fullName || payload.email || 'Lead'}`;
    const dealRes = await fetch('https://api.hubspot.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        associations: contactId
          ? [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }]
          : undefined,
        properties: {
          dealname: dealName,
          pipeline: pipelineId,
          dealstage: dealstageId,
          amount: payload.budget?.replace(/[^0-9.]/g, '') || undefined
        }
      })
    });
    if (!dealRes.ok) {
      const txt = await dealRes.text();
      console.warn('HubSpot deal create failed:', dealRes.status, txt);
    }
  }
}

async function createPipedriveContactAndDeal(payload: CrmLeadPayload) {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  const companyDomain = process.env.PIPEDRIVE_COMPANY_DOMAIN; // e.g., 'mycompany'
  if (!apiToken || !companyDomain) throw new Error('Missing PIPEDRIVE_API_TOKEN or PIPEDRIVE_COMPANY_DOMAIN');

  // Optionally create/get organization by company name
  let orgId: number | undefined;
  if (payload.company) {
    const orgRes = await fetch(`https://${companyDomain}.pipedrive.com/v1/organizations?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: payload.company })
    });
    if (orgRes.ok) {
      const data = await orgRes.json();
      orgId = data?.data?.id;
    }
  }

  const personRes = await fetch(`https://${companyDomain}.pipedrive.com/v1/persons?api_token=${apiToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.fullName || payload.email || 'Lead',
      email: payload.email || undefined,
      phone: payload.phone || undefined,
      org_id: orgId
    })
  });
  if (!personRes.ok) {
    const txt = await personRes.text();
    throw new Error(`Pipedrive person error: ${personRes.status} ${txt}`);
  }
  const person = await personRes.json();
  const personId: number | undefined = person?.data?.id;

  const title = `${payload.source === 'consultation' ? 'Consultation' : 'Contact'} – ${payload.fullName || payload.email || 'Lead'}`;
  const value = Number(payload.budget?.replace(/[^0-9.]/g, '')) || undefined;
  const dealRes = await fetch(`https://${companyDomain}.pipedrive.com/v1/deals?api_token=${apiToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, value, person_id: personId })
  });
  if (!dealRes.ok) {
    const txt = await dealRes.text();
    console.warn('Pipedrive deal create failed:', dealRes.status, txt);
  }
}

export async function createCrmContactAndDeal(payload: CrmLeadPayload) {
  const provider = (process.env.CRM_PROVIDER as CrmProvider | undefined)?.toLowerCase() as CrmProvider | undefined;
  if (!provider) {
    console.log('CRM disabled. Received lead:', payload);
    return;
  }
  if (provider === 'hubspot') return createHubSpotContactAndDeal(payload);
  if (provider === 'pipedrive') return createPipedriveContactAndDeal(payload);
  console.log('Unknown CRM provider. Received lead:', payload);
}

