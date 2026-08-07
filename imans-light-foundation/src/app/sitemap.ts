import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.imanslightfoundation.org';

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/saving-lives', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/data-metrics', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/events', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/donate', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/get-involved', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
