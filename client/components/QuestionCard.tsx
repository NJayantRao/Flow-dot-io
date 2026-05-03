import React from "react";

interface QuestionCardProps {
  votes?: number;
  answers?: number;
  title?: string;
  tags?: string[];
  author?: string;
  timeAgo?: string;
}

const QuestionCard = ({
  votes = 0,
  answers = 0,
  title = "What is programming?",
  tags = [],
  author = "one user",
  timeAgo = "25 minutes ago",
}: QuestionCardProps) => {
  return (
    <div
      className="ghost-border rounded-xl px-5 py-4 flex items-center gap-0 hover:bg-[rgba(255,255,255,0.02)] transition-all duration-200 w-full group cursor-pointer"
      style={{ background: "var(--ob-surface-2)" }}
    >
      {/* Partition 1 — Votes & Answers */}
      <div className="flex flex-col items-end text-xs text-[var(--ob-text-subtle)] w-20 shrink-0 pr-4 gap-0.5 font-mono">
        <span className="tabular-nums">{votes} votes</span>
        <span className="tabular-nums text-[var(--ob-text-muted)]">
          {answers} answers
        </span>
      </div>

      {/* Divider */}
      <div
        className="w-px h-10 shrink-0"
        style={{ background: "var(--ob-border)" }}
      />

      {/* Partition 2 — Title & Tags */}
      <div className="flex flex-col gap-1.5 flex-1 px-4">
        <span className="text-[var(--ob-text)] group-hover:text-[var(--ob-primary)] font-medium text-sm leading-snug transition-colors duration-150">
          {title}
        </span>
        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="ob-tag text-[10px]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        className="w-px h-10 shrink-0"
        style={{ background: "var(--ob-border)" }}
      />

      {/* Partition 3 — Author & Time */}
      <div className="flex items-center gap-2 pl-4 shrink-0 w-52">
        <div className="w-6 h-6 rounded-full bg-[rgba(129,236,255,0.1)] border border-[rgba(129,236,255,0.2)] flex items-center justify-center text-[9px] font-bold text-[var(--ob-primary)] shrink-0">
          {author.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-[var(--ob-text-subtle)] text-xs leading-snug">
          <span className="text-[var(--ob-text)] font-medium">{author}</span>
          {" · "}
          <span className="text-[var(--ob-text-subtle)]">{timeAgo}</span>
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
