
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
          <div className="text-center mb-16 pt-20">
            <div className="inline-flex items-center bg-aqua/10 rounded-full px-6 py-2 mb-6">
              <span className="text-aqua font-semibold">Catálogo Premium</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Selecione os produtos que deseja incluir no seu orçamento personalizado
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group bg-slate-800 border-slate-700 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-aqua/20 transition-all duration-500 hover:scale-105 h-[450px] flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-aqua/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-3 text-sm leading-relaxed min-h-[4rem]">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-xl font-bold text-aqua border-t border-slate-700 pt-4">
                      A partir de {formatPrice(product.price)}
                    </div>
                    <Button 
                      onClick={() => handleSelectProduct(product)}
                      className="w-full bg-gradient-to-r from-aqua to-aqua-secondary hover:from-aqua-secondary hover:to-aqua text-white font-semibold rounded-xl transition-all duration-300 min-h-[48px] shadow-lg hover:shadow-aqua/25"
                    >
                      Ver Ficha Técnica Premium
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
