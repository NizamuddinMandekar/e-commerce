import { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { formatPrice } from '../lib/format';
import { useCartStore } from '../store/useCartStore';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (state?.orderId) clearCart();
  }, [state?.orderId, clearCart]);

  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-dark"
      >
        <CheckCircle2 size={32} />
      </motion.div>
      <h1 className="font-display text-3xl font-medium text-ink">Order placed!</h1>
      <p className="max-w-md text-ink-soft">
        Thank you for shopping with ZiuWorld. Your order{' '}
        <span className="font-semibold text-ink">#{state.orderId}</span> for{' '}
        <span className="font-semibold text-ink">{formatPrice(state.total)}</span> has been
        confirmed. A confirmation email is on its way.
      </p>
      <div className="mt-2 flex gap-4">
        <Button as={Link} to="/shop" size="lg">
          Continue Shopping
        </Button>
        <Button as={Link} to="/account" variant="outline" size="lg">
          View Orders
        </Button>
      </div>
    </div>
  );
}
