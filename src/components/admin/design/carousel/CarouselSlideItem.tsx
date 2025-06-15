
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react";

interface Slide {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface CarouselSlideItemProps {
  slide: Slide;
  index: number;
  totalSlides: number;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onPreview: (index: number) => void;
}

export function CarouselSlideItem({
  slide,
  index,
  totalSlides,
  onUpdate,
  onRemove,
  onMove,
  onPreview
}: CarouselSlideItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-semibold text-sm">Slide {index + 1}</span>
        <div className="flex-1" />
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(index, 'up')}
            disabled={index === 0}
            className="h-8 w-8 p-0"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(index, 'down')}
            disabled={index === totalSlides - 1}
            className="h-8 w-8 p-0"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPreview(index)}
          className="gap-1"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(slide.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor={`title-${slide.id}`} className="text-xs">Título</Label>
          <Input
            id={`title-${slide.id}`}
            value={slide.title || ''}
            onChange={(e) => onUpdate(slide.id, 'title', e.target.value)}
            placeholder="Título do slide"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor={`src-${slide.id}`} className="text-xs">URL da Imagem</Label>
          <Input
            id={`src-${slide.id}`}
            value={slide.src}
            onChange={(e) => {
              onUpdate(slide.id, 'src', e.target.value);
              setImageError(false);
            }}
            placeholder="https://exemplo.com/imagem.jpg"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor={`alt-${slide.id}`} className="text-xs">Texto Alternativo</Label>
          <Input
            id={`alt-${slide.id}`}
            value={slide.alt}
            onChange={(e) => onUpdate(slide.id, 'alt', e.target.value)}
            placeholder="Descrição da imagem"
            className="mt-1"
          />
        </div>

        {slide.src && !imageError && (
          <div className="mt-2">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-24 object-cover rounded border"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
