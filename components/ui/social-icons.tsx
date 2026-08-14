interface SocialIconProps {
  className?: string
}

export function InstagramIcon ({ className }: SocialIconProps) {
  return (
    <svg viewBox='0 0 24 24' className={className} aria-hidden='true' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <rect x='3.5' y='3.5' width='17' height='17' rx='5' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='17.4' cy='6.6' r='0.9' fill='currentColor' stroke='none' />
    </svg>
  )
}

export function FacebookIcon ({ className }: SocialIconProps) {
  return (
    <svg viewBox='0 0 24 24' className={className} aria-hidden='true' fill='currentColor'>
      <path d='M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H9v2.8h2.2V21h3z' />
    </svg>
  )
}

export function WhatsAppIcon ({ className }: SocialIconProps) {
  return (
    <svg viewBox='0 0 24 24' className={className} aria-hidden='true' fill='currentColor'>
      <path d='M12.04 3.2A8.7 8.7 0 0 0 3.4 11.9c0 1.53.4 3.03 1.16 4.35L3 21l4.88-1.52a8.7 8.7 0 0 0 4.16 1.06h.01a8.7 8.7 0 0 0 8.7-8.7 8.67 8.67 0 0 0-8.71-8.64zm5.04 12.35c-.21.6-1.25 1.14-1.73 1.18-.44.04-.98.06-1.58-.1-.36-.1-.83-.27-1.43-.53-2.52-1.09-4.16-3.62-4.29-3.79-.12-.17-1.02-1.36-1.02-2.6 0-1.23.65-1.84.88-2.09.21-.23.56-.35.88-.35h.63c.2 0 .47-.08.73.56.27.66.91 2.28.99 2.45.08.17.13.37.03.58-.1.23-.16.37-.31.56-.16.2-.33.44-.47.59-.16.17-.32.35-.14.68.17.33.78 1.29 1.67 2.09 1.15 1.03 2.12 1.35 2.45 1.5.33.16.52.13.71-.08.2-.21.82-.96 1.04-1.29.22-.33.44-.27.73-.16.3.1 1.88.89 2.2 1.05.33.16.54.24.62.37.08.13.08.76-.13 1.36z' />
    </svg>
  )
}
