import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { useCatalogStore } from '../store/useCatalogStore';
import { computeNavGroups } from '../lib/navGroups';

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const groupSlug = searchParams.get('group');

  const allProducts = useCatalogStore((s) => s.products);
  const categories = useCatalogStore((s) => s.categories);
  const navGroups = useMemo(() => computeNavGroups(categories), [categories]);
  const getCategoryBySlug = useCatalogStore((s) => s.getCategoryBySlug);

  const computeCategoriesForRoute = () =>
    categorySlug
      ? [categorySlug]
      : groupSlug
      ? categories.filter((c) => c.group === navGroups.find((g) => g.slug === groupSlug)?.title).map((c) => c.slug)
      : [];

  const [selectedCategories, setSelectedCategories] = useState(computeCategoriesForRoute);
  const [priceRange, setPriceRange] = useState(null);
  const [sort, setSort] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(computeCategoriesForRoute());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, groupSlug, categories, navGroups]);

  const toggleCategory = (slug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(null);
  };

  const products = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (priceRange) {
      list = list.filter((p) => p.price >= priceRange.min && p.price < priceRange.max);
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [allProducts, selectedCategories, priceRange, sort]);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const heading = category ? category.name : groupSlug
    ? navGroups.find((g) => g.slug === groupSlug)?.title
    : 'All Products';

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">{heading}</h1>
        {category && <p className="mt-2 text-ink-soft">{category.blurb}</p>}
        <p className="mt-2 text-sm text-ink-soft">{products.length} products</p>
      </div>

      <div className="flex items-center justify-between border-b border-line pb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-ink cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceRange={priceRange}
            onSetPriceRange={setPriceRange}
            onClear={clearFilters}
          />
        </aside>

        <div>
          <div className="mb-6 hidden items-center justify-end lg:flex">
            <label htmlFor="sort" className="mr-2 text-sm text-ink-soft">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-ink cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <ProductGrid products={products} columns={3} />
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-cream p-6"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-ink">Filters</span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-dark cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                priceRange={priceRange}
                onSetPriceRange={setPriceRange}
                onClear={clearFilters}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
