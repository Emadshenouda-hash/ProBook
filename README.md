# ProBook Solutions - Professional Accounting Services Website

A modern, secure, and accessible website for ProBook Solutions, offering expert accounting and financial services for startups and SMEs.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Styled Components with theming (light/dark mode)
- **Internationalization:** i18next (English/Arabic with RTL support)
- **Animations:** Framer Motion
- **Analytics:** Google Analytics 4 + Vercel Analytics
- **Email:** Resend
- **Database:** Supabase
- **File Storage:** Vercel Blob
- **AI Chat:** OpenAI/DeepSeek integration
- **CRM:** HubSpot/Pipedrive integration

## 📋 Features

- ✅ Fully responsive design (mobile-first)
- ✅ Dark/light mode with system preference detection
- ✅ Full internationalization (English/Arabic) with RTL support
- ✅ SEO optimized (meta tags, structured data, sitemap, robots.txt)
- ✅ Accessibility (WCAG 2.1 AA compliant)
- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Form validation with spam protection (honeypot)
- ✅ AI-powered chat widget
- ✅ Calendly integration for scheduling
- ✅ CRM integration (HubSpot/Pipedrive)
- ✅ UTM tracking for marketing attribution
- ✅ Email notifications (contact/consultation forms)
- ✅ Dynamic OG image generation
- ✅ Case studies and testimonials

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- A Vercel account (for deployment)
- Required third-party accounts:
  - Resend (email delivery)
  - Supabase (database)
  - Google Analytics (optional)
  - HubSpot or Pipedrive (optional CRM)
  - OpenAI or DeepSeek (optional AI chat)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/probook-solutions.git
   cd probook-solutions
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and fill in your API keys and configuration.

4. **Set up Supabase database (optional but recommended):**
   
   Create the following tables in your Supabase project:

   **contact_submissions:**
   ```sql
   create table contact_submissions (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default now(),
     name text not null,
     email text not null,
     message text not null,
     utm_source text,
     utm_medium text,
     utm_campaign text,
     utm_term text,
     utm_content text
   );
   ```

   **consultation_requests:**
   ```sql
   create table consultation_requests (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default now(),
     full_name text not null,
     email text not null,
     phone text,
     company text not null,
     company_size text,
     industry text,
     country text,
     services text[],
     systems text[],
     budget text,
     urgency text,
     goals text,
     notes text,
     attachment_url text,
     utm_source text,
     utm_medium text,
     utm_campaign text,
     utm_term text,
     utm_content text
   );
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📁 Project Structure

```
/workspace
├── components/          # React components
│   ├── Analytics.tsx    # GA integration
│   ├── Animate.tsx      # Framer Motion animations
│   ├── Breadcrumbs.tsx  # Navigation breadcrumbs
│   ├── Button.tsx       # Reusable button component
│   ├── ChatWidget.tsx   # AI chat interface
│   ├── Footer.tsx       # Site footer
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Logo.tsx         # Company logo
│   ├── Navbar.tsx       # Navigation bar
│   ├── SEO.tsx          # SEO meta tags component
│   └── TrustBadges.tsx  # Certification badges
├── context/             # React context providers
│   └── ThemeToggleContext.tsx
├── locales/             # i18n translations
│   ├── en.json          # English translations
│   └── ar.json          # Arabic translations
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   │   ├── chat.ts      # AI chat endpoint
│   │   ├── contact.ts   # Contact form handler
│   │   ├── consultation.ts  # Consultation form handler
│   │   └── og.tsx       # Dynamic OG image generation
│   ├── case-studies/    # Case study pages
│   ├── industries/      # Industry-specific pages
│   ├── about.tsx        # About page
│   ├── consultation.tsx # Consultation booking page
│   ├── contact.tsx      # Contact page
│   ├── index.tsx        # Homepage
│   ├── pricing.tsx      # Pricing page
│   ├── privacy.tsx      # Privacy policy
│   ├── services.tsx     # Services page
│   └── _app.tsx         # App wrapper
├── public/              # Static assets
│   ├── case-studies.json
│   ├── favicon.svg
│   ├── hero.jpg
│   └── logos/           # Partner logos
├── utils/               # Utility functions
│   ├── analytics.ts     # Analytics helpers
│   ├── crm.ts          # CRM integration
│   ├── email.ts        # Email sending
│   ├── styled.ts       # Styled-components wrapper
│   └── supabase.ts     # Supabase client
├── theme.ts            # Theme configuration
├── i18n.ts             # i18n configuration
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🔒 Security

- Content Security Policy (CSP) configured in `next.config.js`
- All forms include honeypot spam protection
- Security headers (HSTS, X-Frame-Options, etc.)
- API routes should implement rate limiting in production
- Environment variables never exposed to client

**Recommended additions for production:**
- Add rate limiting middleware (e.g., upstash/ratelimit)
- Add CAPTCHA to forms (hCaptcha/Cloudflare Turnstile)
- Enable Supabase Row Level Security (RLS)
- Set up DMARC/SPF/DKIM for email domain

## 🌍 Internationalization

The site supports English and Arabic with full RTL (right-to-left) layout support.

**To add a new language:**
1. Create a new JSON file in `/locales/` (e.g., `fr.json`)
2. Add the locale to `next.config.js` in the `i18n.locales` array
3. Update `_document.tsx` to handle the new locale's direction

## 🎨 Theming

The site supports light and dark themes. Theme preference is stored in localStorage and respects system preferences.

**To customize colors:**
Edit `/theme.ts` and modify the `lightTheme` and `darkTheme` objects.

## 📧 Email Configuration

The site uses Resend for email delivery. You need to:
1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain
3. Set up SPF, DKIM, and DMARC records
4. Add your API key to `.env.local`

## 🤖 AI Chat Configuration

The chat widget supports two providers:

**OpenAI:**
- Models: gpt-4o-mini, gpt-4o, gpt-5-nano (when available)
- Set `CHAT_PROVIDER=openai` and add `OPENAI_API_KEY`

**DeepSeek:**
- Cost-effective alternative
- Set `CHAT_PROVIDER=deepseek` and add `DEEPSEEK_API_KEY`

**Demo Mode:**
- Set `CHAT_DEMO_MODE=true` to use pre-programmed responses (no API cost)

## 📊 Analytics

**Google Analytics 4:**
- Add `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to track pageviews and events

**Vercel Analytics:**
- Automatically enabled when deployed to Vercel
- No configuration needed

**Custom Events Tracked:**
- CTA clicks
- Form submissions
- Chat interactions

## 🧪 Testing

**Currently missing - needs implementation:**
- Unit tests (Jest + React Testing Library)
- Integration tests
- E2E tests (Playwright)

**Recommended setup:**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

## 🚀 Performance

**Current optimizations:**
- Next.js Image optimization
- Code splitting with dynamic imports
- Font optimization with `next/font`
- Analytics loaded after interactive

**Recommended additions:**
- Set up Lighthouse CI
- Add bundle size monitoring
- Implement image compression pipeline
- Add service worker for offline support

## 🐛 Debugging

**Common issues:**

1. **Build fails:** Check that all environment variables are set
2. **Styles not loading:** Clear `.next` folder and rebuild
3. **Forms not submitting:** Check Resend API key and email configuration
4. **Chat not working:** Verify OPENAI_API_KEY or set CHAT_DEMO_MODE=true

## 📝 License

Proprietary - All rights reserved by ProBook Solutions

## 🤝 Contributing

This is a private project. For internal development:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For technical issues, contact: [your-dev-email@probooksolutions.com]

## 🗺️ Roadmap

**Q1 2026:**
- [ ] Implement client portal with authentication
- [ ] Add automated testing suite
- [ ] Create blog/content management system
- [ ] Build interactive calculators (ROI, runway)

**Q2 2026:**
- [ ] Add A/B testing framework
- [ ] Implement referral program
- [ ] Create webinar platform integration
- [ ] Build custom analytics dashboard

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [i18next](https://www.i18next.com/)
- [Resend Email](https://resend.com/docs)
- [Supabase](https://supabase.com/docs)

---

**Last Updated:** September 30, 2025  
**Version:** 1.0.0
