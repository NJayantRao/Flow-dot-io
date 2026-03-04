"use client";

import { ChevronDown, ChevronUp, Share2, Bookmark, Flag } from "lucide-react";
import React, { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";

const question = {
  title: "This is a question on php",
  askedAgo: "1 hour ago",
  answers: 0,
  votes: 1,
  tags: ["php"],
  body: "another question",
  author: "one user",
};

const Page = () => {
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("# test answer\n---");
  const [votes, setVotes] = useState(question.votes);

  return (
    <div className="min-h-screen w-full bg-[#111111] flex flex-col">
      <div className="flex-1 px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* ── Header Row ── */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-white text-2xl font-semibold leading-snug">
                {question.title}
              </h1>
              <div className="flex items-center gap-4 text-zinc-500 text-xs">
                <span>Asked {question.askedAgo}</span>
                <span>Answer {question.answers}</span>
                <span>Votes {votes}</span>
              </div>
            </div>
            <a
              href="/create-question"
              className="shrink-0 border border-[#333] text-zinc-300 text-sm px-4 py-2 rounded-lg hover:bg-[#1f1f1f] transition-colors duration-200 whitespace-nowrap"
            >
              Ask a question
            </a>
          </div>

          <div className="h-px bg-[#222]" />

          {/* ── Question Body ── */}
          <div className="flex gap-5 items-start">
            {/* Vote Controls */}
            <div className="flex flex-col items-center gap-2 pt-2 shrink-0">
              <button
                onClick={() => setVotes((v) => v + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#333] text-zinc-400 hover:border-[#7c6af7] hover:text-[#7c6af7] transition-colors"
              >
                <ChevronUp size={18} />
              </button>
              <span className="text-white text-base font-semibold">
                {votes}
              </span>
              <button
                onClick={() => setVotes((v) => v - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#333] text-zinc-400 hover:border-[#7c6af7] hover:text-[#7c6af7] transition-colors"
              >
                <ChevronDown size={18} />
              </button>
              <div className="flex flex-col items-center gap-3 mt-3">
                <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
                  <Share2 size={16} />
                </button>
                <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
                  <Bookmark size={16} />
                </button>
                <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
                  <Flag size={16} />
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-6 py-5 flex flex-col gap-4">
              <div className="flex gap-2 flex-wrap">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-[#252525] border border-[#333] text-zinc-400 px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {question.body}
              </p>
              <div className="flex items-center justify-end pt-2 border-t border-[#252525]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {question.author.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-zinc-400 text-xs">
                    <span className="text-zinc-200 font-medium">
                      {question.author}
                    </span>
                    &nbsp;· asked {question.askedAgo}
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
              className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-[#3a3a3a] transition-colors"
            />
            <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shrink-0">
              Add Comment
            </button>
          </div>

          <div className="h-px bg-[#222]" />

          {/* ── Answers Section ── */}
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-lg font-semibold">
              {question.answers} Answers
            </h2>

            {question.answers === 0 && (
              <p className="text-zinc-600 text-sm">
                No answers yet. Be the first to answer!
              </p>
            )}
          </div>

          {/* ── Your Answer ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-lg font-semibold">Your Answer</h2>
            <MarkdownEditor value={answer} onChange={setAnswer} height={280} />
            <div>
              <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Post Your Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e1e1e] py-6 mt-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-zinc-500 text-sm">
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
                className="hover:text-zinc-300 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-zinc-600 text-xs">© 2024 Riverpod</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
