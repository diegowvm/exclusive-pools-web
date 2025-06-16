
import { useEffect, useState } from "react";
import { getCurrentSession, getUserRole, logoutSupabase } from "@/utils/supabase-auth";
import { AdminMainLayout } from "@/components/admin/AdminMainLayout";
import { AuthFlow } from "./AdminPanel/AuthFlow";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  function resetRegisterFlow() {
    window.location.reload();
  }

  useEffect(() => {
    async function checkSession() {
      setIsCheckingSession(true);
      const session = await getCurrentSession();
      
      if (session) {
        const role = await getUserRole(session);
        if (role) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setIsCheckingSession(false);
    }
    
    checkSession();
  }, []);

  async function handleLogin() {
    setIsAuthenticated(true);
    // Re-check session to get the user role
    const session = await getCurrentSession();
    if (session) {
      const role = await getUserRole(session);
      setUserRole(role);
    }
  }

  async function handleLogout() {
    await logoutSupabase();
    setIsAuthenticated(false);
    setUserRole(null);
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

  // Authentication flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <AuthFlow
          isCheckingSession={isCheckingSession}
          notAdmin={false}
          onLogin={handleLogin}
          resetRegisterFlow={resetRegisterFlow}
        />
      </div>
    );
  }

  // Main admin dashboard
  return <AdminMainLayout onLogout={handleLogout} userRole={userRole} />;
}
