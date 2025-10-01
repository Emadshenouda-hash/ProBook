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

    // Enhanced greeting and context awareness
    if (/\b(hi|hello|hey|good\s+(morning|afternoon|evening))\b/.test(text)) {
      return "Hello! I'm here to help with your accounting and financial needs. I can assist with bookkeeping, CFO services, tax compliance, software setup, and more. What's your biggest financial challenge right now?";
    }

    // Courtesies and farewells
    if (/(thank\s*you|thanks|thx|appreciate)/.test(text)) {
      return "You're very welcome! I'm here to help make your accounting easier. Feel free to ask about our services or book a free consultation to discuss your specific needs.";
    }
    if (/(bye|goodbye|see\s*you|later|talk\s*to\s*you\s*later|catch\s*you\s*later)/.test(text)) {
      return "Take care! Remember, you can always book a consultation when you're ready to discuss your accounting needs. Have a great day!";
    }
    if (/(not\s*now|i'?m\s*good|all\s*set|no\s*thanks|no,?\s*thank\s*you)/.test(text)) {
      return "No problem at all! I'm here whenever you need help with your accounting or have questions about our services.";
    }

    // Small talk with more context
    if (/(how\s*are\s*you|how'?s\s*it\s*going)/.test(text)) {
      return "I'm doing great and ready to help solve your accounting challenges! What's keeping you up at night when it comes to your business finances?";
    }

    // Enhanced service-specific responses
    if (/(bookkeep|reconcil|close|month\s*end|transactions|entries)/.test(text)) {
      return "Our bookkeeping service handles everything: transaction coding, bank reconciliations, month-end close, and management reports. We typically process 200-500 transactions monthly and deliver reports within 5-7 business days. What's your current monthly transaction volume?";
    }

    if (/(cfo|forecast|model|budget|cash\s*flow|financial\s*planning|kpi|dashboard)/.test(text)) {
      return "Our Fractional CFO service provides strategic financial leadership including financial modeling, budgeting, cash flow planning, KPI dashboards, and board reporting. We've helped clients raise funding and improve their financial processes. What's your biggest financial goal for the next 6 months?";
    }

    if (/(tax|vat|sales\s*tax|compliance|filing|irs|quarterly)/.test(text)) {
      return "We handle all tax and compliance needs including returns, quarterly filings, and multi-jurisdiction support. We stay current with tax law changes and can help with entity structuring. Which states/countries do you operate in and what's your filing deadline pressure?";
    }

    if (/(payroll|salary|hr|people|employees|contractors|w2|1099)/.test(text)) {
      return "We can set up and manage your entire payroll process including employee onboarding, contractor payments, tax filings, and compliance. We support multi-state operations and can integrate with your existing HR systems. How many team members do you have?";
    }

    if (/(price|pricing|cost|rate|how\s*much|budget)/.test(text)) {
      return "Our pricing is transparent and based on your specific needs:\n• Starter: $1,000/month (up to 200 transactions)\n• Growth: $2,500+/month (up to 500 transactions + advanced features)\n• Fractional CFO: Custom pricing\n\nWe offer a free consultation to determine the right plan for you. What's your monthly transaction volume?";
    }

    if (/(quickbooks|xero|zoho|odoo|netsuite|erp|migration|clean\s*up|cleanup|software)/.test(text)) {
      return "We're experts in QuickBooks (Desktop & Online), Xero, Zoho Books, and NetSuite. We can migrate your data, clean up messy books, set up integrations, and train your team. What system are you currently using and what's your biggest pain point?";
    }

    if (/(consult|call|meeting|schedule|book|appointment)/.test(text)) {
      return "I'd love to schedule a free 20-minute consultation! We'll discuss your specific needs and create a customized plan. You can book directly here or tell me your preferred time and I'll help coordinate: " + consultUrl;
    }

    if (/(time|how\s*long|turnaround|when|timeline)/.test(text)) {
      return "Our typical timelines:\n• Book cleanup: 1-3 weeks\n• Monthly close: 5-7 business days\n• New setup: 1-2 weeks\n• Emergency support: Same day\n\nTimelines depend on data complexity and volume. What's your most urgent need?";
    }

    if (/(startup|small\s*business|growing|scale|growth)/.test(text)) {
      return "We specialize in helping startups and growing businesses! We understand the unique challenges of scaling - from basic bookkeeping to complex financial modeling. Many of our clients have grown from 5 to 500+ employees with our support. What stage is your business at?";
    }

    if (/(ecommerce|amazon|shopify|online|sales|inventory)/.test(text)) {
      return "E-commerce accounting is our specialty! We handle multi-channel sales (Amazon, Shopify, etc.), inventory management, sales tax compliance, and complex revenue recognition. We can integrate all your sales channels into one clean financial picture. Which platforms do you sell on?";
    }

    if (/(saas|subscription|recurring|mrr|arr)/.test(text)) {
      return "SaaS accounting requires special expertise in subscription billing, revenue recognition (ASC 606), and metrics tracking. We help SaaS companies with MRR/ARR reporting, churn analysis, and investor-ready financials. What's your current MRR and biggest financial challenge?";
    }

    if (/(fundraising|investor|series\s*a|series\s*b|due\s*diligence)/.test(text)) {
      return "We've helped many companies prepare for fundraising! Our Fractional CFO service includes investor deck preparation, due diligence support, financial modeling, and post-funding financial management. We understand what investors look for. What round are you preparing for?";
    }

    if (/(problem|issue|challenge|struggle|difficult|stuck)/.test(text)) {
      return "I understand you're facing some challenges. Many of our clients come to us with similar issues. The good news is we've helped solve these problems before. Can you tell me more about what's not working with your current accounting setup?";
    }

    if (/(urgent|asap|emergency|quick|fast)/.test(text)) {
      return "I understand this is urgent! We can often provide same-day support for critical issues. For immediate assistance, please email contact@probooksolutions.com with 'URGENT' in the subject line, or book a consultation and mention it's urgent. What's the specific issue you need help with?";
    }

    // Enhanced fallback with better qualification
    return "I'd love to help you find the right solution! To give you the best recommendation, could you tell me:\n\n1. What's your biggest accounting or financial challenge?\n2. How many transactions do you process monthly?\n3. What accounting software are you using?\n4. What's your timeline for getting this resolved?\n\nOr feel free to book a free consultation and we can discuss everything in detail!";
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