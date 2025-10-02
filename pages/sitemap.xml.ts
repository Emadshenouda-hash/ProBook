import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import studies from '../public/case-studies.json';

const getBaseUrl = (headers: Record<string, string | string[] | undefined>) => {
  // Always use the canonical domain for sitemap
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace('www.', '');
  }
  
  // Fallback: use host header but remove www.
  const proto = (headers['x-forwarded-proto'] as string) || 'https';
  const host = (headers['x-forwarded-host'] as string) || (headers['host'] as string) || 'localhost:3000';
  const cleanHost = host.replace('www.', '').replace('.com', '.org');
  
  return `${proto}://${cleanHost}`;
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, req, locales, defaultLocale } = ctx;
  const baseUrl = getBaseUrl(req.headers as Record<string, string | string[] | undefined>);
  const allLocales: string[] = locales || ['en'];
  const defLocale: string = defaultLocale || 'en';

  // Include all public pages with priority and changefreq
  const baseRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.9', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
    { path: '/consultation', priority: '1.0', changefreq: 'daily' },
    { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
    { path: '/integrations', priority: '0.7', changefreq: 'monthly' },
    { path: '/industries', priority: '0.7', changefreq: 'monthly' },
    { path: '/resources', priority: '0.7', changefreq: 'weekly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/portal', priority: '0.6', changefreq: 'monthly' },
    { path: '/security', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  ];
  
  const list: Array<{ slug: string }> = (studies as any).list || [];
  const csRoutes = list.map((s) => ({ 
    path: `/case-studies/${s.slug}`, 
    priority: '0.8', 
    changefreq: 'monthly' 
  }));
  
  const allRoutes = [...baseRoutes, ...csRoutes];
  const lastmod = new Date().toISOString();

  // Generate URLs for all locales (cleaner format without xhtml:link)
  const urlSet = allRoutes
    .flatMap((route) => {
      const { path, priority, changefreq } = route;
      
      // Create URL entry for each locale
      return allLocales.map((loc: string) => {
        const locPath = loc === defLocale ? path : `/${loc}${path}`;
        const locUrl = `${baseUrl}${locPath}`;
        
        return `
    <url>
      <loc>${locUrl}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
      });
    })
    .join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">
  ${urlSet}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}

