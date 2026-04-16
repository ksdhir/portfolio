import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink,
  TabStopPosition,
  TabStopType,
} from "docx";
import { writeFileSync } from "fs";

const FONT = "Calibri";
const FONT_SIZE = 21; // half-points (10.5pt)
const HEADING_COLOR = "1a1a1a";
const TEXT_COLOR = "374151";
const LIGHT_COLOR = "6b7280";
const ACCENT_COLOR = "1a1a1a";

function heading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        font: FONT,
        size: 22,
        color: HEADING_COLOR,
      }),
    ],
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "d1d5db" },
    },
  });
}

function bullet(text, linkParts) {
  if (linkParts) {
    const children = [];
    let remaining = text;
    for (const { label, url } of linkParts) {
      const idx = remaining.indexOf(label);
      if (idx > 0) {
        children.push(
          new TextRun({
            text: remaining.slice(0, idx),
            font: FONT,
            size: FONT_SIZE,
            color: TEXT_COLOR,
          })
        );
      }
      children.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: label,
              font: FONT,
              size: FONT_SIZE,
              color: HEADING_COLOR,
              underline: {},
            }),
          ],
          link: url,
        })
      );
      remaining = remaining.slice(idx + label.length);
    }
    if (remaining) {
      children.push(
        new TextRun({
          text: remaining,
          font: FONT,
          size: FONT_SIZE,
          color: TEXT_COLOR,
        })
      );
    }
    return new Paragraph({
      children,
      bullet: { level: 0 },
      spacing: { after: 60 },
    });
  }

  return new Paragraph({
    children: [
      new TextRun({ text, font: FONT, size: FONT_SIZE, color: TEXT_COLOR }),
    ],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function jobHeader(company, dateLocation) {
  return new Paragraph({
    children: [
      new TextRun({
        text: company,
        bold: true,
        font: FONT,
        size: 23,
        color: HEADING_COLOR,
      }),
      new TextRun({
        text: "\t",
        font: FONT,
      }),
      new TextRun({
        text: dateLocation,
        font: FONT,
        size: FONT_SIZE,
        color: LIGHT_COLOR,
      }),
    ],
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    spacing: { before: 200, after: 0 },
  });
}

function jobTitle(title) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        font: FONT,
        size: FONT_SIZE,
        color: LIGHT_COLOR,
      }),
    ],
    spacing: { after: 80 },
  });
}

function accentBar() {
  return new Paragraph({
    children: [new TextRun({ text: "", font: FONT, size: 4 })],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR },
    },
    spacing: { after: 200 },
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 900, right: 900 },
        },
      },
      children: [
        // Top accent bar
        accentBar(),

        // Name
        new Paragraph({
          children: [
            new TextRun({
              text: "KARAN SINGH DHIR",
              bold: true,
              font: FONT,
              size: 36,
              color: HEADING_COLOR,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
        }),

        // Title
        new Paragraph({
          children: [
            new TextRun({
              text: "Senior Software Engineer",
              font: FONT,
              size: 24,
              color: LIGHT_COLOR,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
        }),

        // Contact
        new Paragraph({
          children: [
            new TextRun({
              text: "+1 236 514 9613 | ksdhir.dev@gmail.com | linkedin.com/in/ksdhir | github.com/ksdhir | Vancouver, BC | Open to Relocate",
              font: FONT,
              size: 18,
              color: LIGHT_COLOR,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),

        // Professional Summary
        heading("Professional Summary"),
        new Paragraph({
          children: [
            new TextRun({
              text: "I'm a Senior Software Engineer who builds things that work for real people - exam platforms used by 217K students, health apps that support doctor-patient relationships and individual fitness, and internal tools that power the teams and ecosystems behind them. My strongest skill isn't in my tech stack - it's reading between the lines, understanding what people actually need, and building the right thing. I'm the person teams trust to bridge the gap between product, design, and engineering and make sure nothing falls through the cracks. AWS Solutions Architect certified.",
              font: FONT,
              size: FONT_SIZE,
              color: TEXT_COLOR,
            }),
          ],
          spacing: { after: 120 },
        }),

        // Technical Skills
        heading("Technical Skills"),
        ...([
          ["Languages", "TypeScript, JavaScript, Java, Python, HTML, CSS"],
          ["Frameworks & Runtime", "React.js, Next.js, Vue.js, Node.js, TailwindCSS, GraphQL"],
          ["Cloud & Serverless", "AWS (Lambda, API Gateway, EC2, RDS, S3, SQS, IAM, WAF, CloudFront) - AWS Solutions Architect Certified"],
          ["DevOps & Infrastructure", "Docker, AWS SAM, Jenkins, Vercel, CI/CD pipelines, Infrastructure as Code"],
          ["Databases", "DynamoDB, PostgreSQL, MongoDB, Neo4j (Certified Professional)"],
          ["CMS & Platforms", "Strapi, WordPress (Headless)"],
        ].map(
          ([label, value]) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${label}: `,
                  bold: true,
                  font: FONT,
                  size: FONT_SIZE,
                  color: HEADING_COLOR,
                }),
                new TextRun({
                  text: value,
                  font: FONT,
                  size: FONT_SIZE,
                  color: TEXT_COLOR,
                }),
              ],
              spacing: { after: 40 },
            })
        )),

        // Professional Experience
        heading("Professional Experience"),

        // Willow
        jobHeader("Willow Laboratories", "Sep 2024 - Present | Vancouver, BC"),
        jobTitle("Software Engineer II"),
        bullet(
          "Pitched and led the migration from WebView-based onboarding to a CMS-driven content pipeline - built a Quarkus microservice in Java to pull and serve content to mobile in real time, eliminating layout inconsistencies and enabling content updates without mobile releases."
        ),
        bullet(
          "Drove architecture improvements across 3 products (Nutu App, HCP Portal, Corporate Website), standardizing a shared component and icon library that reduced design inconsistencies and cut UI development time by 20%."
        ),
        bullet(
          "Architected a self-serve analytics dashboard using Apache Superset with centralized Keycloak authentication, eliminating manual reporting overhead for sales and marketing teams."
        ),
        bullet(
          "Delivered zero-downtime content publishing by implementing draft mode in Strapi CMS with on-demand cache invalidation in Next.js. Built and open-sourced a Strapi translation plugin to connect any translation API (DeepL, OpenAI) to Strapi for localization.",
          [
            {
              label: "Strapi translation plugin",
              url: "https://github.com/ksdhir/strapi-provider-translate-custom-api",
            },
          ]
        ),

        // Langara
        jobHeader("Langara College", "Oct 2023 - Aug 2024 | Vancouver, BC"),
        jobTitle("Full-Stack Developer"),
        bullet(
          "Reduced infrastructure costs to $0 and page load times by 40% by migrating the WMDD department site from AWS EC2 to Vercel with an optimized caching layer."
        ),
        bullet(
          "Developed langara-app.ca using Next.js with WordPress as a headless CMS, implementing custom post types for events, blogs, and student projects with structured metadata for SEO."
        ),

        // Vidya Mantra
        jobHeader(
          "Vidya Mantra EduSystems Pvt. Ltd.",
          "Jul 2018 - Aug 2023 | Noida, India"
        ),
        jobTitle("Senior Software Developer & Team Lead"),
        bullet(
          "Architected and shipped ExamPathFinder.com - a pan-India competitive exam platform serving 217K+ users with 273K+ questions, built on Vue.js and AWS Serverless (API Gateway, Lambda, SQS, DynamoDB, S3).",
          [{ label: "ExamPathFinder.com", url: "https://ExamPathFinder.com" }]
        ),
        bullet(
          "Built the ecosystem around the platform - a multilingual jobs and admissions portal, and an internal content authoring tool for tagged MCQ banks that reduced manual content operations time by 40%."
        ),
        bullet(
          "Led a cross-functional team of 6+ developers, establishing structured GitHub workflows and 1:1 mentorship. Took ownership early, was promoted to Senior."
        ),
        bullet(
          "Introduced Knowledge Sharing Fridays - weekly team presentations on individual features that improved documentation, kept the team engaged, and significantly reduced onboarding time after attrition."
        ),

        // Certifications
        heading("Certifications"),
        bullet("AWS Certified Solutions Architect - Associate (July 2024)"),
        bullet("Neo4j Certified Professional (2019, renewed 2024)"),

        // Education
        heading("Education"),
        jobHeader("Langara College", "2022 - 2023"),
        new Paragraph({
          children: [
            new TextRun({
              text: "Post-Degree Diploma - Web and Mobile App Design and Development",
              font: FONT,
              size: FONT_SIZE,
              color: TEXT_COLOR,
            }),
          ],
          spacing: { after: 80 },
        }),
        jobHeader("University of Delhi", "2014 - 2017"),
        new Paragraph({
          children: [
            new TextRun({
              text: "Bachelor of Commerce - Minor in Computer Applications in Business",
              font: FONT,
              size: FONT_SIZE,
              color: TEXT_COLOR,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Bottom accent bar
        accentBar(),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("public/resume.docx", buffer);
console.log("resume.docx generated successfully");
