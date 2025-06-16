
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarNavigation } from "./components/SidebarNavigation";
import { SidebarFooter } from "./components/SidebarFooter";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({ 
  activeSection, 
  onSectionChange, 
  collapsed, 
  onToggleCollapse 
}: AdminSidebarProps) {
  return (
    <div className={cn(
      "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col h-screen sticky top-0",
      collapsed ? "w-16" : "w-72"
    )}>
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={onToggleCollapse} 
      />
      
      <SidebarNavigation 
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        collapsed={collapsed}
      />
      
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
