import { useState } from "react";

function AnswerCard() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col gap-3">
      <p className="text-[14px] leading-relaxed">
        This usually happens when the compiler detects a professor nearby.
      </p>

      <div className="flex justify-between text-xs text-[#8b949e]">
        <span>answered by senior dev</span>
        <span>2h ago</span>
      </div>

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-400 text-sm hover:underline w-fit"
      >
        {showComments ? "Hide comments" : "View comments (2)"}
      </button>

      {showComments && (
        <div className="border-t border-[#30363d] pt-2 text-sm flex flex-col gap-1">
          <p>Classic bug.</p>
          <p>Compiler anxiety.</p>
        </div>
      )}
    </div>
  );
}

export default AnswerCard;
