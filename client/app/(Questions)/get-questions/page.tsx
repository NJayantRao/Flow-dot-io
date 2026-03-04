import ContributorsCard from "@/components/ContributorsCard";
import QuestionCard from "@/components/QuestionCard";
import React from "react";

const questions = [
  {
    votes: 0,
    answers: 0,
    title: "This is a question on php",
    tags: [],
    author: "one user",
    timeAgo: "25 minutes ago",
  },
  {
    votes: 0,
    answers: 0,
    title: "test questions here",
    tags: [],
    author: "one user",
    timeAgo: "26 minutes ago",
  },
  {
    votes: 0,
    answers: 0,
    title: "fun question on react",
    tags: [],
    author: "one user",
    timeAgo: "27 minutes ago",
  },
  {
    votes: 0,
    answers: 0,
    title: "this is a question on postman",
    tags: ["javascript", "postman"],
    author: "one user",
    timeAgo: "28 minutes ago",
  },
  {
    votes: 0,
    answers: 0,
    title: "n backend in javascript",
    tags: [],
    author: "one user",
    timeAgo: "30 minutes ago",
  },
];

const contributors = [
  { name: "one user", timeAgo: "29 seconds ago", reputation: 1 },
  { name: "dev_ninja", timeAgo: "5 minutes ago", reputation: 12 },
  { name: "react_guru", timeAgo: "12 minutes ago", reputation: 7 },
];

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-[#111111] px-8 py-10">
      <div className="max-w-6xl mx-auto flex gap-6 items-start">
        {/* Left — Questions List */}
        <div className="flex-[1.4] flex flex-col gap-4 min-w-0">
          <h1 className="text-white text-xl font-semibold mb-1">
            Latest Questions
          </h1>
          {questions.map((q, idx) => (
            <QuestionCard key={idx} {...q} />
          ))}
        </div>

        {/* Right — Top Contributors */}
        <div className="w-96 shrink-0 flex flex-col gap-3">
          {/* Heading OUTSIDE the wrapper */}
          <h2 className="text-white text-xl font-semibold">Top Contributers</h2>

          {/* Dark wrapper containing all contributor cards */}
          <ContributorsCard contributors={contributors} />
        </div>
      </div>
    </div>
  );
};

export default Page;
