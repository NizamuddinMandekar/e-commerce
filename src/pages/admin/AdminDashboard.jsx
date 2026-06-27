import { Link } from 'react-router-dom';
import { AlertTriangle, ListOrdered, Package, Shapes, Wallet } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { useCatalogStore } from '../../store/useCatalogStore';
import { useOrdersStore } from '../../store/useOrdersStore';
import { formatPrice } from '../../lib/format';

export default function AdminDashboard() {
  const products = useCatalogStore((s) => s.products);
  const categories = useCatalogStore((s) => s.categories);
  const orders = useOrdersStore((s) => s.orders);
  const totalRevenue = useOrdersStore((s) => s.totalRevenue());

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStock = products.filter((p) => p.stock <= 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Dashboard</h1>
      <p className="mt-1 text-ink-soft">A quick look at how ZiuWorld is doing.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products" value={products.length} icon={Package} />
        <StatCard label="Categories" value={categories.length} icon={Shapes} />
        <StatCard label="Orders" value={orders.length} icon={ListOrdered} />
        <StatCard label="Revenue" value={formatPrice(totalRevenue)} icon={Wallet} />
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-5">
          <div className="flex items-center gap-2 text-gold-dark">
            <AlertTriangle size={18} />
            <h2 className="font-medium">Inventory needs attention</h2>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-soft">
            {outOfStock.map((p) => (
              <li key={p.id}>
                <Link to={`/admin/products/${p.id}/edit`} className="hover:text-gold-dark hover:underline">
                  {p.name}
                </Link>{' '}
                is out of stock
              </li>
            ))}
            {lowStock.map((p) => (
              <li key={p.id}>
                <Link to={`/admin/products/${p.id}/edit`} className="hover:text-gold-dark hover:underline">
                  {p.name}
                </Link>{' '}
                has only {p.stock} left
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-line bg-cream">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-medium text-ink">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-gold-dark hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink-soft">No orders placed yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-line last:border-none">
                  <td className="px-5 py-3">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="font-medium text-ink hover:text-gold-dark hover:underline"
                    >
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{order.customer?.name}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3 text-right font-medium text-ink">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
