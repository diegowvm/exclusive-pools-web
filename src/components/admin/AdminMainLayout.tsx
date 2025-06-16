
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
