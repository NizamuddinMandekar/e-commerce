import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-ink py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="container-page flex flex-col items-center gap-5 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-gold-light">
          <Mail size={22} />
        </div>
        <h2 className="text-balance font-display text-3xl font-medium text-cream md:text-4xl">
          Be first to know
        </h2>
        <p className="max-w-md text-balance text-cream/70">
          Subscribe for early access to new drops, festive edits, and 10% off your first order.
        </p>

        {submitted ? (
          <p className="text-sm font-medium text-gold-light">
            Thank you for subscribing  welcome to ZiuWorld.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus-visible:border-gold"
            />
            <Button type="submit" variant="gold">
              Subscribe
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
