
import { Badge } from "@/components/ui/badge";
import { UserRoleEditDialog } from "./UserRoleEditDialog";
import { User, roleLabels } from "./types";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Crown, Shield, Users, Calculator } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

export function UsersTable({ users, onUpdateRole }: UsersTableProps) {
  const { hasPermission } = useUserRole();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'financeiro':
        return <Calculator className="w-4 h-4 text-purple-500" />;
      case 'vendedor':
        return <Users className="w-4 h-4 text-green-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const isMainAdmin = (email: string) => {
    return email === 'administrador1';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="text-left p-4 font-semibold">Usuário</th>
            <th className="text-left p-4 font-semibold">Função</th>
            <th className="text-left p-4 font-semibold">Data de Cadastro</th>
            <th className="text-left p-4 font-semibold">Status</th>
            {hasPermission('all') && <th className="text-left p-4 font-semibold">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-slate-50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.full_name || 'Nome não informado'}
                      {isMainAdmin(user.email) && (
                        <Crown className="w-4 h-4 text-yellow-500" title="Administrador Principal" />
                      )}
                    </div>
                    <div className="text-sm text-slate-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <Badge className={`${roleLabels[user.role as keyof typeof roleLabels]?.color || "bg-gray-100 text-gray-800"} flex items-center gap-1 w-fit`}>
                  {getRoleIcon(user.role)}
                  {roleLabels[user.role as keyof typeof roleLabels]?.label || user.role}
                </Badge>
              </td>
              <td className="p-4 text-sm text-slate-600">
                {new Date(user.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </td>
              <td className="p-4">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Ativo
                </Badge>
              </td>
              {hasPermission('all') && (
                <td className="p-4">
                  {isMainAdmin(user.email) ? (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Administrador Principal
                    </Badge>
                  ) : (
                    <UserRoleEditDialog user={user} onUpdateRole={onUpdateRole} />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500">Nenhum usuário encontrado</p>
        </div>
      )}
    </div>
  );
}
