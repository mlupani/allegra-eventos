import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/data/allegra'

export function About () {
  return (
    <section id='sobre-allegra' className='bg-cream py-24 sm:py-32'>
      <Container className='grid items-center gap-12 lg:grid-cols-12 lg:gap-16'>
        <Reveal className='relative lg:col-span-6'>
          <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(4,42,51,0.55)] sm:aspect-[5/6]'>
            <Image
              src={siteConfig.about.image}
              alt={siteConfig.about.imageAlt}
              fill
              sizes='(max-width: 1024px) 100vw, 48vw'
              className='object-cover'
            />
          </div>
          <div className='absolute -bottom-6 -right-3 hidden max-w-[220px] rounded-3xl bg-deep px-6 py-5 text-ivory shadow-xl sm:block lg:-right-8'>
            <p className='font-script text-3xl leading-none'>allegra</p>
            <p className='mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/60'>
              espacio para celebrar
            </p>
          </div>
        </Reveal>

        <Reveal className='lg:col-span-6' delayMs={120}>
          <SectionHeading
            kicker={siteConfig.about.kicker}
            title={siteConfig.about.title}
          />
          <div className='mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg'>
            {siteConfig.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
