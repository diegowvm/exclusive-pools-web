
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from "lucide-react";
import { CarouselSlideItem } from "./CarouselSlideItem";

interface Slide {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface CarouselSlidesListProps {
  slides: Slide[];
  onUpdateSlide: (id: string, field: string, value: string) => void;
  onRemoveSlide: (id: string) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
  onPreviewSlide: (index: number) => void;
}

export function CarouselSlidesList({
  slides,
  onUpdateSlide,
  onRemoveSlide,
  onMoveSlide,
  onPreviewSlide
}: CarouselSlidesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Images className="w-5 h-5" />
          Slides do Carrossel ({slides.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <CarouselSlideItem
              key={slide.id}
              slide={slide}
              index={index}
              totalSlides={slides.length}
              onUpdate={onUpdateSlide}
              onRemove={onRemoveSlide}
              onMove={onMoveSlide}
              onPreview={onPreviewSlide}
            />
          ))}
        </div>

        {slides.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Images className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum slide adicionado</p>
            <p className="text-sm">Clique em "Adicionar Slide" para começar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
