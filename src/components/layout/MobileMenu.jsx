import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCatalogStore } from '../../store/useCatalogStore';
import { computeNavGroups } from '../../lib/navGroups';

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const categories = useCatalogStore((s) => s.categories);
  const navGroups = useMemo(() => computeNavGroups(categories), [categories]);
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-cream p-6"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-ink">Menu</span>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-dark cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {navGroups.map((group) => (
                <div key={group.slug} className="border-b border-line py-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold uppercase tracking-[0.08em] text-ink cursor-pointer"
                    onClick={() => setOpenGroup(openGroup === group.slug ? null : group.slug)}
                  >
                    {group.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openGroup === group.slug ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openGroup === group.slug && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 py-2 pl-2">
                          {group.items.map((item) => (
                            <Link
                              key={item.slug}
                              to={`/shop/${item.slug}`}
                              onClick={closeMobileMenu}
                              className="text-sm text-ink-soft hover:text-gold-dark"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="py-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink"
              >
                Our Story
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="py-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink"
              >
                Contact
              </Link>
              <Link
                to="/account"
                onClick={closeMobileMenu}
                className="py-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink"
              >
                Account
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
