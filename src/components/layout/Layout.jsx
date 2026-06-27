import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <SearchOverlay />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
