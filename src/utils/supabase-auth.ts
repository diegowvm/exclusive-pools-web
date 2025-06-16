
import { supabase } from "@/integrations/supabase/client";

/**
 * Retorna a sessão atual do usuário logado no Supabase.
 */
export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Retorna os dados de perfil do usuário se for admin, vendedor ou financeiro.
 */
export async function getUserRole(session: any) {
  if (!session?.user) return null;

  try {
    // Verificar se é o administrador principal pelo email
    if (session.user.email === 'administrador1') {
      // Garantir que o administrador1 sempre tenha role admin
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: session.user.id, 
          role: 'admin'
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
  await supabase.auth.signOut();
}

/**
 * Realiza login com email e senha
 */
export async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/**
 * Realiza cadastro com email e senha
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string) {
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

  return { data, error };
}

/**
 * Atualiza a role de um usuário (apenas admin pode fazer isso)
 */
export async function updateUserRole(userId: string, role: 'admin' | 'vendedor' | 'financeiro') {
  const { data, error } = await supabase
    .from('user_roles')
    .upsert({ user_id: userId, role })
    .select();

  return { data, error };
}

/**
 * Função especial para criar o usuário administrador1 se não existir
 */
export async function ensureMainAdmin() {
  try {
    // Tentar fazer login com as credenciais do admin
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'administrador1',
      password: 'exclusive321',
    });

    if (loginError && loginError.message.includes('Invalid login credentials')) {
      // Se o usuário não existe, criar
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'administrador1',
        password: 'exclusive321',
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: 'Administrador Principal',
          }
        }
      });

      if (signUpError) {
        console.error('Erro ao criar administrador principal:', signUpError);
      } else {
        console.log('Administrador principal criado com sucesso');
      }
    }
  } catch (error) {
    console.error('Erro na função ensureMainAdmin:', error);
  }
}
