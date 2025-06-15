
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CarouselEditorHeaderProps {
  onAddSlide: () => void;
}

export function CarouselEditorHeader({ onAddSlide }: CarouselEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Editor de Carrossel
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Configure as imagens do carrossel principal
        </p>
      </div>
      
      <Button onClick={onAddSlide} className="gap-2">
        <Plus className="w-4 h-4" />
        Adicionar Slide
      </Button>
    </div>
  );
}
