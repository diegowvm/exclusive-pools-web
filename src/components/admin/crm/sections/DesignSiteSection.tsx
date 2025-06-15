
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Layout, 
  Image, 
  Images, 
  Type, 
  Package, 
  Save, 
  Eye, 
  RefreshCw,
  Brush,
  Settings
} from "lucide-react";
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { toast } from "@/components/ui/use-toast";

// Importar os editores
import { LayoutEditor } from "../../../design/LayoutEditor";
import { ColorsEditor } from "../../../design/ColorsEditor";
import { LogoEditor } from "../../../design/LogoEditor";
import { CarouselEditor } from "../../../design/CarouselEditor";

export function DesignSiteSection() {
  const { designState, hasUnsavedChanges, saveChanges, isLoading } = useDesign();
  const [activeTab, setActiveTab] = useState("overview");
  const [previewMode, setPreviewMode] = useState(false);

  const designStats = [
    { 
      label: "Layout", 
      value: designState.layout || "Não definido", 
      icon: Layout, 
      color: "text-blue-600",
      status: designState.layout ? "active" : "inactive"
    },
    { 
      label: "Logo", 
      value: designState.logo ? "Configurado" : "Padrão", 
      icon: Image, 
      color: "text-green-600",
      status: designState.logo !== '/lovable-uploads/placeholder-logo.png' ? "active" : "inactive"
    },
    { 
      label: "Slides", 
      value: designState.carousel?.length || 0, 
      icon: Images, 
      color: "text-purple-600",
      status: designState.carousel?.length > 0 ? "active" : "inactive"
    },
    { 
      label: "Tema", 
      value: "Personalizado", 
      icon: Palette, 
      color: "text-orange-600",
      status: "active"
    }
  ];

  const handleGlobalSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Alterações salvas!",
        description: "Todas as configurações de design foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Design do Site</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Configure a aparência e identidade visual do seu site
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? "Sair do Preview" : "Preview Site"}
          </Button>
          
          <Button 
            onClick={handleGlobalSave}
            disabled={!hasUnsavedChanges || isLoading}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Salvando..." : "Salvar Tudo"}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {designStats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                    <Badge 
                      variant={stat.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {stat.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Banner */}
      {hasUnsavedChanges && (
        <Card className="border-0 shadow-sm border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    Alterações Pendentes
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-200">
                    Você tem alterações não salvas. Clique em "Salvar Tudo" para aplicá-las.
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleGlobalSave}
                disabled={isLoading}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
              >
                {isLoading ? "Salvando..." : "Salvar Agora"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Card className="border-0 shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-0">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
              <TabsTrigger value="overview" className="gap-2 py-3">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="gap-2 py-3">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">Layout</span>
              </TabsTrigger>
              <TabsTrigger value="colors" className="gap-2 py-3">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Cores</span>
              </TabsTrigger>
              <TabsTrigger value="logo" className="gap-2 py-3">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Logo</span>
              </TabsTrigger>
              <TabsTrigger value="carousel" className="gap-2 py-3">
                <Images className="w-4 h-4" />
                <span className="hidden sm:inline">Carrossel</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Brush className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Central de Design
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Use as abas acima para configurar layout, cores, logo e carrossel do seu site. 
                    Todas as alterações são salvas automaticamente.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Configurações Atuais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Layout:</span>
                        <span className="font-medium">{designState.layout}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cor Primária:</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: designState.colors.primary }}
                          />
                          <span className="font-medium">{designState.colors.primary}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Slides:</span>
                        <span className="font-medium">{designState.carousel?.length || 0}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Logo Atual</h4>
                    <div className="flex items-center justify-center h-20 bg-slate-50 dark:bg-slate-800 rounded border">
                      <img 
                        src={designState.logo} 
                        alt="Logo atual" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="mt-0">
              <LayoutEditor />
            </TabsContent>

            <TabsContent value="colors" className="mt-0">
              <ColorsEditor />
            </TabsContent>

            <TabsContent value="logo" className="mt-0">
              <LogoEditor />
            </TabsContent>

            <TabsContent value="carousel" className="mt-0">
              <CarouselEditor />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
