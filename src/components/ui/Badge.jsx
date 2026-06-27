import clsx from 'clsx';

const STYLES = {
  New: 'bg-ink text-cream',
  Bestseller: 'bg-gold text-cream',
  Sale: 'bg-maroon text-cream',
};

export default function Badge({ children, className }) {
  if (!children) return null;
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
        STYLES[children] ?? 'bg-taupe text-cream',
        className
      )}
    >
      {children}
    </span>
  );
}
