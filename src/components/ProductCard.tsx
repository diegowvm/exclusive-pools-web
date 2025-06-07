
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  onExplore: () => void;
}

const ProductCard = ({ title, description, image, onExplore }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-premium-black mb-3 group-hover:text-aqua transition-colors">
          {title}
        </h3>
        <p className="text-premium-gray mb-4 line-clamp-2">
          {description}
        </p>
        <Button 
          onClick={onExplore}
          className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full transition-all duration-300"
        >
          Explorar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
