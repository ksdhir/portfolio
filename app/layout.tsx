import type { ReactNode } from 'react'

// Minimal root layout — html/body live in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as React.ReactElement
}
