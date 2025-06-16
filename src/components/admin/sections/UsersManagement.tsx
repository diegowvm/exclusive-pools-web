import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserCheck, Settings, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  role?: string;
  full_name?: string;
}

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { userRole, hasPermission, setUserRole } = useUserRole();
  const { toast } = useToast();

  const roleLabels = {
    admin: { label: "Administrador", color: "bg-red-100 text-red-800" },
    financeiro: { label: "Financeiro", color: "bg-blue-100 text-blue-800" },
    vendedor: { label: "Vendedor", color: "bg-green-100 text-green-800" }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Buscar usuários e suas roles com join correto
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles!inner(
            full_name
          )
        `);

      if (error) {
        console.error('Error fetching user roles:', error);
      }

      // Buscar dados de auth dos usuários
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        // Fallback: mostrar apenas dados das roles
        const usersFromRoles = userRoles?.map(ur => ({
          id: ur.user_id,
          email: 'Email não disponível',
          created_at: new Date().toISOString(),
          role: ur.role,
          full_name: ur.profiles?.full_name || ''
        })) || [];
        
        setUsers(usersFromRoles);
      } else {
        // Combinar dados de auth com roles
        const combinedUsers = authUsers.users.map(authUser => {
          const userRole = userRoles?.find(ur => ur.user_id === authUser.id);
          return {
            id: authUser.id,
            email: authUser.email || '',
            created_at: authUser.created_at,
            role: userRole?.role || 'vendedor',
            full_name: authUser.user_metadata?.full_name || userRole?.profiles?.full_name || ''
          };
        });
        
        setUsers(combinedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: selectedUser.id, 
          role: newRole as any
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Role do usuário atualizada para ${roleLabels[newRole as keyof typeof roleLabels]?.label}`,
      });

      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setNewRole("");
      loadUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar role do usuário",
        variant: "destructive"
      });
    }
  };

  const switchToUserRole = (role: string) => {
    setUserRole(role as any);
    toast({
      title: "Visualização alterada",
      description: `Agora visualizando como: ${roleLabels[role as keyof typeof roleLabels]?.label}`,
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

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

        {hasPermission('all') && (
          <div className="flex items-center gap-4">
            <Label>Visualizar como:</Label>
            <Select value={userRole} onValueChange={switchToUserRole}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="vendedor">Vendedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
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
                        <div className="flex gap-2">
                          <Dialog open={isEditDialogOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) {
                              setSelectedUser(null);
                              setNewRole("");
                            }
                          }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setNewRole(user.role || 'vendedor');
                                }}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Editar Role
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Alterar Role do Usuário</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Usuário</Label>
                                  <p className="text-sm text-slate-600">{user.full_name || user.email}</p>
                                </div>
                                <div>
                                  <Label htmlFor="role">Nova Role</Label>
                                  <Select value={newRole} onValueChange={setNewRole}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione uma role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Administrador</SelectItem>
                                      <SelectItem value="financeiro">Financeiro</SelectItem>
                                      <SelectItem value="vendedor">Vendedor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setIsEditDialogOpen(false);
                                      setSelectedUser(null);
                                      setNewRole("");
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button onClick={updateUserRole}>
                                    Salvar Alterações
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
