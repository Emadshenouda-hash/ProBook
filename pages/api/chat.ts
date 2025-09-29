import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Chat API route. Uses OpenAI Responses API when model starts with gpt-5 or when
 * OPENAI_USE_RESPONSES_API=1 is set. Falls back to Chat Completions otherwise.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body as { message?: string };
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Invalid message' });
  }

  function generateDemoReply(userText: string): string {
    const text = userText.toLowerCase().trim();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const consultUrl = baseUrl ? `${baseUrl}/consultation` : '/consultation';

    if (/\b(hi|hello|hey|good\s+(morning|afternoon|evening))\b/.test(text)) {
      return "Hi! I'm the ProBook Solutions assistant. How can I help with your accounting or finance needs today?";
    }

    if (/(bookkeep|reconcil|close|month\s*end)/.test(text)) {
      return "We offer full-cycle bookkeeping: transaction coding, reconciliations, month‑end close, and management reports. Would you like us to review your current setup or propose a monthly plan?";
    }

    if (/(cfo|forecast|model|budget|cash\s*flow)/.test(text)) {
      return "Our Fractional CFO service covers financial modeling, budgets/forecasts, KPI dashboards, cash‑flow planning, board reporting, and fundraising support. Tell me your top 1–2 goals and timeline.";
    }

    if (/(tax|vat|sales\s*tax|compliance)/.test(text)) {
      return "We handle tax and compliance: returns, filings, and entity support. Which jurisdictions do you operate in and what deadlines are coming up?";
    }

    if (/(payroll|salary|hr|people)/.test(text)) {
      return "We can set up and run payroll, onboard employees/contractors, and manage filings. How many team members and which countries/states?";
    }

    if (/(price|pricing|cost|rate)/.test(text)) {
      return `Our pricing is tailored to scope and tools. We start with a free consultation to size the work and offer a fixed monthly plan. You can book here: ${consultUrl}`;
    }

    if (/(quickbooks|xero|zoho|odoo|netsuite|erp|migration|clean\s*up|cleanup)/.test(text)) {
      return "We support QuickBooks, Xero, Zoho Books, Odoo, and NetSuite. We can also migrate or clean up your books. Which system do you use today and what’s your biggest pain point?";
    }

    if (/(consult|call|meeting|schedule|book)/.test(text)) {
      return `Happy to schedule a consultation. Please share your name, company, and email, or book directly here: ${consultUrl}`;
    }

    if (/(time|how\s*long|turnaround)/.test(text)) {
      return "Most cleanups complete in 1–3 weeks; ongoing monthly close is typically within 5–7 business days after month‑end. Timelines depend on volume and systems.";
    }

    // Fallback prompt to qualify the lead
    return "Got it. To recommend the right plan, could you share: company size, your accounting system, countries you operate in, and your top 2–3 finance goals for the next 3–6 months?";
  }

  const provider = (process.env.CHAT_PROVIDER || 'openai').toLowerCase();
  const apiKey = provider === 'deepseek' ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY;
  const demoEnv = ((process.env.CHAT_DEMO_MODE || '') + '').toLowerCase();
  const demoMode = demoEnv === '1' || demoEnv === 'true' || demoEnv === 'on' || demoEnv === 'yes';
  const model = provider === 'deepseek'
    ? (process.env.DEEPSEEK_MODEL || 'deepseek-chat')
    : (process.env.OPENAI_MODEL || 'gpt-5-nano');
  const forceResponses = process.env.OPENAI_USE_RESPONSES_API === '1';
  const useResponsesApi = forceResponses || model.toLowerCase().startsWith('gpt-5');

  if (demoMode || !apiKey) {
    const canned = generateDemoReply(message);
    return res.status(200).json({ reply: canned });
  }

  try {
    if (provider === 'deepseek') {
      const base = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
      const response = await fetch(`${base}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: message }]
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek Chat error: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      const reply: string = data?.choices?.[0]?.message?.content?.toString()?.trim() || '';
      return res.status(200).json({ reply });
    } else if (useResponsesApi) {
      // OpenAI Responses API
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          input: message
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI Responses API error: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      // Prefer Responses API shape: output[0].content[0].text
      const reply: string =
        data?.output?.[0]?.content?.[0]?.text?.toString()?.trim() ||
        data?.output_text?.toString()?.trim() || // some SDKs materialize combined text
        data?.choices?.[0]?.message?.content?.toString()?.trim() || // fallback if backend proxied to chat/completions
        '';
      return res.status(200).json({ reply });
    } else {
      // Legacy Chat Completions API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: message }],
          temperature: 0.5
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI Chat Completions error: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      const reply: string = data?.choices?.[0]?.message?.content?.toString()?.trim() || '';
      return res.status(200).json({ reply });
    }
  } catch (err: any) {
    console.error('Chat API error:', err);
    // Hide upstream error details from the end user
    return res.status(200).json({ reply: 'Sorry, the chat service is unavailable right now.' });
  }
}