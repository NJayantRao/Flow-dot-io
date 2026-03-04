"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconLayoutDashboard,
  IconQuestionMark,
  IconMessage2,
  IconBookmark,
  IconTag,
  IconUser,
  IconSettings,
  IconLogout,
  IconFlame,
  IconTrendingUp,
  IconArrowUpRight,
  IconDots,
  IconMail,
  IconLock,
  IconCheck,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
  IconShieldCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Palette tokens ───────────────────────────────────────────────────────────
// bg:        #0d1117 (GitHub-dark slate — dark but not black)
// sidebar:   #0d1117  border-r: #21262d
// card:      #161b22  border: #30363d
// hover:     #1c2128
// text-1:    #e6edf3
// text-2:    #8b949e
// text-3:    #484f58
// accent:    #7c6af7

// ─── Data ────────────────────────────────────────────────────────────────────

const user = {
  name: "one user",
  username: "one_user",
  email: "oneuser@example.com",
  emailVerified: false,
  reputation: 1240,
  joined: "Jan 2024",
};

const stats = [
  { label: "Questions", value: "12", sub: "+2 this week" },
  { label: "Answers", value: "44", sub: "+5 this week" },
  { label: "Reputation", value: "1,240", sub: "+80 this week" },
  { label: "Votes", value: "280", sub: "+12 this week" },
];

const recentQuestions = [
  {
    id: 1,
    title: "How do I manage global state in Next.js App Router?",
    tags: ["nextjs", "react"],
    votes: 8,
    answers: 3,
    time: "2h ago",
    answered: true,
  },
  {
    id: 2,
    title: "What is the difference between useEffect and useLayoutEffect?",
    tags: ["react", "hooks"],
    votes: 5,
    answers: 1,
    time: "1d ago",
    answered: false,
  },
  {
    id: 3,
    title: "TypeScript generics with constraints — how to narrow type?",
    tags: ["typescript"],
    votes: 12,
    answers: 4,
    time: "3d ago",
    answered: true,
  },
  {
    id: 4,
    title: "Prisma relation queries throwing N+1 — best fix?",
    tags: ["prisma", "database"],
    votes: 3,
    answers: 0,
    time: "5d ago",
    answered: false,
  },
];

const activity = [
  {
    label: 'Answered "How to center a div in CSS Grid?"',
    time: "1h ago",
    type: "answer",
  },
  { label: 'Asked "Prisma N+1 — best fix?"', time: "5d ago", type: "question" },
  {
    label: 'Upvoted "React Server Components explained"',
    time: "6d ago",
    type: "vote",
  },
  {
    label: 'Bookmarked "Understanding the event loop"',
    time: "1w ago",
    type: "bookmark",
  },
];

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <IconLayoutDashboard className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />
    ),
  },
  {
    label: "My Questions",
    href: "#",
    icon: (
      <IconQuestionMark className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />
    ),
  },
  {
    label: "My Answers",
    href: "#",
    icon: (
      <IconMessage2 className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />
    ),
  },
  {
    label: "Bookmarks",
    href: "#",
    icon: (
      <IconBookmark className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />
    ),
  },
  {
    label: "Tags",
    href: "#",
    icon: <IconTag className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />,
  },
  {
    label: "Profile",
    href: "#",
    icon: <IconUser className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />,
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="h-[18px] w-[18px] shrink-0 text-[#8b949e]" />
    ),
  },
];

// ─── Sidebar Logo ─────────────────────────────────────────────────────────────

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 py-1 group">
    <div className="h-6 w-6 rounded-[6px] bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center shrink-0">
      <IconFlame size={13} className="text-[#a78bfa]" />
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-[13px] font-semibold text-[#e6edf3] tracking-tight whitespace-pre"
    >
      Flow.io
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link href="/" className="flex items-center py-1">
    <div className="h-6 w-6 rounded-[6px] bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center shrink-0">
      <IconFlame size={13} className="text-[#a78bfa]" />
    </div>
  </Link>
);

// ─── Logout Button ────────────────────────────────────────────────────────────

const LogoutButton = ({ open }: { open: boolean }) => (
  <button
    onClick={() => console.log("logout")}
    className="flex items-center gap-2.5 py-2 px-1 rounded-lg w-full group/logout hover:bg-red-500/10 transition-colors duration-200"
  >
    <IconLogout className="h-[18px] w-[18px] shrink-0 text-[#484f58] group-hover/logout:text-red-400 transition-colors duration-200" />
    {open && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[13px] text-[#484f58] group-hover/logout:text-red-400 transition-colors duration-200 whitespace-pre"
      >
        Logout
      </motion.span>
    )}
  </button>
);

// ─── Main Dashboard Panel ─────────────────────────────────────────────────────

const DashboardPanel = () => {
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChangePw = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);
    if (!pwForm.current) {
      setPwError("Current password is required.");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSuccess(true);
    setPwForm({ current: "", next: "", confirm: "" });
  };

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex-1 overflow-y-auto bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-10">
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center text-[14px] font-bold text-[#a78bfa] shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-[16px] font-semibold text-[#e6edf3] leading-none">
                {user.name}
              </h1>
              <p className="text-[12px] text-[#8b949e] mt-1.5">
                @{user.username} ·{" "}
                <span className="text-[#7c6af7]">{user.reputation}</span>{" "}
                reputation
              </p>
            </div>
          </div>
          <Link
            href="/create-question"
            className="text-[13px] font-medium text-[#e6edf3] bg-[#7c6af7] hover:bg-[#6d5de6] px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Ask a question
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#161b22] border border-[#30363d] rounded-xl px-5 py-4 hover:border-[#7c6af7]/40 hover:bg-[#1c2128] transition-all duration-200"
            >
              <p className="text-[11px] font-medium text-[#8b949e] uppercase tracking-widest">
                {s.label}
              </p>
              <p className="text-[28px] font-bold text-[#e6edf3] mt-1.5 leading-none tracking-tight">
                {s.value}
              </p>
              <p className="text-[11px] text-[#3fb950] mt-2 flex items-center gap-1">
                <IconTrendingUp size={10} />
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Two-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr] gap-6">
          {/* Recent Questions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">
                Recent Questions
              </h2>
              <a
                href="#"
                className="text-[12px] text-[#8b949e] hover:text-[#e6edf3] flex items-center gap-0.5 transition-colors"
              >
                View all <IconArrowUpRight size={12} />
              </a>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden divide-y divide-[#21262d]">
              {recentQuestions.map((q) => (
                <div
                  key={q.id}
                  className="px-5 py-4 hover:bg-[#1c2128] transition-colors duration-150 group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-[5px] h-2 w-2 rounded-full shrink-0",
                        q.answered ? "bg-[#3fb950]" : "bg-[#484f58]"
                      )}
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <a
                        href="#"
                        className="text-[13px] text-[#c9d1d9] group-hover:text-[#e6edf3] leading-snug transition-colors duration-150 line-clamp-2"
                      >
                        {q.title}
                      </a>
                      <div className="flex items-center gap-2 flex-wrap">
                        {q.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto text-[11px] text-[#484f58]">
                          {q.votes}v · {q.answers}a · {q.time}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#484f58] hover:text-[#8b949e] transition-colors shrink-0 mt-0.5">
                      <IconDots size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5"></div>
        </div>

        {/* ── Account ── */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">
            Account
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Email Verification */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl px-5 py-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <IconMail size={14} className="text-[#8b949e]" />
                    <span className="text-[13px] font-medium text-[#e6edf3]">
                      Email Address
                    </span>
                  </div>
                  <p className="text-[12px] text-[#8b949e] mt-0.5 ml-5">
                    {user.email}
                  </p>
                </div>
                {user.emailVerified ? (
                  <div className="flex items-center gap-1.5 bg-[#3fb950]/10 border border-[#3fb950]/25 text-[#3fb950] text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0">
                    <IconCheck size={11} /> Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0">
                    <IconAlertCircle size={11} /> Unverified
                  </div>
                )}
              </div>

              {!user.emailVerified && (
                <>
                  <p className="text-[12px] text-[#8b949e] leading-relaxed">
                    Your email hasn&apos;t been verified yet. Verify it to
                    unlock all platform features.
                  </p>
                  {emailSent ? (
                    <div className="flex items-center gap-2 text-[12px] text-[#3fb950]">
                      <IconShieldCheck size={14} />
                      Verification email sent — check your inbox.
                    </div>
                  ) : (
                    <button
                      onClick={() => setEmailSent(true)}
                      className="self-start text-[12px] font-medium text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#7c6af7]/50 px-4 py-2 rounded-lg transition-all duration-150"
                    >
                      Send verification email
                    </button>
                  )}
                </>
              )}

              {user.emailVerified && (
                <p className="text-[12px] text-[#8b949e]">
                  Your email is verified. You have full access to all platform
                  features.
                </p>
              )}
            </div>

            {/* Change Password */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl px-5 py-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconLock size={14} className="text-[#8b949e]" />
                <span className="text-[13px] font-medium text-[#e6edf3]">
                  Change Password
                </span>
              </div>

              <form onSubmit={handleChangePw} className="flex flex-col gap-3">
                {[
                  { key: "current" as const, label: "Current password" },
                  { key: "next" as const, label: "New password" },
                  { key: "confirm" as const, label: "Confirm new password" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-[#8b949e] uppercase tracking-widest">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPw[key] ? "text" : "password"}
                        value={pwForm[key]}
                        onChange={(e) =>
                          setPwForm((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder="••••••••"
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 pr-9 text-[13px] text-[#e6edf3] placeholder:text-[#484f58] outline-none focus:border-[#7c6af7]/60 transition-colors duration-150"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPw((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#8b949e] transition-colors"
                      >
                        {showPw[key] ? (
                          <IconEyeOff size={13} />
                        ) : (
                          <IconEye size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                {pwError && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1.5">
                    <IconAlertCircle size={12} /> {pwError}
                  </p>
                )}
                {pwSuccess && (
                  <p className="text-[11px] text-[#3fb950] flex items-center gap-1.5">
                    <IconCheck size={12} /> Password updated successfully.
                  </p>
                )}

                <button
                  type="submit"
                  className="self-start mt-1 text-[12px] font-medium text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#7c6af7]/50 px-4 py-2 rounded-lg transition-all duration-150"
                >
                  Update password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0d1117]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-6 bg-[#0d1117] border-r border-[#21262d]">
          <div className="flex flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-[#21262d] pt-4">
            <SidebarLink
              link={{
                label: user.name,
                href: "#",
                icon: (
                  <div className="h-7 w-7 rounded-full bg-[#7c6af7]/20 border border-[#7c6af7]/30 flex items-center justify-center text-[10px] font-bold text-[#a78bfa] shrink-0">
                    {user.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                ),
              }}
            />
            <LogoutButton open={open} />
          </div>
        </SidebarBody>
      </Sidebar>

      <DashboardPanel />
    </div>
  );
}
