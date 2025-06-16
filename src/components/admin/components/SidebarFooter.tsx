
import { Globe } from "lucide-react";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  if (collapsed) return null;

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-slate-900 dark:text-white">Site Status</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-400">Online</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
