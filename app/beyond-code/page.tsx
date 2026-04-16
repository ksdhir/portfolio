import type { Metadata } from "next";
import content from "@/data/beyond-code.json";

export const metadata: Metadata = {
  title: "Beyond Code - Karan Singh Dhir",
  description: "Life outside the editor - cycling, hiking, and reading.",
};

export default function BeyondCodePage() {
  return (
    <article className="py-10">
      <h2 className="mb-10 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight md:text-4xl">
        {content.heading}
      </h2>

      <div className="space-y-10 text-lg leading-relaxed text-gray-700">
        {content.sections.map((section, i) => (
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
  );
}
