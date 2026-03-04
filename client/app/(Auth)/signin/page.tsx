"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { ENV } from "@/lib/env";

// Inline SVG icons to avoid extra dependencies

const EyeIcon = ({ open }: { open: boolean }) => (open ? <Eye /> : <EyeOff />);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${ENV.BACKEND_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }
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
                Sign in to your account
              </h1>
              <p className="text-[#6b7280] text-sm">
                Welcome back! Please enter your details.
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity("Enter Valid E-Mail ID");
                }}
                onInput={(e) => {
                  e.currentTarget.setCustomValidity("");
                }}
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

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[#d1d5db] text-sm font-medium"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-[#38b2f8] text-sm hover:text-[#60c8ff] transition-colors cursor-pointer"
                  onClick={() => {
                    router.push("/forgot-password");
                  }}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={20}
                  className="
                  bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#4b5563]
                  h-11 rounded-xl pr-10
                  focus:border-[#38b2f8] focus:ring-1 focus:ring-[#38b2f8]/30
                  hover:border-[#3a3a3a]
                  transition-colors duration-150
                "
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
            </div>

            {/* Sign in button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="
              w-full h-11 rounded-xl font-semibold text-[#0a0a0a]
              bg-white hover:bg-[#f3f4f6]
              disabled:opacity-60
              transition-all duration-150
              mt-2 cursor-pointer
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
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-[#2a2a2a]" />
            <span className="text-[#6b7280] text-xs font-medium tracking-widest uppercase">
              or
            </span>
            <Separator className="flex-1 bg-[#2a2a2a]" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-[#6b7280] text-sm pb-4">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-white font-semibold hover:text-[#38b2f8] transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
