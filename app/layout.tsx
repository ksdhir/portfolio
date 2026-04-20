import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karan Singh Dhir",
  description:
    "Senior Software Engineer building products that work for real people.",
  openGraph: {
    title: "Karan Singh Dhir",
    description:
      "Senior Software Engineer building products that work for real people.",
    siteName: "Karan Singh Dhir",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Singh Dhir",
    description:
      "Senior Software Engineer building products that work for real people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Nav />
        <main className="mx-auto w-full max-w-[52rem] flex-1 px-8 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
