
import { FontsEditor } from "../../design/FontsEditor";

export function DesignTypography() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Editor de Tipografia
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure as fontes e estilos de texto
        </p>
      </div>
      
      <FontsEditor />
    </div>
  );
}
