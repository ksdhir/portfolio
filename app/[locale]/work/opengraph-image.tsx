import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { OgCard } from '../../lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [tWork, tResume] = await Promise.all([
    getTranslations({ locale, namespace: 'work' }),
    getTranslations({ locale, namespace: 'resume' }),
  ])
  return new ImageResponse(
    <OgCard pageLabel={tWork('heading')} subtitle={`${tResume('title')} · Vancouver, BC`} />,
    size
  )
}
