import type { Metadata } from 'next'
import { Cormorant_Garamond as CormorantGaramond, Great_Vibes as GreatVibes, Outfit } from 'next/font/google'
import { AssistantProvider } from '@/components/assistant/assistant-provider'
import { AssistantWidget } from '@/components/assistant/assistant-widget'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { WhatsAppFloat } from '@/components/layout/whatsapp-float'
import { siteConfig } from '@/data/allegra'
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

const ogImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: siteConfig.seo.imageAlt
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.seo.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'Eventos',
  alternates: {
    canonical: siteConfig.seo.url
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.name,
    locale: 'es_AR',
    type: 'website',
    images: [ogImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [ogImage]
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: siteConfig.name,
  description: siteConfig.seo.description,
  url: siteConfig.seo.url,
  image: `${siteConfig.seo.url}${siteConfig.seo.image}`,
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

export default function RootLayout ({ children }: LayoutProps<'/'>) {
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
