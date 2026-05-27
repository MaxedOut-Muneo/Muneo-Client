import { type MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/seo';

const PUBLIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/login', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/signup', priority: 0.5, changeFrequency: 'yearly' as const },
];

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  return PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
};

export default sitemap;
