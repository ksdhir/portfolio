import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beyond Code - Karan Singh Dhir",
  description: "Life outside the editor - cycling, hiking, and reading.",
};

export default function BeyondCodePage() {
  return (
    <article className="py-10">
      <h2 className="mb-10 font-sans text-3xl font-bold tracking-tight">
        Beyond Code
      </h2>

      <div className="space-y-10 text-lg leading-relaxed text-gray-700">
        <section>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Cycling</h3>
          <p>
            There&apos;s something about being on a bike that clears the head
            better than any debugging session. Vancouver&apos;s trails make it
            easy to disappear for a few hours and come back with a fresh
            perspective.
          </p>
          <p className="mt-3 text-sm text-gray-400 italic">
            Photos coming soon.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Hiking</h3>
          <p>
            From the North Shore mountains to wherever the trail takes me. The
            best ideas usually show up somewhere between the trailhead and the
            summit.
          </p>
          <p className="mt-3 text-sm text-gray-400 italic">
            Photos coming soon.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold text-slate-800">Reading</h3>
          <p>
            I&apos;m a firm believer that good engineers read widely - not just
            technical books, but anything that builds empathy and perspective.
            Always happy to swap recommendations.
          </p>
        </section>
      </div>
    </article>
  );
}
