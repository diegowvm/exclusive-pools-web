
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  Eye, 
  EyeOff, 
  Star, 
  Package,
  Waves,
  Bath,
  Zap,
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  is_visible: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const categories = [
  { id: 'piscinas', name: 'Piscinas', icon: Waves, color: 'from-blue-500 to-cyan-500' },
  { id: 'banheiras', name: 'Banheiras', icon: Bath, color: 'from-purple-500 to-pink-500' },
  { id: 'spas', name: 'Spas', icon: Zap, color: 'from-green-500 to-emerald-500' },
  { id: 'equipamentos', name: 'Equipamentos', icon: Settings, color: 'from-orange-500 to-red-500' }
];

export function CategoryEditor() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('piscinas');

  useEffect(() => {
    loadProducts();
    
    // Configurar real-time updates
    const channel = supabase
      .channel('category-products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Produto atualizado em tempo real:', payload);
          loadProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_visible: !product.is_visible })
        .eq('id', product.id);
      
      if (error) throw error;
      toast({ 
        title: product.is_visible ? "Produto ocultado" : "Produto exibido",
        description: `O produto agora está ${!product.is_visible ? 'visível' : 'oculto'} no site.`
      });
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar a visibilidade.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !product.is_featured })
        .eq('id', product.id);
      
      if (error) throw error;
      toast({ 
        title: product.is_featured ? "Removido dos destaques" : "Adicionado aos destaques"
      });
    } catch (error) {
      console.error('Erro ao alterar destaque:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o destaque.",
        variant: "destructive",
      });
    }
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category === categoryId);
  };

  const getCategoryStats = (categoryId: string) => {
    const categoryProducts = getProductsByCategory(categoryId);
    return {
      total: categoryProducts.length,
      visible: categoryProducts.filter(p => p.is_visible).length,
      featured: categoryProducts.filter(p => p.is_featured).length
    };
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Editor por Categorias
        </h1>
        <p className="text-cyan-300/80 mt-2 text-lg">
          Gerencie produtos organizados por categoria em tempo real
        </p>
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const stats = getCategoryStats(category.id);
          const IconComponent = category.icon;
          
          return (
            <Card 
              key={category.id}
              className={`border-cyan-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 cursor-pointer ${
                activeCategory === category.id ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-500/50' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                    {stats.total} itens
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl font-bold">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.visible}</div>
                    <div className="text-gray-400">Visíveis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.featured}</div>
                    <div className="text-gray-400">Destaques</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Tabs */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl shadow-xl shadow-cyan-500/20">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="border-b border-cyan-500/30 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-4 h-auto p-3 bg-transparent gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const stats = getCategoryStats(category.id);
                
                return (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-xs font-semibold">{category.name}</span>
                    <Badge variant="outline" className="text-xs bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                      {stats.total}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="p-8">
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <CategoryProductList
                  category={category}
                  products={getProductsByCategory(category.id)}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleFeatured={handleToggleFeatured}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}

function CategoryProductList({ 
  category, 
  products, 
  onToggleVisibility, 
  onToggleFeatured 
}: {
  category: any;
  products: Product[];
  onToggleVisibility: (product: Product) => void;
  onToggleFeatured: (product: Product) => void;
}) {
  const IconComponent = category.icon;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center opacity-50`}>
          <IconComponent className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Nenhum produto em {category.name}</h3>
        <p className="text-gray-400">Adicione produtos nesta categoria para começar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <p className="text-cyan-300/80">{products.length} produtos nesta categoria</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden border-cyan-500/30 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:border-cyan-400/50">
            {/* Product Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden relative">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-12 h-12 text-cyan-400/50" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Status Badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                {product.is_featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                  </Badge>
                )}
                <Badge variant={product.is_visible ? 'default' : 'secondary'} 
                       className={product.is_visible 
                         ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold" 
                         : "bg-gray-600 text-gray-300"
                       }>
                  {product.is_visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Badge>
              </div>
            </div>
            
            {/* Product Content */}
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-white line-clamp-1 mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-cyan-200/80 line-clamp-2 mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onToggleVisibility(product)}
                  className={`flex-1 transition-all duration-300 ${
                    product.is_visible 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-gray-600 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {product.is_visible ? (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Visível
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Oculto
                    </>
                  )}
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => onToggleFeatured(product)}
                  className={`flex-1 transition-all duration-300 ${
                    product.is_featured 
                      ? "bg-yellow-600 hover:bg-yellow-700 text-black font-bold" 
                      : "bg-gray-600 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <Star className={`w-4 h-4 mr-2 ${product.is_featured ? 'fill-current' : ''}`} />
                  {product.is_featured ? 'Destaque' : 'Destacar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
