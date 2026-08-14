import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/data/allegra'

export function HowItWorks () {
  return (
    <section id='como-funciona' className='bg-cream py-24 sm:py-32'>
      <Container>
        <Reveal>
          <SectionHeading
            kicker='Cómo funciona'
            title='Planificar, consultar y reservar con un asistente'
            description='El asistente entiende el tipo de evento, la fecha y la cantidad de invitados. Después puede consultar disponibilidad y continuar por WhatsApp.'
            align='center'
          />
        </Reveal>

        <ol className='relative mt-16 grid gap-8 lg:grid-cols-4'>
          <span className='pointer-events-none absolute top-7 right-[12%] left-[12%] hidden h-px bg-gold/40 lg:block' aria-hidden='true' />
          {siteConfig.howItWorks.map((step, index) => (
            <Reveal key={step.id} delayMs={index * 90}>
              <li className='relative text-center'>
                <span className='relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-cream font-serif text-xl text-teal'>
                  {index + 1}
                </span>
                <h3 className='mt-6 font-serif text-2xl text-ink'>{step.title}</h3>
                <p className='mt-3 text-sm leading-relaxed text-muted'>{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
