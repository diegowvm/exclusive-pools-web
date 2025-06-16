
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, roleLabels } from "./types";

export function useUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Buscar roles dos usuários
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
      }

      // Buscar profiles dos usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Buscar dados de auth dos usuários
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        // Fallback: mostrar apenas dados das roles se disponíveis
        if (userRoles) {
          const usersFromRoles = userRoles.map(ur => ({
            id: ur.user_id,
            email: 'Email não disponível',
            created_at: new Date().toISOString(),
            role: ur.role,
            full_name: profiles?.find(p => p.id === ur.user_id)?.full_name || ''
          }));
          
          setUsers(usersFromRoles);
        }
      } else {
        // Combinar dados de auth com roles e profiles
        const combinedUsers = authUsers.users.map(authUser => {
          const userRole = userRoles?.find(ur => ur.user_id === authUser.id);
          const userProfile = profiles?.find(p => p.id === authUser.id);
          
          return {
            id: authUser.id,
            email: authUser.email || '',
            created_at: authUser.created_at,
            role: userRole?.role || 'vendedor',
            full_name: authUser.user_metadata?.full_name || userProfile?.full_name || ''
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

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: newRole as any
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Role do usuário atualizada para ${roleLabels[newRole as keyof typeof roleLabels]?.label}`,
      });

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

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    loadUsers,
    updateUserRole
  };
}
