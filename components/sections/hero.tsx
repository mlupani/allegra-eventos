import Image from 'next/image'
import { Heart } from 'lucide-react'
import heroDesktop from '../../public/images/hero.png'
import heroMobile from '../../public/images/hero_mobile.png'
import { OpenAssistantButton } from '@/components/assistant/open-assistant-button'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/data/allegra'

export function Hero () {
  return (
    <section id='inicio' className='relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-deep'>
      <Image
        src={heroMobile}
        alt={siteConfig.hero.imageAlt}
        fill
        priority
        sizes='100vw'
        className='object-cover object-center md:hidden'
      />
      <Image
        src={heroDesktop}
        alt={siteConfig.hero.imageAlt}
        fill
        priority
        sizes='100vw'
        className='hidden object-cover object-center md:block'
      />
      <div className='absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/40 to-transparent' />
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/50 via-deep/35 to-deep/55 md:hidden' />
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep/70 to-transparent md:h-36 md:from-deep/55' />

      <Container className='relative z-10 flex min-h-[100dvh] w-full flex-col items-center text-center max-md:absolute max-md:inset-0 max-md:pt-[5.25rem] md:min-h-0 md:pb-20 md:pt-32'>
        <div className='flex w-full flex-1 flex-col items-center justify-center text-ivory max-md:-translate-y-[6%] md:contents'>
          <div className='md:hidden'>
            <p className='font-script text-[4.35rem] leading-none drop-shadow-[0_8px_24px_rgba(4,42,51,0.55)]'>
              {siteConfig.wordmark}
            </p>
            <p className='mt-1 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-ivory/85'>
              {siteConfig.tagline}
            </p>
          </div>

          <h1 className='mt-8 max-w-[18rem] font-serif text-[2.15rem] font-medium leading-[1.12] tracking-tight text-ivory drop-shadow-[0_6px_18px_rgba(4,42,51,0.5)] md:sr-only'>
            {siteConfig.hero.headlineLead}{' '}
            <span className='mt-1 block font-script text-[2.85rem] font-normal leading-none text-aqua'>
              {siteConfig.hero.headlineAccent}
            </span>
          </h1>

          <div className='mt-6 flex items-center gap-3 text-aqua md:hidden' aria-hidden='true'>
            <span className='h-px w-10 bg-aqua/80' />
            <Heart className='h-3.5 w-3.5' strokeWidth={1.6} />
            <span className='h-px w-10 bg-aqua/80' />
          </div>

          <p className='mt-5 space-y-1 text-[0.58rem] font-medium uppercase leading-relaxed tracking-[0.22em] text-ivory/90 md:hidden'>
            {siteConfig.hero.occasions.map((line) => (
              <span key={line} className='block'>
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className='flex w-full flex-col items-center gap-3 max-md:mb-[16%] sm:max-w-lg sm:flex-row sm:justify-center'>
          <OpenAssistantButton
            intent='availability'
            size='lg'
            className='w-[min(100%,20rem)] max-md:text-[0.65rem] max-md:tracking-[0.12em] sm:w-auto'
            ariaLabel='Consultar disponibilidad'
          >
            Consultar disponibilidad
          </OpenAssistantButton>
          <Button
            href='#sobre-allegra'
            variant='secondary'
            size='lg'
            className='w-[min(100%,20rem)] max-md:text-[0.65rem] max-md:tracking-[0.12em] sm:w-auto'
          >
            Conocer el espacio
          </Button>
        </div>
      </Container>
    </section>
  )
}
