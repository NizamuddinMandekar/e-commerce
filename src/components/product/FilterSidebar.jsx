import { useMemo } from 'react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { computeNavGroups } from '../../lib/navGroups';

const PRICE_RANGES = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 & above', min: 15000, max: Infinity },
];

export default function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  priceRange,
  onSetPriceRange,
  onClear,
}) {
  const categories = useCatalogStore((s) => s.categories);
  const navGroups = useMemo(() => computeNavGroups(categories), [categories]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-ink-soft underline-offset-2 hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {navGroups.map((group) => (
        <div key={group.slug}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
            {group.title}
          </h3>
          <ul className="mt-3 flex flex-col gap-3">
            {categories.filter((c) => c.group === group.title).map((cat) => (
              <li key={cat.slug}>
                <label className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => onToggleCategory(cat.slug)}
                    className="h-4 w-4 rounded border-line text-gold-dark accent-[#b8893f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  />
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">Price</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {PRICE_RANGES.map((range) => (
            <li key={range.label}>
              <label className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
                <input
                  type="radio"
                  name="price-range"
                  checked={priceRange?.label === range.label}
                  onChange={() => onSetPriceRange(range)}
                  className="h-4 w-4 border-line text-gold-dark accent-[#b8893f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                />
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
