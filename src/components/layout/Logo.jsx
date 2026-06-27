import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Logo({ className }) {
  return (
    <Link
      to="/"
      className={clsx('font-display text-2xl font-semibold tracking-[0.04em] text-ink', className)}
    >
      Ziu<span className="text-gold">World</span>
    </Link>
  );
}
