"use client";

import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import MarkdownEditor from "@/components/MarkdownEditor";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { ENV } from "@/lib/env";
import { useRouter } from "next/navigation";

const checklist = [
  "Is this question about a specific coding problem?",
  "Have you searched for similar questions first?",
  "Does the title summarise the problem clearly?",
  "Have you included relevant code snippets?",
  "Have you added appropriate tags?",
];

const liveActivity = [
  {
    user: "karan_joshi",
    action: "answered",
    subject: "Zustand hydration in App Router",
    time: "2m",
  },
  {
    user: "priya_s",
    action: "asked",
    subject: "Docker multi-stage build failure",
    time: "5m",
  },
  {
    user: "rohit_v",
    action: "answered",
    subject: "TypeScript generic constraints",
    time: "8m",
  },
  {
    user: "sneha_p",
    action: "asked",
    subject: "Prisma N+1 with nested includes",
    time: "12m",
  },
];

export default function CreateQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("# Describe your problem\n\n");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklist.length).fill(false)
  );

  const handleImage = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const toggleCheck = (i: number) => {
    const next = [...checkedItems];
    next[i] = !next[i];
    setCheckedItems(next);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      formData.append("tags", JSON.stringify(tags));
      if (image) formData.append("attachment", image);
      const res = await axios.post(`${ENV.BACKEND_URL}/questions`, formData, {
        withCredentials: true,
      });
      console.log(res.data);
      router.push("/get-questions");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--ob-surface)" }}>
      <TopNav />

      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-80 h-80 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #81ecff 0%, transparent 70%)",
            top: "-4rem",
            right: "15%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-4"
          style={{
            background: "radial-gradient(circle, #a68cff 0%, transparent 70%)",
            bottom: "10%",
            left: "10%",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-10">
        {/* Page header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold text-[var(--ob-text)]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ask a Question
          </h1>
          <p className="text-[var(--ob-text-muted)] text-sm mt-1">
            Provide clear details so the community can help you effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* ── Main Form ── */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            <div
              className="ghost-border rounded-xl p-5"
              style={{ background: "var(--ob-surface-2)" }}
            >
              <label className="text-[var(--ob-text)] text-[13px] font-semibold mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[var(--ob-primary)]">
                  title
                </span>
                Title
                <span className="text-[var(--ob-tertiary)] ml-0.5">*</span>
              </label>
              <p className="text-[var(--ob-text-subtle)] text-[12px] mb-3">
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                id="question-title"
                type="text"
                placeholder="e.g. How do I fix a CORS error in Next.js?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
                className="w-full ghost-border rounded-xl bg-transparent px-4 py-3 text-[14px] text-[var(--ob-text)] placeholder:text-[var(--ob-text-subtle)] outline-none focus:border-[rgba(129,236,255,0.4)] transition-colors"
              />
              <div className="text-right mt-1">
                <span className="text-[11px] text-[var(--ob-text-subtle)]">
                  {title.length}/150
                </span>
              </div>
            </div>

            {/* Attachment */}
            <div
              className="ghost-border rounded-xl p-5"
              style={{ background: "var(--ob-surface-2)" }}
            >
              <label className="text-[var(--ob-text)] text-[13px] font-semibold mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[var(--ob-text-muted)]">
                  attach_file
                </span>
                Attachment
                <span className="text-[var(--ob-text-subtle)] text-[11px] font-normal ml-1">
                  Optional
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                {/* Preview */}
                <div
                  className="ghost-border rounded-xl flex items-center justify-center min-h-[160px] overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.2)" }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Attachment preview"
                      className="max-h-[160px] rounded-lg object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[var(--ob-text-subtle)]">
                      <span className="material-symbols-outlined text-[36px]">
                        image
                      </span>
                      <span className="text-[12px]">
                        Preview will appear here
                      </span>
                    </div>
                  )}
                </div>
                {/* Upload */}
                <div className="border border-dashed border-[rgba(129,236,255,0.2)] rounded-xl min-h-[160px] hover:border-[rgba(129,236,255,0.4)] transition-colors">
                  <FileUpload onChange={handleImage} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className="ghost-border rounded-xl p-5"
              style={{ background: "var(--ob-surface-2)" }}
            >
              <label className="text-[var(--ob-text)] text-[13px] font-semibold mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[var(--ob-secondary)]">
                  edit_note
                </span>
                Description
                <span className="text-[var(--ob-tertiary)] ml-0.5">*</span>
              </label>
              <p className="text-[var(--ob-text-subtle)] text-[12px] mb-3">
                Include all information someone would need to answer your
                question. Use Markdown for formatting.
              </p>
              <div className="rounded-xl overflow-hidden border border-[var(--ob-border)]">
                <MarkdownEditor
                  value={description}
                  onChange={setDescription}
                  height={320}
                />
              </div>
            </div>

            {/* Tags */}
            {/* <div
              className="ghost-border rounded-xl p-5"
              style={{ background: "var(--ob-surface-2)" }}
            >
              <label className="text-[var(--ob-text)] text-[13px] font-semibold mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[var(--ob-primary)]">
                  tag
                </span>
                Tags
              </label>
              <p className="text-[var(--ob-text-subtle)] text-[12px] mb-3">
                Add up to 5 tags to describe what your question is about. Press
                Enter or comma to add.
              </p>
              <div className="ghost-border rounded-xl bg-transparent px-3 py-2 flex flex-wrap items-center gap-2 min-h-[48px] focus-within:border-[rgba(129,236,255,0.4)] transition-colors">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 ob-tag"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-0.5 text-[var(--ob-text-subtle)] hover:text-[var(--ob-tertiary)] transition-colors"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        close
                      </span>
                    </button>
                  </span>
                ))}
                {tags.length < 5 && (
                  <input
                    id="tags-input"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={
                      tags.length === 0 ? "e.g. react, typescript, nextjs" : ""
                    }
                    className="flex-1 min-w-[120px] bg-transparent text-[13px] text-[var(--ob-text)] placeholder:text-[var(--ob-text-subtle)] outline-none"
                  />
                )}
              </div>
              <p className="text-[11px] text-[var(--ob-text-subtle)] mt-1.5">
                {5 - tags.length} tag{5 - tags.length !== 1 ? "s" : ""}{" "}
                remaining
              </p>
            </div> */}

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => router.back()}
                className="text-[13px] text-[var(--ob-text-muted)] hover:text-[var(--ob-text)] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  delete
                </span>
                Discard Draft
              </button>
              <button
                id="submit-question-btn"
                className="obsidian-gradient flex items-center gap-2 text-[14px] font-semibold px-7 py-3 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading || !title.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      progress_activity
                    </span>
                    Posting…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">
                      send
                    </span>
                    Post Your Question
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Sidebar ── */}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
