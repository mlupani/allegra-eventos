import { cn } from '@/lib/cn'
import type { ChatAction } from '@/lib/agent/types'

interface ChatQuickRepliesProps {
  actions: ChatAction[]
  onSelect: (action: ChatAction) => void
  disabled?: boolean
}

export function ChatQuickReplies ({ actions, onSelect, disabled }: ChatQuickRepliesProps) {
  if (actions.length === 0) return null

  return (
    <div className='flex flex-wrap gap-2' role='group' aria-label='Respuestas rápidas'>
      {actions.map((action) => (
        <button
          key={action.id}
          type='button'
          disabled={disabled}
          onClick={() => onSelect(action)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-left text-[0.78rem] leading-snug transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua',
            'disabled:cursor-not-allowed disabled:opacity-50',
            action.type === 'whatsapp'
              ? 'border-[#25D366]/30 bg-[#25D366]/10 text-[#146C3A] hover:bg-[#25D366]/16'
              : 'border-teal/15 bg-white text-ink hover:border-aqua/50 hover:bg-mist'
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
