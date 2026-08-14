'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { OpenAssistantButton } from '@/components/assistant/open-assistant-button'
import { Logo } from '@/components/ui/logo'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/data/allegra'

export function Header () {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || open ? 'bg-deep/92 shadow-lg shadow-deep/10 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <Container className='flex h-[4.5rem] items-center justify-between gap-6'>
        <Logo />
        <nav className='hidden items-center gap-8 lg:flex' aria-label='Principal'>
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-ivory'
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className='hidden lg:block'>
          <OpenAssistantButton intent='availability' size='sm' ariaLabel='Consultar disponibilidad'>
            Consultar disponibilidad
          </OpenAssistantButton>
        </div>
        <button
          type='button'
          className='rounded-full p-2 text-ivory lg:hidden'
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className='h-5 w-5' aria-hidden='true' /> : <Menu className='h-5 w-5' aria-hidden='true' />}
        </button>
      </Container>

      <div
        className={cn(
          'border-t border-white/10 bg-deep lg:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <Container className='flex flex-col gap-5 py-8'>
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className='font-serif text-3xl text-ivory'
            >
              {link.label}
            </a>
          ))}
          <OpenAssistantButton intent='availability' className='mt-2 w-full' ariaLabel='Consultar disponibilidad' onClick={() => setOpen(false)}>
            Consultar disponibilidad
          </OpenAssistantButton>
        </Container>
      </div>
    </header>
  )
}
