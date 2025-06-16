
import { ColorsEditor } from "../../design/ColorsEditor";

export function DesignColors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Editor de Cores
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Personalize a paleta de cores do seu site
        </p>
      </div>
      
      <ColorsEditor />
    </div>
  );
}
