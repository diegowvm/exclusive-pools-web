
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminContent } from "./AdminContent";
import { DesignProvider } from "@/contexts/DesignContext";

export function AdminMainLayout({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <DesignProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
    </DesignProvider>
  );
}
