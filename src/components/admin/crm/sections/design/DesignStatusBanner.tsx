
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DesignStatusBannerProps {
  hasUnsavedChanges: boolean;
  handleGlobalSave: () => void;
  isLoading: boolean;
}

export function DesignStatusBanner({ hasUnsavedChanges, handleGlobalSave, isLoading }: DesignStatusBannerProps) {
  if (!hasUnsavedChanges) return null;

  return (
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
  );
}
