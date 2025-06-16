
import { ContentEditor } from "../../design/ContentEditor";

export function DesignContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Editor de Conteúdo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure textos, títulos e informações do site
        </p>
      </div>
      
      <ContentEditor />
    </div>
  );
}
