import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import RichText from '../components/RichText'

type ParagraphItem = string | { text: string; links: Record<string, string> }

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('about')
  const paragraphs = t.raw('paragraphs') as ParagraphItem[]

  return (
    <article className="py-10">
      <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-12">
        <Image
          src="/photo.jpeg"
          alt="Karan Singh Dhir"
          width={200}
          height={200}
          className="shrink-0 rounded-full object-cover"
          priority
        />
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-slate-800 text-center md:text-left md:text-4xl">
          {t('heading')}
        </h2>
      </div>

      <RichText items={paragraphs} />
    </article>
  )
}
