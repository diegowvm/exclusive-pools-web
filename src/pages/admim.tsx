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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [notAdmin, setNotAdmin] = useState(false);

  // Controle do fluxo de cadastro inicial
  const [cadastroStep, setCadastroStep] = useState<"register" | "personal" | "login">("register");
  const [personalData, setPersonalData] = useState<{ nome: string; email: string; cargo: string } | null>(null);

  const totalSteps = 3;
  const stepIndex = cadastroStep === "register" ? 1 : cadastroStep === "personal" ? 2 : 3;

  function resetRegisterFlow() {
    setCadastroStep("register");
    setPersonalData(null);
  }

  // Verifica sessão e role de admin ao carregar
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
    // Depois do login, verifica novamente sessão e role
    setIsAuthenticated(true);
    setNotAdmin(false);
  }

  async function handleLogout() {
    await logoutSupabase();
    setIsAuthenticated(false);
  }

  // Apenas para fluxo inicial se não há sessão e não autenticado
  if (!isAuthenticated && !notAdmin && !isCheckingSession) {
    if (cadastroStep === "register") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600">
          <div className="w-full max-w-md flex flex-col items-center">
            <AdminInitialRegister
              onRegistered={(userData) => {
                setPersonalData(userData);
                setCadastroStep("personal");
              }}
              onRestart={resetRegisterFlow}
              currentStep={stepIndex}
              totalSteps={totalSteps}
            />
            <button
              type="button"
              className="mt-6 px-6 py-2 rounded-lg bg-white text-blue-800 font-bold border border-blue-200 hover:bg-blue-100 transition shadow"
              onClick={() => setCadastroStep("login")}
            >
              Já tenho login
            </button>
          </div>
        </div>
      );
    }
    if (cadastroStep === "personal" && personalData) {
      return (
        <AdminPersonalPage
          userData={personalData}
          onContinue={() => setCadastroStep("login")}
          onRestart={resetRegisterFlow}
          currentStep={stepIndex}
          totalSteps={totalSteps}
        />
      );
    }
    if (cadastroStep === "login") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100">
          <div className="w-full max-w-md">
            <ProgressBar currentStep={stepIndex} totalSteps={totalSteps} />
            <AdminLogin onLogin={handleLogin} />
            <div className="flex justify-center mt-2">
              <Button
                type="button"
                variant="outline"
                className="text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                onClick={resetRegisterFlow}
              >Reiniciar fluxo</Button>
            </div>
            <div className="text-xs text-center text-slate-500 mt-2">
              Dica: caso enfrente problemas, reinicie o fluxo e/ou limpe o cache do navegador.
            </div>
          </div>
        </div>
      );
    }
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

// Barra de progresso para etapas (mesma lógica dos outros)
function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full flex items-center gap-1 mb-3">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded ${i < currentStep ? "bg-blue-500" : "bg-blue-200"}`}
        />
      ))}
    </div>
  );
}
