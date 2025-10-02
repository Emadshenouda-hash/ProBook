import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string; // e.g. "/services"
  ogType?: 'website' | 'article' | 'profile' | 'product' | string;
  ogImage?: string; // absolute URL preferred
  noindex?: boolean;
  jsonLd?: object | object[];
}

const localeToOgLocale: Record<string, string> = {
  en: 'en_US',
  ar: 'ar_AR'
};

export default function SEO({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  noindex,
  jsonLd
}: SEOProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale = 'en', defaultLocale = 'en', asPath = '/', locales = ['en', 'ar'] } = router as unknown as { locale?: string; defaultLocale?: string; asPath?: string; locales?: string[] };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com';
  const cleanPath = (canonicalPath || asPath.split('?')[0]) || '/';
  const localizedPath = locale && locale !== defaultLocale ? `/${locale}${cleanPath}` : cleanPath;
  const absoluteUrl = `${baseUrl}${localizedPath}`;

  const siteName = t('seo.siteName', { defaultValue: 'ProBook Solutions' });
  const finalTitle = title || t('seo.defaultTitle', { defaultValue: 'ProBook Solutions – Tailored Accounting Solutions' });
  const finalDescription = description || t('seo.defaultDescription', { defaultValue: 'Expert accounting and financial services for startups and SMEs.' });

  const ogLocale = localeToOgLocale[locale] || 'en_US';
  const altLocale = locale === 'en' ? 'ar' : 'en';
  const ogLocaleAlternate = localeToOgLocale[altLocale] || 'ar_AR';

  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  // Default JSON-LD for the homepage if none provided
  const isHome = cleanPath === '/' || cleanPath === '';
  const defaultJsonLd = isHome && !jsonLd ? [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: finalDescription,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@probooksolutions.org',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
        areaServed: 'Global'
      },
      sameAs: [
        'https://www.linkedin.com/company/probook-solutions',
        'https://twitter.com/probooksolutions'
      ],
      foundingDate: '2001',
      numberOfEmployees: '10-50',
      areaServed: 'Global',
      serviceType: ['Accounting', 'Bookkeeping', 'CFO Services', 'Financial Reporting', 'Tax Compliance']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: siteName,
      url: baseUrl,
      description: finalDescription,
      provider: {
        '@type': 'Organization',
        name: siteName,
        url: baseUrl
      },
      areaServed: 'Global',
      serviceType: ['Bookkeeping', 'CFO-as-a-Service', 'Financial Reporting', 'Tax & Compliance', 'Payroll', 'ERP Setup', 'Process Optimization'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Accounting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bookkeeping Services',
              description: 'Comprehensive bookkeeping and record keeping services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'CFO-as-a-Service',
              description: 'Strategic financial leadership and planning services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tax & Compliance',
              description: 'Tax preparation and regulatory compliance services'
            }
          }
        ]
      }
    }
  ] : undefined;

  const jsonLdToRender = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : defaultJsonLd;

  const ogFallback = `${baseUrl}/api/og?title=${encodeURIComponent(finalTitle)}&subtitle=${encodeURIComponent(siteName)}`;

  return (
    <Head>
      <title>{finalTitle}</title>
      {finalDescription && <meta name="description" content={finalDescription} />}
      <meta name="robots" content={robots} />

      {/* Canonical */}
      <link rel="canonical" href={absoluteUrl} />

      {/* Hreflang alternates for all configured locales */}
      {locales?.map((loc) => {
        const locPath = loc === (defaultLocale || 'en') ? cleanPath : `/${loc}${cleanPath}`;
        const href = `${baseUrl}${locPath}`;
        return <link key={`alt-${loc}`} rel="alternate" hrefLang={loc} href={href} />;
      })}
      {/* x-default fallback */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${cleanPath}`} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      {finalDescription && <meta property="og:description" content={finalDescription} />} 
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />
      <meta property="og:image" content={ogImage || ogFallback} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      {finalDescription && <meta name="twitter:description" content={finalDescription} />} 
      <meta name="twitter:image" content={ogImage || ogFallback} />

      {/* JSON-LD */}
      {jsonLdToRender && jsonLdToRender.map((block, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}

      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${baseUrl}/`
              },
              ...(cleanPath !== '/'
                ? [
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: (finalTitle || '').replace(/ – .*/, ''),
                      item: absoluteUrl
                    }
                  ]
                : [])
            ]
          })
        }}
      />
    </Head>
  );
}

