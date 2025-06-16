
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserCheck, Shield, Crown } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useUsersManagement } from "./users/useUsersManagement";
import { UsersTable } from "./users/UsersTable";
import { RoleViewSelector } from "./users/RoleViewSelector";

export function UsersManagement() {
  const { users, loading, updateUserRole } = useUsersManagement();
  const { hasPermission, userRole } = useUserRole();

  // Apenas administradores podem acessar esta seção
  if (!hasPermission('all')) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 text-lg font-medium">Acesso Restrito</p>
          <p className="text-slate-400">Apenas administradores podem gerenciar usuários.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Controle total sobre usuários e permissões do sistema
          </p>
        </div>

        <RoleViewSelector />
      </div>

      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <UserCheck className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Painel Administrativo Senior:</strong> Você tem acesso completo para gerenciar todos os usuários, 
          alterar suas permissões e visualizar o sistema na perspectiva de diferentes funções.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Shield className="w-5 h-5" />
              Administradores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <p className="text-sm text-blue-600">Acesso total</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Users className="w-5 h-5" />
              Vendedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {users.filter(u => u.role === 'vendedor').length}
            </div>
            <p className="text-sm text-green-600">Vendas e produtos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <UserCheck className="w-5 h-5" />
              Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {users.filter(u => u.role === 'financeiro').length}
            </div>
            <p className="text-sm text-purple-600">Relatórios e finanças</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
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
