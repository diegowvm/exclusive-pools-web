
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getSectionsForRole } from "../config/roleBasedSidebar";
import { useUserRole } from "@/contexts/UserRoleContext";

interface SidebarNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
}

export function SidebarNavigation({ activeSection, onSectionChange, collapsed }: SidebarNavigationProps) {
  const { userRole } = useUserRole();
  const [expandedSections, setExpandedSections] = useState<string[]>(["design", "products"]);
  
  const sidebarSections = getSectionsForRole(userRole);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActiveSection = (sectionId: string, children?: any[]) => {
    if (activeSection === sectionId) return true;
    if (children) {
      return children.some(child => child.id === activeSection);
    }
    return false;
  };

  return (
    <div className="flex-1 overflow-y-auto py-4 px-2">
      <div className="space-y-2">
        {sidebarSections.map((section) => (
          <div key={section.id}>
            <Button
              variant={isActiveSection(section.id, section.children) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3",
                collapsed ? "px-3" : "px-3",
                isActiveSection(section.id, section.children) 
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-100 border border-blue-500/30 shadow-lg" 
                  : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
              )}
              onClick={() => {
                if (section.children) {
                  toggleSection(section.id);
                } else {
                  onSectionChange(section.id);
                }
              }}
            >
              <section.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex flex-col items-start ml-3 flex-1">
                  <span className="font-medium text-sm">{section.label}</span>
                  <span className="text-xs opacity-70">{section.description}</span>
                </div>
              )}
              {!collapsed && section.children && (
                <Badge variant="secondary" className="text-xs bg-slate-600">
                  {section.children.length}
                </Badge>
              )}
            </Button>

            {section.children && expandedSections.includes(section.id) && !collapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {section.children.map((child) => (
                  <Button
                    key={child.id}
                    variant={activeSection === child.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto py-2 px-3 text-sm",
                      activeSection === child.id
                        ? "bg-blue-600/30 text-blue-100 border border-blue-400/40"
                        : "hover:bg-slate-700/30 text-slate-400 hover:text-slate-200"
                    )}
                    onClick={() => onSectionChange(child.id)}
                  >
                    <child.icon className="h-4 w-4 mr-2" />
                    {child.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
