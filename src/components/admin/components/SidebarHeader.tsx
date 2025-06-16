
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const roleColors = {
  admin: "from-blue-400 to-blue-500",
  financeiro: "from-blue-300 to-blue-400",
  vendedor: "from-blue-500 to-blue-600"
};

const roleTitles = {
  admin: "Admin Pro",
  financeiro: "Finance Pro",
  vendedor: "Sales Pro"
};

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  const { userRole } = useUserRole();

  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-700/50">
      {!collapsed && (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${roleColors[userRole]} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-lg">
              {userRole === 'admin' ? 'A' : userRole === 'financeiro' ? 'F' : 'S'}
            </span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">{roleTitles[userRole]}</h1>
            <p className="text-xs text-blue-200">Sistema Empresarial</p>
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="h-8 w-8 text-blue-200 hover:text-white hover:bg-blue-800/50"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}
