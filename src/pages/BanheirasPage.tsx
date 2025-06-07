
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import CartSummary from '@/components/CartSummary';
import { products } from '@/data/products';

const BanheirasPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductGrid products={products.banheiras} title="Banheiras & Jacuzzis" />
      <CartSummary />
      <Footer />
    </div>
  );
};

export default BanheirasPage;
