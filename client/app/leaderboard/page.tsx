import { Trophy, Medal, Star, MessageSquare, ThumbsUp } from "lucide-react";
import React from "react";

const users = [
  {
    rank: 1,
    name: "dev_ninja",
    reputation: 4820,
    answers: 142,
    questions: 38,
    votes: 910,
    badge: "gold",
  },
  {
    rank: 2,
    name: "react_guru",
    reputation: 3510,
    answers: 98,
    questions: 21,
    votes: 640,
    badge: "gold",
  },
  {
    rank: 3,
    name: "js_wizard",
    reputation: 2890,
    answers: 77,
    questions: 45,
    votes: 530,
    badge: "silver",
  },
  {
    rank: 4,
    name: "one user",
    reputation: 1240,
    answers: 44,
    questions: 12,
    votes: 280,
    badge: "silver",
  },
  {
    rank: 5,
    name: "backend_king",
    reputation: 980,
    answers: 31,
    questions: 9,
    votes: 195,
    badge: "bronze",
  },
  {
    rank: 6,
    name: "css_sensei",
    reputation: 740,
    answers: 22,
    questions: 17,
    votes: 140,
    badge: "bronze",
  },
  {
    rank: 7,
    name: "node_pro",
    reputation: 560,
    answers: 18,
    questions: 6,
    votes: 98,
    badge: "bronze",
  },
  {
    rank: 8,
    name: "type_master",
    reputation: 320,
    answers: 10,
    questions: 4,
    votes: 55,
    badge: "none",
  },
];

function getInitials(name: string) {
  return name
    .split("_")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  "bg-teal-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-cyan-500",
];

const rankStyles: Record<
  number,
  { icon: React.ReactNode; ring: string; label: string }
> = {
  1: {
    icon: <Trophy size={16} className="text-yellow-400" />,
    ring: "ring-2 ring-yellow-400/60",
    label: "text-yellow-400",
  },
  2: {
    icon: <Medal size={16} className="text-zinc-300" />,
    ring: "ring-2 ring-zinc-300/50",
    label: "text-zinc-300",
  },
  3: {
    icon: <Medal size={16} className="text-orange-400" />,
    ring: "ring-2 ring-orange-400/50",
    label: "text-orange-400",
  },
};

const Page = () => {
  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="min-h-screen w-full bg-[#111111] px-8 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-2xl font-bold flex items-center gap-2">
            <Trophy size={22} className="text-yellow-400" />
            Leaderboard
          </h1>
          <p className="text-zinc-500 text-sm">
            Top contributors ranked by reputation
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4"></div>
        {/* ── Full Table ── */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[48px_1fr_120px_100px_100px_100px] px-5 py-3 border-b border-[#252525] text-zinc-500 text-xs font-medium">
            <span>#</span>
            <span>User</span>
            <span className="text-right">Reputation</span>
            <span className="text-right">Answers</span>
            <span className="text-right">Questions</span>
            <span className="text-right">Votes</span>
          </div>

          {/* All Rows */}
          {users.map((user, idx) => (
            <div
              key={user.rank}
              className={`grid grid-cols-[48px_1fr_120px_100px_100px_100px] px-5 py-3.5 items-center hover:bg-[#1f1f1f] transition-colors ${
                idx !== users.length - 1 ? "border-b border-[#202020]" : ""
              }`}
            >
              {/* Rank */}
              <span
                className={`text-sm font-bold ${
                  rankStyles[user.rank]?.label ?? "text-zinc-600"
                }`}
              >
                {rankStyles[user.rank]?.icon ?? user.rank}
              </span>

              {/* User */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0 ${rankStyles[user.rank]?.ring ?? ""}`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-100 text-sm font-medium">
                    {user.name}
                  </span>
                  {user.badge !== "none" && (
                    <span
                      className={`text-[10px] font-semibold ${
                        user.badge === "gold"
                          ? "text-yellow-400"
                          : user.badge === "silver"
                            ? "text-zinc-300"
                            : "text-orange-400"
                      }`}
                    >
                      {user.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Reputation */}
              <span className="text-right text-sm font-semibold text-[#7c6af7]">
                {user.reputation.toLocaleString()}
              </span>

              {/* Answers */}
              <div className="flex items-center justify-end gap-1 text-zinc-400 text-sm">
                <MessageSquare size={12} />
                {user.answers}
              </div>

              {/* Questions */}
              <div className="flex items-center justify-end gap-1 text-zinc-400 text-sm">
                <Star size={12} />
                {user.questions}
              </div>

              {/* Votes */}
              <div className="flex items-center justify-end gap-1 text-zinc-400 text-sm">
                <ThumbsUp size={12} />
                {user.votes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
