
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Eye, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_visible: boolean;
  is_featured: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onToggleVisibility: (productId: string, currentVisibility: boolean) => void;
  onToggleFeatured: (productId: string, currentFeatured: boolean) => void;
}

export function ProductCard({
  product,
  viewMode,
  onEdit,
  onDelete,
  onToggleVisibility,
  onToggleFeatured
}: ProductCardProps) {
  if (viewMode === 'grid') {
    return (
      <Card className="border-blue-200 bg-white hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge className="bg-blue-600 text-white">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-blue-900 mb-1">{product.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-800">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={product.is_visible}
                  onCheckedChange={() => onToggleVisibility(product.id, product.is_visible)}
                />
                <span className="text-xs text-blue-600">Visível</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  checked={product.is_featured}
                  onCheckedChange={() => onToggleFeatured(product.id, product.is_featured)}
                />
                <span className="text-xs text-blue-600">Destaque</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product.id)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-white hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-blue-900">{product.name}</h3>
              <Badge className="bg-blue-600 text-white text-xs">
                {product.category}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 mb-1">{product.description}</p>
            <p className="font-bold text-blue-800">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                checked={product.is_visible}
                onCheckedChange={() => onToggleVisibility(product.id, product.is_visible)}
              />
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                checked={product.is_featured}
                onCheckedChange={() => onToggleFeatured(product.id, product.is_featured)}
              />
              <Star className="w-4 h-4 text-blue-500" />
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(product)}
                className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(product.id)}
                className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
