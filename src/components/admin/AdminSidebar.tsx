
import { User2, FileText, Workflow, Bell, ListTodo } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar({ sections, activeSection, onSectionChange }) {
  const { collapsed } = useSidebar?.() || { collapsed: false };
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
        <span className="font-black text-gradient-aqua">Admin</span>
        {!collapsed && <span className="text-premium-gray">Digital</span>}
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
                ? Workflow
                : section.id === "notifications"
                ? Bell
                : section.id === "tasks"
                ? ListTodo
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
      <div className="flex-1" />
    </aside>
  );
}
