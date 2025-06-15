
import { useState } from "react";
import { AppSidebar } from "../components/admin/AdminSidebar";
import { Employees } from "../components/admin/Employees";
import { Workflow } from "../components/admin/Workflow";
import { EditContent } from "../components/admin/EditContent";
import { Notifications } from "../components/admin/Notifications";
import { Tasks } from "../components/admin/Tasks";
import { Button } from "@/components/ui/button";

// Painel profissional com sidebar e navegação interna
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
    <div className="min-h-screen flex w-full bg-slate-100">
      <AppSidebar
        sections={SECTIONS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
        <section>
          {activeSection === "employees" && <Employees />}
          {activeSection === "content" && <EditContent />}
          {activeSection === "workflow" && <Workflow />}
          {activeSection === "notifications" && <Notifications />}
          {activeSection === "tasks" && <Tasks />}
        </section>
      </main>
    </div>
  );
}
