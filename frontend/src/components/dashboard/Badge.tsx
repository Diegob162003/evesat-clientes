export function Badge({ tone, children }: { tone: "ok" | "warn" | "bad" | "info"; children: React.ReactNode }) {
  const map = {
    ok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warn: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    bad: "bg-red-500/15 text-red-300 border-red-500/30",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  } as const;
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${map[tone]}`}>{children}</span>;
}