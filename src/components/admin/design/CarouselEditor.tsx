
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CarouselEditorHeader } from "./carousel/CarouselEditorHeader";
import { CarouselSlidesList } from "./carousel/CarouselSlidesList";
import { CarouselPreview } from "./carousel/CarouselPreview";

export function CarouselEditor() {
  const { designState, addSlide, updateSlide, removeSlide, isLoading } = useDesign();
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleAddSlide = async () => {
    try {
      await addSlide({
        src: '',
        alt: 'Novo slide',
        title: 'Novo Slide'
      });
    } catch (error) {
      console.error('Erro ao adicionar slide:', error);
    }
  };

  const handleUpdateSlide = async (id: string, field: string, value: string) => {
    try {
      await updateSlide(id, field, value);
    } catch (error) {
      console.error('Erro ao atualizar slide:', error);
    }
  };

  const handleRemoveSlide = async (id: string) => {
    try {
      await removeSlide(id);
      toast({
        title: "Slide removido",
        description: "O slide foi removido do carrossel.",
      });
    } catch (error) {
      console.error('Erro ao remover slide:', error);
    }
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    // TODO: Implementar reordenação de slides
    console.log('Mover slide:', index, direction);
  };

  return (
    <div className="space-y-6">
      <CarouselEditorHeader onAddSlide={handleAddSlide} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CarouselSlidesList
          slides={designState.carousel}
          onUpdateSlide={handleUpdateSlide}
          onRemoveSlide={handleRemoveSlide}
          onMoveSlide={moveSlide}
          onPreviewSlide={setPreviewIndex}
        />

        <CarouselPreview
          slides={designState.carousel}
          previewIndex={previewIndex}
          onPreviewIndexChange={setPreviewIndex}
        />
      </div>

      {isLoading && (
        <div className="text-center text-sm text-slate-600">
          Carregando configurações...
        </div>
      )}
    </div>
  );
}
