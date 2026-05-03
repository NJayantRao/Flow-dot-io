"use client";

import { useState } from "react";

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface AnswerCardProps {
  id?: number;
  body?: string;
  answeredBy?: string;
  timeAgo?: string;
  comments?: Comment[];
  isAccepted?: boolean;
}

function AnswerCard({
  id = 1,
  body = "This usually happens when the compiler detects a professor nearby.",
  answeredBy = "senior dev",
  timeAgo = "2h ago",
  comments = [
    { id: 1, username: "Jayant", text: "This is really helpful." },
    { id: 2, username: "Aman", text: "Can you explain more?" },
    { id: 3, username: "Riya", text: "Nice question!" },
  ],
  isAccepted = false,
}: AnswerCardProps) {
  const [showComments, setShowComments] = useState(false);

  // Parse basic markdown bold/code in body
  const renderInline = (text: string) =>
    text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="text-[var(--ob-text)] font-semibold">$1</strong>'
      )
      .replace(
        /`(.*?)`/g,
        '<code class="text-[var(--ob-primary)] bg-[rgba(129,236,255,0.08)] px-1.5 py-0.5 rounded font-mono text-[12px]">$1</code>'
      );

  return (
    <div
      id={`answer-card-${id}`}
      className={`ghost-border rounded-xl overflow-hidden transition-all ${
        isAccepted ? "flow-indicator" : ""
      }`}
      style={{ background: "var(--ob-surface-2)" }}
    >
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Accepted badge */}
        {isAccepted && (
          <span className="self-start text-[11px] font-mono font-semibold text-[var(--ob-primary)] bg-[rgba(129,236,255,0.1)] border border-[rgba(129,236,255,0.2)] px-3 py-1 rounded-full flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            Accepted Answer
          </span>
        )}

        {/* Body text */}
        <p
          className="text-[14px] leading-relaxed text-[var(--ob-text-muted)] whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: renderInline(body) }}
        />

        {/* Meta row: answered by / time */}
        <div className="flex items-center justify-between text-xs text-[var(--ob-text-subtle)]">
          <span>
            answered by{" "}
            <span className="text-[var(--ob-text-muted)] font-medium">
              {answeredBy}
            </span>
          </span>
          <span className="font-mono">{timeAgo}</span>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--ob-border)" }} />

        {/* View Comments toggle */}
        <div className="w-full">
          <button
            className="text-sm text-[var(--ob-primary)] hover:text-[var(--ob-text)] transition-colors duration-150 cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments
              ? "Hide Comments"
              : `View Comments (${comments.length})`}
          </button>

          {/* Expandable comments */}
          {showComments && (
            <div
              className="mt-3 ghost-border rounded-xl p-3 space-y-3"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start">
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-[rgba(166,140,255,0.12)] border border-[rgba(166,140,255,0.25)] flex items-center justify-center text-[10px] font-bold text-[var(--ob-secondary)] shrink-0">
                    {comment.username.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Content */}
                  <div>
                    <p className="text-[12px] font-medium text-[var(--ob-text)]">
                      {comment.username}
                    </p>
                    <p className="text-[12px] text-[var(--ob-text-muted)]">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
