
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import CartSummary from '@/components/CartSummary';
import { products } from '@/data/products';

const EquipamentosPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductGrid
        products={products.filter((p) => p.category === "equipamentos")}
        title="Equipamentos e Acessórios"
      />
      <CartSummary />
      <Footer />
    </div>
  );
};

export default EquipamentosPage;
