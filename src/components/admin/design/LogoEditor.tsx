
import { useState, useRef } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Upload, Image, Trash2, RefreshCw } from "lucide-react";

export function LogoEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [logo, setLogo] = useState(designState.logo);
  const [logoUrl, setLogoUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogo(result);
        updateDesign({ logo: result });
        toast({
          title: "Logo carregado!",
          description: "Seu novo logo foi carregado com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo de imagem.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUrlSubmit = () => {
    if (logoUrl.trim()) {
      setLogo(logoUrl);
      updateDesign({ logo: logoUrl });
      setLogoUrl('');
      toast({
        title: "Logo atualizado!",
        description: "Logo foi atualizado via URL.",
      });
    }
  };

  const removeLogo = () => {
    const defaultLogo = '/lovable-uploads/placeholder-logo.png';
    setLogo(defaultLogo);
    updateDesign({ logo: defaultLogo });
    toast({
      title: "Logo removido",
      description: "Logo padrão foi restaurado.",
    });
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Logo salvo!",
        description: "As alterações do logo foram salvas com sucesso.",
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
          Editor de Logo
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Faça upload ou configure o logo do seu site
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview do Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Preview do Logo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo atual"
                    className="max-w-full max-h-full object-contain"
                    onError={() => {
                      toast({
                        title: "Erro ao carregar logo",
                        description: "Não foi possível carregar a imagem.",
                        variant: "destructive",
                      });
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Nenhum logo selecionado</p>
                  </div>
                )}
              </div>
              
              {logo !== '/lovable-uploads/placeholder-logo.png' && (
                <Button
                  variant="outline"
                  onClick={removeLogo}
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Remover Logo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upload e Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Upload de Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Suporte para PNG, JPG, GIF até 5MB
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Selecionar Arquivo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Ou insira uma URL de imagem</Label>
              <div className="flex gap-2">
                <Input
                  id="logoUrl"
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                  className="flex-1"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!logoUrl.trim()}
                >
                  Aplicar
                </Button>
              </div>
            </div>

            {/* Dicas */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Dicas para o logo:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <li>• Use imagens com fundo transparente (PNG)</li>
                <li>• Resolução mínima recomendada: 200x100px</li>
                <li>• Mantenha proporção adequada (2:1 ou 3:1)</li>
                <li>• Teste em diferentes tamanhos de tela</li>
              </ul>
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
          {isLoading ? "Salvando..." : "Salvar Logo"}
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
