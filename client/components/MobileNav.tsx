"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { label: "Feed", href: "/get-questions", icon: "home" },
  { label: "Search", href: "/search", icon: "search" },
  {
    label: "Ask",
    href: "/create-question",
    icon: "add_circle",
    featured: true,
  },
  { label: "Topics", href: "/topics", icon: "tag" },
  { label: "Profile", href: "/profile", icon: "person" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: "rgba(13,13,20,0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(129,236,255,0.1)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`mobile-nav-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                item.featured
                  ? "text-[#0e0e14]"
                  : active
                    ? "text-[var(--ob-primary)]"
                    : "text-[var(--ob-text-subtle)]"
              }`}
            >
              {item.featured ? (
                <div className="obsidian-gradient w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[22px] text-[#0e0e14]">
                    {item.icon}
                  </span>
                </div>
              ) : (
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
              )}
              {!item.featured && (
                <span className="text-[10px] font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
