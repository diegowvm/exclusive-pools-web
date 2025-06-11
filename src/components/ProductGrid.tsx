
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/contexts/CartContext';
import ProductTechSheet from './ProductTechSheet';

interface ProductGridProps {
  products: Product[];
  title: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTechSheetOpen, setIsTechSheetOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsTechSheetOpen(true);
  };

  const closeTechSheet = () => {
    setIsTechSheetOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="py-20 bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300">
              Selecione os produtos que deseja incluir no seu orçamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white h-[400px] flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-premium-black mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-premium-gray mb-3 line-clamp-2 text-sm">
                      {product.description}
                    </p>
                    <div className="text-xl font-bold text-aqua mb-4">
                      A partir de {formatPrice(product.price)}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleSelectProduct(product)}
                    className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300 min-h-[44px]"
                  >
                    Ver Ficha Técnica
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductTechSheet
          isOpen={isTechSheetOpen}
          onClose={closeTechSheet}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductGrid;
