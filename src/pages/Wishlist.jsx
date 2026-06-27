import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCatalogStore } from '../store/useCatalogStore';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';

export default function Wishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const allProducts = useCatalogStore((s) => s.products);
  const products = allProducts.filter((p) => ids.includes(p.id));

  if (products.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-ink-soft">
          <Heart size={26} />
        </div>
        <h1 className="font-display text-2xl font-medium text-ink">Your wishlist is empty</h1>
        <p className="max-w-sm text-ink-soft">
          Tap the heart icon on any piece to save it here for later.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Explore the Edit
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">Your Wishlist</h1>
      <p className="mt-2 text-ink-soft">{products.length} saved pieces</p>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
