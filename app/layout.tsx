import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Cormorant_Garamond as CormorantGaramond, Great_Vibes as GreatVibes, Outfit } from 'next/font/google'
import { AssistantProvider } from '@/components/assistant/assistant-provider'
import { AssistantWidget } from '@/components/assistant/assistant-widget'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { siteConfig } from '@/data/allegra'
import { getRequestOrigin } from '@/lib/site-url'
import './globals.css'

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans-family',
  display: 'swap'
})

const serif = CormorantGaramond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-family',
  display: 'swap'
})

const script = GreatVibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script-family',
  display: 'swap'
})

export async function generateMetadata (): Promise<Metadata> {
  const origin = getRequestOrigin(await headers())
  const imageUrl = `${origin}/og.jpg`

  return {
    metadataBase: new URL(origin),
    title: {
      default: siteConfig.seo.title,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.seo.description,
    applicationName: siteConfig.name,
    keywords: siteConfig.seo.keywords,
    authors: [{ name: siteConfig.name, url: origin }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'Eventos',
    alternates: {
      canonical: origin
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    openGraph: {
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      url: origin,
      siteName: siteConfig.name,
      locale: 'es_AR',
      type: 'website',
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 825,
          height: 825,
          type: 'image/jpeg',
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: 'summary',
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    }
  }
}

export default async function RootLayout ({ children }: LayoutProps<'/'>) {
  const origin = getRequestOrigin(await headers())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: siteConfig.name,
    description: siteConfig.seo.description,
    url: origin,
    image: [`${origin}/og.jpg`, `${origin}${siteConfig.logo}`],
    telephone: `+${siteConfig.whatsapp.phone}`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tte. Coronel Lafuente 1455',
      addressLocality: 'Gerli',
      postalCode: 'B1869ADU',
      addressRegion: 'Provincia de Buenos Aires',
      addressCountry: 'AR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.lat,
      longitude: siteConfig.location.lng
    },
    hasMap: siteConfig.location.mapsUrl
  }

  return (
    <html
      lang='es'
      className={`${sans.variable} ${serif.variable} ${script.variable} h-full scroll-smooth antialiased`}
    >
      <body className='min-h-full bg-cream font-sans text-ink'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href='#contenido' className='skip-link'>
          Saltar al contenido
        </a>
        <AssistantProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
          <AssistantWidget />
        </AssistantProvider>
      </body>
    </html>
  )
}
