import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarContent } from "@/components/ui/sidebar";
import { sidebarSections } from "./SidebarSections";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";

// Importação dinâmica das sections (deixa código enxuto)
import { DashboardSection } from "./sections/DashboardSection";
import { ProductsSection } from "./sections/ProductsSection";
import { ClientsSection } from "./sections/ClientsSection";
import { OrdersSection } from "./sections/OrdersSection";
import { EmployeesSection } from "./sections/EmployeesSection";
import { FinancialSection } from "./sections/FinancialSection";
import { SettingsSection } from "./sections/SettingsSection";
import { CatalogSection } from "./sections/CatalogSection";
import { DesignSection } from "./sections/DesignSection";

const sectionComponents: Record<string, React.FC> = {
  dashboard: DashboardSection,
  catalog: CatalogSection,
  products: ProductsSection,
  clients: ClientsSection,
  orders: OrdersSection,
  employees: EmployeesSection,
  financial: FinancialSection,
  settings: SettingsSection,
  design: DesignSection,
};

export function AdminDashboardLayout({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const ActiveComponent = sectionComponents[activeSection] || DashboardSection;

  // Simulação de change de tema (ajuste depois para integração real)
  const onToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all">
        <Sidebar className="w-16 md:w-56" collapsible="icon">
          <div className="flex flex-col gap-2 py-3">
            <div className="flex items-center justify-center md:justify-start px-3 pb-2">
              <span className="font-extrabold text-xl text-gradient-aqua tracking-tighter">EMPRESA</span>
            </div>
            <SidebarTrigger className="mx-auto mb-1 md:hidden" />
            <SidebarContent>
              <SidebarMenu>
                {sidebarSections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton
                      isActive={activeSection === section.id}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-2 rounded-lg transition",
                        activeSection === section.id ? "bg-aqua-100 text-aqua-700 font-bold shadow" : "hover:bg-aqua-50"
                      )}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="hidden md:inline">{section.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </div>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader onLogout={onLogout} onToggleTheme={onToggleTheme} />
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
