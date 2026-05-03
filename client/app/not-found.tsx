import Link from "next/link";

const diagnostics = [
  { key: "ERROR_CODE", value: "HTTP_404" },
  { key: "STATUS", value: "PAGE_NOT_FOUND" },
  { key: "TIMESTAMP", value: new Date().toISOString().split("T")[0] },
  { key: "REQUEST_PATH", value: "UNKNOWN" },
  { key: "SUGGESTED_ACTION", value: "NAVIGATE_HOME" },
];

const codeRainChars = [
  "const",
  "async",
  "await",
  "fn()",
  "{}",
  "=>",
  "null",
  "void",
  "type",
  "impl",
  "404",
  "err",
  "NaN",
  "undefined",
  "throw",
  "catch",
  "try",
  "new",
  "class",
  "return",
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "var(--ob-surface)" }}
    >
      {/* Code rain background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {codeRainChars.map((char, i) => (
          <span
            key={i}
            className="absolute font-mono text-[11px] text-[var(--ob-primary)] opacity-[0.04]"
            style={{
              left: `${(i * 23 + 7) % 100}%`,
              top: `${(i * 17 + 11) % 100}%`,
              transform: `rotate(${(i * 13) % 360}deg)`,
            }}
          >
            {char}
          </span>
        ))}
        {/* Glow blobs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(129,236,255,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(166,140,255,0.06) 0%, transparent 70%)",
            top: "20%",
            right: "15%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(129,236,255,0.05) 0%, transparent 70%)",
            bottom: "15%",
            left: "10%",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Error badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-[12px] font-mono font-semibold text-[var(--ob-tertiary)] bg-[rgba(255,140,186,0.1)] border border-[rgba(255,140,186,0.25)] px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ob-tertiary)] animate-pulse" />
            SYSTEM_ERROR :: PAGE_NOT_FOUND
          </span>
        </div>

        {/* Giant 404 */}
        <h1
          className="text-[120px] sm:text-[160px] font-black leading-none font-mono tracking-tighter"
          style={{
            background:
              "linear-gradient(135deg, #81ecff 0%, #a68cff 50%, #ff8cba 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(129,236,255,0.3))",
          }}
        >
          404
        </h1>

        <h2
          className="text-xl sm:text-2xl font-bold text-[var(--ob-text)] mb-3 -mt-4"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          This page doesn&apos;t exist
        </h2>
        <p className="text-[var(--ob-text-muted)] text-[14px] leading-relaxed mb-8 max-w-sm">
          The route you&apos;re looking for could not be found. It may have been
          moved, deleted, or perhaps it never existed in this universe.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center mb-10">
          <Link
            href="/"
            className="obsidian-gradient flex items-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-xl transition-all duration-200"
            id="not-found-home-btn"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Go Home
          </Link>
          <Link
            href="/get-questions"
            className="ghost-border flex items-center gap-2 text-[14px] font-medium px-6 py-3 rounded-xl text-[var(--ob-text)] hover:border-[rgba(129,236,255,0.35)] transition-all duration-200"
            id="not-found-questions-btn"
            style={{ background: "var(--ob-surface-2)" }}
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            Browse Questions
          </Link>
        </div>

        {/* Diagnostics panel */}
        <div
          className="w-full ghost-border rounded-xl overflow-hidden text-left"
          style={{ background: "var(--ob-surface-2)" }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--ob-border)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ob-tertiary)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd080]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#80ffb4]" />
            <span className="ml-2 text-[11px] font-mono text-[var(--ob-text-subtle)]">
              system_diagnostics.log
            </span>
          </div>
          <div className="p-4 space-y-1.5 font-mono text-[12px]">
            {diagnostics.map(({ key, value }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-[var(--ob-text-subtle)] min-w-[160px]">
                  {key}
                </span>
                <span className="text-[var(--ob-primary)]">=</span>
                <span
                  className="text-[var(--ob-text-muted)]"
                  style={
                    key === "STATUS" ? { color: "var(--ob-tertiary)" } : {}
                  }
                >
                  &quot;{value}&quot;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
