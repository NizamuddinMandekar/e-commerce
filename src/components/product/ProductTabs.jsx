import { useState } from 'react';
import clsx from 'clsx';
import Rating from '../ui/Rating';
import { TESTIMONIALS } from '../../data/testimonials';

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState('description');
  const reviews = TESTIMONIALS.slice(0, 3);

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Material & Care' },
    { id: 'reviews', label: `Reviews (${product.reviews})` },
  ];

  return (
    <div className="mt-16">
      <div className="flex gap-8 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={clsx(
              'relative pb-4 text-sm font-medium transition-colors cursor-pointer',
              tab === t.id ? 'text-ink' : 'text-ink-soft hover:text-ink'
            )}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-2xl py-8 text-sm text-ink-soft">
        {tab === 'description' && <p>{product.description}</p>}

        {tab === 'details' && (
          <dl className="flex flex-col gap-3">
            <div className="flex gap-2">
              <dt className="w-32 flex-shrink-0 font-medium text-ink">Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 flex-shrink-0 font-medium text-ink">Care</dt>
              <dd>{product.care}</dd>
            </div>
            {product.sizes && (
              <div className="flex gap-2">
                <dt className="w-32 flex-shrink-0 font-medium text-ink">Available sizes</dt>
                <dd>{product.sizes.join(', ')}</dd>
              </div>
            )}
          </dl>
        )}

        {tab === 'reviews' && (
          <div className="flex flex-col gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="border-b border-line pb-6 last:border-none">
                <Rating value={r.rating} />
                <p className="mt-2 text-ink-soft">&ldquo;{r.quote}&rdquo;</p>
                <p className="mt-2 text-sm font-medium text-ink">
                  {r.name} <span className="font-normal text-ink-soft">&middot; {r.location}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
