import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karan Singh Dhir - Resume",
  description:
    "Senior Software Engineer with 8+ years building full-stack products across healthcare, edtech, and SaaS.",
};

export default function ResumePage() {
  return (
    <main className="resume-page mx-auto max-w-[52rem] bg-white px-8 py-12 font-sans text-[15px] leading-relaxed text-gray-900 print:max-w-none print:px-0 print:py-0">
      {/* Top accent bar */}
      <div className="mb-8 h-1 w-full bg-gray-900 print:mb-6" />

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          KARAN SINGH DHIR
        </h1>
        <p className="mb-3 text-lg font-medium text-gray-600">
          Senior Software Engineer
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <span>+1 236 514 9613</span>
          <span className="text-gray-300">|</span>
          <a href="mailto:ksdhir.dev@gmail.com" className="hover:text-gray-900">
            ksdhir.dev@gmail.com
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="https://linkedin.com/in/ksdhir"
            className="hover:text-gray-900"
          >
            linkedin.com/in/ksdhir
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="https://github.com/ksdhir"
            className="hover:text-gray-900"
          >
            github.com/ksdhir
          </a>
          <span className="text-gray-300">|</span>
          <span>Vancouver, BC</span>
          <span className="text-gray-300">|</span>
          <span>Open to Relocate</span>
        </p>
      </header>

      <hr className="mb-6 border-gray-200" />

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Professional Summary
        </h2>
        <p className="text-gray-700">
          I&apos;m a Senior Software Engineer who builds things that work for
          real people - exam platforms used by 217K students, health apps that
          support doctor-patient relationships and individual fitness, and
          internal tools that power the teams and ecosystems behind them. My
          strongest skill isn&apos;t in my tech stack - it&apos;s reading between
          the lines, understanding what people actually need, and building the
          right thing. I&apos;m the person teams trust to bridge the gap between
          product, design, and engineering and make sure nothing falls through
          the cracks. AWS Solutions Architect certified.
        </p>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Technical Skills
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="font-semibold text-gray-900">Languages</dt>
          <dd className="text-gray-700">
            TypeScript, JavaScript, Java, Python, HTML, CSS
          </dd>
          <dt className="font-semibold text-gray-900">Frameworks & Runtime</dt>
          <dd className="text-gray-700">
            React.js, Next.js, Vue.js, Node.js, TailwindCSS, GraphQL
          </dd>
          <dt className="font-semibold text-gray-900">Cloud & Serverless</dt>
          <dd className="text-gray-700">
            AWS (Lambda, API Gateway, EC2, RDS, S3, SQS, IAM, WAF, CloudFront)
            - AWS Solutions Architect Certified
          </dd>
          <dt className="font-semibold text-gray-900">
            DevOps & Infrastructure
          </dt>
          <dd className="text-gray-700">
            Docker, AWS SAM, Jenkins, Vercel, CI/CD pipelines, Infrastructure as
            Code
          </dd>
          <dt className="font-semibold text-gray-900">Databases</dt>
          <dd className="text-gray-700">
            DynamoDB, PostgreSQL, MongoDB, Neo4j (Certified Professional)
          </dd>
          <dt className="font-semibold text-gray-900">CMS & Platforms</dt>
          <dd className="text-gray-700">Strapi, WordPress (Headless)</dd>
        </dl>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Professional Experience
        </h2>

        {/* Willow */}
        <div className="mb-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-base font-bold text-gray-900">
              Willow Laboratories
            </h3>
            <span className="text-sm text-gray-500">
              Sep 2024 – Present | Vancouver, BC
            </span>
          </div>
          <p className="text-sm text-gray-600">Software Engineer II</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-gray-700">
            <li>
              Pitched and led the migration from WebView-based onboarding to a
              CMS-driven content pipeline - built a Quarkus microservice in Java
              to pull and serve content to mobile in real time, eliminating
              layout inconsistencies and enabling content updates without mobile
              releases.
            </li>
            <li>
              Drove architecture improvements across 3 products (Nutu App, HCP
              Portal, Corporate Website), standardizing a shared component and
              icon library that reduced design inconsistencies and cut UI
              development time by 20%.
            </li>
            <li>
              Architected a self-serve analytics dashboard using Apache Superset
              with centralized Keycloak authentication, eliminating manual
              reporting overhead for sales and marketing teams.
            </li>
            <li>
              Delivered zero-downtime content publishing by implementing draft
              mode in Strapi CMS with on-demand cache invalidation in Next.js.
              Built and open-sourced a{" "}
              <a
                href="https://github.com/ksdhir/strapi-provider-translate-custom-api"
                className="text-gray-900 underline decoration-gray-300 hover:decoration-gray-900 print:no-underline"
              >
                Strapi translation plugin
              </a>{" "}
              to connect any translation API (DeepL, OpenAI) to Strapi for
              localization.
            </li>
          </ul>
        </div>

        {/* Langara */}
        <div className="mb-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-base font-bold text-gray-900">
              Langara College
            </h3>
            <span className="text-sm text-gray-500">
              Oct 2023 – Aug 2024 | Vancouver, BC
            </span>
          </div>
          <p className="text-sm text-gray-600">Full-Stack Developer</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-gray-700">
            <li>
              Reduced infrastructure costs to $0 and page load times by 40% by
              migrating the WMDD department site from AWS EC2 to Vercel with an
              optimized caching layer.
            </li>
            <li>
              Developed langara-app.ca using Next.js with WordPress as a
              headless CMS, implementing custom post types for events, blogs, and
              student projects with structured metadata for SEO.
            </li>
          </ul>
        </div>

        {/* Vidya Mantra */}
        <div className="mb-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-base font-bold text-gray-900">
              Vidya Mantra EduSystems Pvt. Ltd.
            </h3>
            <span className="text-sm text-gray-500">
              Jul 2018 – Aug 2023 | Noida, India
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Senior Software Developer & Team Lead
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-gray-700">
            <li>
              Architected and shipped{" "}
              <a
                href="https://ExamPathFinder.com"
                className="text-gray-900 underline decoration-gray-300 hover:decoration-gray-900 print:no-underline"
              >
                ExamPathFinder.com
              </a>{" "}
              - a pan-India competitive exam platform serving 217K+ users with
              273K+ questions, built on Vue.js and AWS Serverless (API Gateway,
              Lambda, SQS, DynamoDB, S3).
            </li>
            <li>
              Built the ecosystem around the platform - a multilingual jobs and
              admissions portal, and an internal content authoring tool for
              tagged MCQ banks that reduced manual content operations time by
              40%.
            </li>
            <li>
              Led a cross-functional team of 6+ developers, establishing
              structured GitHub workflows and 1:1 mentorship. Took ownership
              early, was promoted to Senior.
            </li>
            <li>
              Introduced Knowledge Sharing Fridays - weekly team presentations on
              individual features that improved documentation, kept the team
              engaged, and significantly reduced onboarding time after attrition.
            </li>
          </ul>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-6">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Certifications
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          <li>
            <span className="font-semibold">
              AWS Certified Solutions Architect - Associate
            </span>{" "}
            (July 2024)
          </li>
          <li>
            <span className="font-semibold">Neo4j Certified Professional</span>{" "}
            (2019, renewed 2024)
          </li>
        </ul>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-900">
          Education
        </h2>
        <div className="mb-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="font-semibold text-gray-900">Langara College</p>
            <span className="text-sm text-gray-500">2022 – 2023</span>
          </div>
          <p className="text-gray-700">
            Post-Degree Diploma - Web and Mobile App Design and Development
          </p>
        </div>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="font-semibold text-gray-900">University of Delhi</p>
            <span className="text-sm text-gray-500">2014 – 2017</span>
          </div>
          <p className="text-gray-700">
            Bachelor of Commerce - Minor in Computer Applications in Business
          </p>
        </div>
      </section>

      {/* Bottom accent bar */}
      <div className="h-1 w-full bg-gray-900" />
    </main>
  );
}
