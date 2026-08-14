import Image from 'next/image'
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
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep/70 to-transparent md:h-36 md:from-deep/55' />

      <Container className='relative z-10 flex w-full flex-col items-center text-center max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-20 md:pt-32'>
        <h1 className='sr-only'>{siteConfig.headline}</h1>
        <div className='flex w-full flex-col items-center gap-3 sm:max-w-lg sm:flex-row sm:justify-center'>
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
