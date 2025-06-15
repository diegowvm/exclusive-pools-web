
import { useState } from "react";
const initialSlides = [
  { src: "/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png", alt: "Área de lazer completa" },
  { src: "/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png", alt: "Piscina moderna" },
  { src: "/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png", alt: "Piscina iluminada" }
];
export default function DesignCarouselEditor() {
  const [slides, setSlides] = useState(initialSlides);
  const [changed, setChanged] = useState(false);

  function handleSlideChange(index: number, field: "src" | "alt", value: string) {
    const updated = slides.map((slide, i) =>
      i === index ? { ...slide, [field]: value } : slide
    );
    setSlides(updated);
    setChanged(true);
  }

  function handleAddSlide() {
    setSlides([...slides, { src: "", alt: "" }]);
    setChanged(true);
  }

  function handleRemove(idx: number) {
    setSlides(slides.filter((_, i) => i !== idx));
    setChanged(true);
  }

  function handleSave() {
    setChanged(false);
    // Aqui enviaria slides atualizados ao backend!
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Editar imagens do carrossel</h3>
      {slides.map((slide, idx) => (
        <div key={idx} className="flex items-center gap-3 mb-4">
          <img src={slide.src} alt="" className="w-20 h-14 object-cover rounded border" />
          <input
            type="text"
            value={slide.src}
            onChange={e => handleSlideChange(idx, "src", e.target.value)}
            placeholder="URL da imagem"
            className="border rounded px-2 py-1 w-56"
          />
          <input
            type="text"
            value={slide.alt}
            onChange={e => handleSlideChange(idx, "alt", e.target.value)}
            placeholder="Descrição"
            className="border rounded px-2 py-1 w-40"
          />
          <button
            onClick={() => handleRemove(idx)}
            className="bg-red-100 hover:bg-red-400 text-red-900 rounded px-2 py-1 font-semibold"
            type="button"
          >Remover</button>
        </div>
      ))}
      <button onClick={handleAddSlide} className="bg-aqua/60 hover:bg-aqua text-white font-semibold px-4 py-1 rounded mb-4">Adicionar imagem</button>
      <div>
        <button
          onClick={handleSave}
          className={`px-5 py-2 rounded-lg font-semibold bg-aqua text-white transition-all ${changed ? "" : "opacity-70 cursor-not-allowed"}`}
          disabled={!changed}
        >Salvar Alterações</button>
      </div>
    </div>
  );
}
