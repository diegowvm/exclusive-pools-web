
import { LogoEditor } from "../../design/LogoEditor";

export function DesignLogo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Editor de Logo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure o logo do seu site
        </p>
      </div>
      
      <LogoEditor />
    </div>
  );
}
