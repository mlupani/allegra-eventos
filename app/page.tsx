import { About } from '@/components/sections/about'
import { EventTypes } from '@/components/sections/event-types'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Services } from '@/components/sections/services'
import { SpaceGallery } from '@/components/sections/space-gallery'
import { Testimonials } from '@/components/sections/testimonials'

export default function Home () {
  return (
    <main id='contenido'>
      <Hero />
      <About />
      <EventTypes />
      <SpaceGallery />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FinalCta />
    </main>
  )
}
