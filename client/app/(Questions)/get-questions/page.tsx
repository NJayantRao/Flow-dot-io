import ContributorsCard from "@/components/ContributorsCard";
import QuestionCard from "@/components/QuestionCard";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import React from "react";

const questions = [
  {
    votes: 8,
    answers: 3,
    title: "How do I manage global state in Next.js App Router?",
    tags: ["nextjs", "react"],
    author: "one user",
    timeAgo: "2 hours ago",
  },
  {
    votes: 5,
    answers: 1,
    title: "What is the difference between useEffect and useLayoutEffect?",
    tags: ["react", "hooks"],
    author: "one user",
    timeAgo: "1 day ago",
  },
  {
    votes: 12,
    answers: 4,
    title: "TypeScript generics with constraints — how to narrow type?",
    tags: ["typescript"],
    author: "one user",
    timeAgo: "3 days ago",
  },
  {
    votes: 3,
    answers: 0,
    title: "Prisma relation queries throwing N+1 — best fix?",
    tags: ["prisma", "database"],
    author: "one user",
    timeAgo: "5 days ago",
  },
  {
    votes: 0,
    answers: 0,
    title: "This is a question on PHP",
    tags: [],
    author: "one user",
    timeAgo: "25 minutes ago",
  },
];

const contributors = [
  { name: "one user", timeAgo: "29 seconds ago", reputation: 1240 },
  { name: "dev_ninja", timeAgo: "5 minutes ago", reputation: 4820 },
  { name: "react_guru", timeAgo: "12 minutes ago", reputation: 3510 },
];

const tabs = ["Newest", "Active", "Unanswered", "Votes"];

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-8">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-[20px] font-bold text-[#e6edf3] leading-none">
              All Questions
            </h1>
            <p className="text-[13px] text-[#8b949e] mt-1.5">
              {questions.length} questions
            </p>
          </div>
          <a
            href="/create-question"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150 shrink-0"
          >
            <MessageSquare size={15} />
            Ask a Question
          </a>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]"
            />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-[#e6edf3] placeholder:text-[#484f58] outline-none focus:border-[#7c6af7]/60 transition-colors duration-150"
            />
          </div>
          <button className="flex items-center gap-2 text-[13px] text-[#8b949e] bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] px-3.5 py-2.5 rounded-lg transition-colors duration-150">
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 border-b border-[#21262d]">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors duration-150 -mb-px ${
                i === 0
                  ? "text-[#e6edf3] border-[#f97316]"
                  : "text-[#8b949e] border-transparent hover:text-[#c9d1d9] hover:border-[#484f58]"
              }`}
            >
              {i === 0 && (
                <TrendingUp
                  size={12}
                  className="inline mr-1.5 text-orange-400"
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* ── Content: Questions + Sidebar ── */}
        <div className="flex gap-6 items-start">
          {/* Questions List */}
          <div className="flex-[1.4] flex flex-col gap-3 min-w-0">
            {questions.map((q, idx) => (
              <QuestionCard key={idx} {...q} />
            ))}
          </div>

          {/* Top Contributors */}
          <div className="w-80 shrink-0 flex flex-col gap-3">
            <h2 className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">
              Top Contributors
            </h2>
            <ContributorsCard contributors={contributors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
