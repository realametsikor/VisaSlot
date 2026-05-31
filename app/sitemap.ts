import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.visaslot.com';

  const countries = ['canada', 'united-kingdom', 'germany', 'australia', 'united-states', 'new-zealand'];
  const blogSlugs = ['how-to-move-abroad', 'tech-workers-guide', 'writing-an-sop'];

  const countryPages = countries.flatMap((slug) => [
    { url: `${baseUrl}/countries/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/countries/${slug}/study`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/countries/${slug}/work`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/countries/${slug}/relocate`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]);

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/start-here`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/countries`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/study-abroad`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/work-abroad`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/resources/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/resources/tools/cost-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/resources/tools/timeline-tracker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    ...countryPages,
    ...blogPages,
  ];
}
