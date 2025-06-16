
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet, Eye, Settings } from "lucide-react";

export function DesignResponsive() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Design Responsivo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Otimize a experiência para diferentes dispositivos
        </p>
      </div>

      <Tabs defaultValue="desktop" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="desktop" className="gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="tablet" className="gap-2">
            <Tablet className="h-4 w-4" />
            Tablet
          </TabsTrigger>
          <TabsTrigger value="mobile" className="gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desktop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Visualização Desktop
                <Badge variant="outline">1920x1080</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">Preview Desktop</p>
                  <p className="text-sm text-slate-500 mt-2">Resolução: 1920x1080px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tablet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tablet className="h-5 w-5" />
                Visualização Tablet
                <Badge variant="outline">768x1024</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 aspect-[3/4] max-w-md mx-auto flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">Preview Tablet</p>
                  <p className="text-sm text-slate-500 mt-2">Resolução: 768x1024px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Visualização Mobile
                <Badge variant="outline">375x667</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 aspect-[9/16] max-w-xs mx-auto flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Preview Mobile</p>
                  <p className="text-xs text-slate-500 mt-1">Resolução: 375x667px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Responsivas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Monitor className="h-6 w-6" />
              <span>Otimizar Desktop</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Tablet className="h-6 w-6" />
              <span>Otimizar Tablet</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Smartphone className="h-6 w-6" />
              <span>Otimizar Mobile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
