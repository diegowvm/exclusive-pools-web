
import {
  User2,
  FileText,
  Workflow as WorkflowIcon,
  Bell,
  ListTodo,
  LayoutDashboard,
  LogOut,
  Image as ImageIcon,
  SlidersHorizontal,
  Palette
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar({ sections, activeSection, onSectionChange, onLogout }) {
  const { collapsed = false } = useSidebar?.() || {};
  return (
    <aside
      className={cn(
        "bg-white/95 shadow-soft backdrop-blur-custom min-h-screen border-r transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="px-4 py-6 font-bold text-xl tracking-tight border-b border-slate-200 gradient-aqua-light text-premium-black flex items-center gap-2">
        <LayoutDashboard className="text-aqua" />
        {!collapsed && <span>Painel</span>}
      </div>
      <nav className="mt-5 flex-1">
        <ul className="space-y-1 pl-1 pr-1">
          {sections.map((section) => {
            const Icon =
              section.id === "content"
                ? FileText
                : section.id === "employees"
                ? User2
                : section.id === "workflow"
                ? WorkflowIcon
                : section.id === "notifications"
                ? Bell
                : section.id === "tasks"
                ? ListTodo
                : section.id === "banners"
                ? ImageIcon
                : section.id === "appearance"
                ? Palette
                : section.id === "settings"
                ? SlidersHorizontal
                : null;
            return (
              <li key={section.id} className="rounded">
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition select-none",
                    collapsed ? "justify-center" : "",
                    activeSection === section.id
                      ? "bg-aqua-light/60 text-aqua-primary shadow-medium"
                      : "hover:bg-aqua-light/40 text-premium-gray"
                  )}
                  onClick={() => onSectionChange(section.id)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {!collapsed && <span>{section.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col gap-2 items-center p-2">
        <button
          onClick={onLogout}
          className="flex items-center w-full justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-premium-gray px-3 py-2 rounded-lg text-xs font-bold transition"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
