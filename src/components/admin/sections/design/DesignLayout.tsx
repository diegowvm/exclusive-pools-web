
import { LayoutEditor } from "../../design/LayoutEditor";

export function DesignLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Editor de Layout
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure a estrutura e organização visual do seu site
        </p>
      </div>
      
      <LayoutEditor />
    </div>
  );
}
