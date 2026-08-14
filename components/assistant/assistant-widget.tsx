'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { ChatPanel } from '@/components/assistant/chat-panel'
import { useAssistant } from '@/components/assistant/assistant-provider'
import { createAgentService } from '@/lib/agent/create-agent'
import { delay, fireAndForget } from '@/lib/delay'
import { cn } from '@/lib/cn'
import { buildReservationWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp'
import type { AgentContext, ChatAction, ChatMessage } from '@/lib/agent/types'

function createUserMessage (content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    createdAt: new Date().toISOString()
  }
}

const INTENT_ACTIONS: Record<string, ChatAction> = {
  organize: {
    id: 'intent-organize',
    label: 'Quiero organizar un evento',
    type: 'quick_reply',
    payload: 'Quiero organizar un evento'
  },
  availability: {
    id: 'intent-availability',
    label: 'Consultar disponibilidad',
    type: 'quick_reply',
    payload: 'Consultar disponibilidad'
  },
  events: {
    id: 'intent-events',
    label: 'Ver tipos de eventos',
    type: 'quick_reply',
    payload: 'Ver tipos de eventos'
  }
}

export function AssistantWidget () {
  const { isOpen, intent, open, close, clearIntent } = useAssistant()
  const agent = useMemo(() => createAgentService(), [])
  const greeting = useMemo(() => agent.getGreeting(), [agent])
  const triggerRef = useRef<HTMLButtonElement>(null)
  const messagesRef = useRef<ChatMessage[]>(greeting.messages)
  const contextRef = useRef<AgentContext>(greeting.context)
  const intentSentRef = useRef(false)
  const [messages, setMessages] = useState<ChatMessage[]>(greeting.messages)
  const [isTyping, setIsTyping] = useState(false)

  const sendToAgent = useCallback(async (text: string, action?: ChatAction) => {
    const userMessage = createUserMessage(action?.label ?? text)
    const nextHistory = [...messagesRef.current, userMessage]
    messagesRef.current = nextHistory
    setMessages(nextHistory)
    setIsTyping(true)

    const response = await agent.send({
      messages: nextHistory,
      text,
      action,
      context: contextRef.current
    })

    await delay(700)
    contextRef.current = response.context
    const withAssistant = [...nextHistory, ...response.messages]
    messagesRef.current = withAssistant
    setMessages(withAssistant)
    setIsTyping(false)
  }, [agent])

  useEffect(() => {
    if (intent) intentSentRef.current = false
  }, [intent])

  useEffect(() => {
    if (!isOpen || !intent || intentSentRef.current || isTyping) return
    const action = INTENT_ACTIONS[intent]
    if (!action) return
    intentSentRef.current = true
    clearIntent()
    fireAndForget(sendToAgent(action.payload ?? action.label, action))
  }, [isOpen, intent, isTyping, clearIntent, sendToAgent])

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown (event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  function handleAction (action: ChatAction) {
    if (action.type === 'whatsapp') {
      const userMessage = createUserMessage(action.label)
      const next = [...messagesRef.current, userMessage]
      messagesRef.current = next
      setMessages(next)
      window.open(getWhatsAppUrl(buildReservationWhatsAppMessage(contextRef.current)), '_blank', 'noopener,noreferrer')
      return
    }

    if (action.type === 'scroll' && action.payload) {
      close()
      document.querySelector(action.payload)?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    fireAndForget(sendToAgent(action.payload ?? action.label, action))
  }

  return (
    <>
      {isOpen
        ? (
          <div className='pointer-events-none fixed inset-0 z-50 flex items-end justify-end'>
            <div
              className='pointer-events-auto absolute inset-0 bg-deep/40 md:hidden'
              onClick={close}
              aria-hidden='true'
            />
            <div className='pointer-events-auto p-0 md:p-6'>
              <ChatPanel
                messages={messages}
                isTyping={isTyping}
                onSend={(text) => { fireAndForget(sendToAgent(text)) }}
                onAction={handleAction}
                onClose={close}
                className='h-svh w-screen rounded-none md:h-[min(640px,calc(100svh-5.5rem))] md:w-[400px] md:rounded-[1.6rem]'
              />
            </div>
          </div>
          )
        : null}

      <div
        className={cn(
          'pointer-events-auto fixed right-5 bottom-5 z-50 flex items-end gap-3 md:right-6 md:bottom-6',
          isOpen && 'max-md:pointer-events-none max-md:opacity-0'
        )}
      >
        {isOpen
          ? null
          : (
            <p className='mb-1 hidden max-w-[11.5rem] rounded-2xl rounded-br-md bg-ivory px-3.5 py-2.5 text-sm leading-snug text-ink shadow-[0_12px_30px_-12px_rgba(4,42,51,0.45)] md:block'>
              ¡Hola! ¿Consultamos disponibilidad para tu evento?
            </p>
            )}
        <button
          ref={triggerRef}
          type='button'
          aria-label={isOpen ? 'Cerrar asistente Allegra' : 'Abrir asistente Allegra'}
          aria-expanded={isOpen}
          aria-haspopup='dialog'
          onClick={() => (isOpen ? close() : open())}
          className={cn(
            'assistant-bubble flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal text-ivory shadow-[0_12px_30px_-8px_rgba(4,42,51,0.55)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua',
            isOpen && 'scale-90 opacity-0 md:opacity-100'
          )}
        >
          <MessageCircle className='h-6 w-6' aria-hidden='true' />
        </button>
      </div>
    </>
  )
}
