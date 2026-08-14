'use client'

import { useAssistant } from '@/components/assistant/assistant-provider'
import { WhatsAppIcon } from '@/components/ui/social-icons'
import { siteConfig } from '@/data/allegra'
import { cn } from '@/lib/cn'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppFloat () {
  const { isOpen } = useAssistant()

  return (
    <a
      href={getWhatsAppUrl()}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Escribir a ${siteConfig.name} por WhatsApp`}
      className={cn(
        'whatsapp-bubble fixed right-5 bottom-24 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(18,140,70,0.65)] transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] md:right-6 md:bottom-28',
        isOpen && 'pointer-events-none scale-90 opacity-0'
      )}
    >
      <WhatsAppIcon className='h-7 w-7' />
    </a>
  )
}
