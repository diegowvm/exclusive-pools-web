
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CRMBreadcrumbProps {
  currentSection: any;
  activeSection: string;
}

export function CRMBreadcrumb({ currentSection, activeSection }: CRMBreadcrumbProps) {
  if (!currentSection) return null;

  const isChildSection = currentSection.children?.some(child => child.id === activeSection);
  const activeChild = currentSection.children?.find(child => child.id === activeSection);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3">
      <div className="flex items-center gap-2 text-sm">
        <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-blue-600 dark:text-blue-400">
          CRM
        </Button>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
          {currentSection.label}
        </Button>
        {isChildSection && activeChild && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900 dark:text-white">{activeChild.label}</span>
          </>
        )}
      </div>
    </div>
  );
}
