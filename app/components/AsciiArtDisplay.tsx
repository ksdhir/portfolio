'use client'

import { useState, useCallback } from 'react'

type ArtPiece = {
  title: string
  artist: string
  art: string
}

function pickRandom(pieces: ArtPiece[], exclude?: number): number {
  if (pieces.length === 1) return 0
  let idx: number
  do {
    idx = Math.floor(Math.random() * pieces.length)
  } while (idx === exclude)
  return idx
}

export default function AsciiArtDisplay({
  pieces,
  buttonLabel,
}: {
  pieces: ArtPiece[]
  buttonLabel: string
}) {
  const [idx, setIdx] = useState(() => pickRandom(pieces))

  const next = useCallback(() => {
    setIdx((prev) => pickRandom(pieces, prev))
  }, [pieces])

  const piece = pieces[idx]

  return (
    <div className="flex flex-col items-center gap-6">
      <pre className="font-mono text-xs leading-tight text-slate-700 overflow-x-auto max-w-full">
        {piece.art}
      </pre>
      <p className="text-sm text-gray-400 italic">
        {piece.title} — {piece.artist}
      </p>
      <button
        onClick={next}
        className="rounded border border-slate-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-accent hover:text-accent"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
