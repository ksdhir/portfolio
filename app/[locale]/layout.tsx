import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import Nav from '../components/Nav'
import '../globals.css'
import { routing, type Locale } from '@/i18n/routing'
import { buildMetadata } from '@/app/lib/metadata'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isEn = locale === 'en'
  return buildMetadata({
    title: 'Karan Singh Dhir',
    description: isEn
      ? 'Senior Software Engineer building products that work for real people.'
      : 'Ingénieur Logiciel Senior qui construit des produits qui fonctionnent pour de vraies personnes.',
  })
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NextIntlClientProvider>
          <Nav />
          <main className="mx-auto w-full max-w-[52rem] flex-1 px-8 pb-16">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
