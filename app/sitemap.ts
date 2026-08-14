import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/allegra'

export default function sitemap (): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.seo.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ]
}
