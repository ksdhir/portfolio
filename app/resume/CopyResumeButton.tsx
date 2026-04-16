"use client";

import { useState } from "react";

export default function CopyResumeButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const res = await fetch("/resume.txt");
    const text = await res.text();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded border border-accent/30 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
    >
      {copied ? "Copied!" : "Copy to Clipboard"}
    </button>
  );
}