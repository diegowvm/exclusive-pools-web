import { useEffect, useState } from "react";
import { AppSidebar } from "../components/admin/AdminSidebar";
import { Employees } from "../components/admin/Employees";
import { Workflow } from "../components/admin/Workflow";
import { EditContent } from "../components/admin/EditContent";
import { Notifications } from "../components/admin/Notifications";
import { Tasks } from "../components/admin/Tasks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AdminLogin } from "../components/admin/AdminLogin";
import { getCurrentSession, isAdmin, logoutSupabase } from "@/utils/supabase-auth";
import { AdminInitialRegister } from "../components/admin/AdminInitialRegister";
import { AdminPersonalPage } from "../components/admin/AdminPersonalPage";
import { Button } from "@/components/ui/button"; // <-- Added import

import { AdminDashboardLayout } from "@/components/admin/AdminDashboardLayout";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [notAdmin, setNotAdmin] = useState(false);

  function resetRegisterFlow() {
    // Garante que AuthFlow comece do início
    window.location.reload();
  }

  useEffect(() => {
    async function checkSession() {
      setIsCheckingSession(true);
      const session = await getCurrentSession();
      if (session) {
        const admin = await isAdmin(session);
        if (admin) {
          setIsAuthenticated(true);
          setNotAdmin(false);
        } else {
          setIsAuthenticated(false);
          setNotAdmin(true);
        }
      } else {
        setIsAuthenticated(false);
        setNotAdmin(false);
      }
      setIsCheckingSession(false);
    }
    checkSession();
  }, []);

  async function handleLogin() {
    setIsAuthenticated(true);
    setNotAdmin(false);
  }

  async function handleLogout() {
    await logoutSupabase();
    setIsAuthenticated(false);
  }

  // Fluxo de autenticação (novo componente)
  if (!isAuthenticated && !notAdmin && !isCheckingSession) {
    return (
      <AuthFlow
        isCheckingSession={isCheckingSession}
        notAdmin={notAdmin}
        onLogin={handleLogin}
        resetRegisterFlow={resetRegisterFlow}
      />
    );
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
        <span className="text-lg text-aqua-primary font-medium">Carregando sessão...</span>
      </div>
    );
  }

  if (notAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
        <div className="max-w-sm p-6 bg-white rounded shadow">
          <div className="text-center font-bold text-red-600">Acesso negado</div>
          <p className="text-gray-700 mt-2 text-center">Sua conta não tem permissão de administrador.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
        <AuthFlow
          isCheckingSession={isCheckingSession}
          notAdmin={notAdmin}
          onLogin={handleLogin}
          resetRegisterFlow={resetRegisterFlow}
        />
      </div>
    );
  }

  // Novo layout sofisticado do painel administrativo
  return <AdminDashboardLayout onLogout={handleLogout} />;
}
