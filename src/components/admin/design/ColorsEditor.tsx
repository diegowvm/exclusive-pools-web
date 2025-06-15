
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Palette, RefreshCw, Eye } from "lucide-react";

const colorPresets = [
  {
    name: 'Aqua Premium',
    colors: { primary: '#00cfc1', secondary: '#99f6e4', accent: '#0891b2' }
  },
  {
    name: 'Ocean Blue',
    colors: { primary: '#0ea5e9', secondary: '#bae6fd', accent: '#0284c7' }
  },
  {
    name: 'Forest Green',
    colors: { primary: '#10b981', secondary: '#a7f3d0', accent: '#059669' }
  },
  {
    name: 'Sunset Orange',
    colors: { primary: '#f97316', secondary: '#fed7aa', accent: '#ea580c' }
  },
  {
    name: 'Royal Purple',
    colors: { primary: '#8b5cf6', secondary: '#ddd6fe', accent: '#7c3aed' }
  }
];

export function ColorsEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [colors, setColors] = useState(designState.colors);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (colorType: keyof typeof colors, value: string) => {
    const newColors = { ...colors, [colorType]: value };
    setColors(newColors);
    updateDesign({ colors: newColors });
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setColors(preset.colors);
    updateDesign({ colors: preset.colors });
    toast({
      title: "Preset aplicado!",
      description: `Cores "${preset.name}" foram aplicadas.`,
    });
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Cores salvas!",
        description: "As alterações de cores foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const resetColors = () => {
    const defaultColors = { primary: '#00cfc1', secondary: '#99f6e4', accent: '#0891b2' };
    setColors(defaultColors);
    updateDesign({ colors: defaultColors });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Editor de Cores
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Personalize a paleta de cores do seu site
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className="gap-2"
        >
          <Eye className="w-4 h-4" />
          {previewMode ? 'Sair do Preview' : 'Preview'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor de Cores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Cores Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="primary">Cor Primária</Label>
                <div className="flex gap-3 items-center mt-1">
                  <Input
                    id="primary"
                    type="color"
                    value={colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1"
                    placeholder="#00cfc1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondary">Cor Secundária</Label>
                <div className="flex gap-3 items-center mt-1">
                  <Input
                    id="secondary"
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1"
                    placeholder="#99f6e4"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accent">Cor de Destaque</Label>
                <div className="flex gap-3 items-center mt-1">
                  <Input
                    id="accent"
                    type="color"
                    value={colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-16 h-10 p-1 border-2"
                  />
                  <Input
                    type="text"
                    value={colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="flex-1"
                    placeholder="#0891b2"
                  />
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={resetColors}
              className="w-full gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Restaurar Padrão
            </Button>
          </CardContent>
        </Card>

        {/* Presets */}
        <Card>
          <CardHeader>
            <CardTitle>Presets de Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-medium">{preset.name}</span>
                  <div className="flex gap-1">
                    {Object.values(preset.colors).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview das Cores */}
      {previewMode && (
        <Card>
          <CardHeader>
            <CardTitle>Preview das Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="p-6 rounded-lg text-white"
                style={{ backgroundColor: colors.primary }}
              >
                <h4 className="text-xl font-bold mb-2">Cor Primária</h4>
                <p>Esta é a cor principal do seu site</p>
              </div>
              
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                <h4 className="text-xl font-bold mb-2">Cor Secundária</h4>
                <p>Cor de apoio e backgrounds</p>
              </div>
              
              <div
                className="p-6 rounded-lg text-white"
                style={{ backgroundColor: colors.accent }}
              >
                <h4 className="text-xl font-bold mb-2">Cor de Destaque</h4>
                <p>Para botões e elementos importantes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Salvando..." : "Salvar Cores"}
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
