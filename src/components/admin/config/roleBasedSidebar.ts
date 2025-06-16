
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
  Package,
  TrendingUp,
  FileText,
  UserCheck,
  Bell,
  Mail,
  Phone,
  Target,
  PlusCircle,
  Edit,
  Tags,
  UsersIcon
} from "lucide-react";
import { UserRole } from "@/contexts/UserRoleContext";

export const roleBasedSections = {
  admin: [
    {
      id: "dashboard",
      label: "Dashboard Executivo",
      icon: LayoutDashboard,
      description: "Visão geral completa"
    },
    {
      id: "users",
      label: "Gerenciar Usuários",
      icon: UsersIcon,
      description: "Controle de usuários e roles"
    },
    {
      id: "design",
      label: "Design & Frontend",
      icon: Palette,
      description: "Gestão visual completa",
      children: [
        { id: "design-overview", label: "Visão Geral", icon: LayoutDashboard },
        { id: "design-layout", label: "Layout", icon: LayoutDashboard },
        { id: "design-colors", label: "Cores & Tema", icon: Palette },
        { id: "design-typography", label: "Tipografia", icon: FileText },
        { id: "design-images", label: "Imagens", icon: Package },
        { id: "design-content", label: "Conteúdo", icon: FileText }
      ]
    },
    {
      id: "products",
      label: "Gestão de Produtos",
      icon: Package,
      description: "Catálogos e inventário",
      children: [
        { id: "products-overview", label: "Visão Geral", icon: Package },
        { id: "products-catalog", label: "Catálogo Completo", icon: ShoppingBag },
        { id: "products-categories", label: "Categorias", icon: Tags },
        { id: "products-add", label: "Adicionar Produto", icon: PlusCircle }
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
        { id: "sales-funnel", label: "Funil de Vendas", icon: TrendingUp },
        { id: "leads", label: "Leads", icon: Target }
      ]
    },
    {
      id: "customers",
      label: "Clientes",
      icon: Users,
      description: "CRM completo"
    },
    {
      id: "financial",
      label: "Financeiro",
      icon: CreditCard,
      description: "Gestão financeira",
      children: [
        { id: "revenue", label: "Receitas", icon: TrendingUp },
        { id: "expenses", label: "Despesas", icon: CreditCard },
        { id: "reports", label: "Relatórios", icon: BarChart3 },
        { id: "invoices", label: "Faturas", icon: FileText }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Relatórios avançados"
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      description: "Sistema e usuários"
    }
  ],
  financeiro: [
    {
      id: "dashboard",
      label: "Dashboard Financeiro",
      icon: CreditCard,
      description: "Métricas financeiras"
    },
    {
      id: "financial",
      label: "Gestão Financeira",
      icon: CreditCard,
      description: "Controle completo",
      children: [
        { id: "revenue", label: "Receitas", icon: TrendingUp },
        { id: "expenses", label: "Despesas", icon: CreditCard },
        { id: "reports", label: "Relatórios", icon: BarChart3 },
        { id: "invoices", label: "Faturas", icon: FileText }
      ]
    },
    {
      id: "analytics",
      label: "Relatórios",
      icon: BarChart3,
      description: "Analytics financeiros"
    },
    {
      id: "customers",
      label: "Clientes",
      icon: Users,
      description: "Dados de clientes"
    },
    {
      id: "orders",
      label: "Pedidos",
      icon: ShoppingCart,
      description: "Visualizar pedidos"
    }
  ],
  vendedor: [
    {
      id: "dashboard",
      label: "Dashboard Vendas",
      icon: TrendingUp,
      description: "Métricas de vendas"
    },
    {
      id: "sales",
      label: "Minhas Vendas",
      icon: ShoppingCart,
      description: "Gestão de vendas",
      children: [
        { id: "orders", label: "Pedidos", icon: ShoppingCart },
        { id: "quotes", label: "Orçamentos", icon: FileText },
        { id: "leads", label: "Leads", icon: Target }
      ]
    },
    {
      id: "customers",
      label: "Meus Clientes",
      icon: Users,
      description: "Base de clientes"
    },
    {
      id: "products",
      label: "Catálogo",
      icon: Package,
      description: "Produtos disponíveis",
      children: [
        { id: "products-overview", label: "Visão Geral", icon: Package },
        { id: "products-catalog", label: "Ver Catálogo", icon: ShoppingBag },
        { id: "products-categories", label: "Categorias", icon: Tags }
      ]
    }
  ]
};

export const getSectionsForRole = (role: UserRole) => {
  return roleBasedSections[role] || roleBasedSections.admin;
};
