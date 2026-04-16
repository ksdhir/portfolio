import React from "react";

type TextItem =
  | string
  | { text: string; links: Record<string, string> };

function renderItem(item: TextItem, key: number) {
  if (typeof item === "string") {
    return <p key={key}>{item}</p>;
  }

  const parts: React.ReactNode[] = [];
  let remaining = item.text;
  let partKey = 0;

  for (const [label, url] of Object.entries(item.links)) {
    const placeholder = `{${label}}`;
    const idx = remaining.indexOf(placeholder);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push(<span key={partKey++}>{remaining.slice(0, idx)}</span>);
    }
    parts.push(
      <a
        key={partKey++}
        href={url}
        className="font-medium text-slate-800 underline underline-offset-2 hover:text-slate-500"
      >
        {label}
      </a>
    );
    remaining = remaining.slice(idx + placeholder.length);
  }
  if (remaining) {
    parts.push(<span key={partKey++}>{remaining}</span>);
  }

  return <p key={key}>{parts}</p>;
}

export default function RichText({ items }: { items: TextItem[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-gray-700">
      {items.map((item, i) => renderItem(item, i))}
    </div>
  );
}
