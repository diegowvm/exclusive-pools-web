
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CredibilitySection from '@/components/CredibilitySection';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Services from '@/components/Services';
import Quality from '@/components/Quality';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CredibilitySection />
      <Products />
      <Gallery />
      <About />
      <Services />
      <Quality />
      <Pricing />
      <section id="contato">
        <Contact />
      </section>
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
