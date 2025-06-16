
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Star,
  Eye,
  EyeOff,
  Grid,
  List,
  ShoppingCart
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";

export function ProductsManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const categories = ['all', 'piscinas', 'spas', 'banheiras', 'equipamentos'];
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setShowAddForm(true);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Produto removido",
      description: "O produto foi removido com sucesso.",
    });
  };

  const handleToggleVisibility = (productId: string) => {
    toast({
      title: "Visibilidade alterada",
      description: "A visibilidade do produto foi atualizada.",
    });
  };

  const handleToggleFeatured = (productId: string) => {
    toast({
      title: "Produto em destaque",
      description: "O status de destaque foi atualizado.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Gestão de Produtos</h1>
        <p className="text-blue-700">Gerencie seu catálogo de produtos e categorias</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{products.length}</p>
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
                <p className="text-2xl font-bold text-blue-900">12</p>
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
                <p className="text-2xl font-bold text-blue-900">{products.length - 2}</p>
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
                <p className="text-2xl font-bold text-blue-900">4</p>
                <p className="text-sm text-blue-600">Categorias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="border-blue-200 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:ring-blue-500"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-blue-200">
                  <Filter className="w-4 h-4 mr-2 text-blue-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="piscinas">Piscinas</SelectItem>
                  <SelectItem value="spas">Spas</SelectItem>
                  <SelectItem value="banheiras">Banheiras</SelectItem>
                  <SelectItem value="equipamentos">Equipamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="border-blue-200"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="border-blue-200"
              >
                <List className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={handleAddProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border-blue-200 bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={product.image}
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
                        onCheckedChange={() => handleToggleVisibility(product.id)}
                      />
                      <span className="text-xs text-blue-600">Visível</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        onCheckedChange={() => handleToggleFeatured(product.id)}
                      />
                      <span className="text-xs text-blue-600">Destaque</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
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
                        onCheckedChange={() => handleToggleVisibility(product.id)}
                      />
                      <Eye className="w-4 h-4 text-blue-500" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        onCheckedChange={() => handleToggleFeatured(product.id)}
                      />
                      <Star className="w-4 h-4 text-blue-500" />
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddForm && (
        <Card className="fixed inset-4 z-50 bg-white border-blue-200 shadow-2xl overflow-auto">
          <CardHeader className="bg-blue-50 border-b border-blue-200">
            <CardTitle className="text-blue-900">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-blue-900">Nome</Label>
                <Input 
                  id="name" 
                  defaultValue={editingProduct?.name}
                  className="border-blue-200 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-blue-900">Categoria</Label>
                <Select defaultValue={editingProduct?.category || 'piscinas'}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piscinas">Piscinas</SelectItem>
                    <SelectItem value="spas">Spas</SelectItem>
                    <SelectItem value="banheiras">Banheiras</SelectItem>
                    <SelectItem value="equipamentos">Equipamentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price" className="text-blue-900">Preço</Label>
                <Input 
                  id="price" 
                  defaultValue={editingProduct?.price}
                  className="border-blue-200 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="image" className="text-blue-900">URL da Imagem</Label>
                <Input 
                  id="image" 
                  defaultValue={editingProduct?.image}
                  className="border-blue-200 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-blue-900">Descrição</Label>
              <Textarea 
                id="description" 
                defaultValue={editingProduct?.description}
                className="border-blue-200 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch />
                  <Label className="text-blue-900">Produto Visível</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch />
                  <Label className="text-blue-900">Produto em Destaque</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-blue-200 text-blue-600"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    setShowAddForm(false);
                    toast({
                      title: editingProduct ? "Produto atualizado" : "Produto criado",
                      description: "As alterações foram salvas com sucesso.",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingProduct ? 'Atualizar' : 'Criar'} Produto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
