import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/useAdminAuthStore';

export default function RequireAdminAuth() {
  const isAuthenticated = useAdminAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
