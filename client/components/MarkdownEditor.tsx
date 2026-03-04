"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  height?: number;
}

const MarkdownEditor = ({
  value,
  onChange,
  placeholder = "Write your answer in markdown...",
  height = 250,
}: MarkdownEditorProps) => {
  return (
    <div data-color-mode="dark" className="w-full">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? "")}
        height={height}
        preview="live"
        textareaProps={{ placeholder }}
        style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
