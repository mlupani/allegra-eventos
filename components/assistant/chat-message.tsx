import { cn } from '@/lib/cn'
import type { ChatMessage } from '@/lib/agent/types'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

export function ChatMessageBubble ({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-md bg-teal text-ivory'
            : 'rounded-bl-md bg-mist text-ink'
        )}
      >
        {message.content}
      </p>
    </div>
  )
}
