"use client";

import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const mockQuestions = [
  {
    id: 1,
    votes: 42,
    answers: 7,
    views: 1240,
    title: "How do I manage global state in Next.js App Router with Zustand?",
    excerpt:
      "I'm building a Next.js 14 app using the App Router and I need to share auth state across multiple deeply-nested client components. I've been looking at Zustand but I'm not sure about the right hydration pattern…",
    tags: ["nextjs", "react", "zustand", "state-management"],
    author: "Arjun Mehta",
    authorRep: 3420,
    timeAgo: "2 hours ago",
    hasAccepted: true,
  },
  {
    id: 2,
    votes: 18,
    answers: 3,
    views: 560,
    title: "What is the difference between useEffect and useLayoutEffect?",
    excerpt:
      "Both hooks seem to do the same thing but the docs say useLayoutEffect fires synchronously after DOM mutations. In practice, when should I choose one over the other?",
    tags: ["react", "hooks"],
    author: "Priya Sharma",
    authorRep: 1205,
    timeAgo: "1 day ago",
    hasAccepted: false,
  },
  {
    id: 3,
    votes: 67,
    answers: 12,
    views: 3800,
    title:
      "TypeScript generics with constraints — how to narrow a union type correctly?",
    excerpt:
      "I have a generic function that accepts a union type but TypeScript complains about narrowing. I'm using `extends` constraint but the narrowing inside the function body doesn't work as expected.",
    tags: ["typescript", "generics", "type-narrowing"],
    author: "Karan Joshi",
    authorRep: 8910,
    timeAgo: "3 days ago",
    hasAccepted: true,
  },
  {
    id: 4,
    votes: 9,
    answers: 0,
    views: 145,
    title: "Prisma relation queries throwing N+1 — what's the recommended fix?",
    excerpt:
      "Using Prisma with PostgreSQL and my dashboard endpoint is making 30+ queries. I included the `include` option but it's still N+1 in some nested relations.",
    tags: ["prisma", "postgresql", "performance"],
    author: "Sneha Patel",
    authorRep: 640,
    timeAgo: "5 days ago",
    hasAccepted: false,
  },
  {
    id: 5,
    votes: 3,
    answers: 1,
    views: 88,
    title:
      "Docker multi-stage build fails with node_modules not found in production stage",
    excerpt:
      "My Dockerfile uses multi-stage builds to keep the final image small but the production stage can't find node_modules from the builder stage.",
    tags: ["docker", "nodejs"],
    author: "Rohit Verma",
    authorRep: 390,
    timeAgo: "25 minutes ago",
    hasAccepted: false,
  },
];

const hotQuestions = [
  {
    title: "React Server Components vs Client Components — when to use which?",
    votes: 234,
  },
  {
    title: "Why is my Kubernetes pod constantly in CrashLoopBackOff?",
    votes: 178,
  },
  {
    title: "How does the V8 engine handle async/await under the hood?",
    votes: 156,
  },
  {
    title: "PostgreSQL JSONB vs separate tables — performance trade-offs?",
    votes: 134,
  },
  { title: "What are the new features in TypeScript 5.4?", votes: 112 },
];

const popularTags = [
  { name: "react", count: 482 },
  { name: "typescript", count: 317 },
  { name: "nextjs", count: 289 },
  { name: "postgresql", count: 204 },
  { name: "docker", count: 178 },
  { name: "python", count: 156 },
  { name: "rust", count: 98 },
  { name: "kubernetes", count: 87 },
];

const tabs = ["Newest", "Active", "Unsolved", "Votes"];

function VoteBadge({ votes }: { votes: number }) {
  const positive = votes > 0;
  return (
    <div
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl text-center shrink-0 border ${
        positive
          ? "border-[rgba(129,236,255,0.2)] bg-[rgba(129,236,255,0.06)]"
          : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
      }`}
    >
      <span
        className={`text-lg font-bold leading-none font-mono ${
          positive ? "text-[var(--ob-primary)]" : "text-[var(--ob-text-subtle)]"
        }`}
      >
        {votes}
      </span>
      <span className="text-[9px] text-[var(--ob-text-subtle)] uppercase tracking-widest mt-0.5">
        votes
      </span>
    </div>
  );
}

function AnswerBadge({
  count,
  hasAccepted,
}: {
  count: number;
  hasAccepted: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl text-center shrink-0 border ${
        hasAccepted
          ? "border-[rgba(129,236,255,0.3)] bg-[rgba(129,236,255,0.1)] text-[var(--ob-primary)]"
          : count > 0
            ? "border-[rgba(166,140,255,0.2)] bg-[rgba(166,140,255,0.06)] text-[var(--ob-secondary)]"
            : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[var(--ob-text-subtle)]"
      }`}
    >
      {hasAccepted && (
        <span
          className="material-symbols-outlined text-[14px] mb-0.5"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      )}
      <span className="text-lg font-bold leading-none font-mono">{count}</span>
      <span className="text-[9px] uppercase tracking-widest mt-0.5 opacity-70">
        ans
      </span>
    </div>
  );
}

export default function GetQuestionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (() => {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-questions`)
        .catch(() => {});
    })();
  }, []);

  const filtered = mockQuestions.filter((q) =>
    searchQuery
      ? q.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--ob-surface)" }}>
      <TopNav showAskButton />

      {/* Decorative glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #81ecff 0%, transparent 70%)",
            top: "-8rem",
            right: "10%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #a68cff 0%, transparent 70%)",
            bottom: "20%",
            left: "5%",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* ── Main Feed ── */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Questions{" "}
                  <span className="text-[var(--ob-text-subtle)] text-base font-normal">
                    ({filtered.length})
                  </span>
                </h1>
                <p className="text-[var(--ob-text-muted)] text-sm mt-0.5">
                  Browse and discover coding questions from the community
                </p>
              </div>
              <Link
                href="/create-question"
                className="obsidian-gradient flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-xl transition-all duration-200"
                id="ask-question-btn"
              >
                <span className="material-symbols-outlined text-[16px]">
                  add
                </span>
                Ask a Question
              </Link>
            </div>

            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ob-text-subtle)] text-[18px]">
                search
              </span>
              <input
                id="questions-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full ghost-border rounded-xl bg-[rgba(255,255,255,0.03)] pl-10 pr-4 py-2.5 text-[14px] text-[var(--ob-text)] placeholder:text-[var(--ob-text-subtle)] outline-none focus:border-[rgba(129,236,255,0.35)] transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 border-b border-[var(--ob-border)] pb-0">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  id={`tab-${tab.toLowerCase()}`}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-all duration-150 rounded-t-lg ${
                    activeTab === i
                      ? "text-[var(--ob-primary)] border-[var(--ob-primary)] bg-[rgba(129,236,255,0.05)]"
                      : "text-[var(--ob-text-muted)] border-transparent hover:text-[var(--ob-text)] hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Question Cards */}
            <div className="flex flex-col gap-3">
              {filtered.map((q) => (
                <Link
                  key={q.id}
                  href={`/answer-question?id=${q.id}`}
                  id={`question-card-${q.id}`}
                  className="group block ghost-border rounded-xl p-4 transition-all duration-200 hover:bg-[rgba(129,236,255,0.04)] hover:border-[rgba(129,236,255,0.25)] flow-indicator"
                  style={{ background: "var(--ob-surface-2)" }}
                >
                  <div className="flex gap-4 items-start pl-3">
                    {/* Stats column */}
                    <div className="hidden sm:flex flex-col gap-2 shrink-0">
                      <VoteBadge votes={q.votes} />
                      <AnswerBadge
                        count={q.answers}
                        hasAccepted={q.hasAccepted}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[var(--ob-text)] text-[15px] font-semibold leading-snug group-hover:text-[var(--ob-primary)] transition-colors">
                        {q.title}
                      </h2>
                      <p className="text-[var(--ob-text-muted)] text-[13px] leading-relaxed mt-1.5 line-clamp-2">
                        {q.excerpt}
                      </p>

                      {/* Mobile stats */}
                      <div className="sm:hidden flex items-center gap-3 mt-2 text-xs text-[var(--ob-text-subtle)]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            thumb_up
                          </span>
                          {q.votes}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            chat_bubble
                          </span>
                          {q.answers}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            visibility
                          </span>
                          {q.views}
                        </span>
                      </div>

                      {/* Tags + meta row */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {q.tags.map((tag) => (
                            <span key={tag} className="ob-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-[11px] text-[var(--ob-text-subtle)] shrink-0">
                          <div className="w-5 h-5 rounded-full bg-[rgba(129,236,255,0.1)] border border-[rgba(129,236,255,0.2)] flex items-center justify-center text-[9px] font-bold text-[var(--ob-primary)]">
                            {q.author.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-[var(--ob-text-muted)] font-medium">
                            {q.author}
                          </span>
                          <span>·</span>
                          <span>{q.timeAgo}</span>
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:inline">
                            {q.views.toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div
                  className="ghost-border rounded-xl py-16 text-center"
                  style={{ background: "var(--ob-surface-2)" }}
                >
                  <span className="material-symbols-outlined text-[48px] text-[var(--ob-text-subtle)]">
                    search_off
                  </span>
                  <p className="text-[var(--ob-text-muted)] mt-2">
                    No questions match your search
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
