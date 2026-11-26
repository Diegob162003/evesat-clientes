export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-beige/60">{label}</p>
      <p className="serif mt-2 text-3xl text-gold">{value}</p>
      {hint && <p className="mt-1 text-xs text-beige/50">{hint}</p>}
    </div>
  );
}