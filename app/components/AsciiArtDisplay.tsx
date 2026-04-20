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
      <div className="rounded-lg bg-black p-6 w-full max-w-2xl overflow-x-auto">
        <pre className="font-mono text-xs leading-tight text-gray-200 whitespace-pre">
          {piece.art}
        </pre>
        <p className="mt-4 text-xs text-gray-500 italic">
          {piece.title} — {piece.artist}
        </p>
      </div>
      <button
        onClick={next}
        className="rounded border border-slate-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-accent hover:text-accent"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
