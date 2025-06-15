
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { toast } from "@/components/ui/use-toast";

// Import the editors
import { LayoutEditor } from "../../design/LayoutEditor";
import { ColorsEditor } from "../../design/ColorsEditor";
import { LogoEditor } from "../../design/LogoEditor";
import { CarouselEditor } from "../../design/CarouselEditor";

// Import the new smaller components
import { DesignHeader } from "./design/DesignHeader";
import { DesignStatusCards } from "./design/DesignStatusCards";
import { DesignStatusBanner } from "./design/DesignStatusBanner";
import { DesignOverviewTab } from "./design/DesignOverviewTab";
import { DesignTabNavigation } from "./design/DesignTabNavigation";

export function DesignSiteSection() {
  const { designState, hasUnsavedChanges, saveChanges, isLoading } = useDesign();
  const [activeTab, setActiveTab] = useState("overview");
  const [previewMode, setPreviewMode] = useState(false);

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
      <DesignHeader
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        handleGlobalSave={handleGlobalSave}
        hasUnsavedChanges={hasUnsavedChanges}
        isLoading={isLoading}
      />

      <DesignStatusCards designState={designState} />

      <DesignStatusBanner
        hasUnsavedChanges={hasUnsavedChanges}
        handleGlobalSave={handleGlobalSave}
        isLoading={isLoading}
      />

      <Card className="border-0 shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-0">
            <DesignTabNavigation />
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value="overview" className="mt-0">
              <DesignOverviewTab designState={designState} />
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
