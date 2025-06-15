
import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";

interface DesignHeaderProps {
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
  handleGlobalSave: () => void;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}

export function DesignHeader({ 
  previewMode, 
  setPreviewMode, 
  handleGlobalSave, 
  hasUnsavedChanges, 
  isLoading 
}: DesignHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Design do Site</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Configure a aparência e identidade visual do seu site
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button 
          variant={previewMode ? "default" : "outline"}
          onClick={() => setPreviewMode(!previewMode)}
          className="gap-2"
        >
          <Eye className="w-4 h-4" />
          {previewMode ? "Sair do Preview" : "Preview Site"}
        </Button>
        
        <Button 
          onClick={handleGlobalSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Salvando..." : "Salvar Tudo"}
        </Button>
      </div>
    </div>
  );
}
