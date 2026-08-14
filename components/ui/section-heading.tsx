import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  kicker?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading ({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'light',
  className
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {kicker
        ? (
          <p className={cn(
            'mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em]',
            tone === 'light' ? 'text-teal-soft' : 'text-aqua'
          )}
          >
            {kicker}
          </p>
          )
        : null}
      <h2 className={cn(
        'font-serif text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl',
        tone === 'light' ? 'text-ink' : 'text-ivory'
      )}
      >
        {title}
      </h2>
      {description
        ? (
          <p className={cn(
            'mt-5 max-w-xl text-base leading-relaxed sm:text-lg',
            align === 'center' && 'mx-auto',
            tone === 'light' ? 'text-muted' : 'text-ivory/70'
          )}
          >
            {description}
          </p>
          )
        : null}
    </div>
  )
}
