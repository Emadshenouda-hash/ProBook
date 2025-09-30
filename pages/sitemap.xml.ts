import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import studies from '../public/case-studies.json';

const getBaseUrl = (headers: Record<string, string | string[] | undefined>) => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const proto = (headers['x-forwarded-proto'] as string) || 'https';
  const host = (headers['x-forwarded-host'] as string) || (headers['host'] as string) || 'localhost:3000';
  return `${proto}://${host}`;
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, req, locales, defaultLocale } = ctx;
  const baseUrl = getBaseUrl(req.headers as Record<string, string | string[] | undefined>);
  const allLocales: string[] = locales || ['en'];
  const defLocale: string = defaultLocale || 'en';

  // Include core marketing pages and conversion endpoints. Exclude 404. Thank-you is fine to include if linked.
  const baseRoutes = ['/', '/about', '/services', '/resources', '/contact', '/portal', '/consultation', '/thank-you', '/privacy', '/industries', '/pricing'];
  const list: Array<{ slug: string }> = (studies as any).list || [];
  const csRoutes = list.map((s) => `/case-studies/${s.slug}`);
  const routes = [...baseRoutes, '/case-studies', ...csRoutes];
  const lastmod = new Date().toISOString();

  const urlSet = routes
    .map((path) => {
      const localized: Array<{ loc: string; locUrl: string }> = allLocales.map((loc: string) => {
        const locPath = loc === defLocale ? path : `/${loc}${path}`;
        const locUrl = `${baseUrl}${locPath}`;
        return { loc, locUrl };
      });
      const defaultEntry = localized.find((entry) => entry.loc === defLocale)!;
      const alternates = localized
        .map((entry) => `<xhtml:link rel=\"alternate\" hreflang=\"${entry.loc}\" href=\"${entry.locUrl}\" />`)
        .join('');
      const xDefault = `<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"${defaultEntry.locUrl}\" />`;
      return `
        <url>
          <loc>${defaultEntry.locUrl}</loc>
          <lastmod>${lastmod}</lastmod>
          ${alternates}
          ${xDefault}
        </url>`;
    })
    .join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
  <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">
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

