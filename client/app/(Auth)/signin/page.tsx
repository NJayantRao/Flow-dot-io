"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, MailWarning, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { ENV } from "@/lib/env";
import Link from "next/link";

const EyeIcon = ({ open }: { open: boolean }) => (open ? <Eye /> : <EyeOff />);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailNotVerified(false);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${ENV.BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      router.push("/dashboard");
    } catch (err: any) {
      const message: string =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      if (message === "Please verify your email to login") {
        setEmailNotVerified(true);
        setUnverifiedEmail(email);
      } else {
        setError(message);
      }
    } finally {
      setPassword("");
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    try {
      await axios.post(`${ENV.BACKEND_URL}/auth/resend-verification`, {
        email: unverifiedEmail,
      });
      setResendSuccess(true);
    } catch {
      // silently fail – banner stays visible
    } finally {
      setResendLoading(false);
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
            <div className="space-y-1 pt-2">
              <h1 className="text-white text-2xl font-bold tracking-tight">
                Sign in to your account
              </h1>
            </div>
          </div>

          {/* ── Email not verified banner ── */}
          {emailNotVerified && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <MailWarning className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-amber-300 text-sm font-semibold">
                    Email not verified
                  </p>
                  <p className="text-amber-400/80 text-xs leading-relaxed">
                    Check your inbox for the verification link we sent to{" "}
                    <span className="font-medium text-amber-300">
                      {unverifiedEmail}
                    </span>
                    .
                  </p>
                </div>
              </div>

              {resendSuccess ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="h-4 w-4" />
                  Verification email resent! Check your inbox.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {resendLoading && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  )}
                  {resendLoading ? "Sending…" : "Resend verification email →"}
                </button>
              )}
            </div>
          )}

          {/* ── Generic error banner ── */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

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
                  if (error) setError(null);
                  if (emailNotVerified) {
                    setEmailNotVerified(false);
                    setResendSuccess(false);
                  }
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
            <Link
              href="/signup"
              className="text-white font-semibold hover:text-[#38b2f8] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
