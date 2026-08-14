import Image from 'next/image'
import heroImage from '../../public/images/hero.png'
import { OpenAssistantButton } from '@/components/assistant/open-assistant-button'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/data/allegra'

export function Hero () {
  return (
    <section id='inicio' className='relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-deep'>
      <Image
        src={heroImage}
        alt={siteConfig.hero.imageAlt}
        fill
        priority
        sizes='100vw'
        className='object-cover object-center'
      />
      <div className='absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-deep/50 to-transparent' />
      <div className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-deep/55 to-transparent' />

      <Container className='relative z-10 flex w-full flex-col items-center pb-16 pt-32 text-center sm:pb-20'>
        <h1 className='sr-only'>{siteConfig.headline}</h1>
        <div className='flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center'>
          <OpenAssistantButton intent='availability' size='lg' ariaLabel='Consultar disponibilidad'>
            Consultar disponibilidad
          </OpenAssistantButton>
          <Button href='#sobre-allegra' variant='secondary' size='lg'>
            Conocer el espacio
          </Button>
        </div>
      </Container>
    </section>
  )
}
