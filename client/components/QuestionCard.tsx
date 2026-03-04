import { User2 } from "lucide-react";
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
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl px-5 py-4 flex items-center gap-0 hover:border-[#484f58] hover:bg-[#1c2128] transition-all duration-200 w-full group">
      {/* Partition 1 — Votes & Answers */}
      <div className="flex flex-col items-end text-xs text-[#8b949e] w-20 shrink-0 pr-4 gap-0.5">
        <span className="tabular-nums">{votes} votes</span>
        <span className="tabular-nums">{answers} answers</span>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-[#30363d] shrink-0" />

      {/* Partition 2 — Title & Tags */}
      <div className="flex flex-col gap-1.5 flex-1 px-4">
        <span className="text-[#c9d1d9] group-hover:text-[#e6edf3] font-medium text-sm leading-snug cursor-pointer transition-colors">
          {title}
        </span>
        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-[#21262d] border border-[#30363d] text-[#8b949e] px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-[#30363d] shrink-0" />

      {/* Partition 3 — Author & Time */}
      <div className="flex items-center gap-2 pl-4 shrink-0 w-52">
        <div className="w-6 h-6 rounded-full bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center shrink-0">
          <User2 size={12} className="text-[#a78bfa]" />
        </div>
        <span className="text-[#8b949e] text-xs leading-snug">
          <span className="text-[#e6edf3] font-medium">{author}</span>
          {" · "}
          <span className="text-[#484f58]">{timeAgo}</span>
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
