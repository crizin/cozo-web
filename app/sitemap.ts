import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'about', 'board', 'keyword', 'link'].map((page) => {
    return {
      url: `https://cozo.me/${page}`,
      lastModified: new Date()
    };
  });
}
