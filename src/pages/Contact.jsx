import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-page py-10 lg:py-16">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          Get in Touch
        </span>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink md:text-4xl">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-3 text-ink-soft">
          Questions about an order, sizing, or a custom piece? Reach out and our team will
          respond within 1–2 business days.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {submitted ? (
            <div className="rounded-2xl border border-line bg-cream-dark p-8 text-center">
              <h2 className="font-display text-2xl font-medium text-ink">Message sent</h2>
              <p className="mt-2 text-ink-soft">
                Thank you for reaching out  we&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required placeholder="Your name" className={inputClass} />
                <input required type="email" placeholder="Email address" className={inputClass} />
              </div>
              <input placeholder="Subject" className={inputClass} />
              <textarea
                required
                rows={6}
                placeholder="How can we help?"
                className={inputClass}
              />
              <Button type="submit" size="lg" className="mt-2 w-fit">
                <Send size={16} />
                Send Message
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col gap-6 rounded-2xl border border-line bg-cream-dark p-6"
        >
          <div className="flex gap-3">
            <MapPin size={18} className="mt-0.5 flex-shrink-0 text-gold-dark" />
            <div>
              <p className="font-medium text-ink">Visit our studio</p>
              <p className="text-sm text-ink-soft">42 Artisan Lane, Jaipur, Rajasthan, India</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone size={18} className="mt-0.5 flex-shrink-0 text-gold-dark" />
            <div>
              <p className="font-medium text-ink">Call us</p>
              <p className="text-sm text-ink-soft">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail size={18} className="mt-0.5 flex-shrink-0 text-gold-dark" />
            <div>
              <p className="font-medium text-ink">Email us</p>
              <p className="text-sm text-ink-soft">hello@ziuworld.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock size={18} className="mt-0.5 flex-shrink-0 text-gold-dark" />
            <div>
              <p className="font-medium text-ink">Studio hours</p>
              <p className="text-sm text-ink-soft">Mon – Sat, 10am – 7pm IST</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
