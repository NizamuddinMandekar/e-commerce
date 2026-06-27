import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center gap-5 py-28 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-gold-dark"
      >
        <Gem size={28} />
      </motion.div>
      <h1 className="font-display text-5xl font-medium text-ink">404</h1>
      <h2 className="font-display text-2xl font-medium text-ink">Page not found</h2>
      <p className="max-w-sm text-ink-soft">
        The page you&apos;re looking for may have been moved or doesn&apos;t exist.
      </p>
      <Button as={Link} to="/" size="lg">
        Back to Home
      </Button>
    </div>
  );
}
