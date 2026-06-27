import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductTabs from '../components/product/ProductTabs';
import ProductGrid from '../components/product/ProductGrid';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import QuantityStepper from '../components/ui/QuantityStepper';
import { formatPrice } from '../lib/format';
import { useCatalogStore } from '../store/useCatalogStore';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useUIStore } from '../store/useUIStore';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = useCatalogStore((s) => s.getProductBySlug(slug));
  const getCategoryBySlug = useCatalogStore((s) => s.getCategoryBySlug);
  const getRelatedProducts = useCatalogStore((s) => s.getRelatedProducts);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const isWishlisted = useWishlistStore((s) => (product ? s.isWishlisted(product.id) : false));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  if (!product) return <Navigate to="/shop" replace />;

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, { size, qty });
    openCart();
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: category?.name ?? product.category, href: `/shop/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProductGallery images={product.images} alt={product.name} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {(outOfStock || product.badge) && (
            <Badge className="mb-3">{outOfStock ? 'Sold Out' : product.badge}</Badge>
          )}
          <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3">
            <Rating value={product.rating} count={product.reviews} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-ink-soft line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-md text-ink-soft">{product.description}</p>

          <p className="mt-5 text-sm text-ink-soft">
            <span className="font-medium text-ink">Color: </span>
            {product.color}
          </p>

          {outOfStock ? (
            <p className="mt-2 text-sm font-medium text-maroon">Currently out of stock</p>
          ) : lowStock ? (
            <p className="mt-2 text-sm font-medium text-gold-dark">
              Only {product.stock} left in stock
            </p>
          ) : null}

          {product.sizes && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink">
                Size{product.category === 'rings' ? ' (US)' : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium cursor-pointer transition-colors ${
                      size === s
                        ? 'border-ink bg-ink text-cream'
                        : 'border-line text-ink hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <QuantityStepper
              value={qty}
              onChange={setQty}
              max={outOfStock ? 1 : product.stock}
            />
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1"
              disabled={outOfStock}
            >
              <ShoppingBag size={16} />
              {outOfStock ? 'Sold Out' : 'Add to Cart'}
            </Button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-maroon hover:text-maroon cursor-pointer"
            >
              <Heart size={18} className={isWishlisted ? 'fill-maroon text-maroon' : ''} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <Truck size={18} className="text-gold-dark" /> Free shipping over ₹2,999
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <RotateCcw size={18} className="text-gold-dark" /> 7-day easy returns
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <ShieldCheck size={18} className="text-gold-dark" /> Authenticity guaranteed
            </div>
          </div>
        </motion.div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-medium text-ink">You may also like</h2>
          <ProductGrid products={related} />
        </div>
      )}

      <div className="mt-10">
        <Link to="/shop" className="text-sm font-medium text-gold-dark hover:underline">
          &larr; Back to all products
        </Link>
      </div>
    </div>
  );
}
