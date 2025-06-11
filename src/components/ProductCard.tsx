
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight } from 'lucide-react';

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
    <Card 
      className="group overflow-hidden rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 hover:scale-[1.02] bg-white relative border-0"
      role="article"
      aria-labelledby={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Price Badge */}
      {price && (
        <div className="absolute top-4 right-4 z-10 bg-aqua text-white px-3 py-2 rounded-full text-sm font-bold shadow-medium">
          A partir de {price}
        </div>
      )}
      
      <div className="relative h-64 lg:h-72 overflow-hidden">
        <img 
          src={image} 
          alt={`${title} - Imagem ilustrativa`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Quick Preview on Hover */}
        <div className="absolute inset-0 bg-aqua/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="font-bold text-lg lg:text-xl mb-3">Principais Características</h4>
            {features && (
              <ul className="text-sm lg:text-base space-y-2" role="list">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center justify-center" role="listitem">
                    <span className="mr-2 text-white/80" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 
            id={`product-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xl lg:text-2xl font-bold text-premium-black group-hover:text-aqua transition-colors flex-1 leading-tight"
          >
            {title}
          </h3>
          <div className="flex items-center ml-3" aria-label="Avaliação 5 estrelas">
            <div className="flex space-x-1">
              {[1,2,3,4,5].map((star) => (
                <Star 
                  key={star} 
                  className="w-4 h-4 text-yellow-400 fill-current" 
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-premium-gray mb-6 leading-relaxed text-sm lg:text-base line-clamp-3">
          {description}
        </p>
        
        {features && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-aqua/10 text-aqua text-xs lg:text-sm px-3 py-1 rounded-full font-medium border border-aqua/20"
                >
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className="bg-gray-100 text-premium-gray text-xs lg:text-sm px-3 py-1 rounded-full font-medium">
                  +{features.length - 2} mais
                </span>
              )}
            </div>
          </div>
        )}
        
        <Button 
          onClick={onExplore}
          className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-aqua hover:shadow-large group/btn min-h-[48px] text-sm lg:text-base"
          aria-label={`Ver detalhes e preços de ${title}`}
        >
          <span>Ver Detalhes e Preços</span>
          <ArrowRight 
            className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" 
            aria-hidden="true"
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
