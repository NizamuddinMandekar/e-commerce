import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Hand, Leaf } from 'lucide-react';
import Button from '../ui/Button';
import { img, IMG } from '../../lib/images';

const POINTS = [
  {
    icon: Hand,
    title: 'Handcrafted, always',
    text: 'Every weave and setting passes through artisan hands before it reaches yours.',
  },
  {
    icon: Gem,
    title: 'Honest materials',
    text: 'Pure silks, certified metals and ethically sourced stones  clearly labeled.',
  },
  {
    icon: Leaf,
    title: 'Made to last',
    text: 'Small batches, considered design, and pieces built to be worn for years.',
  },
];

export default function BrandStory() {
  return (
    <section className="bg-cream-dark py-16 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="aspect-[5/4] overflow-hidden rounded-[2rem] shadow-card"
        >
          <img
            src={img(IMG.artisanCraft, { w: 1000 })}
            alt="Artisan hands crafting a piece of jewelry"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
            Our Craft
          </span>
          <h2 className="mt-3 text-balance text-3xl font-medium text-ink md:text-4xl">
            Built with the hands that made it
          </h2>
          <p className="mt-4 max-w-md text-ink-soft">
            ZiuWorld partners with weaving clusters and jewelry ateliers across India,
            paying fair rates for traditional techniques that take years to master.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cream text-gold-dark">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <Button as={Link} to="/about" variant="outline" className="mt-8">
            Read Our Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
