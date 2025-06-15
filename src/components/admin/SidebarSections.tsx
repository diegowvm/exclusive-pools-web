import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ListChecks,
  UserCog,
  Banknote,
  Settings,
  Pencil,
} from "lucide-react";

export const sidebarSections = [
  {
    id: "dashboard",
    label: "Página inicial",
    icon: LayoutDashboard,
  },
  {
    id: "catalog",
    label: "Catálogo",
    icon: Pencil, // lápis para edição visual!
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
  {
    id: "design",
    label: "Design",
    icon: LayoutDashboard, // Ícone temporário, pode ser trocado por outro relacionado a design
    children: [
      { id: "design-logo", label: "Logo" },
      { id: "design-layout", label: "Layout" },
      { id: "design-colors", label: "Cores do Site" },
      { id: "design-carousel", label: "Imagens do Carrossel" },
    ],
  },
];
