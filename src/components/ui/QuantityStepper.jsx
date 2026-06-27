import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
