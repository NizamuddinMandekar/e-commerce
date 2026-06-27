import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { formatPrice } from '../../lib/format';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUIStore } from '../../store/useUIStore';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const outOfStock = product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    addItem(product);
    openCart();
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className={`h-full w-full object-cover ${outOfStock ? 'opacity-50 grayscale' : ''}`}
            animate={{ scale: isHovered && !outOfStock ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {(outOfStock || product.badge) && (
            <div className="absolute left-3 top-3 z-10">
              <Badge>{outOfStock ? 'Sold Out' : product.badge}</Badge>
            </div>
          )}

          <motion.button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 shadow-soft backdrop-blur-sm cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={16}
              className={isWishlisted ? 'fill-maroon text-maroon' : 'text-ink-soft'}
            />
          </motion.button>

          {discount > 0 && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="inline-flex items-center rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream">
                {discount}% off
              </span>
            </div>
          )}

          <AnimatePresence>
            {isHovered && !outOfStock && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-3 bottom-3 z-10 hidden md:block"
              >
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream shadow-lift transition-colors hover:bg-gold-dark cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  Add to Cart
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 space-y-1.5">
          <h3 className="line-clamp-1 text-base text-ink">{product.name}</h3>
          <Rating value={product.rating} count={product.reviews} />
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-display text-lg font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-ink-soft line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
