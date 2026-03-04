"use client";

import {
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  Flag,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";

const question = {
  title: "This is a question on PHP",
  askedAgo: "1 hour ago",
  answers: 0,
  votes: 1,
  tags: ["php"],
  body: "How do I handle sessions in PHP without security vulnerabilities? Looking for a modern approach.",
  author: "one user",
};

const Page = () => {
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("# My Answer\n\n");
  const [votes, setVotes] = useState(question.votes);

  return (
    <div className="min-h-screen w-full bg-[#0d1117] flex flex-col">
      <div className="flex-1 px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* ── Header Row ── */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#e6edf3] text-xl font-semibold leading-snug">
                {question.title}
              </h1>
              <div className="flex items-center gap-4 text-[#484f58] text-xs">
                <span>Asked {question.askedAgo}</span>
                <span className="text-[#30363d]">·</span>
                <span>
                  {question.answers} answer{question.answers !== 1 ? "s" : ""}
                </span>
                <span className="text-[#30363d]">·</span>
                <span>
                  {votes} vote{votes !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <a
              href="/get-questions"
              className="shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150 whitespace-nowrap"
            >
              <MessageSquare size={14} />
              Ask a Question
            </a>
          </div>

          <div className="h-px bg-[#21262d]" />

          {/* ── Question Body ── */}
          <div className="flex gap-5 items-start">
            {/* Vote Controls */}
            <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
              <button
                onClick={() => setVotes((v) => v + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#30363d] text-[#484f58] hover:border-orange-500/60 hover:text-orange-400 transition-colors"
              >
                <ChevronUp size={18} />
              </button>
              <span className="text-[#e6edf3] text-base font-semibold tabular-nums">
                {votes}
              </span>
              <button
                onClick={() => setVotes((v) => v - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#30363d] text-[#484f58] hover:border-orange-500/60 hover:text-orange-400 transition-colors"
              >
                <ChevronDown size={18} />
              </button>
              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  className="text-[#484f58] hover:text-[#8b949e] transition-colors"
                  title="Share"
                >
                  <Share2 size={15} />
                </button>
                <button
                  className="text-[#484f58] hover:text-[#8b949e] transition-colors"
                  title="Bookmark"
                >
                  <Bookmark size={15} />
                </button>
                <button
                  className="text-[#484f58] hover:text-red-400/70 transition-colors"
                  title="Flag"
                >
                  <Flag size={15} />
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-xl px-6 py-5 flex flex-col gap-4">
              <div className="flex gap-2 flex-wrap">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-[#21262d] border border-[#30363d] text-[#8b949e] px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-[#c9d1d9] text-[13.5px] leading-relaxed">
                {question.body}
              </p>
              <div className="flex items-center justify-end pt-2 border-t border-[#21262d]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center text-[#a78bfa] text-[10px] font-bold">
                    {question.author.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[#8b949e] text-xs">
                    <span className="text-[#e6edf3] font-medium">
                      {question.author}
                    </span>
                    {" · asked "}
                    {question.askedAgo}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Add Comment ── */}
          <div className="flex gap-3 items-center ml-13">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-[13px] text-[#e6edf3] placeholder:text-[#484f58] outline-none focus:border-[#7c6af7]/60 transition-colors"
            />
            <button className="bg-orange-500 hover:bg-orange-400 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0">
              Add Comment
            </button>
          </div>

          <div className="h-px bg-[#21262d]" />

          {/* ── Answers Section ── */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[#e6edf3] text-[16px] font-semibold">
              {question.answers} Answer{question.answers !== 1 ? "s" : ""}
            </h2>
            {question.answers === 0 && (
              <div className="bg-[#161b22] border border-[#30363d] rounded-xl px-6 py-8 text-center">
                <p className="text-[#484f58] text-[13px]">
                  No answers yet. Be the first to help!
                </p>
              </div>
            )}
          </div>

          {/* ── Your Answer ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[#e6edf3] text-[16px] font-semibold">
              Your Answer
            </h2>
            <MarkdownEditor value={answer} onChange={setAnswer} height={280} />
            <div>
              <button className="bg-orange-500 hover:bg-orange-400 text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Post Your Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#21262d] py-6 mt-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-[#484f58] text-[12px]">
            {[
              "Home",
              "About",
              "Privacy Policy",
              "Terms of Service",
              "Questions",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#8b949e] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-[#30363d] text-[11px]">© 2024 Flow.io</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
