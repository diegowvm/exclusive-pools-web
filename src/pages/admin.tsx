
import { useEffect, useState } from "react";
import { getCurrentSession, getUserRole, logoutSupabase, ensureMainAdmin } from "@/utils/supabase-auth";
import { AdminMainLayout } from "@/components/admin/AdminMainLayout";
import { AuthFlow } from "./AdminPanel/AuthFlow";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function resetRegisterFlow() {
    window.location.reload();
  }

  useEffect(() => {
    async function initializeAdmin() {
      try {
        console.log('Inicializando painel administrativo...');
        
        // Garantir que o administrador principal existe
        await ensureMainAdmin();
        
        // Aguardar um pouco para garantir que a criação foi processada
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await checkSession();
      } catch (error) {
        console.error('Erro na inicialização:', error);
        setError('Erro ao inicializar o sistema');
        setIsCheckingSession(false);
      }
    }

    async function checkSession() {
      try {
        setIsCheckingSession(true);
        console.log('Verificando sessão...');
        
        const session = await getCurrentSession();
        console.log('Sessão obtida:', session ? 'Existe' : 'Não existe');
        
        if (session?.user) {
          console.log('Usuário encontrado:', session.user.email);
          const role = await getUserRole(session);
          console.log('Role do usuário:', role);
          
          if (role) {
            setIsAuthenticated(true);
            setUserRole(role);
          } else {
            console.log('Nenhuma role encontrada para o usuário');
            setIsAuthenticated(false);
            setUserRole(null);
          }
        } else {
          console.log('Nenhuma sessão ativa encontrada');
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setError('Erro ao verificar autenticação');
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsCheckingSession(false);
      }
    }
    
    initializeAdmin();
  }, []);

  async function handleLogin() {
    try {
      console.log('Processando login...');
      
      // Re-check session to get the user role
      const session = await getCurrentSession();
      if (session?.user) {
        const role = await getUserRole(session);
        console.log('Role após login:', role);
        
        if (role) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          setError('Usuário não tem permissões de acesso');
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro no processo de login');
    }
  }

  async function handleLogout() {
    try {
      await logoutSupabase();
      setIsAuthenticated(false);
      setUserRole(null);
      setError(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-red-500/20">
          <div className="text-red-400 text-xl font-semibold mb-4">Erro no Sistema</div>
          <p className="text-red-200 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Inicializando Sistema</h2>
            <p className="text-blue-200">Configurando credenciais administrativas...</p>
          </div>
        </div>
      </div>
    );
  }

  // Authentication flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="w-full max-w-md">
          <AuthFlow
            isCheckingSession={isCheckingSession}
            notAdmin={false}
            onLogin={handleLogin}
            resetRegisterFlow={resetRegisterFlow}
          />
        </div>
      </div>
    );
  }

  // Main admin dashboard - garantir que tenha role válida
  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-yellow-500/20">
          <div className="text-yellow-400 text-xl font-semibold mb-4">Acesso Negado</div>
          <p className="text-yellow-200 mb-6">Usuário não possui permissões administrativas</p>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Fazer Logout
          </button>
        </div>
      </div>
    );
  }

  return <AdminMainLayout onLogout={handleLogout} userRole={userRole} />;
}
