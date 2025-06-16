
import { Card, CardContent } from "@/components/ui/card";
import { Package, Star, Eye, ShoppingCart } from "lucide-react";

interface ProductsStatsProps {
  totalProducts: number;
  featuredCount: number;
  visibleCount: number;
  categoriesCount: number;
}

export function ProductsStats({ 
  totalProducts, 
  featuredCount, 
  visibleCount, 
  categoriesCount 
}: ProductsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{totalProducts}</p>
              <p className="text-sm text-blue-600">Total Produtos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{featuredCount}</p>
              <p className="text-sm text-blue-600">Em Destaque</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{visibleCount}</p>
              <p className="text-sm text-blue-600">Visíveis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{categoriesCount}</p>
              <p className="text-sm text-blue-600">Categorias</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
