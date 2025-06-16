
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDesign } from "@/contexts/DesignContext";
import {
  Palette,
  Layout,
  Type,
  Image,
  Monitor,
  Smartphone,
  Eye,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";

export function DesignOverview() {
  const { designState, hasUnsavedChanges, saveChanges, isLoading } = useDesign();

  const designStats = [
    {
      label: "Layout",
      value: designState.layout || "Padrão",
      icon: Layout,
      status: designState.layout ? "completed" : "pending",
      progress: designState.layout ? 100 : 50
    },
    {
      label: "Cores",
      value: "Personalizado",
      icon: Palette,
      status: "completed",
      progress: 100
    },
    {
      label: "Tipografia",
      value: designState.fonts.primary,
      icon: Type,
      status: "completed",
      progress: 100
    },
    {
      label: "Imagens",
      value: `${designState.carousel?.length || 0} imagens`,
      icon: Image,
      status: designState.carousel?.length > 0 ? "completed" : "pending",
      progress: designState.carousel?.length > 0 ? 100 : 25
    }
  ];

  const handleGlobalSave = async () => {
    try {
      await saveChanges();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const openPreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Design & Frontend
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Central de controle para otimização visual do site
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={openPreview} className="gap-2">
            <Eye className="h-4 w-4" />
            Visualizar Site
          </Button>
          <Button 
            onClick={handleGlobalSave}
            disabled={!hasUnsavedChanges || isLoading}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Salvando..." : "Salvar Tudo"}
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {designStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge 
                    variant={stat.status === 'completed' ? 'default' : 'secondary'}
                    className={stat.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {stat.status === 'completed' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {stat.status === 'completed' ? 'Completo' : 'Pendente'}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {stat.value}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Progresso</span>
                    <span className="font-medium">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <Card className="border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    Alterações Não Salvas
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-200">
                    Você tem modificações pendentes. Salve para aplicá-las ao site.
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Layout className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Editar Layout</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Configurar estrutura e organização</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Personalizar Cores</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ajustar paleta de cores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <Image className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Gerenciar Imagens</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Upload e organização</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Preview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Preview Responsivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Desktop</span>
                <Badge variant="outline">1920x1080</Badge>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                <span className="text-slate-500">Preview Desktop</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-green-600" />
                <span className="font-medium">Mobile</span>
                <Badge variant="outline">375x667</Badge>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 aspect-[9/16] max-w-[200px] mx-auto flex items-center justify-center">
                <span className="text-slate-500 text-sm">Preview Mobile</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
