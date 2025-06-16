
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminContent } from "./AdminContent";
import { UserRoleProvider } from "@/contexts/UserRoleContext";

interface AdminMainLayoutProps {
  onLogout: () => void;
  userRole?: string | null;
}

export function AdminMainLayout({ onLogout, userRole }: AdminMainLayoutProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  console.log('AdminMainLayout renderizando com userRole:', userRole);

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <div className="text-red-400 text-xl font-semibold mb-4">Erro de Permissão</div>
          <p className="text-red-200">Role de usuário não definida</p>
        </div>
      </div>
    );
  }

  return (
    <UserRoleProvider initialRole={userRole as any}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <div className="flex-1 flex flex-col min-h-screen">
            <AdminHeader 
              onLogout={onLogout}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
              sidebarCollapsed={sidebarCollapsed}
            />
            
            <AdminContent 
              activeSection={activeSection}
              sidebarCollapsed={sidebarCollapsed}
            />
          </div>
        </div>
      </SidebarProvider>
    </UserRoleProvider>
  );
}
