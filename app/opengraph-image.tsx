import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/allegra'

export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 0

export default async function OpenGraphImage () {
  const logo = await readFile(join(process.cwd(), 'public/images/logo.jpg'))
  const src = `data:image/jpeg;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3ECFC6'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite img */}
        <img
          src={src}
          alt={siteConfig.name}
          width={520}
          height={520}
          style={{ objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size }
  )
}
