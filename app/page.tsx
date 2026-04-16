import Image from "next/image";
import about from "@/data/about.json";
import RichText from "./components/RichText";

export default function AboutPage() {
  return (
    <article className="py-10">
      <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-12">
        <Image
          src={about.photo}
          alt="Karan Singh Dhir"
          width={200}
          height={200}
          className="shrink-0 rounded-full object-cover"
          priority
        />
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-slate-800 text-center md:text-left md:text-4xl">
          {about.heading}
        </h2>
      </div>

      <RichText items={about.paragraphs} />
    </article>
  );
}
