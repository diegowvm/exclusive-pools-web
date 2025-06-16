
export interface User {
  id: string;
  email: string;
  created_at: string;
  role?: string;
  full_name?: string;
}

export const roleLabels = {
  admin: { label: "Administrador", color: "bg-red-100 text-red-800" },
  financeiro: { label: "Financeiro", color: "bg-blue-100 text-blue-800" },
  vendedor: { label: "Vendedor", color: "bg-green-100 text-green-800" }
};
