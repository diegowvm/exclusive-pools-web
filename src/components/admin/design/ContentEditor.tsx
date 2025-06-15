
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Type, Phone, Mail, MapPin } from "lucide-react";

export function ContentEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [content, setContent] = useState(designState.content);

  const handleContentChange = (field: string, value: string, subField?: string) => {
    let newContent;
    if (subField) {
      newContent = {
        ...content,
        [field]: {
          ...content[field as keyof typeof content],
          [subField]: value
        }
      };
    } else {
      newContent = { ...content, [field]: value };
    }
    
    setContent(newContent);
    updateDesign({ content: newContent });
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Conteúdo salvo!",
        description: "As alterações de conteúdo foram salvas com sucesso.",
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
          Editor de Conteúdo
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Configure os textos e informações do seu site
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seção Hero */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Seção Principal (Hero)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Título Principal</Label>
              <Input
                id="heroTitle"
                value={content.heroTitle}
                onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                placeholder="Título da página principal"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="heroSubtitle">Subtítulo</Label>
              <Input
                id="heroSubtitle"
                value={content.heroSubtitle}
                onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
                placeholder="Subtítulo da página principal"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="aboutText">Texto Sobre a Empresa</Label>
              <Textarea
                id="aboutText"
                value={content.aboutText}
                onChange={(e) => handleContentChange('aboutText', e.target.value)}
                placeholder="Descrição da empresa..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                value={content.contactInfo.phone}
                onChange={(e) => handleContentChange('contactInfo', e.target.value, 'phone')}
                placeholder="(11) 99999-9999"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={content.contactInfo.email}
                onChange={(e) => handleContentChange('contactInfo', e.target.value, 'email')}
                placeholder="contato@empresa.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço
              </Label>
              <Input
                id="address"
                value={content.contactInfo.address}
                onChange={(e) => handleContentChange('contactInfo', e.target.value, 'address')}
                placeholder="Cidade, Estado"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview do Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {content.heroTitle}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {content.heroSubtitle}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Sobre</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {content.aboutText}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Contato</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{content.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{content.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{content.contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Salvando..." : "Salvar Conteúdo"}
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
