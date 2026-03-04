"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Inline SVG icons to avoid extra dependencies

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,178,248,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Gradient Border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-sm opacity-60"></div>

        {/* Card */}
        <div className="relative space-y-6 rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 backdrop-blur-md">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2.5">
              <span className="text-white text-2xl font-bold tracking-tight">
                Flow.io
              </span>
            </div>
            <div className="space-y-1 pt-2">
              <h1 className="text-white text-2xl font-bold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-[#6b7280] text-sm">
                Enter your registered Email-id
              </p>
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[#d1d5db] text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#4b5563]
                h-11 rounded-xl
                focus:border-[#38b2f8] focus:ring-1 focus:ring-[#38b2f8]/30
                hover:border-[#3a3a3a]
                transition-colors duration-150
              "
              />
            </div>

            {/* Forgot password button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="
              w-full h-11 rounded-xl font-semibold text-[#0a0a0a]
              bg-white hover:bg-[#f3f4f6]
              disabled:opacity-60
              transition-all duration-150
              mt-2
            "
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Get OTP →"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
