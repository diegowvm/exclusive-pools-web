
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ListChecks,
  UserCog,
  Banknote,
  Settings,
} from "lucide-react";

export const sidebarSections = [
  {
    id: "dashboard",
    label: "Página inicial",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Produtos",
    icon: ShoppingBag,
  },
  {
    id: "clients",
    label: "Clientes",
    icon: Users,
  },
  {
    id: "orders",
    label: "Pedidos",
    icon: ListChecks,
  },
  {
    id: "employees",
    label: "Funcionários",
    icon: UserCog,
  },
  {
    id: "financial",
    label: "Finanças",
    icon: Banknote,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
];
