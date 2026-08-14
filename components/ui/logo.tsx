import Image from 'next/image'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/data/allegra'

interface LogoProps {
  href?: string
  className?: string
}

export function Logo ({ href = '#inicio', className }: LogoProps) {
  return (
    <a
      href={href}
      aria-label={`${siteConfig.name}, ir al inicio`}
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={160}
        height={160}
        className='h-12 w-12 rounded-xl object-cover shadow-sm sm:h-14 sm:w-14'
        priority
      />
    </a>
  )
}
