import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 cursor-pointer ${
                active === i ? 'border-gold' : 'border-transparent'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
