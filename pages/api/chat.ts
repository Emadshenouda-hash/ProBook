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

  const apiKey = process.env.OPENAI_API_KEY;
  const demoMode = process.env.CHAT_DEMO_MODE === '1';
  const model = process.env.OPENAI_MODEL || 'gpt-5-nano';
  const forceResponses = process.env.OPENAI_USE_RESPONSES_API === '1';
  const useResponsesApi = forceResponses || model.toLowerCase().startsWith('gpt-5');

  if (demoMode || !apiKey) {
    // Offline/demo fallback: echo a simple canned reply without calling external APIs
    const canned = `Demo mode. You said: "${message}"`;
    return res.status(200).json({ reply: canned });
  }

  try {
    if (useResponsesApi) {
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