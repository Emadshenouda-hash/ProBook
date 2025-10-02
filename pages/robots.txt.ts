import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

const getBaseUrl = (headers: Record<string, string | string[] | undefined>) => {
  // Always use the canonical domain for robots.txt
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
  const { res, req } = ctx;
  const baseUrl = getBaseUrl(req.headers as Record<string, string | string[] | undefined>);
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin
Disallow: /api/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (be nice to servers)
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}

