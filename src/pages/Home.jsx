import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import InstagramGallery from '../components/home/InstagramGallery';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts
        title="Bestsellers"
        subtitle="Loved again and again by the ZiuWorld community."
        filterBadge="Bestseller"
        viewAllHref="/shop"
      />
      <BrandStory />
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Fresh off the loom and the workbench."
        filterBadge="New"
        viewAllHref="/shop?sort=newest"
      />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
