
import { Globe, Activity } from "lucide-react";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  if (collapsed) return null;

  return (
    <div className="p-4 border-t border-blue-700/50">
      <div className="bg-gradient-to-r from-blue-800/50 to-blue-700/50 rounded-lg p-3 border border-blue-600/30">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-blue-300" />
          <span className="text-sm font-medium text-white">Status do Sistema</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 text-blue-300" />
            <span className="text-xs text-blue-200">Operacional</span>
          </div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-2 text-xs text-blue-200">
          Última atualização: agora
        </div>
      </div>
    </div>
  );
}
