import { User2 } from "lucide-react";
import { useState } from "react";

function AnswerCard() {
  const [showComments, setShowComments] = useState(false);
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
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col gap-3">
      <p className="text-[14px] leading-relaxed">
        This usually happens when the compiler detects a professor nearby.
      </p>

      <div className="flex justify-between text-xs text-[#8b949e]">
        <span>answered by senior dev</span>
        <span>2h ago</span>
      </div>

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
    </div>
  );
}

export default AnswerCard;
