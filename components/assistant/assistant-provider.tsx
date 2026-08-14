'use client'

import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react'

export type AssistantIntent = 'organize' | 'availability' | 'events'

export interface OpenAssistantOptions {
  intent?: AssistantIntent
}

interface AssistantContextValue {
  isOpen: boolean
  intent: AssistantIntent | null
  open: (options?: OpenAssistantOptions) => void
  close: () => void
  toggle: () => void
  clearIntent: () => void
}

const AssistantContext = createContext<AssistantContextValue | null>(null)

interface AssistantProviderProps {
  children: ReactNode
}

export function AssistantProvider ({ children }: AssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [intent, setIntent] = useState<AssistantIntent | null>(null)

  const open = useCallback((options?: OpenAssistantOptions) => {
    setIntent(options?.intent ?? null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((current) => !current)
  }, [])

  const clearIntent = useCallback(() => {
    setIntent(null)
  }, [])

  const value = useMemo(
    () => ({ isOpen, intent, open, close, toggle, clearIntent }),
    [isOpen, intent, open, close, toggle, clearIntent]
  )

  return (
    <AssistantContext value={value}>
      {children}
    </AssistantContext>
  )
}

export function useAssistant () {
  const context = use(AssistantContext)
  if (!context) {
    throw new Error('useAssistant debe usarse dentro de AssistantProvider')
  }
  return context
}
