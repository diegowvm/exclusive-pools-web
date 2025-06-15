
// Veja docs sobre "Policies" logo abaixo!
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://knrsjxphbczcfzamiawj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucnNqeHBoYmN6Y2Z6YW1pYXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjA0OTUsImV4cCI6MjA2NTM5NjQ5NX0.R9ZtGqB1uHhKWKqffqMLH-SQFnrEpUB_gd22SUCrf6w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// POLICIES - Exemplo prático para adicionar no painel do Supabase:
//
// 1. Ative RLS em todas tabelas administrativas (produtos, banners, textos, users, etc).
// 2. Crie uma role "admin" no painel do Supabase.
// 3. Todas as operações de WRITE devem exigir authenticated() && user_has_role('admin')
// 4. Exemplo para PRODUCTS (produtos):
//
// Para select:
// CREATE POLICY "Admins can read produtos" ON produtos
//   FOR SELECT USING (auth.role() = 'admin')
//
// Para insert/update/delete:
// CREATE POLICY "Admins can modify produtos" ON produtos
//   FOR ALL USING (auth.role() = 'admin')
//
// Você pode usar extensão "pgjwt" p/ mapear claims de roles customizadas, ou controlar por tabela de usuários administradores.
// Veja docs Supabase: https://supabase.com/docs/guides/auth/row-level-security
