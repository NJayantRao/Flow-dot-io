import React from "react";

interface Contributor {
  name: string;
  timeAgo: string;
  reputation: number;
}

interface ContributorsCardProps {
  contributors?: Contributor[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ContributorsCard = ({ contributors = [] }: ContributorsCardProps) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden w-full">
      {contributors.map((contributor, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 px-5 py-4 hover:bg-[#222] transition-colors duration-150 ${
            idx !== contributors.length - 1 ? "border-b border-[#252525]" : ""
          }`}
        >
          {/* Avatar with initials */}
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {getInitials(contributor.name)}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-zinc-100 text-sm font-semibold leading-none">
                {contributor.name}
              </span>
              <span className="text-zinc-500 text-xs leading-none">
                · {contributor.timeAgo}
              </span>
            </div>
            <span className="text-zinc-500 text-xs">
              Reputation · {contributor.reputation}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContributorsCard;
