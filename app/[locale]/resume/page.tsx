import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/app/lib/metadata'
import CopyResumeButton from './CopyResumeButton'

type ContactItem = { text: string; href?: string }
type SkillItem = { category: string; items: string }
type BulletItem = string | { text: string; links: Record<string, string> }
type ExperienceItem = {
  company: string
  date: string
  location: string
  position: string
  bullets: BulletItem[]
}
type CertItem = { name: string; year: string }
type EduItem = { institution: string; date: string; degree: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === 'en'
  return buildMetadata({
    title: isEn ? 'Resume – Karan Singh Dhir' : 'CV – Karan Singh Dhir',
    description: isEn
      ? 'Senior Software Engineer, Vancouver BC. 7+ years across full-stack, mobile, and platform work.'
      : 'Ingénieur Logiciel Senior, Vancouver CB. 7+ ans en développement full-stack, mobile et plateformes.',
  })
}

function renderBullet(item: BulletItem, i: number) {
  if (typeof item === 'string') return <li key={i}>{item}</li>

  const parts: React.ReactNode[] = []
  let remaining = item.text
  let key = 0

  for (const [label, url] of Object.entries(item.links)) {
    const placeholder = `{${label}}`
    const idx = remaining.indexOf(placeholder)
    if (idx === -1) continue
    if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
    parts.push(
      <a
        key={key++}
        href={url}
        className="text-accent underline decoration-accent/30 hover:decoration-accent print:no-underline"
      >
        {label}
      </a>
    )
    remaining = remaining.slice(idx + placeholder.length)
  }
  if (remaining) parts.push(<span key={key++}>{remaining}</span>)

  return <li key={i}>{parts}</li>
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('resume')
  const contact = t.raw('contact') as ContactItem[]
  const skills = t.raw('skills') as SkillItem[]
  const experience = t.raw('experience') as ExperienceItem[]
  const certifications = t.raw('certifications') as CertItem[]
  const education = t.raw('education') as EduItem[]

  return (
    <div className="resume-page py-12 font-sans text-[15px] leading-relaxed text-gray-900 print:px-0 print:py-0">
      <div className="mb-6 flex justify-center gap-3 sm:justify-end print:hidden">
        <CopyResumeButton />
        <a
          href="/resume.docx"
          download
          className="rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/80"
        >
          {locale === 'en' ? 'Download Resume' : 'Télécharger le CV'}
        </a>
      </div>

      <div className="mb-8 h-1 w-full bg-gray-900 print:mb-6" />

      <header className="mb-6 text-center">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">{t('name')}</h1>
        <p className="mb-3 text-lg font-medium text-gray-600">{t('title')}</p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500">
          {contact.map((c, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i > 0 && <span className="text-gray-300">|</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-gray-900">{c.text}</a>
              ) : (
                c.text
              )}
            </span>
          ))}
        </p>
      </header>

      <hr className="mb-6 border-gray-200" />

      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          {locale === 'en' ? 'Professional Summary' : 'Résumé Professionnel'}
        </h2>
        <p className="text-gray-700">{t('summary')}</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          {locale === 'en' ? 'Technical Skills' : 'Compétences Techniques'}
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {skills.map((s, i) => (
            <span key={i} className="contents">
              <dt className="font-semibold text-gray-900">{s.category}</dt>
              <dd className="text-gray-700">{s.items}</dd>
            </span>
          ))}
        </dl>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          {locale === 'en' ? 'Professional Experience' : 'Expérience Professionnelle'}
        </h2>
        {experience.map((job, i) => (
          <div key={i} className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-base font-bold text-gray-900">{job.company}</h3>
              <span className="text-sm text-gray-500">{job.date} | {job.location}</span>
            </div>
            <p className="text-sm text-gray-600">{job.position}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-gray-700">
              {job.bullets.map((b, j) => renderBullet(b, j))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          {locale === 'en' ? 'Certifications' : 'Certifications'}
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {certifications.map((c, i) => (
            <li key={i}>
              <span className="font-semibold">{c.name}</span> ({c.year})
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          {locale === 'en' ? 'Education' : 'Formation'}
        </h2>
        {education.map((e, i) => (
          <div key={i} className="mb-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-semibold text-gray-900">{e.institution}</p>
              <span className="text-sm text-gray-500">{e.date}</span>
            </div>
            <p className="text-gray-700">{e.degree}</p>
          </div>
        ))}
      </section>

      <div className="h-1 w-full bg-gray-900" />
    </div>
  )
}
