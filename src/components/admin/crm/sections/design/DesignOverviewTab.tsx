
import { Card } from "@/components/ui/card";
import { Brush } from "lucide-react";
import { DesignState } from "@/contexts/DesignContext";

interface DesignOverviewTabProps {
  designState: DesignState;
}

export function DesignOverviewTab({ designState }: DesignOverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Brush className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Central de Design
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Use as abas acima para configurar layout, cores, logo e carrossel do seu site. 
          Todas as alterações são salvas automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Configurações Atuais</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Layout:</span>
              <span className="font-medium">{designState.layout}</span>
            </div>
            <div className="flex justify-between">
              <span>Cor Primária:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: designState.colors.primary }}
                />
                <span className="font-medium">{designState.colors.primary}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Slides:</span>
              <span className="font-medium">{designState.carousel?.length || 0}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Logo Atual</h4>
          <div className="flex items-center justify-center h-20 bg-slate-50 dark:bg-slate-800 rounded border">
            <img 
              src={designState.logo} 
              alt="Logo atual" 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
