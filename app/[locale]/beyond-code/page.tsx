import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/app/lib/metadata'

type Section = {
  title: string
  description: string
  photos: string[]
  photosPlaceholder?: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === 'en'
  return buildMetadata({
    title: isEn
      ? 'Beyond Code – Karan Singh Dhir'
      : 'Au-delà du Code – Karan Singh Dhir',
    description: isEn
      ? 'Life outside the editor — cycling trails, mountain hikes, and good books.'
      : 'La vie en dehors du code — sentiers de vélo, randonnées en montagne et bons livres.',
  })
}

export default async function BeyondCodePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('beyondCode')
  const sections = t.raw('sections') as Section[]

  return (
    <article className="py-10">
      <h2 className="mb-10 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight md:text-4xl">
        {t('heading')}
      </h2>

      <div className="space-y-10 text-lg leading-relaxed text-gray-700">
        {sections.map((section, i) => (
          <section key={i}>
            <h3 className="mb-3 text-xl font-bold text-slate-800">
              {section.title}
            </h3>
            <p>{section.description}</p>
            {section.photos.length === 0 && section.photosPlaceholder && (
              <p className="mt-3 text-sm text-gray-400 italic">
                {section.photosPlaceholder}
              </p>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
