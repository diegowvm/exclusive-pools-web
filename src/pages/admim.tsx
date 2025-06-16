
import { useEffect, useState } from "react";
import { getCurrentSession, isAdmin, logoutSupabase } from "@/utils/supabase-auth";
import { AdminMainLayout } from "@/components/admin/AdminMainLayout";
import { AuthFlow } from "./AdminPanel/AuthFlow";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [notAdmin, setNotAdmin] = useState(false);

  function resetRegisterFlow() {
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

  // Loading state
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Carregando Sistema</h2>
            <p className="text-slate-600 dark:text-slate-400">Verificando credenciais...</p>
          </div>
        </div>
      </div>
    );
  }

  // Access denied
  if (notAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Acesso Negado</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Sua conta não possui permissões de administrador para acessar este painel empresarial.
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Fazer Logout
          </button>
        </div>
      </div>
    );
  }

  // Authentication flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <AuthFlow
          isCheckingSession={isCheckingSession}
          notAdmin={notAdmin}
          onLogin={handleLogin}
          resetRegisterFlow={resetRegisterFlow}
        />
      </div>
    );
  }

  // Main admin dashboard
  return <AdminMainLayout onLogout={handleLogout} />;
}
