import { OpenAssistantButton } from '@/components/assistant/open-assistant-button'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function FinalCta () {
  return (
    <section className='relative overflow-hidden bg-deep py-24 sm:py-32'>
      <div className='cta-glow pointer-events-none absolute inset-0' aria-hidden='true' />
      <Container className='relative'>
        <Reveal className='mx-auto max-w-2xl text-center'>
          <p className='text-[0.68rem] font-medium uppercase tracking-[0.28em] text-aqua'>
            Tu fecha
          </p>
          <h2 className='mt-4 font-serif text-4xl text-ivory sm:text-5xl'>
            ¿Ya tenés una fecha en mente?
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-ivory/70'>
            Consultá disponibilidad y empezá a planificar tu evento.
          </p>
          <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <OpenAssistantButton intent='availability' size='lg' ariaLabel='Consultar disponibilidad'>
              Consultar disponibilidad
            </OpenAssistantButton>
            <Button href={getWhatsAppUrl()} variant='secondary' size='lg' external>
              Continuar por WhatsApp
            </Button>
          </div>
          <p className='mt-6 text-sm text-ivory/45'>
            ¿Preferís continuar por WhatsApp? El asistente puede retomar la conversación con los datos del evento.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
