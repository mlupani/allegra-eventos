import { ClipboardList, Heart, Music, Palette, Sparkles, UtensilsCrossed } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/data/allegra'
import type { ServiceItem } from '@/data/allegra'

const icons = {
  sparkles: Sparkles,
  palette: Palette,
  utensils: UtensilsCrossed,
  music: Music,
  clipboard: ClipboardList,
  heart: Heart
}

function ServiceCard ({ service, index }: { service: ServiceItem, index: number }) {
  const Icon = icons[service.icon]

  return (
    <Reveal delayMs={index * 60}>
      <article className='h-full rounded-[1.5rem] border border-teal/8 bg-white px-6 py-7 shadow-[0_16px_40px_-32px_rgba(4,42,51,0.5)] transition-transform duration-300 hover:-translate-y-1'>
        <span className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-mist text-teal'>
          <Icon className='h-5 w-5' aria-hidden='true' />
        </span>
        <h3 className='mt-5 font-serif text-2xl text-ink'>{service.title}</h3>
        <p className='mt-2 text-sm leading-relaxed text-muted'>{service.description}</p>
      </article>
    </Reveal>
  )
}

export function Services () {
  return (
    <section id='servicios' className='bg-ivory py-24 sm:py-32'>
      <Container>
        <Reveal>
          <SectionHeading
            kicker='Experiencia'
            title='Servicios posibles, a medida del evento'
            description='Contenido demo y editable. No afirma precios ni servicios confirmados: es una base para mostrar cómo se puede presentar la oferta.'
          />
        </Reveal>
        <div className='mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {siteConfig.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
