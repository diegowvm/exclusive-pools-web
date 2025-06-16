
import { Globe, Activity } from "lucide-react";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  if (collapsed) return null;

  return (
    <div className="p-4 border-t border-slate-700">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border border-slate-600">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Status do Sistema</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 text-green-400" />
            <span className="text-xs text-slate-300">Operacional</span>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Última atualização: agora
        </div>
      </div>
    </div>
  );
}
