
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
  Settings,
  Monitor,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { toast } from "@/hooks/use-toast";

// Import the editors with correct paths
import { LayoutEditor } from "../../design/LayoutEditor";
import { ColorsEditor } from "../../design/ColorsEditor";
import { LogoEditor } from "../../design/LogoEditor";
import { CarouselEditor } from "../../design/CarouselEditor";
import { ContentEditor } from "../../design/ContentEditor";
import { FontsEditor } from "../../design/FontsEditor";

export function DesignSiteSection() {
  const { designState, hasUnsavedChanges, saveChanges, isLoading } = useDesign();
  const [activeTab, setActiveTab] = useState("overview");
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

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

  const openPreview = () => {
    window.open('/', '_blank');
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

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {designStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                    <IconComponent className="w-5 h-5" />
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
          );
        })}
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
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 h-auto p-1">
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
              <TabsTrigger value="content" className="gap-2 py-3">
                <Type className="w-4 h-4" />
                <span className="hidden sm:inline">Conteúdo</span>
              </TabsTrigger>
              <TabsTrigger value="fonts" className="gap-2 py-3">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Fontes</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configurações Atuais
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Layout:</span>
                        <Badge variant="outline">{designState.layout}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cor Primária:</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: designState.colors.primary }}
                          />
                          <span className="font-mono text-xs">{designState.colors.primary}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Slides do Carrossel:</span>
                        <Badge variant="outline">{designState.carousel?.length || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fonte Principal:</span>
                        <Badge variant="outline">{designState.fonts.primary}</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Logo Atual
                    </h4>
                    <div className="flex items-center justify-center h-24 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                      <img 
                        src={designState.logo} 
                        alt="Logo atual" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('logo')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Editar Logo
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('colors')}
                    className="h-20 flex-col gap-2"
                  >
                    <Palette className="w-6 h-6" />
                    <span>Editar Cores</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('carousel')}
                    className="h-20 flex-col gap-2"
                  >
                    <Images className="w-6 h-6" />
                    <span>Carrossel</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('content')}
                    className="h-20 flex-col gap-2"
                  >
                    <Type className="w-6 h-6" />
                    <span>Textos</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={openPreview}
                    className="h-20 flex-col gap-2"
                  >
                    <Eye className="w-6 h-6" />
                    <span>Visualizar</span>
                  </Button>
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

            <TabsContent value="content" className="mt-0">
              <ContentEditor />
            </TabsContent>

            <TabsContent value="fonts" className="mt-0">
              <FontsEditor />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
