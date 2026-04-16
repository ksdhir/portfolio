import Image from "next/image";

export default function AboutPage() {
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
          Hello! I&apos;m Karan and I&apos;m a software engineer.
        </h2>
      </div>

      <div className="space-y-6 text-lg leading-relaxed text-gray-700">
        <p>
          I build products that people actually use - an exam platform serving
          217K students across India, health apps that support patient care, and
          the dashboards and platforms that teams rely on to do their work.
          I&apos;ve worked across healthcare, edtech, and SaaS.
        </p>

        <p>
          I thrive when I&apos;m bridging the gap between what people ask for
          and what they actually need. Beyond the tech, my strongest skill is
          reading between the lines - I&apos;m the person teams put in when it
          matters. Whether it&apos;s leading a team, pitching an idea that
          changes how a product works, or sitting with design to get the UX
          right, I care about building the right thing, not just building things
          right.
        </p>

        <p>
          When I&apos;m not coding, you&apos;ll find me on a cycling trail, out
          on a hike, or lost in a good book.
        </p>

        <p>
          If you&apos;d like to talk about opportunities or just swap book
          recommendations, feel free to shoot me an{" "}
          <a
            href="mailto:ksdhir.dev@gmail.com"
            className="font-medium text-slate-800 underline underline-offset-2 hover:text-slate-500"
          >
            email
          </a>{" "}
          or reach out on{" "}
          <a
            href="https://linkedin.com/in/ksdhir"
            className="font-medium text-slate-800 underline underline-offset-2 hover:text-slate-500"
          >
            LinkedIn
          </a>
          . I&apos;m based in Vancouver, BC and open to relocating.
        </p>
      </div>
    </article>
  );
}
