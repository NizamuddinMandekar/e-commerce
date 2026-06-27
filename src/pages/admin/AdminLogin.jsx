import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAdminAuthStore } from '../../store/useAdminAuthStore';

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';

export default function AdminLogin() {
  const isAuthenticated = useAdminAuthStore((s) => s.isAuthenticated);
  const login = useAdminAuthStore((s) => s.login);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/admin'} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate(location.state?.from ?? '/admin', { replace: true });
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-dark px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-cream p-8 shadow-card"
      >
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="ZiuWorld logo" className="h-14 w-auto object-contain" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-medium text-ink">Admin Sign In</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Enter the admin password to manage ZiuWorld.
        </p>

        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className={`${inputClass} mt-6`}
        />
        {error && <p className="mt-2 text-sm text-maroon">{error}</p>}

        <Button type="submit" size="lg" className="mt-6 w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
