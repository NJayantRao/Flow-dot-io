"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { ENV } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
const EyeIcon = ({ open }: { open: boolean }) => (open ? <Eye /> : <EyeOff />);
export default function SignupFormDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${ENV.BACKEND_URL}/auth/register`,
        {
          username,
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
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }
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
                required
                value={username}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-neutral-300">Email</Label>
              <Input
                type="email"
                required
                value={email}
                placeholder="you@example.com"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity("Enter Valid E-Mail ID");
                }}
                onInput={(e) => {
                  e.currentTarget.setCustomValidity("");
                }}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="text-neutral-300">Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  maxLength={20}
                  value={password}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-neutral-500 pr-10"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9ca3af] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </LabelInputContainer>
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
                  Registering…
                </span>
              ) : (
                "Sign Up"
              )}
              <BottomGradient />
            </Button>

            <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

            <p className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className="text-white font-semibold hover:text-cyan-400"
              >
                Sign in
              </Link>
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
