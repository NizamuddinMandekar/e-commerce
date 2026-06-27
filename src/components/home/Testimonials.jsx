import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Rating from '../ui/Rating';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Customer Love"
        title="Worn, loved, and passed down"
        subtitle="A few words from the ZiuWorld community."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-cream p-6 shadow-soft"
          >
            <Quote className="text-gold" size={22} />
            <blockquote className="flex-1 text-sm text-ink-soft">&ldquo;{t.quote}&rdquo;</blockquote>
            <Rating value={t.rating} />
            <figcaption className="text-sm font-medium text-ink">
              {t.name}
              <span className="font-normal text-ink-soft"> &middot; {t.location}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
