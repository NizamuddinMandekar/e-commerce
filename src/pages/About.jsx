import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Hand, Leaf, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { img, IMG } from '../lib/images';

const VALUES = [
  {
    icon: Hand,
    title: 'Handcrafted, always',
    text: 'No mass production  every saree, lehenga and ornament is finished by hand.',
  },
  {
    icon: Gem,
    title: 'Honest materials',
    text: 'Pure silks, certified metals, and ethically sourced stones, clearly labeled on every product.',
  },
  {
    icon: Leaf,
    title: 'Fair, sustainable craft',
    text: 'Long-term partnerships with weaving clusters and jewelry ateliers, paid fairly for their time.',
  },
  {
    icon: Sparkles,
    title: 'Made to be worn',
    text: 'Designed for real celebrations, real bodies, and real life  not just the photoshoot.',
  },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-cream-dark">
        <div className="container-page grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Our Story
            </span>
            <h1 className="mt-3 text-balance font-display text-4xl font-medium text-ink md:text-5xl">
              From the loom and the workbench, to you
            </h1>
            <p className="mt-5 max-w-md text-ink-soft">
              ZiuWorld began with a simple frustration: beautifully made traditional wear and
              jewelry was either impossibly expensive, or mass-produced and forgettable. We
              started working directly with weaving clusters and jewelry ateliers across India
              to bring their craft to you  without the markup, and without losing the story.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card"
          >
            <img
              src={img(IMG.lifestyleBrideJewelry, { w: 1000 })}
              alt="Bride adjusting handcrafted earrings and bangles"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Craft first, always"
          subtitle="Four principles that guide every piece we make."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-start gap-3 rounded-2xl border border-line p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-dark text-gold-dark">
                <Icon size={20} />
              </div>
              <h3 className="font-medium text-ink">{title}</h3>
              <p className="text-sm text-ink-soft">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {[
            ['120+', 'Artisan partners across India'],
            ['15,000+', 'Customers dressed for their moments'],
            ['7', 'Weaving & jewelry clusters supported'],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="font-display text-4xl font-semibold text-gold-light">{stat}</p>
              <p className="mt-2 text-sm text-cream/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page flex flex-col items-center gap-5 py-20 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-ink md:text-4xl">
          Wear the story
        </h2>
        <p className="max-w-md text-ink-soft">
          Explore the full collection of handwoven wear and handcrafted jewelry.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Shop the Collection
        </Button>
      </section>
    </div>
  );
}
