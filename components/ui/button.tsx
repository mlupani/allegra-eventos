import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'md' | 'lg' | 'sm'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  ariaLabel?: string
  external?: boolean
}

const variants = {
  primary:
    'bg-aqua text-deep shadow-[0_10px_30px_-12px_rgba(62,207,198,0.7)] hover:bg-aqua/90',
  secondary:
    'border border-white/25 bg-white/8 text-ivory backdrop-blur-sm hover:border-white/45 hover:bg-white/14',
  ghost:
    'border border-teal/15 bg-white text-ink hover:border-teal/30 hover:bg-mist',
  gold:
    'bg-gold text-deep hover:bg-gold-soft'
}

const sizes = {
  sm: 'h-10 px-4 text-xs tracking-[0.16em]',
  md: 'h-11 px-5 text-[0.7rem] tracking-[0.18em]',
  lg: 'h-12 px-6 text-[0.72rem] tracking-[0.2em] sm:px-7'
}

export function Button ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  onClick,
  ariaLabel,
  external
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium uppercase transition-all duration-300 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
