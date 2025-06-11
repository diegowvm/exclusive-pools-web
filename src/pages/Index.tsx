
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import HeroStats from '@/components/HeroStats';
import CredibilitySection from '@/components/CredibilitySection';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Services from '@/components/Services';
import Quality from '@/components/Quality';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroCarousel />
      <HeroStats />
      <CredibilitySection />
      <Products />
      <Gallery />
      <About />
      <Services />
      <Quality />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
