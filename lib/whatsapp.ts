import { siteConfig } from '@/data/allegra'

export interface WhatsAppContext {
  eventType?: string
  date?: string
  guests?: number
}

export function getWhatsAppUrl (message?: string) {
  const text = message ?? siteConfig.whatsapp.defaultMessage
  return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(text)}`
}

export function buildReservationWhatsAppMessage (context: WhatsAppContext) {
  const parts = [siteConfig.whatsapp.reservationMessage]

  if (context.eventType) parts.push(`Tipo de evento: ${context.eventType}.`)
  if (context.date) parts.push(`Fecha: ${context.date}.`)
  if (context.guests) parts.push(`Invitados: ${context.guests}.`)

  return parts.join(' ')
}
