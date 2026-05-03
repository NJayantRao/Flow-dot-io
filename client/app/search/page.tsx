"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const searchResults = [
  {
    id: 1,
    title: "How do I manage global state in Next.js App Router with Zustand?",
    excerpt:
      "The recommended pattern for Zustand with Next.js App Router is to use a store provider that initializes the store with server data…",
    tags: ["nextjs", "react", "zustand"],
    votes: 42,
    answers: 7,
    views: 1240,
    author: "Arjun Mehta",
    timeAgo: "2 hours ago",
    isVerified: true,
  },
  {
    id: 2,
    title: "Zustand persist middleware not working with Next.js SSR",
    excerpt:
      "When using Zustand's persist middleware in a Next.js application, you need to handle the hydration mismatch between server and client rendering…",
    tags: ["zustand", "nextjs", "ssr"],
    votes: 28,
    answers: 4,
    views: 890,
    author: "Karan Joshi",
    timeAgo: "1 day ago",
    isVerified: false,
  },
  {
    id: 3,
    title: "React Query vs Zustand for managing server state in Next.js",
    excerpt:
      "Both libraries serve different purposes. React Query is specifically designed for server state management (fetching, caching, synchronization) while Zustand is a general client-side state manager…",
    tags: ["react-query", "zustand", "nextjs", "state-management"],
    votes: 67,
    answers: 12,
    views: 3400,
    author: "Priya Sharma",
    timeAgo: "3 days ago",
    isVerified: true,
  },
  {
    id: 4,
    title: "Zustand with TypeScript — how to type store slices properly?",
    excerpt:
      "Type-safe Zustand stores with slices pattern require careful typing of the combined store interface. Here's the recommended approach for large applications…",
    tags: ["zustand", "typescript"],
    votes: 19,
    answers: 3,
    views: 445,
    author: "Rohit Verma",
    timeAgo: "5 days ago",
    isVerified: false,
  },
];

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "zustand next.js";
  const [query, setQuery] = useState(queryParam);
  const [sort, setSort] = useState<"relevance" | "newest">("relevance");

  return (
    <div className="min-h-screen" style={{ background: "var(--ob-surface)" }}>
      <TopNav searchDefault={queryParam} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-80 h-80 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #81ecff 0%, transparent 70%)",
            top: "-4rem",
            right: "20%",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-8">
        {/* Search bar */}
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ob-text-subtle)] text-[20px]">
            search
          </span>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, tags, users…"
            className="w-full ghost-border rounded-2xl bg-[var(--ob-surface-2)] pl-12 pr-4 py-3.5 text-[15px] text-[var(--ob-text)] placeholder:text-[var(--ob-text-subtle)] outline-none focus:border-[rgba(129,236,255,0.4)] transition-colors"
          />
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div>
            <h1
              className="text-xl font-bold text-[var(--ob-text)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {searchResults.length} results
            </h1>
            <p className="text-[var(--ob-text-muted)] text-sm mt-0.5">
              for{" "}
              <span className="text-[var(--ob-primary)] font-mono">
                &ldquo;{queryParam}&rdquo;
              </span>
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 ghost-border rounded-xl p-1"
            style={{ background: "var(--ob-surface-2)" }}
          >
            {(["relevance", "newest"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all ${
                  sort === s
                    ? "obsidian-gradient"
                    : "text-[var(--ob-text-muted)] hover:text-[var(--ob-text)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Featured result */}
        <div
          className="ghost-border rounded-2xl overflow-hidden mb-4 group hover:border-[rgba(129,236,255,0.3)] transition-all flow-indicator"
          style={{ background: "var(--ob-surface-2)" }}
        >
          <div
            className="h-24 w-full relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(129,236,255,0.15) 0%, rgba(166,140,255,0.15) 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[80px] font-black font-mono opacity-5 text-[var(--ob-primary)] select-none">
                {"</>"}
              </span>
            </div>
            <div className="absolute top-3 left-6">
              <span className="text-[11px] font-mono font-semibold text-[var(--ob-primary)] bg-[rgba(129,236,255,0.12)] border border-[rgba(129,236,255,0.25)] px-3 py-1 rounded-full flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Top Result
              </span>
            </div>
          </div>
          <div className="p-5 pl-8">
            <h2 className="text-[var(--ob-text)] text-[15px] font-semibold group-hover:text-[var(--ob-primary)] transition-colors mb-2">
              {searchResults[0].title}
            </h2>
            <p className="text-[var(--ob-text-muted)] text-[13px] leading-relaxed line-clamp-2 mb-3">
              {searchResults[0].excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {searchResults[0].tags.map((t) => (
                <span key={t} className="ob-tag">
                  {t}
                </span>
              ))}
              <div className="ml-auto flex items-center gap-3 text-[11px] text-[var(--ob-text-subtle)]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    thumb_up
                  </span>
                  {searchResults[0].votes}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    chat_bubble
                  </span>
                  {searchResults[0].answers}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other results */}
        <div className="flex flex-col gap-3">
          {searchResults.slice(1).map((result) => (
            <Link
              key={result.id}
              href={`/answer-question?id=${result.id}`}
              className="ghost-border rounded-xl p-4 pl-6 flow-indicator hover:border-[rgba(129,236,255,0.25)] hover:bg-[rgba(129,236,255,0.03)] transition-all group block"
              style={{ background: "var(--ob-surface-2)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h2 className="text-[var(--ob-text)] text-[14px] font-semibold group-hover:text-[var(--ob-primary)] transition-colors">
                      {result.title}
                    </h2>
                    {result.isVerified && (
                      <span
                        className="material-symbols-outlined text-[16px] text-[var(--ob-primary)] shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--ob-text-muted)] text-[12px] leading-relaxed line-clamp-2 mb-3">
                    {result.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {result.tags.map((t) => (
                      <span key={t} className="ob-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 text-[11px] text-[var(--ob-text-subtle)]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      thumb_up
                    </span>
                    {result.votes} votes
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      chat_bubble
                    </span>
                    {result.answers} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      visibility
                    </span>
                    {result.views} views
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-[var(--ob-text-subtle)]">
                <div className="w-5 h-5 rounded-full bg-[rgba(129,236,255,0.08)] border border-[var(--ob-border)] flex items-center justify-center text-[9px] font-bold text-[var(--ob-primary)]">
                  {result.author.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[var(--ob-text-muted)]">
                  {result.author}
                </span>
                <span>·</span>
                <span>{result.timeAgo}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* No more results */}
        <div className="text-center py-8 text-[var(--ob-text-subtle)] text-[13px]">
          Showing all {searchResults.length} results for &ldquo;{queryParam}
          &rdquo;
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen"
          style={{ background: "var(--ob-surface)" }}
        />
      }
    >
      <SearchResultsInner />
    </Suspense>
  );
}
