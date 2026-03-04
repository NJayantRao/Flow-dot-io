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

const avatarColors = [
  "bg-[#7c6af7]/20 border-[#7c6af7]/30 text-[#a78bfa]",
  "bg-[#3fb950]/20 border-[#3fb950]/30 text-[#3fb950]",
  "bg-[#f78166]/20 border-[#f78166]/30 text-[#f78166]",
  "bg-[#58a6ff]/20 border-[#58a6ff]/30 text-[#58a6ff]",
];

const ContributorsCard = ({ contributors = [] }: ContributorsCardProps) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden w-full">
      {contributors.map((contributor, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#1c2128] transition-colors duration-150 ${
            idx !== contributors.length - 1 ? "border-b border-[#21262d]" : ""
          }`}
        >
          {/* Avatar */}
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-[11px] font-bold ${
              avatarColors[idx % avatarColors.length]
            }`}
          >
            {getInitials(contributor.name)}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#e6edf3] text-[13px] font-semibold leading-none">
                {contributor.name}
              </span>
              <span className="text-[#484f58] text-[11px] leading-none">
                · {contributor.timeAgo}
              </span>
            </div>
            <span className="text-[#8b949e] text-[11px]">
              Rep ·{" "}
              <span className="text-[#7c6af7] font-medium">
                {contributor.reputation}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContributorsCard;
