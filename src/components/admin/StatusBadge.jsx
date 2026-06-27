import clsx from 'clsx';

const STYLES = {
  Processing: 'bg-gold/15 text-gold-dark',
  Shipped: 'bg-blush/40 text-maroon',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-ink-soft/15 text-ink-soft',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        STYLES[status] ?? 'bg-cream-dark text-ink-soft'
      )}
    >
      {status}
    </span>
  );
}
