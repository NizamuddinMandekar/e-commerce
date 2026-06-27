import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOrdersStore, ORDER_STATUSES } from '../../store/useOrdersStore';
import StatusBadge from '../../components/admin/StatusBadge';
import { formatPrice } from '../../lib/format';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const order = useOrdersStore((s) => s.getOrderById(id));
  const updateStatus = useOrdersStore((s) => s.updateStatus);

  if (!order) {
    return (
      <div className="text-center text-ink-soft">
        Order not found.{' '}
        <Link to="/admin/orders" className="text-gold-dark hover:underline">
          Back to orders
        </Link>
      </div>
    );
  }

  const { customer } = order;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin/orders"
        className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold-dark"
      >
        <ArrowLeft size={15} />
        Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Order #{order.id}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Placed{' '}
            {new Date(order.date).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
            className="rounded-full border border-line bg-cream px-4 py-2 text-sm text-ink cursor-pointer"
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-cream p-5">
          <h2 className="font-medium text-ink">Customer</h2>
          <dl className="mt-3 flex flex-col gap-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="w-20 flex-shrink-0 text-ink-soft">Name</dt>
              <dd className="text-ink">{customer?.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 flex-shrink-0 text-ink-soft">Phone</dt>
              <dd className="text-ink">{customer?.phone}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 flex-shrink-0 text-ink-soft">Email</dt>
              <dd className="text-ink">{customer?.email}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-5">
          <h2 className="font-medium text-ink">Shipping Address</h2>
          <p className="mt-3 text-sm text-ink-soft">
            {customer?.address}
            {customer?.landmark ? `, ${customer.landmark}` : ''}
            <br />
            {customer?.city}, {customer?.state} {customer?.pin}
          </p>
          <p className="mt-2 text-xs uppercase tracking-wide text-ink-soft">
            Payment: {order.paymentMethod}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-cream">
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-medium text-ink">Items</h2>
        </div>
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 px-5 py-4">
              <img src={item.image} alt={item.name} className="h-16 w-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-ink-soft">
                  {item.size ? `Size: ${item.size} · ` : ''}Qty {item.qty}
                </p>
              </div>
              <span className="text-sm font-medium text-ink">
                {formatPrice(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
