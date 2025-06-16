
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

export const sidebarSections = [
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
