import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { formatPrice } from '../lib/format';
import Button from '../components/ui/Button';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', icon: Landmark },
];

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const addOrder = useOrdersStore((s) => s.addOrder);
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');

  const shipping = subtotal >= 2999 ? 0 : 199;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const order = addOrder({
      customer: {
        name: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pin: formData.get('pin'),
        landmark: formData.get('landmark') || '',
      },
      paymentMethod: payment,
      items: items.map(({ id, productId, slug, name, image, price, size, qty }) => ({
        id,
        productId,
        slug,
        name,
        image,
        price,
        size,
        qty,
      })),
      subtotal,
      shipping,
      total,
    });
    navigate('/order-confirmation', { state: { orderId: order.id, total } });
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">Checkout</h1>

      <form
        onSubmit={handlePlaceOrder}
        className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-10"
        >
          <section>
            <h2 className="font-display text-lg font-medium text-ink">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input name="fullName" required placeholder="Full name" className={inputClass} />
              <input name="phone" required type="tel" placeholder="Phone number" className={inputClass} />
              <input
                name="email"
                required
                type="email"
                placeholder="Email address"
                className={`${inputClass} sm:col-span-2`}
              />
              <input
                name="address"
                required
                placeholder="Address"
                className={`${inputClass} sm:col-span-2`}
              />
              <input name="city" required placeholder="City" className={inputClass} />
              <input name="state" required placeholder="State" className={inputClass} />
              <input name="pin" required placeholder="PIN code" className={inputClass} />
              <input name="landmark" placeholder="Landmark (optional)" className={inputClass} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Payment Method</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayment(id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-sm font-medium transition-colors cursor-pointer ${
                    payment === id
                      ? 'border-ink bg-ink text-cream'
                      : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>

            {payment === 'card' && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Card number"
                  className={`${inputClass} sm:col-span-2`}
                />
                <input required placeholder="MM/YY" className={inputClass} />
                <input required placeholder="CVV" className={inputClass} />
              </div>
            )}
            {payment === 'upi' && (
              <div className="mt-4">
                <input required placeholder="yourname@upi" className={inputClass} />
              </div>
            )}
            {payment === 'cod' && (
              <p className="mt-4 text-sm text-ink-soft">
                Pay with cash when your order is delivered. A small COD fee may apply.
              </p>
            )}
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-fit rounded-2xl border border-line bg-cream-dark p-6"
        >
          <h2 className="font-display text-lg font-medium text-ink">Order Summary</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="h-14 w-12 rounded-lg object-cover" />
                <div className="flex-1 text-sm">
                  <p className="text-ink">{item.name}</p>
                  <p className="text-ink-soft">Qty {item.qty}</p>
                </div>
                <span className="text-sm font-medium text-ink">
                  {formatPrice(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full">
            Place Order
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
