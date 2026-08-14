'use client'

import type { ReactNode } from 'react'
import { useAssistant, type AssistantIntent } from '@/components/assistant/assistant-provider'
import { Button } from '@/components/ui/button'

interface OpenAssistantButtonProps {
  children: ReactNode
  intent?: AssistantIntent
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'md' | 'lg' | 'sm'
  className?: string
  ariaLabel?: string
  onClick?: () => void
}

export function OpenAssistantButton ({
  children,
  intent,
  variant = 'primary',
  size = 'md',
  className,
  ariaLabel,
  onClick
}: OpenAssistantButtonProps) {
  const { open } = useAssistant()

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      ariaLabel={ariaLabel}
      onClick={() => {
        onClick?.()
        open(intent ? { intent } : undefined)
      }}
    >
      {children}
    </Button>
  )
}
