
import { useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Images, Plus, Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Editor de Carrossel
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Configure as imagens do carrossel principal
          </p>
        </div>
        
        <Button onClick={addSlide} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Slide
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor de Slides */}
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
                <div
                  key={slide.id}
                  className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-sm">Slide {index + 1}</span>
                    <div className="flex-1" />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === slides.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewIndex(index)}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSlide(slide.id)}
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
                        onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                        placeholder="Título do slide"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`src-${slide.id}`} className="text-xs">URL da Imagem</Label>
                      <Input
                        id={`src-${slide.id}`}
                        value={slide.src}
                        onChange={(e) => updateSlide(slide.id, 'src', e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`alt-${slide.id}`} className="text-xs">Texto Alternativo</Label>
                      <Input
                        id={`alt-${slide.id}`}
                        value={slide.alt}
                        onChange={(e) => updateSlide(slide.id, 'alt', e.target.value)}
                        placeholder="Descrição da imagem"
                        className="mt-1"
                      />
                    </div>

                    {slide.src && (
                      <div className="mt-2">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-24 object-cover rounded border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
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

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview do Carrossel</CardTitle>
          </CardHeader>
          <CardContent>
            {slides.length > 0 ? (
              <div className="space-y-4">
                <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden aspect-video">
                  {slides[previewIndex]?.src ? (
                    <img
                      src={slides[previewIndex].src}
                      alt={slides[previewIndex].alt}
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
                  
                  {slides[previewIndex]?.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h4 className="text-white text-lg font-semibold">
                        {slides[previewIndex].title}
                      </h4>
                    </div>
                  )}
                </div>

                {/* Navegação do Preview */}
                <div className="flex items-center justify-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPreviewIndex(index)}
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
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Images className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Adicione slides para ver o preview</p>
              </div>
            )}
          </CardContent>
        </Card>
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
