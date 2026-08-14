'use client'

import { useEffect, useRef } from 'react'
import { ChatInput } from '@/components/assistant/chat-input'
import { ChatMessageBubble } from '@/components/assistant/chat-message'
import { ChatQuickReplies } from '@/components/assistant/chat-quick-replies'
import { TypingIndicator } from '@/components/assistant/typing-indicator'
import { cn } from '@/lib/cn'
import type { ChatAction, ChatMessage } from '@/lib/agent/types'
import { Sparkles, X } from 'lucide-react'

interface ChatPanelProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSend: (text: string) => void
  onAction: (action: ChatAction) => void
  onClose: () => void
  className?: string
}

export function ChatPanel ({
  messages,
  isTyping,
  onSend,
  onAction,
  onClose,
  className
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastMessage = messages.at(-1)
  const actions = !isTyping && lastMessage?.role === 'assistant' ? lastMessage.actions ?? [] : []

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, isTyping])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <section
      className={cn(
        'flex h-full flex-col overflow-hidden bg-ivory shadow-2xl shadow-deep/25',
        className
      )}
      role='dialog'
      aria-modal='true'
      aria-labelledby='asistente-titulo'
      aria-describedby='asistente-subtitulo'
    >
      <header className='flex items-start justify-between gap-3 bg-deep px-4 py-4 text-ivory'>
        <div className='flex items-start gap-3'>
          <span className='mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-aqua/15 text-aqua'>
            <Sparkles className='h-5 w-5' aria-hidden='true' />
          </span>
          <div>
            <h2 id='asistente-titulo' className='font-serif text-xl leading-tight'>
              Asistente Allegra
            </h2>
            <p id='asistente-subtitulo' className='mt-1 text-xs text-ivory/65'>
              Estoy para ayudarte a planificar tu evento
            </p>
            <p className='mt-2 flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-aqua'>
              <span className='h-1.5 w-1.5 rounded-full bg-aqua' aria-hidden='true' />
              En línea
            </p>
          </div>
        </div>
        <button
          ref={closeRef}
          type='button'
          onClick={onClose}
          aria-label='Cerrar asistente'
          className='rounded-full p-2 text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua'
        >
          <X className='h-5 w-5' aria-hidden='true' />
        </button>
      </header>

      <div ref={listRef} className='flex-1 space-y-3 overflow-y-auto px-4 py-4'>
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isTyping ? <TypingIndicator /> : null}
        <ChatQuickReplies actions={actions} onSelect={onAction} disabled={isTyping} />
      </div>

      <ChatInput onSend={onSend} disabled={isTyping} />
    </section>
  )
}
