
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CarouselEditorHeader } from "./carousel/CarouselEditorHeader";
import { CarouselSlidesList } from "./carousel/CarouselSlidesList";
import { CarouselPreview } from "./carousel/CarouselPreview";

export function CarouselEditor() {
  const { designState, updateDesign, saveChanges, hasUnsavedChanges, isLoading } = useDesign();
  const [slides, setSlides] = useState(designState.carousel);
  const [previewIndex, setPreviewIndex] = useState(0);

  const addSlide = () => {
    const newSlide = {
      id: Date.now().toString(),
      src: '',
      alt: '',
      title: 'Novo Slide'
    };
    const newSlides = [...slides, newSlide];
    setSlides(newSlides);
    updateDesign({ carousel: newSlides });
  };

  const removeSlide = (id: string) => {
    const newSlides = slides.filter(slide => slide.id !== id);
    setSlides(newSlides);
    updateDesign({ carousel: newSlides });
    toast({
      title: "Slide removido",
      description: "O slide foi removido do carrossel.",
    });
  };

  const updateSlide = (id: string, field: string, value: string) => {
    const newSlides = slides.map(slide =>
      slide.id === id ? { ...slide, [field]: value } : slide
    );
    setSlides(newSlides);
    updateDesign({ carousel: newSlides });
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < slides.length) {
      [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
      setSlides(newSlides);
      updateDesign({ carousel: newSlides });
    }
  };

  const handleSave = async () => {
    try {
      await saveChanges();
      toast({
        title: "Carrossel salvo!",
        description: "As alterações do carrossel foram salvas com sucesso.",
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
      <CarouselEditorHeader onAddSlide={addSlide} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CarouselSlidesList
          slides={slides}
          onUpdateSlide={updateSlide}
          onRemoveSlide={removeSlide}
          onMoveSlide={moveSlide}
          onPreviewSlide={setPreviewIndex}
        />

        <CarouselPreview
          slides={slides}
          previewIndex={previewIndex}
          onPreviewIndexChange={setPreviewIndex}
        />
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Salvando..." : "Salvar Carrossel"}
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
