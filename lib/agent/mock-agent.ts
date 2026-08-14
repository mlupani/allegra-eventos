import { siteConfig } from '@/data/allegra'
import type {
  AgentContext,
  AgentResponse,
  AgentService,
  ChatAction,
  ChatMessage,
  SendMessageInput
} from '@/lib/agent/types'

const MONTHS =
  'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre'

const EVENT_ALIASES: Array<[string, string]> = [
  ['15 años', '15 años'],
  ['quinceañera', '15 años'],
  ['quinceanera', '15 años'],
  ['quince', '15 años'],
  ['cumpleaños', 'Cumpleaños'],
  ['cumpleanos', 'Cumpleaños'],
  ['cumple', 'Cumpleaños'],
  ['birthday', 'Cumpleaños'],
  ['casamientos', 'Casamientos'],
  ['casamiento', 'Casamientos'],
  ['wedding', 'Casamientos'],
  ['boda', 'Casamientos'],
  ['corporativos', 'Eventos corporativos'],
  ['corporativo', 'Eventos corporativos'],
  ['empresa', 'Eventos corporativos'],
  ['especiales', 'Celebraciones especiales'],
  ['especial', 'Celebraciones especiales']
]

function createId () {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function assistant (content: string, actions?: ChatAction[]): ChatMessage {
  return {
    id: createId(),
    role: 'assistant',
    content,
    createdAt: new Date().toISOString(),
    actions
  }
}

function detectEventType (text: string) {
  const normalized = text.toLowerCase()
  return EVENT_ALIASES.find(([key]) => normalized.includes(key))?.[1]
}

function detectDate (text: string) {
  const monthMatch = text.match(
    new RegExp(`(\\d{1,2})\\s*(?:de\\s*)?(${MONTHS})(?:\\s*(?:de\\s*)?(\\d{4}))?`, 'i')
  )
  if (monthMatch) {
    const day = monthMatch[1]
    const month = monthMatch[2].toLowerCase()
    const year = monthMatch[3] ? ` de ${monthMatch[3]}` : ''
    return `${day} de ${month}${year}`
  }

  const numeric = text.match(/(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?/)
  if (numeric) return numeric[0]

  return undefined
}

function detectGuests (text: string) {
  const explicit = text.match(/(\d{1,3})\s*(?:personas|invitados|gente|pax)/i)
  if (explicit) return Number(explicit[1])

  const onlyNumber = text.trim().match(/^(\d{1,3})$/)
  if (onlyNumber) {
    const value = Number(onlyNumber[1])
    if (value >= 10 && value <= 500) return value
  }

  return undefined
}

function hasAvailabilityIntent (text: string) {
  return /disponib|reserv|fecha|hay lugar|está libre|esta libre/i.test(text)
}

function nextPrompt (context: AgentContext): AgentResponse {
  if (!context.eventType) {
    return {
      messages: [
        assistant('¿Qué tipo de evento estás organizando?', [
          { id: 'ev-cumple', label: 'Cumpleaños', type: 'quick_reply', payload: 'Quiero hacer un cumpleaños' },
          { id: 'ev-quince', label: '15 años', type: 'quick_reply', payload: 'Quiero hacer un 15 años' },
          { id: 'ev-boda', label: 'Casamiento', type: 'quick_reply', payload: 'Quiero hacer un casamiento' },
          { id: 'ev-corp', label: 'Corporativo', type: 'quick_reply', payload: 'Quiero hacer un evento corporativo' }
        ])
      ],
      context: { ...context, stage: 'collecting' }
    }
  }

  if (!context.date) {
    return {
      messages: [
        assistant('¡Genial! 🎉 ¿Para qué fecha estás pensando el evento?')
      ],
      context: { ...context, stage: 'collecting' }
    }
  }

  if (!context.guests) {
    return {
      messages: [
        assistant('Perfecto. ¿Aproximadamente cuántos invitados serían?')
      ],
      context: { ...context, stage: 'collecting' }
    }
  }

  return {
    messages: [
      assistant(
        `Perfecto. Para un evento de aproximadamente ${context.guests} personas podemos orientarte con las opciones disponibles. ¿Querés que consulte la disponibilidad para el ${context.date}?`,
        [
          { id: 'check-availability', label: 'Consultar disponibilidad', type: 'availability' }
        ]
      )
    ],
    context: { ...context, stage: 'ready_to_check' }
  }
}

function mergeSlots (context: AgentContext, text: string): AgentContext {
  return {
    ...context,
    eventType: context.eventType ?? detectEventType(text),
    date: context.date ?? detectDate(text),
    guests: context.guests ?? detectGuests(text)
  }
}

function greetingActions (): ChatAction[] {
  return [
    { id: 'organize', label: 'Quiero organizar un evento', type: 'quick_reply', payload: 'Quiero organizar un evento' },
    { id: 'availability', label: 'Consultar disponibilidad', type: 'quick_reply', payload: 'Consultar disponibilidad' },
    { id: 'events', label: 'Ver tipos de eventos', type: 'quick_reply', payload: 'Ver tipos de eventos' }
  ]
}

export const mockAgent: AgentService = {
  getGreeting () {
    return {
      messages: [
        assistant(
          '¡Hola! 👋 Soy el asistente de Allegra. Puedo ayudarte a conocer nuestras opciones y consultar disponibilidad para tu evento.',
          greetingActions()
        )
      ],
      context: { stage: 'greeting' }
    }
  },

  async send (input: SendMessageInput) {
    const text = (input.action?.payload ?? input.text).trim()
    const actionType = input.action?.type
    let context = mergeSlots(input.context, text)

    if (actionType === 'availability' || (hasAvailabilityIntent(text) && context.eventType && context.date && context.guests)) {
      if (!context.eventType || !context.date || !context.guests) {
        context = { ...context, intent: 'availability' }
        return nextPrompt(context)
      }

      return {
        messages: [
          assistant(
            `Tenemos disponibilidad para el ${context.date}. Si querés, puedo ayudarte a avanzar con la reserva.`,
            [
              { id: 'continue-reservation', label: 'Continuar con la reserva', type: 'reservation' },
              { id: 'whatsapp', label: 'Continuar por WhatsApp', type: 'whatsapp' }
            ]
          )
        ],
        context: { ...context, stage: 'checked' }
      }
    }

    if (actionType === 'reservation') {
      return {
        messages: [
          assistant(
            'Perfecto. Para continuar con la reserva podemos seguir por acá o, si preferís, te acompaño por WhatsApp con los datos que ya conversamos.',
            [
              { id: 'whatsapp-reservation', label: 'Continuar por WhatsApp', type: 'whatsapp' },
              { id: 'keep-chat', label: 'Seguir en el chat', type: 'quick_reply', payload: 'Quiero seguir en el chat' }
            ]
          )
        ],
        context: { ...context, stage: 'reservation' }
      }
    }

    if (/seguir en el chat/i.test(text)) {
      return {
        messages: [
          assistant(
            'Dale, seguimos acá. Un asesor del equipo va a tomar estos datos para coordinar la reserva. ¿Querés dejar algún detalle más del evento?',
            [
              { id: 'whatsapp-later', label: 'Prefiero WhatsApp', type: 'whatsapp' }
            ]
          )
        ],
        context
      }
    }

    if (/tipos de eventos|qué eventos|que eventos|qué se puede/i.test(text)) {
      const list = siteConfig.eventTypes.map((event) => `• ${event.title}`).join('\n')
      return {
        messages: [
          assistant(
            `En Allegra acompañamos distintos momentos:\n\n${list}\n\n¿Cuál te gustaría organizar?`,
            [
              { id: 'ev-cumple', label: 'Cumpleaños', type: 'quick_reply', payload: 'Quiero hacer un cumpleaños' },
              { id: 'ev-quince', label: '15 años', type: 'quick_reply', payload: 'Quiero hacer un 15 años' },
              { id: 'ev-boda', label: 'Casamiento', type: 'quick_reply', payload: 'Quiero hacer un casamiento' }
            ]
          )
        ],
        context: { ...context, intent: 'events', stage: 'collecting' }
      }
    }

    if (/organizar un evento|quiero organizar/i.test(text) && !context.eventType) {
      context = { ...context, intent: 'organize' }
      return nextPrompt(context)
    }

    if (/consult(ar|o)? disponibilidad/i.test(text)) {
      context = { ...context, intent: 'availability' }
      return nextPrompt(context)
    }

    if (context.eventType || context.date || context.guests || detectEventType(text) || detectDate(text) || detectGuests(text)) {
      return nextPrompt(context)
    }

    return {
      messages: [
        assistant(
          'Puedo ayudarte a organizar un evento, ver las opciones del espacio o consultar disponibilidad. ¿Por dónde empezamos?',
          greetingActions()
        )
      ],
      context
    }
  }
}
