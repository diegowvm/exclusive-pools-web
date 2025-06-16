
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { ProductsStats } from "./products/ProductsStats";
import { ProductsControls } from "./products/ProductsControls";
import { ProductCard } from "./products/ProductCard";
import { ProductModal } from "./products/ProductModal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export function ProductsManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const handleCloseModal = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Gestão de Produtos</h1>
        <p className="text-blue-700">Gerencie seu catálogo de produtos e categorias</p>
      </div>

      <ProductsStats
        totalProducts={products.length}
        featuredCount={12}
        visibleCount={products.length - 2}
        categoriesCount={4}
      />

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
      />
    </div>
  );
}
