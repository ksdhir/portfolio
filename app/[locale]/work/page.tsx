import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/app/lib/metadata'

type Project = {
  name: string
  company: string
  description: string
  impact: string
  tech: string[]
  link: string | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === 'en'
  return buildMetadata({
    title: isEn ? 'Work – Karan Singh Dhir' : 'Projets – Karan Singh Dhir',
    description: isEn
      ? 'Projects across healthcare, edtech, and SaaS — from an exam platform serving 217K students to health apps supporting patient care.'
      : "Projets dans la santé, l'edtech et le SaaS — d'une plateforme d'examens pour 217 000 étudiants aux applications de santé.",
  })
}

function groupByCompany(items: Project[]): Record<string, Project[]> {
  const groups: Record<string, Project[]> = {}
  for (const project of items) {
    if (!groups[project.company]) groups[project.company] = []
    groups[project.company].push(project)
  }
  return groups
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('work')
  const projects = t.raw('projects') as Project[]
  const grouped = groupByCompany(projects)

  return (
    <article className="py-10">
      <h2 className="mb-10 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
        {t('heading')}
      </h2>

      <div className="space-y-12">
        {Object.entries(grouped).map(([company, companyProjects]) => (
          <section key={company}>
            <h3 className="mb-6 border-b border-gray-200 pb-2 text-lg font-bold text-slate-800 md:text-xl">
              {company}
            </h3>
            <div className="space-y-8">
              {companyProjects.map((project, i) => (
                <div key={i} className="pl-4 border-l-2 border-slate-200">
                  <h4 className="text-base font-bold text-slate-800">
                    {project.link ? (
                      <a
                        href={project.link}
                        className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h4>
                  <p className="mt-2 text-gray-700">{project.description}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-medium text-slate-800">Impact:</span>{' '}
                    {project.impact}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span
                        key={j}
                        className="rounded bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600 ring-1 ring-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
