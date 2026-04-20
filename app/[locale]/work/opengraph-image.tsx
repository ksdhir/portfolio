import { ImageResponse } from 'next/og'
import { OgCard } from '../../lib/og'

export const runtime = 'edge'
export const alt = 'Work – Karan Singh Dhir'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(<OgCard pageLabel="Work" />, size)
}
