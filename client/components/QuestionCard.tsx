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
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-center gap-0 hover:border-[#3a3a3a] transition-colors duration-200 w-full">
      {/* Partition 1 — Votes & Answers */}
      <div className="flex flex-col items-end text-xs text-zinc-400 w-20 shrink-0 pr-4">
        <span>{votes} votes</span>
        <span>{answers} answers</span>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-[#2e2e2e] shrink-0" />

      {/* Partition 2 — Title & Tags */}
      <div className="flex flex-col gap-1.5 flex-1 px-4">
        <span className="text-[#7c6af7] font-medium text-sm leading-snug hover:text-[#9b8fff] cursor-pointer transition-colors">
          {title}
        </span>
        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-[#252525] border border-[#333] text-zinc-400 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-[#2e2e2e] shrink-0" />

      {/* Partition 3 — Author & Time */}
      <div className="flex items-center gap-2 pl-4 shrink-0 w-52">
        <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
          <User2 size={11} className="text-white" />
        </div>
        <span className="text-zinc-400 text-xs leading-snug">
          <span className="text-zinc-200 font-medium">{author}</span>{" "}
          <span className="text-zinc-600 font-semibold">I</span> asked {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
