
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sidebarSections } from "../config/sidebarConfig";

interface SidebarNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
}

export function SidebarNavigation({ activeSection, onSectionChange, collapsed }: SidebarNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["design"]);

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
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
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
                <Badge variant="secondary" className="text-xs">
                  {section.children.length}
                </Badge>
              )}
            </Button>

            {/* Submenu */}
            {section.children && expandedSections.includes(section.id) && !collapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {section.children.map((child) => (
                  <Button
                    key={child.id}
                    variant={activeSection === child.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto py-2 px-3 text-sm",
                      activeSection === child.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
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
