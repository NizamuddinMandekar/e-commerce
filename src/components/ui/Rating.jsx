import { Star } from 'lucide-react';
import clsx from 'clsx';

export default function Rating({ value = 0, count, size = 14, className }) {
  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? 'fill-gold text-gold' : 'fill-line text-line'}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-ink-soft">({count})</span>
      )}
    </div>
  );
}
