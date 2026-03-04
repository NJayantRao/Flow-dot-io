"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
export default function SignupFormDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background radial gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,178,248,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Card Wrapper */}
      <div className="relative w-full max-w-[420px]">
        {/* Card */}
        <div className="relative rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <h2 className="text-2xl font-bold text-white text-center">
            Welcome to Flow.io
          </h2>

          <p className="text-center text-sm text-neutral-400 mt-1">
            Create your account
          </p>

          <form className="my-8 space-y-4" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label className="text-neutral-300">Username</Label>
              <Input
                placeholder="username_18"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-neutral-300">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-neutral-300">Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9ca3af] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </LabelInputContainer>
            <button
              className="group/btn relative block h-11 w-full rounded-xl bg-white font-semibold text-black hover:bg-neutral-200 transition cursor-pointer"
              type="submit"
            >
              Sign up →
              <BottomGradient />
            </button>

            <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

            <p className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-white font-semibold hover:text-cyan-400"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
