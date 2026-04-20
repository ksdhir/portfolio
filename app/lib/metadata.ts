import type { Metadata } from 'next'

export function buildMetadata({
  title,
  description,
}: {
  title: string
  description: string
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Karan Singh Dhir',
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
