
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Palette,
  ShoppingBag,
  Users,
  ShoppingCart,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brush,
  Image,
  Type,
  Monitor,
  Smartphone,
  Globe,
  UserCheck,
  Bell,
  FileText,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const sidebarSections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visão geral do sistema"
  },
  {
    id: "design",
    label: "Design & Frontend",
    icon: Palette,
    description: "Otimização visual",
    children: [
      { id: "design-overview", label: "Visão Geral", icon: Monitor },
      { id: "design-layout", label: "Layout", icon: LayoutDashboard },
      { id: "design-colors", label: "Cores", icon: Palette },
      { id: "design-typography", label: "Tipografia", icon: Type },
      { id: "design-images", label: "Imagens", icon: Image },
      { id: "design-content", label: "Conteúdo", icon: FileText },
      { id: "design-responsive", label: "Responsivo", icon: Smartphone }
    ]
  },
  {
    id: "sales",
    label: "Vendas",
    icon: ShoppingCart,
    description: "Gestão comercial",
    children: [
      { id: "orders", label: "Pedidos", icon: ShoppingCart },
      { id: "quotes", label: "Orçamentos", icon: FileText },
      { id: "sales-funnel", label: "Funil de Vendas", icon: TrendingUp }
    ]
  },
  {
    id: "products",
    label: "Produtos",
    icon: ShoppingBag,
    description: "Catálogo de produtos"
  },
  {
    id: "customers",
    label: "Clientes",
    icon: Users,
    description: "Base de clientes",
    children: [
      { id: "customer-list", label: "Lista de Clientes", icon: Users },
      { id: "customer-segments", label: "Segmentação", icon: UserCheck },
      { id: "leads", label: "Leads", icon: Phone }
    ]
  },
  {
    id: "financial",
    label: "Financeiro",
    icon: CreditCard,
    description: "Gestão financeira",
    children: [
      { id: "revenue", label: "Receitas", icon: TrendingUp },
      { id: "expenses", label: "Despesas", icon: CreditCard },
      { id: "reports", label: "Relatórios", icon: BarChart3 }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Métricas e análises"
  },
  {
    id: "communication",
    label: "Comunicação",
    icon: MessageSquare,
    description: "Atendimento e suporte",
    children: [
      { id: "support", label: "Suporte", icon: MessageSquare },
      { id: "notifications", label: "Notificações", icon: Bell },
      { id: "email-marketing", label: "E-mail Marketing", icon: Mail }
    ]
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
    description: "Configurações do sistema"
  }
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({ 
  activeSection, 
  onSectionChange, 
  collapsed, 
  onToggleCollapse 
}: AdminSidebarProps) {
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
    <div className={cn(
      "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col h-screen sticky top-0",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 dark:text-white">Admin Pro</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sistema Empresarial</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
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

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">Site Status</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">Online</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
