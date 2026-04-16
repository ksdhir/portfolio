"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/beyond-code", label: "Beyond Code" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="w-full px-6 pt-10 pb-6 sm:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <Link
          href="/"
          className="shrink-0 font-sans text-2xl font-bold tracking-tight text-slate-800"
        >
          Karan Singh Dhir
        </Link>
        <nav className="flex gap-6 text-sm text-gray-500">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-slate-800 ${
                pathname === link.href
                  ? "text-slate-800 underline underline-offset-4"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
