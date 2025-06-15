
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { crmSidebarSections } from "../CRMSidebar";

interface CRMSidebarMenuProps {
  activeSection: string;
  expandedSections: string[];
  onMenuClick: (sectionId: string, hasChildren: boolean, hasSubChildren?: boolean) => void;
  onSectionSelect: (sectionId: string) => void;
}

export function CRMSidebarMenu({ 
  activeSection, 
  expandedSections, 
  onMenuClick, 
  onSectionSelect 
}: CRMSidebarMenuProps) {
  const isActiveSection = (sectionId: string, children?: any[]) => {
    if (activeSection === sectionId) return true;
    if (children) {
      return children.some(child => 
        child.id === activeSection || 
        child.children?.some(subChild => subChild.id === activeSection)
      );
    }
    return false;
  };

  return (
    <SidebarMenu>
      {crmSidebarSections.map((section) => (
        <div key={section.id} className="px-3 mb-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActiveSection(section.id, section.children)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                isActiveSection(section.id, section.children)
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              )}
              onClick={() => onMenuClick(section.id, !!section.children)}
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
                <div key={child.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === child.id || child.children?.some(subChild => subChild.id === activeSection)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm",
                        activeSection === child.id || child.children?.some(subChild => subChild.id === activeSection)
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                      )}
                      onClick={() => onMenuClick(child.id, !!child.children, true)}
                    >
                      <child.icon className="w-4 h-4" />
                      <span className="hidden md:inline">{child.label}</span>
                      {child.children && (
                        <Badge variant="outline" className="hidden md:inline-flex text-xs">
                          {child.children.length}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {child.children && expandedSections.includes(child.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {child.children.map((subChild) => (
                        <SidebarMenuItem key={subChild.id}>
                          <SidebarMenuButton
                            isActive={activeSection === subChild.id}
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-xs",
                              activeSection === subChild.id
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                            )}
                            onClick={() => onSectionSelect(subChild.id)}
                          >
                            <div className="w-2 h-2 bg-current rounded-full opacity-50" />
                            <span className="hidden md:inline">{subChild.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </SidebarMenu>
  );
}
