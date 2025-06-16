
import { supabase } from "@/integrations/supabase/client";

/**
 * Retorna a sessão atual do usuário logado no Supabase.
 */
export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Erro ao obter sessão:', error);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Erro na função getCurrentSession:', error);
    return null;
  }
}

/**
 * Retorna os dados de perfil do usuário se for admin, vendedor ou financeiro.
 */
export async function getUserRole(session: any) {
  if (!session?.user) {
    console.log('Nenhuma sessão de usuário encontrada');
    return null;
  }

  try {
    console.log('Verificando role para usuário:', session.user.email);
    
    // Usar a função do banco de dados para obter a role
    const { data, error } = await supabase.rpc('get_user_role', {
      user_id: session.user.id
    });

    if (error) {
      console.error('Erro ao buscar role do usuário:', error);
      
      // Fallback: verificar diretamente na tabela user_roles
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roleError) {
        console.error('Erro ao buscar role diretamente:', roleError);
        return null;
      }

      return roleData?.role || null;
    }

    console.log('Role encontrada:', data);
    return data || null;
  } catch (error) {
    console.error('Erro na função getUserRole:', error);
    return null;
  }
}

/**
 * Verifica se o usuário tem uma role específica
 */
export async function hasRole(session: any, role: string) {
  const userRole = await getUserRole(session);
  return userRole === role;
}

/**
 * Verifica se o usuário é admin
 */
export async function isAdmin(session: any) {
  return await hasRole(session, 'admin');
}

/**
 * Realiza logout real utilizando Supabase Auth.
 */
export async function logoutSupabase() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro no logout:', error);
    }
  } catch (error) {
    console.error('Erro na função logoutSupabase:', error);
  }
}

/**
 * Realiza login com email e senha
 */
export async function loginWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro no login:', error);
    } else {
      console.log('Login realizado com sucesso');
    }

    return { data, error };
  } catch (error) {
    console.error('Erro na função loginWithEmail:', error);
    return { data: null, error };
  }
}

/**
 * Realiza cadastro com email e senha
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName || '',
        }
      }
    });

    if (error) {
      console.error('Erro no cadastro:', error);
    } else {
      console.log('Cadastro realizado com sucesso');
    }

    return { data, error };
  } catch (error) {
    console.error('Erro na função signUpWithEmail:', error);
    return { data: null, error };
  }
}

/**
 * Atualiza a role de um usuário (apenas admin pode fazer isso)
 */
export async function updateUserRole(userId: string, role: 'admin' | 'vendedor' | 'financeiro') {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role }, {
        onConflict: 'user_id'
      })
      .select();

    if (error) {
      console.error('Erro ao atualizar role:', error);
    } else {
      console.log('Role atualizada com sucesso');
    }

    return { data, error };
  } catch (error) {
    console.error('Erro na função updateUserRole:', error);
    return { data: null, error };
  }
}

/**
 * Função otimizada para garantir que o admin principal existe
 */
export async function ensureMainAdmin() {
  try {
    console.log('Verificando administrador principal...');
    
    // Verificar se já existe o usuário administrador1
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Erro ao listar usuários:', userError);
      return;
    }

    const adminUser = userData.users.find(user => user.email === 'administrador1');
    
    if (!adminUser) {
      console.log('Criando administrador principal...');
      
      // Criar o usuário se não existir
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email: 'administrador1',
        password: 'exclusive321',
        user_metadata: {
          full_name: 'Administrador Principal',
        },
        email_confirm: true
      });

      if (signUpError) {
        console.error('Erro ao criar administrador:', signUpError);
      } else if (newUser.user) {
        console.log('Administrador principal criado');
        
        // Garantir que tem role admin
        await supabase
          .from('user_roles')
          .upsert({ 
            user_id: newUser.user.id, 
            role: 'admin'
          }, {
            onConflict: 'user_id'
          });
      }
    } else {
      console.log('Administrador principal já existe');
      
      // Garantir que tem role admin
      await supabase
        .from('user_roles')
        .upsert({ 
          user_id: adminUser.id, 
          role: 'admin'
        }, {
          onConflict: 'user_id'
        });
    }
  } catch (error) {
    console.error('Erro na função ensureMainAdmin:', error);
  }
}
