
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price?: string;
  features?: string[];
  onExplore: () => void;
}

const ProductCard = ({ title, description, image, price, features, onExplore }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white relative">
      {/* Badge */}
      {price && (
        <div className="absolute top-4 right-4 z-10 bg-aqua text-white px-3 py-1 rounded-full text-sm font-bold">
          A partir de {price}
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Quick Preview on Hover */}
        <div className="absolute inset-0 bg-aqua/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h4 className="font-bold text-lg mb-2">Visualização Rápida</h4>
            {features && (
              <ul className="text-sm space-y-1">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-premium-black group-hover:text-aqua transition-colors flex-1">
            {title}
          </h3>
          <div className="flex items-center ml-2">
            <div className="flex space-x-1">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-premium-gray mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-aqua/10 text-aqua text-xs px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          onClick={onExplore}
          className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
        >
          Ver Detalhes e Preços
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
