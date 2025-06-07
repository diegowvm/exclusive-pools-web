
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product, useCart } from '@/contexts/CartContext';

interface ProductGridProps {
  products: Product[];
  title: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            {title}
          </h1>
          <p className="text-xl text-premium-gray">
            Selecione os produtos que deseja incluir no seu orçamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-premium-black mb-3">
                  {product.name}
                </h3>
                <p className="text-premium-gray mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-aqua mb-4">
                  {formatPrice(product.price)}
                </div>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300"
                >
                  Selecionar Produto
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
