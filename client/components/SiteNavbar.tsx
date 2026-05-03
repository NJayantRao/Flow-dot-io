"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Questions", href: "/get-questions" },
  { label: "Leaderboard", href: "/leaderboard" },
];

export default function SiteNavbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--flow-border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[var(--flow-text)] hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-[var(--flow-accent)] flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" fill="white" />
          </div>
          <span className="text-[15px] tracking-tight">Flow</span>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150 ${
                  active
                    ? "text-[var(--flow-text)] bg-[var(--flow-surface-2)]"
                    : "text-[var(--flow-text-muted)] hover:text-[var(--flow-text)] hover:bg-[var(--flow-surface)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/signin"
            className="text-[13px] font-medium text-[var(--flow-text-muted)] hover:text-[var(--flow-text)] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-semibold px-4 py-1.5 rounded-full bg-[var(--flow-text)] text-[var(--background)] hover:opacity-85 transition-opacity"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
