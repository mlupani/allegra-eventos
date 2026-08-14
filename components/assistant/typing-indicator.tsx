interface TypingIndicatorProps {
  label?: string
}

export function TypingIndicator ({ label = 'El asistente está escribiendo' }: TypingIndicatorProps) {
  return (
    <div className='flex items-end gap-2' role='status' aria-live='polite' aria-label={label}>
      <div className='flex h-9 items-center gap-1.5 rounded-2xl rounded-bl-md bg-mist px-3.5'>
        <span className='typing-dot' />
        <span className='typing-dot [animation-delay:160ms]' />
        <span className='typing-dot [animation-delay:320ms]' />
      </div>
    </div>
  )
}
