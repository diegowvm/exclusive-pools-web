
import { CarouselEditor } from "../../design/CarouselEditor";

export function DesignImages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Gerenciador de Imagens
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Upload e organização de imagens do carrossel
        </p>
      </div>
      
      <CarouselEditor />
    </div>
  );
}
