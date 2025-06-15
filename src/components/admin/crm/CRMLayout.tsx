
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { CRMHeader } from "./CRMHeader";
import { CRMBreadcrumb } from "./CRMBreadcrumb";
import { crmSidebarSections } from "./CRMSidebar";
import { CRMSidebarMenu } from "./components/CRMSidebarMenu";
import { sectionComponents } from "./components/CRMSectionComponents";

export function CRMLayout({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState<string[]>(["design-site"]);

  const ActiveComponent = sectionComponents[activeSection] || sectionComponents.dashboard;

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
      section.children?.some(child => 
        child.id === activeSection || 
        child.children?.some(subChild => subChild.id === activeSection)
      )
    );
  };

  const handleMenuClick = (sectionId: string, hasChildren: boolean, hasSubChildren: boolean = false) => {
    if (hasChildren || hasSubChildren) {
      toggleSection(sectionId);
    } else {
      setActiveSection(sectionId);
    }
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
              <CRMSidebarMenu
                activeSection={activeSection}
                expandedSections={expandedSections}
                onMenuClick={handleMenuClick}
                onSectionSelect={setActiveSection}
              />
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
