import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/data/allegra'

export function EventTypes () {
  return (
    <section id='eventos' className='bg-ivory py-24 sm:py-32'>
      <Container>
        <Reveal>
          <SectionHeading
            kicker='Tipos de eventos'
            title='Cada celebración encuentra su clima'
            description='Elegí el momento. El espacio se adapta, con una estética cálida y sofisticada.'
          />
        </Reveal>

        <div className='mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {siteConfig.eventTypes.map((event, index) => (
            <Reveal key={event.id} delayMs={index * 70}>
              <article className='group h-full overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_50px_-32px_rgba(4,42,51,0.45)] transition-transform duration-500 hover:-translate-y-1'>
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                </div>
                <div className='px-6 py-6'>
                  <h3 className='font-serif text-2xl text-ink'>{event.title}</h3>
                  <p className='mt-2 text-sm leading-relaxed text-muted'>{event.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
