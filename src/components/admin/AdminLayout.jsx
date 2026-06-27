import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Package,
  Shapes,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuthStore } from '../../store/useAdminAuthStore';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Shapes },
  { to: '/admin/orders', label: 'Orders', icon: ListOrdered },
];

export default function AdminLayout() {
  const logout = useAdminAuthStore((s) => s.logout);

  return (
    <div className="flex min-h-screen bg-cream-dark">
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-line bg-cream px-5 py-6">
        <Link to="/admin" className="font-display text-xl font-semibold text-ink">
          Ziu<span className="text-gold">World</span>
          <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            Admin
          </span>
        </Link>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-cream-dark hover:text-ink'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-line pt-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-dark hover:text-ink cursor-pointer"
          >
            <ExternalLink size={17} />
            View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-cream-dark hover:text-maroon cursor-pointer"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
}
