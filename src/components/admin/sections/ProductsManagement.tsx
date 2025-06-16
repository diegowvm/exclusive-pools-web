
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductsStats } from "./products/ProductsStats";
import { ProductsControls } from "./products/ProductsControls";
import { ProductCard } from "./products/ProductCard";
import { ProductModal } from "./products/ProductModal";
import { useQuery } from "@tanstack/react-query";

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

export function ProductsManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setShowAddForm(true);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Produto removido",
        description: "O produto foi removido com sucesso.",
      });
      
      refetchProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o produto.",
        variant: "destructive",
      });
    }
  };

  const handleToggleVisibility = async (productId: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_visible: !currentVisibility })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Visibilidade alterada",
        description: "A visibilidade do produto foi atualizada.",
      });
      
      refetchProducts();
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar a visibilidade.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (productId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !currentFeatured })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Produto em destaque",
        description: "O status de destaque foi atualizado.",
      });
      
      refetchProducts();
    } catch (error) {
      console.error('Erro ao alterar destaque:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o destaque.",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleProductSaved = () => {
    refetchProducts();
    handleCloseModal();
  };

  const stats = {
    totalProducts: products.length,
    featuredCount: products.filter(p => p.is_featured).length,
    visibleCount: products.filter(p => p.is_visible).length,
    categoriesCount: [...new Set(products.map(p => p.category))].length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Gestão de Produtos</h1>
        <p className="text-blue-700">Gerencie seu catálogo de produtos e categorias</p>
      </div>

      <ProductsStats {...stats} />

      <ProductsControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddProduct={handleAddProduct}
      />

      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
            onToggleFeatured={handleToggleFeatured}
          />
        ))}
      </div>

      <ProductModal
        isOpen={showAddForm}
        onClose={handleCloseModal}
        editingProduct={editingProduct}
        onProductSaved={handleProductSaved}
      />
    </div>
  );
}
