import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Serverless API route that proxies chat messages to an external chatbot
 * service. The external service’s credentials are stored in environment
 * variables. This example uses the Brainshop.ai API: it requires a brain
 * ID (bid) and an API key. The user ID is generated on the fly from
 * the request time. To use a different service, adjust the request
 * construction accordingly.
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

  // Use OpenAI's ChatGPT API. The API key and optional model are read from
  // environment variables. If no model is provided, gpt-3.5-turbo is used.
  const openAiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  if (!openAiKey) {
    return res.status(500).json({ error: 'Chatbot service not configured. Please set OPENAI_API_KEY (and optionally OPENAI_MODEL) in the environment.' });
  }

  try {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const body = {
      model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      // Adjust temperature for randomness; can be customised via environment if needed
      temperature: 0.5
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    // For chat completions, the assistant reply is in choices[0].message.content
    const reply: string = data.choices?.[0]?.message?.content?.trim() || '';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Failed to fetch chat response' });
  }
}