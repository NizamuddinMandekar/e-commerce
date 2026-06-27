import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { img, IMG } from '../../lib/images';

export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-2 flex flex-col items-start gap-6 lg:order-1"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
            The Festive Edit, 2026
          </span>
          <h1 className="text-balance text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Heirloom craft,
            <br />
            worn your way.
          </h1>
          <p className="max-w-md text-balance text-base text-ink-soft">
            Handwoven sarees, embroidered lehengas and fine, handcrafted jewelry  
            made in small batches with artisan partners across India.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button as={Link} to="/shop" size="lg">
              Shop the Edit
              <ArrowRight size={16} />
            </Button>
            <Button as={Link} to="/shop/necklaces" variant="outline" size="lg">
              Explore Jewelry
            </Button>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="font-display text-2xl text-ink">120+</dt>
              <dd className="text-xs text-ink-soft">Artisan partners</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">15k+</dt>
              <dd className="text-xs text-ink-soft">Happy customers</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">4.8★</dt>
              <dd className="text-xs text-ink-soft">Average rating</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative order-1 lg:order-2"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-dark shadow-card">
            <img
              src={img(IMG.lehengaRedHall, { w: 1100 })}
              alt="Model wearing a hand-embroidered red bridal lehenga"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="absolute -bottom-8 -left-6 hidden w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-lift sm:block"
          >
            <img
              src={img(IMG.necklaceSetBust, { w: 400 })}
              alt="Gold-plated temple necklace and earring set"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
