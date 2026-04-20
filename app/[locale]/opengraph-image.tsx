import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { OgCard } from '../lib/og'

export const runtime = 'edge'
export const alt = 'Karan Singh Dhir – Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'resume' })
  return new ImageResponse(
    <OgCard subtitle={`${t('title')} · Vancouver, BC`} />,
    size
  )
}
