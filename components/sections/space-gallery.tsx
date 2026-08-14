import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/data/allegra'

const spanClass: Record<string, string> = {
  hero: 'sm:col-span-2 sm:row-span-2',
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  square: ''
}

export function SpaceGallery () {
  return (
    <section id='galeria' className='bg-cream py-24 sm:py-32'>
      <Container>
        <Reveal>
          <SectionHeading
            kicker='El espacio'
            title='Una atmósfera para recordar'
            description='Fotos reales del salón, la pista y las ambientaciones de Allegra Espacios.'
          />
        </Reveal>

        <Reveal className='mt-14'>
          <div className='grid auto-rows-[180px] grid-cols-1 gap-3 sm:auto-rows-[220px] sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4'>
            {siteConfig.gallery.map((image) => (
              <figure
                key={image.id}
                className={cn(
                  'relative overflow-hidden rounded-[1.4rem]',
                  spanClass[image.span]
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  className='object-cover transition-transform duration-700 hover:scale-105'
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
