
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Layout, 
  Image, 
  Type, 
  Package, 
  Settings,
  Eye,
  Save,
  Monitor,
  Smartphone,
  Tablet,
  Brush,
  Zap
} from "lucide-react";
import { useDesign } from "@/contexts/DesignContext";
import { toast } from "@/hooks/use-toast";

// Import the new design sections
import { DesignOverview } from "@/components/admin/sections/design/DesignOverview";
import { DesignLayout } from "@/components/admin/sections/design/DesignLayout";
import { DesignColors } from "@/components/admin/sections/design/DesignColors";
import { DesignTypography } from "@/components/admin/sections/design/DesignTypography";
import { DesignImages } from "@/components/admin/sections/design/DesignImages";
import { DesignContent } from "@/components/admin/sections/design/DesignContent";
import { DesignResponsive } from "@/components/admin/sections/design/DesignResponsive";
import { ProductCatalogManager } from "@/components/admin/catalog/ProductCatalogManager";
import { CategoryEditor } from "@/components/admin/catalog/CategoryEditor";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const { hasUnsavedChanges, saveChanges, isLoading } = useDesign();

  const handleGlobalSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Configurações salvas!",
        description: "Todas as alterações foram aplicadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  const openPreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Futuristic Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/50">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Painel Futurístico
                </h1>
                <p className="text-cyan-300/80 mt-1 text-lg">
                  Configure a aparência e conteúdo do seu site
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-lg shadow-cyan-500/30">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                  Alterações não salvas
                </Badge>
              )}
              
              <Button 
                variant="outline"
                onClick={openPreview}
                className="gap-2 bg-transparent border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                <Eye className="w-4 h-4" />
                Visualizar Site
              </Button>
              
              <Button 
                onClick={handleGlobalSave}
                disabled={!hasUnsavedChanges || isLoading}
                className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold shadow-lg shadow-cyan-500/50 transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Salvando..." : "Salvar Tudo"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl shadow-cyan-500/20 bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-cyan-500/30">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-cyan-500/30 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9 h-auto p-3 bg-transparent gap-2">
                <TabsTrigger 
                  value="overview" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Settings className="w-6 h-6" />
                  <span className="text-xs font-semibold">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="layout" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Layout className="w-6 h-6" />
                  <span className="text-xs font-semibold">Layout</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="colors" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Palette className="w-6 h-6" />
                  <span className="text-xs font-semibold">Cores</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="typography" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Type className="w-6 h-6" />
                  <span className="text-xs font-semibold">Tipografia</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="images" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Image className="w-6 h-6" />
                  <span className="text-xs font-semibold">Imagens</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Type className="w-6 h-6" />
                  <span className="text-xs font-semibold">Conteúdo</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="products" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Package className="w-6 h-6" />
                  <span className="text-xs font-semibold">Produtos</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="categories" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Package className="w-6 h-6" />
                  <span className="text-xs font-semibold">Categorias</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="responsive" 
                  className="flex-col gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 text-cyan-300 hover:text-white transition-all duration-300 border border-transparent data-[state=active]:border-cyan-400"
                >
                  <Monitor className="w-6 h-6" />
                  <span className="text-xs font-semibold">Responsivo</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-900/50 to-black/50">
              <TabsContent value="overview" className="mt-0">
                <DesignOverview />
              </TabsContent>
              
              <TabsContent value="layout" className="mt-0">
                <DesignLayout />
              </TabsContent>
              
              <TabsContent value="colors" className="mt-0">
                <DesignColors />
              </TabsContent>
              
              <TabsContent value="typography" className="mt-0">
                <DesignTypography />
              </TabsContent>
              
              <TabsContent value="images" className="mt-0">
                <DesignImages />
              </TabsContent>
              
              <TabsContent value="content" className="mt-0">
                <DesignContent />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductCatalogManager />
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                <CategoryEditor />
              </TabsContent>
              
              <TabsContent value="responsive" className="mt-0">
                <DesignResponsive />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
