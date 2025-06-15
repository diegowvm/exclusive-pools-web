
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Layout, Image, Images, Type, Package, Save, Eye, RefreshCw } from "lucide-react";
import { useState } from "react";

export function DesignSiteSection() {
  const [hasChanges, setHasChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const designStats = [
    { label: "Páginas", value: "8", icon: Layout, color: "text-blue-600" },
    { label: "Produtos", value: "47", icon: Package, color: "text-green-600" },
    { label: "Imagens", value: "23", icon: Images, color: "text-purple-600" },
    { label: "Seções", value: "12", icon: Type, color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Design do Site</h1>
          <p className="text-slate-600 dark:text-slate-400">Edição completa da interface e conteúdo do frontend</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? "Sair do Preview" : "Preview Site"}
          </Button>
          <Button 
            className="gap-2"
            disabled={!hasChanges}
            variant={hasChanges ? "default" : "secondary"}
          >
            <Save className="w-4 h-4" />
            Publicar Alterações
          </Button>
        </div>
      </div>

      {/* Status do Site */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {designStats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas e Status */}
      <Card className="border-0 shadow-sm border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Site Sincronizado</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Última atualização: Hoje às 14:32
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Seções de Edição */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layout e Aparência */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" />
              Layout e Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Layout Principal</p>
                  <p className="text-sm text-slate-600">Estrutura geral das páginas</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Tema de Cores</p>
                  <p className="text-sm text-slate-600">Paleta e esquema de cores</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Tipografia</p>
                  <p className="text-sm text-slate-600">Fontes e estilos de texto</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Visual */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Images className="w-5 h-5 text-purple-600" />
              Conteúdo Visual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Logo e Marca</p>
                  <p className="text-sm text-slate-600">Logotipo e identidade visual</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Carrossel Principal</p>
                  <p className="text-sm text-slate-600">Imagens da página inicial</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Galeria de Produtos</p>
                  <p className="text-sm text-slate-600">Imagens dos catálogos</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Catálogos de Produtos */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              Catálogos de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-sm">Piscinas</p>
                <p className="text-xs text-slate-600">23 produtos</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Editar</Button>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium text-sm">Banheiras</p>
                <p className="text-xs text-slate-600">12 produtos</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Editar</Button>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium text-sm">Spas</p>
                <p className="text-xs text-slate-600">8 produtos</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Editar</Button>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <p className="font-medium text-sm">Equipamentos</p>
                <p className="text-xs text-slate-600">15 produtos</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Editar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Textos e Conteúdo */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-orange-600" />
              Textos e Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Página Inicial</p>
                  <p className="text-sm text-slate-600">Títulos, descrições e CTAs</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Sobre Nós</p>
                  <p className="text-sm text-slate-600">História e valores da empresa</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Contato e Rodapé</p>
                  <p className="text-sm text-slate-600">Informações de contato</p>
                </div>
                <Button size="sm" variant="outline">Editar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
