import { MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Container } from '@/components/ui/container'
import { FacebookIcon, InstagramIcon } from '@/components/ui/social-icons'
import { siteConfig, socialLinks } from '@/data/allegra'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon
}

export function Footer () {
  return (
    <footer className='bg-deep text-ivory'>
      <Container className='grid gap-12 py-16 md:grid-cols-4 md:gap-8'>
        <div className='md:col-span-2'>
          <Logo />
          <p className='mt-6 max-w-sm text-sm leading-relaxed text-ivory/65'>
            {siteConfig.subheadline}
          </p>
        </div>

        <div>
          <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-aqua'>
            Navegación
          </p>
          <ul className='mt-5 space-y-3'>
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className='text-sm text-ivory/75 transition-colors hover:text-ivory'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-aqua'>
            Contacto
          </p>
          <ul className='mt-5 space-y-3 text-sm text-ivory/75'>
            <li>
              <a href={getWhatsAppUrl()} className='inline-flex items-center gap-2 transition-colors hover:text-ivory' target='_blank' rel='noopener noreferrer'>
                WhatsApp
              </a>
            </li>
            {socialLinks.filter((item) => item.id !== 'whatsapp').map((item) => {
              const Icon = icons[item.id as 'instagram' | 'facebook']
              return (
                <li key={item.id}>
                  <a href={item.href} className='inline-flex items-center gap-2 transition-colors hover:text-ivory' target='_blank' rel='noopener noreferrer'>
                    <Icon className='h-4 w-4' aria-hidden='true' />
                    {item.label}
                  </a>
                </li>
              )
            })}
            <li>
              <a href={siteConfig.location.mapsUrl} className='inline-flex items-start gap-2 transition-colors hover:text-ivory' target='_blank' rel='noopener noreferrer'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0' aria-hidden='true' />
                <span>
                  {siteConfig.location.label}
                  <span className='mt-1 block text-xs text-ivory/45'>{siteConfig.location.detail}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className='pb-16'>
        <div className='mb-5 flex flex-wrap items-end justify-between gap-3'>
          <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-aqua'>
            Cómo llegar
          </p>
          <a
            href={siteConfig.location.mapsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-ivory/70 transition-colors hover:text-ivory'
          >
            Abrir en Google Maps
          </a>
        </div>
        <div className='overflow-hidden rounded-[1.4rem] border border-white/10'>
          <iframe
            title={`Mapa de ${siteConfig.name} en Gerli`}
            src={siteConfig.location.embedUrl}
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            className='h-64 w-full border-0 grayscale-[20%] contrast-[1.05] md:h-80'
          />
        </div>
      </Container>

      <div className='border-t border-white/8'>
        <Container className='flex flex-col gap-2 py-6 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Demo comercial · listo para conectar el asistente real</p>
        </Container>
      </div>
    </footer>
  )
}
