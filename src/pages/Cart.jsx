import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/format';
import QuantityStepper from '../components/ui/QuantityStepper';
import Button from '../components/ui/Button';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 199;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-ink-soft">
          <ShoppingBag size={26} />
        </div>
        <h1 className="font-display text-2xl font-medium text-ink">Your bag is empty</h1>
        <p className="max-w-sm text-ink-soft">
          Looks like you haven&apos;t added anything yet. Explore sarees, lehengas, and fine jewelry.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">Your Bag</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col divide-y divide-line"
        >
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 py-6">
              <Link
                to={`/product/${item.slug}`}
                className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-cream-dark"
              >
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-medium text-ink hover:text-gold-dark"
                    >
                      {item.name}
                    </Link>
                    {item.size && <p className="mt-1 text-sm text-ink-soft">Size: {item.size}</p>}
                    <p className="mt-1 text-sm text-ink-soft">{formatPrice(item.price)} each</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(item.id)}
                    className="text-ink-soft hover:text-maroon cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <QuantityStepper value={item.qty} onChange={(qty) => setQty(item.id, qty)} />
                  <span className="font-semibold text-ink">{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-fit rounded-2xl border border-line bg-cream-dark p-6"
        >
          <h2 className="font-display text-lg font-medium text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gold-dark">
                Add {formatPrice(2999 - subtotal)} more for free shipping
              </p>
            )}
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button as={Link} to="/checkout" size="lg" className="mt-6 w-full">
            Proceed to Checkout
          </Button>
          <Link
            to="/shop"
            className="mt-3 block text-center text-sm text-ink-soft hover:text-gold-dark"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
