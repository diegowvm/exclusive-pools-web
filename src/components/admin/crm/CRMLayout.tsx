
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { CRMHeader } from "./CRMHeader";
import { CRMBreadcrumb } from "./CRMBreadcrumb";
import { crmSidebarSections } from "./CRMSidebar";
import { CRMSidebarMenu } from "./components/CRMSidebarMenu";
import { sectionComponents } from "./components/CRMSectionComponents";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function CRMLayout({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState<string[]>(["design-site"]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false); // Close mobile menu on section select
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Sidebar */}
        <Sidebar className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:static inset-y-0 left-0 z-40 w-16 md:w-72 
          border-r border-slate-200 dark:border-slate-700 
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg
          transition-transform duration-300 ease-in-out
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
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

            <SidebarContent className="flex-1 py-4 overflow-y-auto">
              <CRMSidebarMenu
                activeSection={activeSection}
                expandedSections={expandedSections}
                onMenuClick={handleMenuClick}
                onSectionSelect={setActiveSection}
              />
            </SidebarContent>
          </div>
        </Sidebar>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <CRMHeader onLogout={onLogout} />
          <CRMBreadcrumb currentSection={getCurrentSection()} activeSection={activeSection} />
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
