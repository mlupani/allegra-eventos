'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput ({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  function submit () {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
  }

  return (
    <form
      className='flex items-end gap-2 border-t border-teal/10 bg-ivory px-3 py-3'
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <label htmlFor='asistente-mensaje' className='sr-only'>
        Escribí tu mensaje
      </label>
      <textarea
        id='asistente-mensaje'
        rows={1}
        value={value}
        disabled={disabled}
        placeholder='Escribí tu consulta...'
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            submit()
          }
        }}
        className='max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-teal/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-aqua/50'
      />
      <button
        type='submit'
        disabled={disabled || value.trim().length === 0}
        aria-label='Enviar mensaje'
        className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-ivory transition-colors hover:bg-teal-soft disabled:cursor-not-allowed disabled:opacity-40'
      >
        <Send className='h-4 w-4' aria-hidden='true' />
      </button>
    </form>
  )
}
