import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink,
  TabStopPosition,
  TabStopType,
} from "docx";
import { readFileSync, writeFileSync } from "fs";

const resume = JSON.parse(readFileSync("data/resume.json", "utf-8"));

const FONT = "Calibri";
const FONT_SIZE = 21;
const HEADING_COLOR = "1a1a1a";
const TEXT_COLOR = "374151";
const LIGHT_COLOR = "6b7280";
const ACCENT_COLOR = "1a1a1a";

function sectionHeading(text) {
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

function parseBulletItem(item) {
  if (typeof item === "string") {
    return [
      new TextRun({ text: item, font: FONT, size: FONT_SIZE, color: TEXT_COLOR }),
    ];
  }

  // Item with links: parse {link text} patterns
  const children = [];
  let remaining = item.text;

  for (const [label, url] of Object.entries(item.links)) {
    const placeholder = `{${label}}`;
    const idx = remaining.indexOf(placeholder);
    if (idx === -1) continue;

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
    remaining = remaining.slice(idx + placeholder.length);
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

  return children;
}

function bullet(item) {
  return new Paragraph({
    children: parseBulletItem(item),
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
      new TextRun({ text: "\t", font: FONT }),
      new TextRun({
        text: dateLocation,
        font: FONT,
        size: FONT_SIZE,
        color: LIGHT_COLOR,
      }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 200, after: 0 },
  });
}

function jobTitle(title) {
  return new Paragraph({
    children: [
      new TextRun({ text: title, font: FONT, size: FONT_SIZE, color: LIGHT_COLOR }),
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

const children = [
  accentBar(),

  // Name
  new Paragraph({
    children: [
      new TextRun({
        text: resume.name,
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
        text: resume.title,
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
        text: resume.contact.map((c) => c.text).join(" | "),
        font: FONT,
        size: 18,
        color: LIGHT_COLOR,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),

  // Summary
  sectionHeading("Professional Summary"),
  new Paragraph({
    children: [
      new TextRun({
        text: resume.summary,
        font: FONT,
        size: FONT_SIZE,
        color: TEXT_COLOR,
      }),
    ],
    spacing: { after: 120 },
  }),

  // Skills
  sectionHeading("Technical Skills"),
  ...resume.skills.map(
    (s) =>
      new Paragraph({
        children: [
          new TextRun({
            text: `${s.category}: `,
            bold: true,
            font: FONT,
            size: FONT_SIZE,
            color: HEADING_COLOR,
          }),
          new TextRun({
            text: s.items,
            font: FONT,
            size: FONT_SIZE,
            color: TEXT_COLOR,
          }),
        ],
        spacing: { after: 40 },
      })
  ),

  // Experience
  sectionHeading("Professional Experience"),
  ...resume.experience.flatMap((job) => [
    jobHeader(job.company, `${job.date} | ${job.location}`),
    jobTitle(job.position),
    ...job.bullets.map((b) => bullet(b)),
  ]),

  // Certifications
  sectionHeading("Certifications"),
  ...resume.certifications.map(
    (c) =>
      new Paragraph({
        children: [
          new TextRun({
            text: c.name,
            bold: true,
            font: FONT,
            size: FONT_SIZE,
            color: TEXT_COLOR,
          }),
          new TextRun({
            text: ` (${c.year})`,
            font: FONT,
            size: FONT_SIZE,
            color: TEXT_COLOR,
          }),
        ],
        bullet: { level: 0 },
        spacing: { after: 60 },
      })
  ),

  // Education
  sectionHeading("Education"),
  ...resume.education.flatMap((e) => [
    jobHeader(e.institution, e.date),
    new Paragraph({
      children: [
        new TextRun({
          text: e.degree,
          font: FONT,
          size: FONT_SIZE,
          color: TEXT_COLOR,
        }),
      ],
      spacing: { after: 80 },
    }),
  ]),

  accentBar(),
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("public/resume.docx", buffer);
console.log("resume.docx generated from data/resume.json");
