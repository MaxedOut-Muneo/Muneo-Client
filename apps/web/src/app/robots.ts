import { type MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/seo';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/home', '/history', '/profile', '/analysis', '/estimate', '/auth/', '/api/'],
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
