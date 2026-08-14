function trimSlash (value: string) {
  return value.replace(/\/$/, '')
}

export function getSiteUrl () {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimSlash(process.env.NEXT_PUBLIC_SITE_URL)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${trimSlash(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${trimSlash(process.env.VERCEL_URL)}`
  }

  return 'http://localhost:3000'
}

export function getRequestOrigin (headerStore: Headers) {
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host')
  if (!host) return getSiteUrl()
  const proto = headerStore.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}
