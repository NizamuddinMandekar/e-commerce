import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons';
import { useCatalogStore } from '../../store/useCatalogStore';
import { computeNavGroups } from '../../lib/navGroups';

export default function Footer() {
  const categories = useCatalogStore((s) => s.categories);
  const navGroups = useMemo(() => computeNavGroups(categories), [categories]);

  return (
    <footer className="border-t border-line bg-cream-dark">
      <div className="container-page grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo imageClassName="h-20 max-w-[220px]" />
          <p className="mt-4 max-w-sm text-sm text-ink-soft">
            Handcrafted traditional wear and fine jewelry, made in small batches by
            artisan partners across India. Designed for the moments worth dressing up for.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ZiuWorld on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-cream cursor-pointer"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ZiuWorld on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-cream cursor-pointer"
            >
              <FacebookIcon size={17} />
            </a>
          </div>
        </div>

        {navGroups.map((group) => (
          <div key={group.slug}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/shop/${item.slug}`}
                    className="text-sm text-ink-soft transition-colors hover:text-gold-dark"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink">
            Get in Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>42 Artisan Lane, Jaipur, Rajasthan, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-shrink-0" />
              <span>hello@ziuworld.com</span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li>
              <Link to="/about" className="text-ink-soft hover:text-gold-dark">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-ink-soft hover:text-gold-dark">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <p className="flex flex-wrap items-center justify-center gap-2 text-center text-xs text-ink-soft">
          <span>&copy; {new Date().getFullYear()} ZiuWorld. All rights reserved.</span>
          <span aria-hidden="true">&middot;</span>
          <Link to="/admin" className="hover:text-gold-dark">
            Admin
          </Link>
        </p>
      </div>
    </footer>
  );
}
