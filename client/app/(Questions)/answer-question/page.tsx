"use client";

import { ChevronDown, ChevronUp, Image, User2 } from "lucide-react";
import React, { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import AnswerCard from "@/components/AnswerCard";
import PostAnswerModal from "@/components/PostAnswerModal";
const answers = [
  {
    id: 1,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jayant",
    username: "Jayant",
    content:
      "You can solve this by storing comments in a separate collection and linking them using the answer id.",
  },
  {
    id: 2,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Aman",
    username: "Aman",
    content:
      "A cleaner way is to fetch comments lazily only when the user expands the comments section.",
  },
  {
    id: 3,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Riya",
    username: "Riya",
    content:
      "For production UI, add smooth collapse animation and keep the comment section visually lighter than answers.",
  },
];

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
  const [questionImage, setQuestionImage] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const questionImage= "https://res.cloudinary.com/dpwqlb3d7/image/upload/v1771810481/ai-saas/ptdvmtvqw8nuapm49icn.png"

  const comments = [
    {
      id: 1,
      username: "Jayant",
      text: "This is really helpful.",
    },
    {
      id: 2,
      username: "Aman",
      text: "Can you explain more?",
    },
    {
      id: 3,
      username: "Riya",
      text: "Nice question!",
    },
  ];
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
            <div
              className="shrink-0 flex items-center gap-2 bg-orange-500 hover:scale-105 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Post Your Answer
            </div>
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
            </div>

            {/* Question Card */}
            <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden flex flex-col">
              {/* ── Image: two states ── */}
              {questionImage ? (
                /* State 1 — image present: render full-width */
                <div className="w-full bg-[#0d1117]">
                  <img
                    src={questionImage}
                    alt="Question attachment"
                    className="w-full max-h-[280px] object-contain object-center"
                  />
                </div>
              ) : (
                /* State 2 — no image: minimal placeholder strip */
                <div className="w-full h-28 border-b border-[#21262d] bg-[#0d1117]/60 flex flex-col items-center justify-center gap-1.5 text-[#484f58] select-none">
                  <Image size={36} />
                  <span className="text-[11px] tracking-wide">
                    No image attached
                  </span>
                </div>
              )}

              {/* ── Body text (always below the image area) ── */}
              <div className="px-6 py-5 flex flex-col gap-4">
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
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ── Add Comment ── */}
          <div className="h-px bg-[#21262d]" />
          <div className="w-full">
            {/* Toggle */}
            <div
              className="p-2 text-sm text-blue-500 cursor-pointer hover:text-blue-400 transition"
              onClick={() => setShowComments(!showComments)}
            >
              <p>
                {showComments
                  ? "Hide Comments"
                  : `View Comments (${comments.length})`}
              </p>
            </div>

            {/* Expandable comments */}
            {showComments && (
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-start">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#21262d] flex items-center justify-center">
                      <User2 size={16} className="text-gray-400" />
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {comment.username}
                      </p>
                      <p className="text-sm text-gray-400">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* ── Answers Section ── */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[#e6edf3] text-[16px] font-semibold">
              {answers.length} Answer{question.answers !== 1 ? "s" : ""}
            </h2>
            {answers.length > 0 ? (
              answers.map((ele, idx) => {
                return <AnswerCard key={idx} />;
              })
            ) : (
              <div className="bg-[#161b22] border border-[#30363d] rounded-xl px-6 py-8 text-center">
                <p className="text-[#484f58] text-[13px]">
                  No answers yet. Be the first to help!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      {/* <footer className="border-t border-[#21262d] py-6 mt-4">
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
      </footer> */}
      <PostAnswerModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Page;
