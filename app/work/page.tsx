import type { Metadata } from "next";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Work - Karan Singh Dhir",
  description: "Projects and work by Karan Singh Dhir.",
};

// Group projects by company
function groupByCompany(
  items: typeof projects
): Record<string, typeof projects> {
  const groups: Record<string, typeof projects> = {};
  for (const project of items) {
    const key = project.company;
    if (!groups[key]) groups[key] = [];
    groups[key].push(project);
  }
  return groups;
}

export default function WorkPage() {
  const grouped = groupByCompany(projects);

  return (
    <article className="py-10">
      <h2 className="mb-10 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
        Some of my work
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
                    <span className="font-medium text-slate-800">Impact:</span>{" "}
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
  );
}
