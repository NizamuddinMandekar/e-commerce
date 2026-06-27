import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import Logo from './Logo';
import IconButton from '../ui/IconButton';
import { useCatalogStore } from '../../store/useCatalogStore';
import { computeNavGroups } from '../../lib/navGroups';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

function MegaMenu({ group, categories }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-40 w-[640px] -translate-x-1/2 rounded-2xl border border-line bg-cream p-6 shadow-lift"
    >
      <div className="grid grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/shop/${cat.slug}`}
            className="group block cursor-pointer"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-cream-dark">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-ink">{cat.name}</p>
            <p className="text-xs text-ink-soft">{cat.blurb}</p>
          </Link>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs text-ink-soft">Explore the full {group.title.toLowerCase()} edit</span>
        <Link
          to={`/shop?group=${group.slug}`}
          className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-dark hover:underline"
        >
          Shop all &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const { toggleMobileMenu, openSearch, openCart } = useUIStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const categories = useCatalogStore((s) => s.categories);
  const navGroups = useMemo(() => computeNavGroups(categories), [categories]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 bg-cream/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navGroups.map((group) => (
            <div
              key={group.slug}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.slug)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                to={`/shop?group=${group.slug}`}
                className="py-2 text-sm font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:text-gold-dark"
              >
                {group.title}
              </Link>
              <AnimatePresence>
                {openGroup === group.slug && (
                  <MegaMenu
                    group={group}
                    categories={categories.filter((c) => c.group === group.title)}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link
            to="/about"
            className="py-2 text-sm font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:text-gold-dark"
          >
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <IconButton label="Search" onClick={openSearch} className="hidden sm:inline-flex">
            <Search size={19} />
          </IconButton>
          <IconButton as={Link} to="/account" label="Account" className="hidden sm:inline-flex">
            <User size={19} />
          </IconButton>
          <IconButton as={Link} to="/wishlist" label="Wishlist" className="relative">
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-maroon text-[9px] font-semibold text-cream">
                {wishlistCount}
              </span>
            )}
          </IconButton>
          <IconButton onClick={openCart} label="Cart" className="relative">
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-cream">
                {totalItems}
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
