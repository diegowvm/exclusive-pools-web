
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserCheck } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useUsersManagement } from "./users/useUsersManagement";
import { UsersTable } from "./users/UsersTable";
import { RoleViewSelector } from "./users/RoleViewSelector";

export function UsersManagement() {
  const { users, loading, updateUserRole } = useUsersManagement();
  const { hasPermission } = useUserRole();

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciamento de Usuários</h1>
          <p className="text-slate-600 dark:text-slate-400">Gerencie usuários e suas permissões no sistema</p>
        </div>

        <RoleViewSelector />
      </div>

      {hasPermission('all') && (
        <Alert>
          <UserCheck className="h-4 w-4" />
          <AlertDescription>
            Como administrador, você pode alterar as roles dos usuários e visualizar o sistema na perspectiva de diferentes funções.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Usuários do Sistema ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} onUpdateRole={updateUserRole} />
        </CardContent>
      </Card>
    </div>
  );
}
