
import { supabase } from "@/lib/supabaseClient";

/**
 * Retorna a sessão atual do usuário logado no Supabase.
 */
export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Retorna os dados de perfil do usuário se for admin.
 * Aqui, customizável: pode ser pelo claim da role no JWT ou em uma tabela de usuários.
 * Exemplo simples: exige que o email contenha "admin" OU, melhor ainda, procure em uma tabela users pelo campo "role".
 */
export async function isAdmin(session) {
  // Exemplo simples usando claims padrão do Supabase/GoTrue:
  const user = session?.user;
  if (!user) return false;

  // Exemplo para roles customizadas, adaptado para seu Supabase.
  // Se você salva a role em um "user_metadata" ou similar:
  const role = user.user_metadata?.role || user.app_metadata?.role;
  if ((role && String(role).toLowerCase() === "admin")) {
    return true;
  }
  // fallback: libera apenas usuários de email "admin@", só para teste.
  if (user.email && user.email.toLowerCase().startsWith("admin")) {
    return true;
  }

  // Poderia também fazer uma query numa tabela de admins, caso tenha.
  return false;
}

/**
 * Realiza logout real utilizando Supabase Auth.
 */
export async function logoutSupabase() {
  await supabase.auth.signOut();
}
