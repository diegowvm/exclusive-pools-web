
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Layout, Grid, Columns, Sidebar } from "lucide-react";

const layoutOptions = [
  {
    id: 'classic',
    name: 'Layout Clássico',
    description: 'Design tradicional com header fixo e sidebar',
    icon: Layout,
    preview: 'grid-cols-1 gap-2'
  },
  {
    id: 'modern',
    name: 'Layout Moderno',
    description: 'Design contemporâneo com elementos fluidos',
    icon: Grid,
    preview: 'grid-cols-2 gap-4'
  },
  {
    id: 'minimal',
    name: 'Layout Minimalista',
    description: 'Design limpo e focado no conteúdo',
    icon: Columns,
    preview: 'grid-cols-1 gap-6'
  },
  {
    id: 'dashboard',
    name: 'Dashboard Style',
    description: 'Estilo painel com widgets organizados',
    icon: Sidebar,
    preview: 'grid-cols-3 gap-3'
  }
];

export function LayoutEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [selectedLayout, setSelectedLayout] = useState(designState.layout);

  const handleLayoutChange = (layoutId: string) => {
    setSelectedLayout(layoutId);
    updateDesign({ layout: layoutId });
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Layout salvo!",
        description: "As alterações do layout foram salvas com sucesso.",
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
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Editor de Layout
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Escolha o layout que melhor se adequa ao seu site
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opções de Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedLayout} onValueChange={handleLayoutChange}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layoutOptions.map((layout) => (
                <div key={layout.id} className="relative">
                  <Label
                    htmlFor={layout.id}
                    className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      selectedLayout === layout.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <RadioGroupItem value={layout.id} id={layout.id} />
                      <layout.icon className="w-5 h-5" />
                      <span className="font-semibold">{layout.name}</span>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {layout.description}
                    </p>
                    
                    {/* Preview do layout */}
                    <div className={`grid ${layout.preview} h-16 bg-slate-100 dark:bg-slate-700 rounded p-2`}>
                      <div className="bg-slate-300 dark:bg-slate-600 rounded"></div>
                      {layout.preview.includes('cols-2') && <div className="bg-slate-300 dark:bg-slate-600 rounded"></div>}
                      {layout.preview.includes('cols-3') && (
                        <>
                          <div className="bg-slate-300 dark:bg-slate-600 rounded"></div>
                          <div className="bg-slate-300 dark:bg-slate-600 rounded"></div>
                        </>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Salvando..." : "Salvar Layout"}
        </Button>
        
        {hasUnsavedChanges && (
          <span className="flex items-center text-sm text-amber-600">
            Alterações não salvas
          </span>
        )}
      </div>
    </div>
  );
}
