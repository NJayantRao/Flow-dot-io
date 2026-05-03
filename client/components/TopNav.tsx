"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopNavProps {
  searchDefault?: string;
  showAskButton?: boolean;
}

export default function TopNav({
  searchDefault = "",
  showAskButton = false,
}: TopNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className="sticky top-0 z-50 w-full glass-panel border-b border-[var(--ob-border)]"
      style={{ borderBottom: "1px solid rgba(129,236,255,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0e0e14] text-xs font-bold obsidian-gradient"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {"</>"}
          </div>
          <span className="text-[15px] font-bold tracking-tight cyan-glow-text hidden sm:block">
            flow-dot-io
          </span>
        </Link>

        {/* Search bar (center, md+) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ob-text-subtle)] text-[18px]">
              search
            </span>
            <input
              id="topnav-search"
              type="search"
              defaultValue={searchDefault}
              placeholder="Search questions, tags…"
              className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--ob-border)] rounded-xl pl-9 pr-4 py-1.5 text-[13px] text-[var(--ob-text)] placeholder:text-[var(--ob-text-subtle)] outline-none focus:border-[rgba(129,236,255,0.35)] transition-colors"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: "Feed", href: "/get-questions", icon: "home" },
            { label: "Topics", href: "/topics", icon: "tag" },
            { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-[var(--ob-primary)] bg-[rgba(129,236,255,0.08)]"
                  : "text-[var(--ob-text-muted)] hover:text-[var(--ob-text)] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {showAskButton ? (
            <Link
              href="/create-question"
              className="obsidian-gradient hidden sm:flex items-center gap-1.5 text-[13px] px-4 py-1.5 rounded-xl transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Ask
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-[13px] font-medium text-[var(--ob-text-muted)] hover:text-[var(--ob-text)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="obsidian-gradient text-[13px] px-4 py-1.5 rounded-xl transition-all duration-200 hidden sm:block"
              >
                Join Free
              </Link>
            </>
          )}
          {/* Mobile search trigger */}
          <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--ob-text-muted)] hover:text-[var(--ob-text)] hover:bg-[rgba(255,255,255,0.06)]">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </button>
          {/* Avatar placeholder / profile link */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full overflow-hidden border border-[var(--ob-border)] flex items-center justify-center bg-[rgba(129,236,255,0.08)] hover:border-[rgba(129,236,255,0.35)] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[var(--ob-primary)]">
              person
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
