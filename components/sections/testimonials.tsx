import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/data/allegra'

export function Testimonials () {
  return (
    <section id='testimonios' className='bg-ivory py-24 sm:py-32'>
      <Container>
        <Reveal>
          <SectionHeading
            kicker='Voces'
            title='Lo que se puede contar, cuando el evento termina'
            description='Testimonios de ejemplo, claramente marcados para reemplazar por reseñas reales.'
          />
        </Reveal>

        <div className='mt-14 grid gap-5 lg:grid-cols-3'>
          {siteConfig.testimonials.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 80}>
              <figure className='flex h-full flex-col rounded-[1.6rem] border border-teal/8 bg-white p-7'>
                <span className='self-start rounded-full bg-mist px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-teal'>
                  Ejemplo
                </span>
                <blockquote className='mt-5 flex-1 font-serif text-2xl leading-snug text-ink'>
                  “{item.quote}”
                </blockquote>
                <figcaption className='mt-8 text-sm text-muted'>
                  <span className='block font-medium text-ink'>{item.attribution}</span>
                  <span>{item.occasion}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
