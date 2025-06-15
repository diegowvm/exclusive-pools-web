
import { useState } from "react";
import { AppSidebar } from "../components/admin/AdminSidebar";
import { Employees } from "../components/admin/Employees";
import { Workflow } from "../components/admin/Workflow";
import { EditContent } from "../components/admin/EditContent";
import { Notifications } from "../components/admin/Notifications";
import { Tasks } from "../components/admin/Tasks";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "content", label: "Conteúdo do Site" },
  { id: "employees", label: "Funcionários" },
  { id: "workflow", label: "Workflow" },
  { id: "notifications", label: "Notificações" },
  { id: "tasks", label: "Tarefas/Fluxos" },
];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  return (
    <SidebarProvider collapsedWidth={64}>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all">
        <AppSidebar
          sections={SECTIONS}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main
          className={cn(
            "flex-1 p-5 lg:p-10 min-h-screen",
            "bg-white bg-opacity-70 dark:bg-slate-900 dark:bg-opacity-80 transition"
          )}
        >
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <SidebarTrigger className="block lg:hidden" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-premium-black dark:text-white">
                Painel Administrativo
              </h1>
            </div>
            <section>
              {activeSection === "employees" && <Employees />}
              {activeSection === "content" && <EditContent />}
              {activeSection === "workflow" && <Workflow />}
              {activeSection === "notifications" && <Notifications />}
              {activeSection === "tasks" && <Tasks />}
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
