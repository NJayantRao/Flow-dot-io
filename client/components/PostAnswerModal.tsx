"use client";

import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import { X } from "lucide-react";

interface PostAnswerModalProps {
  open: boolean;
  onClose: () => void;
}

const PostAnswerModal = ({ open, onClose }: PostAnswerModalProps) => {
  const [answer, setAnswer] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      {/* Modal */}
      <div className="w-[85vw] h-[85vh] bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#21262d]">
          <h2 className="text-xl font-semibold text-white">Post Your Answer</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <MarkdownEditor
            value={answer}
            onChange={setAnswer}
            height={320}
            placeholder="Write your answer using markdown..."
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#21262d] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#30363d] text-gray-300 hover:bg-[#161b22] transition cursor-pointer"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition cursor-pointer">
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnswerModal;
