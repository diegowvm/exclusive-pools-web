
import { useState } from "react";
import { AppSidebar } from "../components/admin/AdminSidebar";
import { Employees } from "../components/admin/Employees";
import { Workflow } from "../components/admin/Workflow";
import { EditContent } from "../components/admin/EditContent";
import { Notifications } from "../components/admin/Notifications";
import { Tasks } from "../components/admin/Tasks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
// IMPORTANTE: Proxy para autenticação simulada; conecte à lógica real futuramente
import { AdminLogin } from "../components/admin/AdminLogin";

const SECTIONS = [
  { id: "content", label: "Produtos & Conteúdo" },
  { id: "employees", label: "Funcionários" },
  { id: "workflow", label: "Workflow" },
  { id: "banners", label: "Banners & Carrossel" },
  { id: "notifications", label: "Notificações" },
  { id: "tasks", label: "Tarefas" },
  { id: "appearance", label: "Aparência do Site" },
  // { id: "settings", label: "Configurações" },
];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  // Simulação de login (troque por supabase auth!):
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all">
        <AppSidebar
          sections={SECTIONS}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />
        <main
          className={cn(
            "flex-1 p-5 lg:p-10 min-h-screen",
            "bg-white bg-opacity-70 dark:bg-slate-900 dark:bg-opacity-80 transition"
          )}
        >
          <div className="max-w-6xl mx-auto">
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
              {activeSection === "banners" && <div>Banners e Carrossel (Em breve!)</div>}
              {activeSection === "notifications" && <Notifications />}
              {activeSection === "tasks" && <Tasks />}
              {activeSection === "appearance" && <div>Configuração de Aparência (Em breve!)</div>}
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
