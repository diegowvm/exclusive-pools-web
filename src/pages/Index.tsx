
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Services from '@/components/Services';
import Quality from '@/components/Quality';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <Gallery />
      <About />
      <Services />
      <Quality />
      <Pricing />
      <Contact />
      <Testimonials />
      <Footer />
      
      {/* Quote form section for easier access */}
      <section id="orcamento">
        <Contact />
      </section>
    </div>
  );
};

export default Index;
