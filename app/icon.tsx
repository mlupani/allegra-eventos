import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/allegra'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon () {
  const logo = await readFile(join(process.cwd(), 'public/images/logo.jpg'))
  const src = `data:image/jpeg;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          borderRadius: 8,
          background: '#3ECFC6'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite img */}
        <img
          src={src}
          alt={siteConfig.name}
          width={32}
          height={32}
          style={{ objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size }
  )
}
