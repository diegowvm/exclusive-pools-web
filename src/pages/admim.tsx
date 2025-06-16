
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
  Brush
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Brush className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Painel de Design
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Configure a aparência e conteúdo do seu site
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Alterações não salvas
                </Badge>
              )}
              
              <Button 
                variant="outline"
                onClick={openPreview}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                Visualizar Site
              </Button>
              
              <Button 
                onClick={handleGlobalSave}
                disabled={!hasUnsavedChanges || isLoading}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
        <Card className="border-0 shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-white/80 dark:bg-slate-900/80 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto p-2 bg-transparent">
                <TabsTrigger value="overview" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Settings className="w-5 h-5" />
                  <span className="text-xs font-medium">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Layout className="w-5 h-5" />
                  <span className="text-xs font-medium">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Palette className="w-5 h-5" />
                  <span className="text-xs font-medium">Cores</span>
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Type className="w-5 h-5" />
                  <span className="text-xs font-medium">Tipografia</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Image className="w-5 h-5" />
                  <span className="text-xs font-medium">Imagens</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Type className="w-5 h-5" />
                  <span className="text-xs font-medium">Conteúdo</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Package className="w-5 h-5" />
                  <span className="text-xs font-medium">Produtos</span>
                </TabsTrigger>
                <TabsTrigger value="responsive" className="flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs font-medium">Responsivo</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
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
