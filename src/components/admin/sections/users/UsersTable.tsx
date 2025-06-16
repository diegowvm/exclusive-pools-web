
import { Badge } from "@/components/ui/badge";
import { UserRoleEditDialog } from "./UserRoleEditDialog";
import { User, roleLabels } from "./types";
import { useUserRole } from "@/contexts/UserRoleContext";

interface UsersTableProps {
  users: User[];
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

export function UsersTable({ users, onUpdateRole }: UsersTableProps) {
  const { hasPermission } = useUserRole();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Nome/Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Data de Cadastro</th>
            {hasPermission('all') && <th className="text-left p-3">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-slate-50">
              <td className="p-3">
                <div>
                  <div className="font-medium">{user.full_name || 'Nome não informado'}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </div>
              </td>
              <td className="p-3">
                <Badge className={roleLabels[user.role as keyof typeof roleLabels]?.color || "bg-gray-100 text-gray-800"}>
                  {roleLabels[user.role as keyof typeof roleLabels]?.label || user.role}
                </Badge>
              </td>
              <td className="p-3 text-sm text-slate-600">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </td>
              {hasPermission('all') && (
                <td className="p-3">
                  <UserRoleEditDialog user={user} onUpdateRole={onUpdateRole} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
