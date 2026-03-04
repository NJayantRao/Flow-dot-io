"use client";

import React, { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("# Describe your problem\n\n");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] flex flex-col">
      <div className="flex-1 px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[#e6edf3] text-xl font-semibold">
              Ask a Question
            </h1>
            <p className="text-[#8b949e] text-sm">
              Provide details so the community can help you better.
            </p>
          </div>

          <div className="h-px bg-[#21262d]" />

          {/* Image Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Preview */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex items-center justify-center min-h-[220px]">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  className="max-h-[200px] rounded-lg object-contain"
                />
              ) : (
                <span className="text-[#484f58] text-sm">
                  Image preview will appear here
                </span>
              )}
            </div>

            {/* Upload */}
            <div className="border border-dashed border-[#30363d] rounded-xl min-h-[220px] hover:border-blue-500/60 transition-colors">
              <FileUpload onChange={handleImage} />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e6edf3] text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="e.g. Why does my program compile but my life doesn’t ?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-[14px] text-[#e6edf3] placeholder:text-[#484f58] outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="text-[#e6edf3] text-sm font-medium">
              Description
            </label>

            <div className="border border-[#30363d] rounded-xl overflow-hidden">
              <MarkdownEditor
                value={description}
                onChange={setDescription}
                height={320}
              />
            </div>

            <p className="text-[#484f58] text-xs">
              Use Markdown to format your question, add code snippets, etc.
            </p>
          </div>

          {/* Post Button */}
          <div className="flex justify-end">
            <button className="bg-orange-500 hover:bg-orange-400 text-white text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors">
              Post Question
            </button>
            {/* <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
            >
              <span>Post Question</span>
            </HoverBorderGradient> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
