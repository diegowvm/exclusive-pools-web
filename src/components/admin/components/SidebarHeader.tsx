
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
      {!collapsed && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white">Admin Pro</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sistema Empresarial</p>
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}
