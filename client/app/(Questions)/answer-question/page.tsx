"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import MarkdownEditor from "@/components/MarkdownEditor";
import PostAnswerModal from "@/components/PostAnswerModal";
import AnswerCard from "@/components/AnswerCard";

/* ─── Static placeholder data ─────────────────────────────────────── */
const question = {
  id: 1,
  title: "This is a question on PHP",
  askedAgo: "1 hour ago",
  answersCount: 0,
  votes: 1,
  image: null as string | null, // null = no image attached
  body: "How do I handle sessions in PHP without security vulnerabilities? Looking for a modern approach.",
  author: "one user",
  authorInitials: "ON",
  tags: ["php", "sessions", "security"],
};

const answersData = [
  {
    id: 1,
    body: "This usually happens when the compiler detects a professor nearby.",
    answeredBy: "senior dev",
    timeAgo: "2h ago",
    isAccepted: false,
    comments: [
      { id: 1, username: "Jayant", text: "This is really helpful." },
      { id: 2, username: "Aman", text: "Can you explain more?" },
      { id: 3, username: "Riya", text: "Nice question!" },
    ],
  },
  {
    id: 2,
    body: "This usually happens when the compiler detects a professor nearby.",
    answeredBy: "senior dev",
    timeAgo: "2h ago",
    isAccepted: false,
    comments: [
      { id: 1, username: "Jayant", text: "This is really helpful." },
      { id: 2, username: "Aman", text: "Can you explain more?" },
      { id: 3, username: "Riya", text: "Nice question!" },
    ],
  },
  {
    id: 3,
    body: "This usually happens when the compiler detects a professor nearby.",
    answeredBy: "senior dev",
    timeAgo: "2h ago",
    isAccepted: false,
    comments: [
      { id: 1, username: "Jayant", text: "This is really helpful." },
      { id: 2, username: "Aman", text: "Can you explain more?" },
      { id: 3, username: "Riya", text: "Nice question!" },
    ],
  },
];

/* ─── Vote controls ────────────────────────────────────────────────── */
function VoteControls({
  votes,
  onUp,
  onDown,
}: {
  votes: number;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onUp}
        aria-label="Upvote"
        className="w-8 h-8 rounded-xl border border-[var(--ob-border)] flex items-center justify-center text-[var(--ob-text-subtle)] hover:text-[var(--ob-primary)] hover:border-[rgba(129,236,255,0.3)] transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          keyboard_arrow_up
        </span>
      </button>
      <span className="font-bold tabular-nums font-mono text-lg text-[var(--ob-primary)]">
        {votes}
      </span>
      <button
        onClick={onDown}
        aria-label="Downvote"
        className="w-8 h-8 rounded-xl border border-[var(--ob-border)] flex items-center justify-center text-[var(--ob-text-subtle)] hover:text-[var(--ob-primary)] hover:border-[rgba(129,236,255,0.3)] transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          keyboard_arrow_down
        </span>
      </button>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function AnswerQuestionPage() {
  const [votes, setVotes] = useState(question.votes);
  const [showComments, setShowComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [sortAnswers, setSortAnswers] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const questionComments = [
    {
      id: 1,
      username: "Priya",
      text: "Have you tried using React Context instead?",
    },
    {
      id: 2,
      username: "Rohit",
      text: "Great question, I had the same issue last week.",
    },
    {
      id: 3,
      username: "Sam",
      text: "Checkout the PHP docs, they have good examples.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ob-surface)" }}>
      <TopNav showAskButton />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #a68cff 0%, transparent 70%)",
            top: "-4rem",
            left: "5%",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-10">
        {/* ── Question Header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl sm:text-2xl font-bold text-[var(--ob-text)] leading-snug"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {question.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[12px] text-[var(--ob-text-subtle)] font-mono">
              <span>Asked {question.askedAgo}</span>
              <span className="opacity-40">|</span>
              <span>{question.answersCount} answers</span>
              <span className="opacity-40">|</span>
              <span>
                {votes} vote{votes !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Orange CTA button — matches design */}
          <button
            id="post-answer-btn"
            className="obsidian-gradient flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shrink-0"
            // style={{
            //   background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
            //   color: "#fff",
            //   boxShadow: "0 0 20px rgba(249,115,22,0.3)",
            // }}
            onClick={() => setOpenModal(true)}
          >
            Post Your Answer
          </button>
        </div>

        {/* Thin divider */}
        <div className="h-px my-4" style={{ background: "var(--ob-border)" }} />

        {/* ── Question Body Card ── */}
        <div className="flex gap-4 mb-4">
          {/* Vote sidebar */}
          <div className="shrink-0 flex flex-col items-center gap-2 pt-1">
            <VoteControls
              votes={votes}
              onUp={() => setVotes((v) => v + 1)}
              onDown={() => setVotes((v) => v - 1)}
            />
            {/* Bookmark */}
            <button
              id="bookmark-btn"
              onClick={() => setBookmarked(!bookmarked)}
              className="mt-1 w-8 h-8 flex items-center justify-center rounded-xl border border-[var(--ob-border)] hover:border-[rgba(129,236,255,0.3)] transition-colors"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  bookmarked
                    ? "text-[var(--ob-primary)]"
                    : "text-[var(--ob-text-subtle)]"
                }`}
                style={bookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                bookmark
              </span>
            </button>
          </div>

          {/* Card content */}
          <div
            className="ghost-border rounded-xl overflow-hidden flex-1 min-w-0"
            style={{ background: "var(--ob-surface-2)" }}
          >
            {/* Image placeholder */}
            <div
              className="w-full flex flex-col items-center justify-center py-10 border-b border-[var(--ob-border)]"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              {question.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={question.image}
                  alt="Question attachment"
                  className="max-h-64 object-contain rounded-lg"
                />
              ) : (
                <>
                  <span
                    className="material-symbols-outlined text-[40px] text-[var(--ob-text-subtle)] mb-1"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
                  >
                    image
                  </span>
                  <p className="text-[12px] text-[var(--ob-text-subtle)]">
                    No image attached
                  </p>
                </>
              )}
            </div>

            {/* Body text */}
            <div className="p-5">
              <p className="text-[14px] leading-relaxed text-[var(--ob-text-muted)]">
                {question.body.split(/(`[^`]+`)/g).map((seg, i) =>
                  seg.startsWith("`") && seg.endsWith("`") ? (
                    <code
                      key={i}
                      className="text-[var(--ob-primary)] bg-[rgba(129,236,255,0.08)] px-1.5 py-0.5 rounded font-mono text-[12px]"
                    >
                      {seg.slice(1, -1)}
                    </code>
                  ) : (
                    <span key={i}>{seg}</span>
                  )
                )}
              </p>

              {/* Tags */}
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {question.tags.map((tag) => (
                    <span key={tag} className="ob-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author row */}
              <div className="flex items-center justify-end mt-4 pt-3 border-t border-[var(--ob-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[rgba(129,236,255,0.1)] border border-[rgba(129,236,255,0.2)] flex items-center justify-center text-[10px] font-bold text-[var(--ob-primary)]">
                    {question.authorInitials}
                  </div>
                  <span className="text-[var(--ob-text)] text-[13px] font-medium">
                    {question.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Comments for question */}
        <div className="pl-12 mb-6">
          <button
            className="text-sm text-[var(--ob-primary)] hover:text-[var(--ob-text)] transition-colors duration-150"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments
              ? "Hide Comments"
              : `View Comments (${questionComments.length})`}
          </button>

          {showComments && (
            <div
              className="mt-3 ghost-border rounded-xl p-3 space-y-3"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {questionComments.map((c) => (
                <div key={c.id} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-[rgba(166,140,255,0.12)] border border-[rgba(166,140,255,0.25)] flex items-center justify-center text-[10px] font-bold text-[var(--ob-secondary)] shrink-0">
                    {c.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[var(--ob-text)]">
                      {c.username}
                    </p>
                    <p className="text-[12px] text-[var(--ob-text-muted)]">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Answers Section ── */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-[var(--ob-text)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {answersData.length} Answers
            </h2>
            <div className="flex items-center gap-1">
              {["Votes", "Newest", "Active"].map((s, i) => (
                <button
                  key={s}
                  onClick={() => setSortAnswers(i)}
                  className={`text-[12px] px-3 py-1.5 rounded-lg transition-colors ${
                    sortAnswers === i
                      ? "bg-[rgba(129,236,255,0.1)] text-[var(--ob-primary)] font-medium"
                      : "text-[var(--ob-text-muted)] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Answer cards */}
          {answersData.map((a) => (
            <AnswerCard
              key={a.id}
              id={a.id}
              body={a.body}
              answeredBy={a.answeredBy}
              timeAgo={a.timeAgo}
              isAccepted={a.isAccepted}
              comments={a.comments}
            />
          ))}
        </div>

        {/* ── Inline Answer Editor ── */}
      </div>

      <PostAnswerModal open={openModal} onClose={() => setOpenModal(false)} />
      <MobileNav />
    </div>
  );
}
