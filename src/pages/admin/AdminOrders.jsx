import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrdersStore, ORDER_STATUSES } from '../../store/useOrdersStore';
import StatusBadge from '../../components/admin/StatusBadge';
import { formatPrice } from '../../lib/format';

export default function AdminOrders() {
  const orders = useOrdersStore((s) => s.orders);
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(
    () => orders.filter((o) => !statusFilter || o.status === statusFilter),
    [orders, statusFilter]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Orders</h1>
          <p className="mt-1 text-ink-soft">{orders.length} orders placed</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-line bg-cream px-4 py-2.5 text-sm text-ink cursor-pointer"
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-cream">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-none">
                <td className="px-5 py-3">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="font-medium text-ink hover:text-gold-dark hover:underline"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-5 py-3 text-ink-soft">{order.customer?.name}</td>
                <td className="px-5 py-3 text-ink-soft">
                  {order.items.reduce((sum, i) => sum + i.qty, 0)}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3 text-right font-medium text-ink">
                  {formatPrice(order.total)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
