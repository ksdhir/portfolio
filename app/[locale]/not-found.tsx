import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import AsciiArtDisplay from '../components/AsciiArtDisplay'
import pieces from '@/data/ascii-art.json'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <article className="py-10 flex flex-col items-center text-center gap-8">
      <div>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          {t('subtext')}
        </p>
      </div>

      <AsciiArtDisplay pieces={pieces} buttonLabel={t('artLabel')} />

      <Link
        href="/"
        className="text-sm text-gray-400 transition-colors hover:text-accent"
      >
        {t('home')}
      </Link>
    </article>
  )
}
