import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/allegra'

export const alt = siteConfig.seo.imageAlt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 0

export default async function OpenGraphImage () {
  const hero = await readFile(join(process.cwd(), 'public/images/hero.png'))
  const src = `data:image/png;base64,${hero.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#042A33'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite img */}
        <img
          src={src}
          alt=''
          width={1200}
          height={630}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
    ),
    { ...size }
  )
}
