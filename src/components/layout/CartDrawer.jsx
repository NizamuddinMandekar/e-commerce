import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/format';
import QuantityStepper from '../ui/QuantityStepper';
import Button from '../ui/Button';

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-[90vw] max-w-md flex-col bg-cream"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="font-display text-xl font-semibold text-ink">
                Your Bag ({items.length})
              </span>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-dark cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-ink-soft">Your bag is empty.</p>
                <Button as={Link} to="/shop" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-dark"
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                to={`/product/${item.slug}`}
                                onClick={closeCart}
                                className="text-sm font-medium text-ink hover:text-gold-dark"
                              >
                                {item.name}
                              </Link>
                              {item.size && (
                                <p className="text-xs text-ink-soft">Size: {item.size}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => removeItem(item.id)}
                              className="text-ink-soft hover:text-maroon cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <QuantityStepper
                              value={item.qty}
                              onChange={(qty) => setQty(item.id, qty)}
                            />
                            <span className="text-sm font-semibold text-ink">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <Button
                    as={Link}
                    to="/checkout"
                    onClick={closeCart}
                    className="w-full"
                    size="lg"
                  >
                    Checkout
                  </Button>
                  <Button
                    as={Link}
                    to="/cart"
                    onClick={closeCart}
                    variant="ghost"
                    className="mt-2 w-full"
                  >
                    View Bag
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
