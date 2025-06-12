
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Selecione os produtos que deseja incluir no seu orçamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-visible rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white w-full max-w-[320px] min-h-[520px] flex flex-col cursor-pointer"
                onClick={() => handleSelectProduct(product)}
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-between pb-8">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-bold text-premium-black line-clamp-2 min-h-[3.5rem] leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-premium-gray line-clamp-3 text-sm min-h-[4rem] leading-relaxed">
                      {product.description}
                    </p>
                    <div className="text-xl font-bold text-aqua">
                      A partir de {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="mt-6 pt-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProduct(product);
                      }}
                      className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 min-h-[48px] text-base py-3"
                    >
                      Ver Ficha Técnica
                    </Button>
                  </div>
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
