import type { Metadata } from "next";
import resume from "@/data/resume.json";
import CopyResumeButton from "./CopyResumeButton";

export const metadata: Metadata = {
  title: `${resume.name} - Resume`,
  description: resume.summary.slice(0, 160),
};

type BulletItem =
  | string
  | { text: string; links: Record<string, string> };

function renderBullet(item: BulletItem, i: number) {
  if (typeof item === "string") {
    return <li key={i}>{item}</li>;
  }

  // Parse {link text} patterns and replace with actual links
  const parts: React.ReactNode[] = [];
  let remaining = item.text;
  let key = 0;

  for (const [label, url] of Object.entries(item.links)) {
    const placeholder = `{${label}}`;
    const idx = remaining.indexOf(placeholder);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
    }
    parts.push(
      <a
        key={key++}
        href={url}
        className="text-gray-900 underline decoration-gray-300 hover:decoration-gray-900 print:no-underline"
      >
        {label}
      </a>
    );
    remaining = remaining.slice(idx + placeholder.length);
  }
  if (remaining) {
    parts.push(<span key={key++}>{remaining}</span>);
  }

  return <li key={i}>{parts}</li>;
}

export default function ResumePage() {
  return (
    <main className="resume-page mx-auto max-w-[52rem] bg-white px-8 py-12 font-sans text-[15px] leading-relaxed text-gray-900 print:max-w-none print:px-0 print:py-0">
      {/* Download button */}
      <div className="mb-6 flex justify-end gap-3 print:hidden">
        <CopyResumeButton />
        <a
          href="/resume.docx"
          download
          className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Download Resume
        </a>
      </div>

      {/* Top accent bar */}
      <div className="mb-8 h-1 w-full bg-gray-900 print:mb-6" />

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          {resume.name}
        </h1>
        <p className="mb-3 text-lg font-medium text-gray-600">
          {resume.title}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500">
          {resume.contact.map((c, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i > 0 && <span className="text-gray-300">|</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-gray-900">
                  {c.text}
                </a>
              ) : (
                c.text
              )}
            </span>
          ))}
        </p>
      </header>

      <hr className="mb-6 border-gray-200" />

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Professional Summary
        </h2>
        <p className="text-gray-700">{resume.summary}</p>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Technical Skills
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {resume.skills.map((s, i) => (
            <span key={i} className="contents">
              <dt className="font-semibold text-gray-900">{s.category}</dt>
              <dd className="text-gray-700">{s.items}</dd>
            </span>
          ))}
        </dl>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Professional Experience
        </h2>

        {resume.experience.map((job, i) => (
          <div key={i} className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-base font-bold text-gray-900">
                {job.company}
              </h3>
              <span className="text-sm text-gray-500">
                {job.date} | {job.location}
              </span>
            </div>
            <p className="text-sm text-gray-600">{job.position}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-gray-700">
              {job.bullets.map((b, j) => renderBullet(b, j))}
            </ul>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Certifications
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {resume.certifications.map((c, i) => (
            <li key={i}>
              <span className="font-semibold">{c.name}</span> ({c.year})
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Education
        </h2>
        {resume.education.map((e, i) => (
          <div key={i} className="mb-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-semibold text-gray-900">{e.institution}</p>
              <span className="text-sm text-gray-500">{e.date}</span>
            </div>
            <p className="text-gray-700">{e.degree}</p>
          </div>
        ))}
      </section>

      {/* Bottom accent bar */}
      <div className="h-1 w-full bg-gray-900" />
    </main>
  );
}
