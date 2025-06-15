
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from "lucide-react";

interface Slide {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface CarouselPreviewProps {
  slides: Slide[];
  previewIndex: number;
  onPreviewIndexChange: (index: number) => void;
}

export function CarouselPreview({ 
  slides, 
  previewIndex, 
  onPreviewIndexChange 
}: CarouselPreviewProps) {
  if (slides.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview do Carrossel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-500">
            <Images className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Adicione slides para ver o preview</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentSlide = slides[previewIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview do Carrossel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden aspect-video">
            {currentSlide?.src ? (
              <img
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <Images className="w-12 h-12 mx-auto mb-2" />
                  <p>Imagem não carregada</p>
                </div>
              </div>
            )}
            
            {currentSlide?.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white text-lg font-semibold">
                  {currentSlide.title}
                </h4>
              </div>
            )}
          </div>

          {/* Navegação do Preview */}
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => onPreviewIndexChange(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === previewIndex 
                    ? 'bg-blue-600' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="text-center text-sm text-slate-600">
            Slide {previewIndex + 1} de {slides.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
