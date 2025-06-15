
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ListChecks,
  UserCog,
  Banknote,
  Settings,
  Palette,
  Image,
  Images,
  Pencil,
  FolderKanban,
} from "lucide-react";

// Organização de submenus de projeto/design
export const sidebarSections = [
  {
    id: "dashboard",
    label: "Página inicial",
    icon: LayoutDashboard,
  },
  {
    id: "project",
    label: "Projeto do Site",
    icon: Palette,
    children: [
      { id: "project-layout", label: "Layout", icon: LayoutDashboard },
      {
        id: "project-catalog",
        label: "Catálogo",
        icon: FolderKanban,
        children: [
          { id: "catalog-piscinas", label: "Piscinas" },
          { id: "catalog-banheiras", label: "Banheiras" },
          { id: "catalog-spa", label: "Spas" },
          { id: "catalog-equipamentos", label: "Equipamentos" }
        ]
      },
      { id: "project-logo", label: "Logo", icon: Image },
      { id: "project-colors", label: "Cores do Site", icon: Palette },
      { id: "project-carousel", label: "Imagens do Carrossel", icon: Images }
    ]
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
