"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* ── Desktop floating pill ── */}
      <div
        className={cn(
          "hidden sm:flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-2 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-black/50">
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span>{navItem.name}</span>
              </a>
            ))}
          </div>
          <div className="h-5 w-px bg-neutral-200 dark:bg-white/10" />
          <button
            className="relative rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-[5000]">
        <div
          style={{
            background: "rgba(14,14,20,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(129,236,255,0.1)",
          }}
          className="flex items-center justify-between px-4 h-14"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#81ecff 0%,#a68cff 100%)",
              }}
            >
              <Zap className="h-4 w-4 text-[#0e0e14]" fill="#0e0e14" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[#e8ecf0]">
              Flow
            </span>
          </Link>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8892a4] hover:text-[#e8ecf0] transition-colors"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Slide-down drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{
                background: "rgba(14,14,20,0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(129,236,255,0.12)",
                overflow: "hidden",
              }}
            >
              <div className="flex flex-col gap-1 px-4 pt-2 pb-4">
                {navItems.map((navItem, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-[#8892a4] hover:text-[#e8ecf0] hover:bg-white/5 transition-colors"
                  >
                    {navItem.icon && (
                      <span className="text-[#81ecff]">{navItem.icon}</span>
                    )}
                    {navItem.name}
                  </a>
                ))}

                <div
                  className="my-2"
                  style={{
                    height: "1px",
                    background: "rgba(129,236,255,0.08)",
                  }}
                />

                <div className="flex flex-col gap-2 mt-1">
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 rounded-xl text-[14px] font-medium text-[#8892a4] hover:text-[#e8ecf0] border hover:bg-white/5 transition-all"
                    style={{ borderColor: "rgba(129,236,255,0.15)" }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 rounded-xl text-[14px] font-semibold text-[#0e0e14] transition-all hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(135deg,#81ecff 0%,#a68cff 100%)",
                    }}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
