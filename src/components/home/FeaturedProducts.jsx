import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ProductGrid from '../product/ProductGrid';
import { useCatalogStore } from '../../store/useCatalogStore';

export default function FeaturedProducts({
  title = 'Bestsellers',
  subtitle = 'Loved again and again by the ZiuWorld community.',
  filterBadge = 'Bestseller',
  viewAllHref = '/shop',
}) {
  const allProducts = useCatalogStore((s) => s.products);
  const products = allProducts.filter((p) => p.badge === filterBadge).slice(0, 4);

  return (
    <section className="container-page py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Hand-picked" title={title} subtitle={subtitle} align="left" />
        <Link
          to={viewAllHref}
          className="flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.1em] text-gold-dark hover:underline"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <ProductGrid products={products} />
      </motion.div>
    </section>
  );
}
