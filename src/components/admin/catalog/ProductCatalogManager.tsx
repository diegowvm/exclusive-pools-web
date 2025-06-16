import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  Image,
  Package,
  Grid,
  List,
  Zap
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

export function ProductCatalogManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['piscinas', 'banheiras', 'spas', 'equipamentos'];

  useEffect(() => {
    loadProducts();
    
    // Configurar real-time updates
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Produto atualizado em tempo real:', payload);
          loadProducts(); // Recarregar produtos quando houver mudanças
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

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
        toast({ 
          title: "Produto atualizado!",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
        toast({ 
          title: "Produto criado!",
          description: "O novo produto foi adicionado com sucesso.",
        });
      }
      
      setShowForm(false);
      setEditingProduct(null);
      // Não precisamos chamar loadProducts() aqui pois o real-time vai atualizar automaticamente
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o produto.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ 
        title: "Produto excluído!",
        description: "O produto foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto.",
        variant: "destructive",
      });
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

  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Gerenciador de Produtos
          </h1>
          <p className="text-cyan-300/80 mt-2 text-lg">
            Configure produtos, descrições, imagens e visibilidade em tempo real
          </p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)} 
          className="gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold shadow-lg shadow-cyan-500/50 transition-all duration-300 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </Button>
      </div>

      {/* Filters and View Controls */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl shadow-xl shadow-cyan-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('all')}
                className={filterCategory === 'all' 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold shadow-lg shadow-cyan-500/50" 
                  : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
                }
              >
                Todos ({products.length})
              </Button>
              {categories.map((category) => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <Button
                    key={category}
                    variant={filterCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory(category)}
                    className={`capitalize ${filterCategory === category 
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold shadow-lg shadow-cyan-500/50" 
                      : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
                    }`}
                  >
                    {category} ({count})
                  </Button>
                );
              })}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/50" 
                  : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                }
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/50" 
                  : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "space-y-6"
      }>
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border-cyan-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:border-cyan-400/50">
            <div className={viewMode === 'grid' ? '' : 'flex'}>
              {/* Product Image */}
              <div className={`${viewMode === 'grid' ? 'aspect-video' : 'w-32 h-24'} bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden relative`}>
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-10 h-10 text-cyan-400/50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Product Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                    <Badge variant="outline" className="text-xs capitalize bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    {product.is_featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
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
                
                <p className="text-sm text-cyan-200/80 line-clamp-2 mb-4">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleVisibility(product)}
                      className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
                    >
                      {product.is_visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleFeatured(product)}
                      className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
                    >
                      <Star className={`w-4 h-4 ${product.is_featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Form Component
function ProductForm({ 
  product, 
  onSave, 
  onCancel 
}: { 
  product: Product | null;
  onSave: (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || 'piscinas',
    image_url: product?.image_url || '',
    is_visible: product?.is_visible ?? true,
    is_featured: product?.is_featured ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-cyan-500/30 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/30">
        <CardHeader className="border-b border-cyan-500/30">
          <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            {product ? 'Editar Produto' : 'Novo Produto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white font-semibold mb-2 block">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-white font-semibold mb-2 block">Categoria</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-500/50 rounded-md text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                >
                  <option value="piscinas">Piscinas</option>
                  <option value="banheiras">Banheiras</option>
                  <option value="spas">Spas</option>
                  <option value="equipamentos">Equipamentos</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white font-semibold mb-2 block">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-white font-semibold mb-2 block">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
              
              <div>
                <Label htmlFor="image_url" className="text-white font-semibold mb-2 block">URL da Imagem</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="bg-gray-800/50 border-cyan-500/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 border border-cyan-500/30 rounded-lg bg-cyan-500/10">
                <Switch
                  id="is_visible"
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                  className="data-[state=checked]:bg-cyan-500"
                />
                <Label htmlFor="is_visible" className="text-white font-semibold">Visível no site</Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border border-cyan-500/30 rounded-lg bg-cyan-500/10">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  className="data-[state=checked]:bg-cyan-500"
                />
                <Label htmlFor="is_featured" className="text-white font-semibold">Produto em destaque</Label>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold shadow-lg shadow-cyan-500/50 transition-all duration-300 py-3"
              >
                {product ? 'Atualizar' : 'Criar'} Produto
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
