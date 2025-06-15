
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem,  SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Type, Eye } from "lucide-react";

const availableFonts = [
  { value: 'Inter', label: 'Inter', category: 'Sans Serif' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans Serif' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans Serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans Serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans Serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans Serif' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans Serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'Georgia', label: 'Georgia', category: 'Serif' },
  { value: 'Times New Roman', label: 'Times New Roman', category: 'Serif' },
];

export function FontsEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [fonts, setFonts] = useState(designState.fonts);

  const handleFontChange = (fontType: 'primary' | 'secondary', value: string) => {
    const newFonts = { ...fonts, [fontType]: value };
    setFonts(newFonts);
    updateDesign({ fonts: newFonts });
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Fontes salvas!",
        description: "As alterações de fontes foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const getFontByValue = (value: string) => {
    return availableFonts.find(font => font.value === value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Editor de Fontes
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Configure as fontes utilizadas no seu site
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações de Fontes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Configurações de Fontes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primaryFont">Fonte Primária (Títulos)</Label>
              <Select value={fonts.primary} onValueChange={(value) => handleFontChange('primary', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione a fonte primária" />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex flex-col">
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        <span className="text-xs text-slate-500">{font.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="secondaryFont">Fonte Secundária (Texto)</Label>
              <Select value={fonts.secondary} onValueChange={(value) => handleFontChange('secondary', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione a fonte secundária" />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex flex-col">
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        <span className="text-xs text-slate-500">{font.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Dicas para Fontes:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <li>• Use fontes Sans Serif para melhor legibilidade</li>
                <li>• Combine no máximo 2-3 famílias de fontes</li>
                <li>• Teste em diferentes tamanhos de tela</li>
                <li>• Considere a velocidade de carregamento</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Preview das Fontes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview das Fontes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-sm text-slate-600 dark:text-slate-400">
                  Fonte Primária - {getFontByValue(fonts.primary)?.label}
                </Label>
                <div 
                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mt-2"
                  style={{ fontFamily: fonts.primary }}
                >
                  <h1 className="text-2xl font-bold mb-2">Título Principal</h1>
                  <h2 className="text-xl font-semibold mb-2">Subtítulo</h2>
                  <h3 className="text-lg font-medium">Título de Seção</h3>
                </div>
              </div>

              <div>
                <Label className="text-sm text-slate-600 dark:text-slate-400">
                  Fonte Secundária - {getFontByValue(fonts.secondary)?.label}
                </Label>
                <div 
                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mt-2"
                  style={{ fontFamily: fonts.secondary }}
                >
                  <p className="mb-2">
                    Este é um parágrafo de exemplo usando a fonte secundária. 
                    A fonte secundária é geralmente usada para textos corridos e descrições.
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Texto menor para legendas e informações secundárias.
                  </p>
                </div>
              </div>

              {/* Exemplo combinado */}
              <div className="border-t pt-4">
                <Label className="text-sm text-slate-600 dark:text-slate-400">
                  Combinação das Fontes
                </Label>
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg mt-2">
                  <h2 
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: fonts.primary }}
                  >
                    Exclusive Piscinas
                  </h2>
                  <p 
                    className="text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: fonts.secondary }}
                  >
                    Especialistas em piscinas de alta qualidade com mais de 15 anos 
                    de experiência no mercado. Transformamos seu espaço em um paraíso aquático.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Salvando..." : "Salvar Fontes"}
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
