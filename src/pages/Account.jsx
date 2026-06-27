import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { LogOut, Package, User } from 'lucide-react';
import Button from '../components/ui/Button';

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';

function AuthForms() {
  const [tab, setTab] = useState('signin');
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get('name');
    setName(value || 'there');
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Dashboard name={name} onLogout={() => setLoggedIn(false)} />;
  }

  return (
    <div className="mx-auto max-w-md py-10 lg:py-16">
      <div className="flex rounded-full bg-cream-dark p-1">
        {['signin', 'register'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={clsx(
              'flex-1 rounded-full py-2.5 text-sm font-medium transition-colors cursor-pointer',
              tab === t ? 'bg-ink text-cream' : 'text-ink-soft'
            )}
          >
            {t === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      <motion.form
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4"
      >
        <h1 className="font-display text-2xl font-medium text-ink">
          {tab === 'signin' ? 'Welcome back' : 'Join ZiuWorld'}
        </h1>

        {tab === 'register' && (
          <input name="name" required placeholder="Full name" className={inputClass} />
        )}
        {tab === 'signin' && (
          <input name="name" placeholder="Full name (demo)" className={inputClass} />
        )}
        <input required type="email" placeholder="Email address" className={inputClass} />
        <input required type="password" placeholder="Password" className={inputClass} />

        <Button type="submit" size="lg" className="mt-2">
          {tab === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>

        <p className="text-center text-xs text-ink-soft">
          This is a demo store  no real account is created.
        </p>
      </motion.form>
    </div>
  );
}

function Dashboard({ name, onLogout }) {
  return (
    <div className="py-10 lg:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-dark text-ink-soft">
            <User size={24} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-medium text-ink">Hi, {name}</h1>
            <p className="text-sm text-ink-soft">Welcome to your ZiuWorld account</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-cream-dark cursor-pointer"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-cream-dark p-8 text-center">
        <Package size={28} className="mx-auto text-ink-soft" />
        <h2 className="mt-3 font-display text-xl font-medium text-ink">No orders yet</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Once you place an order, you&apos;ll be able to track it here.
        </p>
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <div className="container-page">
      <AuthForms />
    </div>
  );
}
