// Environment variable type definitions
// Extend the NodeJS.ProcessEnv interface with our custom variables.
// Keeping environment variables typed helps avoid typos and runtime errors.

declare namespace NodeJS {
  interface ProcessEnv {
    /** The public site URL used for SEO canonical tags and absolute links */
    NEXT_PUBLIC_SITE_URL: string;
    /** Brainshop.ai brain ID used by the chat API route */
    BRAINSHOP_BID?: string;
    /** Brainshop.ai API key used by the chat API route */
    BRAINSHOP_KEY?: string;
    /**
     * OpenAI API key used by the chat API route when integrating with
     * OpenAI's ChatGPT models. This should be kept secret and never
     * exposed to the client. Define this in your `.env.local` file when
     * using the OpenAI backend.
     */
    OPENAI_API_KEY?: string;
    /**
     * Optional model name for OpenAI chat completions. If not provided,
     * the chat route defaults to 'gpt-3.5-turbo'. Examples include
     * 'gpt-4' or other models your API key has access to.
     */
    OPENAI_MODEL?: string;
  }
}