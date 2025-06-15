
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMHeader } from "./CRMHeader";
import { CRMBreadcrumb } from "./CRMBreadcrumb";
import { crmSidebarSections } from "./CRMSidebar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Importação dinâmica das seções do CRM
import { CRMDashboard } from "./sections/CRMDashboard";
import { OrdersSection } from "./sections/OrdersSection";
import { CustomersSection } from "./sections/CustomersSection";
import { FinancialSection } from "./sections/FinancialSection";
import { SupportSection } from "./sections/SupportSection";
import { MarketingSection } from "./sections/MarketingSection";
import { ProductsSection } from "./sections/ProductsSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { SettingsSection } from "./sections/SettingsSection";

const sectionComponents = {
  dashboard: CRMDashboard,
  // Sales
  orders: OrdersSection,
  quotes: () => <div>Orçamentos em desenvolvimento</div>,
  "payment-status": () => <div>Status de Pagamento em desenvolvimento</div>,
  shipping: () => <div>Entregas em desenvolvimento</div>,
  // Financial
  revenue: FinancialSection,
  expenses: () => <div>Despesas em desenvolvimento</div>,
  invoices: () => <div>Notas Fiscais em desenvolvimento</div>,
  reports: () => <div>Relatórios Financeiros em desenvolvimento</div>,
  // Customers
  "customer-list": CustomersSection,
  leads: () => <div>Leads em desenvolvimento</div>,
  "sales-funnel": () => <div>Funil de Vendas em desenvolvimento</div>,
  "customer-segments": () => <div>Segmentação em desenvolvimento</div>,
  // Support
  tickets: SupportSection,
  "chat-history": () => <div>Histórico de Chat em desenvolvimento</div>,
  "support-analytics": () => <div>Analytics SAC em desenvolvimento</div>,
  // Marketing
  campaigns: MarketingSection,
  "email-marketing": () => <div>E-mail Marketing em desenvolvimento</div>,
  notifications: () => <div>Notificações em desenvolvimento</div>,
  coupons: () => <div>Cupons em desenvolvimento</div>,
  // Products
  products: ProductsSection,
  // Analytics
  analytics: AnalyticsSection,
  "sales-analytics": () => <div>Analytics de Vendas em desenvolvimento</div>,
  "customer-analytics": () => <div>Analytics de Clientes em desenvolvimento</div>,
  "product-analytics": () => <div>Analytics de Produtos em desenvolvimento</div>,
  "marketing-analytics": () => <div>Analytics de Marketing em desenvolvimento</div>,
  // Settings
  settings: SettingsSection,
  "company-settings": () => <div>Configurações da Empresa em desenvolvimento</div>,
  "user-permissions": () => <div>Permissões de Usuário em desenvolvimento</div>,
  integrations: () => <div>Integrações em desenvolvimento</div>,
  "payment-gateways": () => <div>Gateways de Pagamento em desenvolvimento</div>,
};

export function CRMLayout({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState<string[]>(["sales"]);

  const ActiveComponent = sectionComponents[activeSection] || CRMDashboard;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getCurrentSection = () => {
    return crmSidebarSections.find(section => 
      section.id === activeSection || 
      section.children?.some(child => child.id === activeSection)
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Sidebar className="w-16 md:w-72 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CRM</span>
                </div>
                <div className="hidden md:block">
                  <h1 className="font-bold text-lg text-slate-900 dark:text-white">Admin CRM</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sistema Empresarial</p>
                </div>
              </div>
            </div>

            <SidebarContent className="flex-1 py-4">
              <SidebarMenu>
                {crmSidebarSections.map((section) => (
                  <div key={section.id} className="px-3 mb-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === section.id || section.children?.some(child => child.id === activeSection)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                          activeSection === section.id || section.children?.some(child => child.id === activeSection)
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        )}
                        onClick={() => {
                          if (section.children) {
                            toggleSection(section.id);
                          } else {
                            setActiveSection(section.id);
                          }
                        }}
                      >
                        <section.icon className="w-5 h-5 flex-shrink-0" />
                        <div className="hidden md:flex flex-col flex-1 text-left">
                          <span className="font-medium text-sm">{section.label}</span>
                          {section.description && (
                            <span className="text-xs opacity-70">{section.description}</span>
                          )}
                        </div>
                        {section.children && (
                          <Badge variant="secondary" className="hidden md:inline-flex text-xs">
                            {section.children.length}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {section.children && expandedSections.includes(section.id) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {section.children.map((child) => (
                          <SidebarMenuItem key={child.id}>
                            <SidebarMenuButton
                              isActive={activeSection === child.id}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm",
                                activeSection === child.id
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                              )}
                              onClick={() => setActiveSection(child.id)}
                            >
                              <child.icon className="w-4 h-4" />
                              <span className="hidden md:inline">{child.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <CRMHeader onLogout={onLogout} />
          <CRMBreadcrumb currentSection={getCurrentSection()} activeSection={activeSection} />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
