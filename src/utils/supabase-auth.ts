
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
    
    // Verificar se é o administrador principal pelo email
    if (session.user.email === 'administrador1') {
      console.log('Usuário identificado como administrador principal');
      
      // Garantir que o administrador1 sempre tenha role admin
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: session.user.id, 
          role: 'admin'
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error('Erro ao garantir role admin:', upsertError);
      }

      return 'admin';
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Erro ao buscar role do usuário:', error);
      return null;
    }

    console.log('Role encontrada:', data?.role);
    return data?.role || null;
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
 * Função simplificada para garantir que o admin principal existe
 */
export async function ensureMainAdmin() {
  try {
    console.log('Verificando administrador principal...');
    
    // Verificar se já existe o usuário administrador1
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'administrador1',
      password: 'exclusive321'
    });

    if (loginError && loginError.message.includes('Invalid login credentials')) {
      console.log('Criando administrador principal...');
      
      // Criar o usuário se não existir
      const { error: signUpError } = await supabase.auth.signUp({
        email: 'administrador1',
        password: 'exclusive321',
        options: {
          data: {
            full_name: 'Administrador Principal',
          }
        }
      });

      if (signUpError) {
        console.error('Erro ao criar administrador:', signUpError);
      } else {
        console.log('Administrador principal criado');
      }
    } else if (loginData.user) {
      console.log('Administrador principal já existe');
    }
  } catch (error) {
    console.error('Erro na função ensureMainAdmin:', error);
  }
}
