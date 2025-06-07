
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import CartSummary from '@/components/CartSummary';
import { products } from '@/data/products';

const SpasPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductGrid products={products.spas} title="Spas Luxuosos" />
      <CartSummary />
      <Footer />
    </div>
  );
};

export default SpasPage;
