import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCatalogStore } from '../../store/useCatalogStore';
import SectionHeading from '../ui/SectionHeading';

export default function CategoryShowcase() {
  const categories = useCatalogStore((s) => s.categories);

  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Two crafts, one story"
        subtitle="From handwoven silks to hand-set stones  explore the edits that define ZiuWorld."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link to={`/shop/${cat.slug}`} className="group block cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-2xl bg-cream-dark">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-ink">{cat.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
