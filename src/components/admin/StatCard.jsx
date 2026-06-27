export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-cream p-5">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cream-dark text-gold-dark">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold text-ink">{value}</p>
        <p className="text-xs text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
