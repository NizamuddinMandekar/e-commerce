import { InstagramIcon } from '../ui/SocialIcons';
import { img, IMG } from '../../lib/images';

const GALLERY = [
  IMG.sareeBridalTrees,
  IMG.earringsJhumkaWorn,
  IMG.lehengaRedVeil,
  IMG.bangleShopDisplay,
  IMG.suitGreenSharara,
  IMG.necklaceWall,
];

export default function InstagramGallery() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-page mb-10 flex flex-col items-center gap-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
          @ziuworld
        </span>
        <h2 className="text-balance text-3xl font-medium text-ink md:text-4xl">
          Styled by our community
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
        {GALLERY.map((id, i) => (
          <a
            key={id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square cursor-pointer overflow-hidden bg-cream-dark"
          >
            <img
              src={img(id, { w: 500 })}
              alt="ZiuWorld customer styling"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30">
              <InstagramIcon
                size={20}
                className="text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
