
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Mail,
  FileText,
  Settings,
  Package,
  Phone,
  Target,
  BarChart3,
  Calendar,
  Bell,
  CreditCard,
  Truck,
  Tag,
  UserCheck,
  Zap,
  Palette,
  Image,
  Layout,
  Type,
  Images
} from "lucide-react";

export const crmSidebarSections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visão geral e métricas"
  },
  {
    id: "design-site",
    label: "Design do Site",
    icon: Palette,
    description: "Edição completa do frontend",
    children: [
      { id: "design-layout", label: "Layout Geral", icon: Layout },
      { id: "design-logo", label: "Logo", icon: Image },
      { id: "design-colors", label: "Cores e Tema", icon: Palette },
      { id: "design-carousel", label: "Carrossel Principal", icon: Images },
      { id: "design-content", label: "Textos e Conteúdo", icon: Type },
      {
        id: "design-catalogs",
        label: "Catálogos",
        icon: Package,
        children: [
          { id: "catalog-piscinas", label: "Piscinas" },
          { id: "catalog-banheiras", label: "Banheiras" },
          { id: "catalog-spa", label: "Spas" },
          { id: "catalog-equipamentos", label: "Equipamentos" }
        ]
      }
    ]
  },
  {
    id: "sales",
    label: "Vendas",
    icon: ShoppingCart,
    description: "Gestão de pedidos e vendas",
    children: [
      { id: "orders", label: "Pedidos", icon: Package },
      { id: "quotes", label: "Orçamentos", icon: FileText },
      { id: "payment-status", label: "Status Pagamento", icon: CreditCard },
      { id: "shipping", label: "Entregas", icon: Truck }
    ]
  },
  {
    id: "financial",
    label: "Financeiro",
    icon: DollarSign,
    description: "Controle financeiro completo",
    children: [
      { id: "revenue", label: "Faturamento", icon: TrendingUp },
      { id: "expenses", label: "Despesas", icon: FileText },
      { id: "invoices", label: "Notas Fiscais", icon: FileText },
      { id: "reports", label: "Relatórios", icon: BarChart3 }
    ]
  },
  {
    id: "customers",
    label: "Clientes",
    icon: Users,
    description: "CRM e gestão de clientes",
    children: [
      { id: "customer-list", label: "Lista de Clientes", icon: Users },
      { id: "leads", label: "Leads", icon: Target },
      { id: "sales-funnel", label: "Funil de Vendas", icon: TrendingUp },
      { id: "customer-segments", label: "Segmentação", icon: Tag }
    ]
  },
  {
    id: "support",
    label: "Atendimento",
    icon: MessageSquare,
    description: "SAC e suporte ao cliente",
    children: [
      { id: "tickets", label: "Chamados", icon: MessageSquare },
      { id: "chat-history", label: "Histórico Chat", icon: Phone },
      { id: "support-analytics", label: "Analytics SAC", icon: BarChart3 }
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Mail,
    description: "Campanhas e automação",
    children: [
      { id: "campaigns", label: "Campanhas", icon: Zap },
      { id: "email-marketing", label: "E-mail Marketing", icon: Mail },
      { id: "notifications", label: "Notificações", icon: Bell },
      { id: "coupons", label: "Cupons", icon: Tag }
    ]
  },
  {
    id: "products",
    label: "Produtos",
    icon: Package,
    description: "Gestão de catálogo"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Relatórios e métricas",
    children: [
      { id: "sales-analytics", label: "Vendas", icon: TrendingUp },
      { id: "customer-analytics", label: "Clientes", icon: Users },
      { id: "product-analytics", label: "Produtos", icon: Package },
      { id: "marketing-analytics", label: "Marketing", icon: Mail }
    ]
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
    description: "Configurações do sistema",
    children: [
      { id: "company-settings", label: "Empresa", icon: Settings },
      { id: "user-permissions", label: "Permissões", icon: UserCheck },
      { id: "integrations", label: "Integrações", icon: Zap },
      { id: "payment-gateways", label: "Gateways Pagamento", icon: CreditCard }
    ]
  }
];
