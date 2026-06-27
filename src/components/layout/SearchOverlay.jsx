import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCatalogStore } from '../../store/useCatalogStore';
import { formatPrice } from '../../lib/format';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const products = useCatalogStore((s) => s.products);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [products, query]);

  const handleClose = () => {
    setQuery('');
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="mx-auto mt-24 w-[92vw] max-w-2xl rounded-2xl bg-cream p-2 shadow-lift"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search size={18} className="text-ink-soft" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sarees, lehengas, jewelry..."
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
              />
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close search"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-cream-dark cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {results.length > 0 && (
              <ul className="max-h-96 overflow-y-auto p-2">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream-dark"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-14 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-ink">{product.name}</p>
                        <p className="text-xs text-ink-soft">{formatPrice(product.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query.trim() && results.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-ink-soft">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
