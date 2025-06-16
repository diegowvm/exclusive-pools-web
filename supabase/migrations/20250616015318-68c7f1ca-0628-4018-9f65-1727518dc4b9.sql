
-- Inserir o usuário administrador fixo na tabela user_roles se não existir
-- Nota: O user_id será definido quando o usuário fizer o primeiro login
-- Por enquanto, vamos garantir que a estrutura esteja pronta

-- Primeiro, vamos verificar se precisamos atualizar a função handle_new_user para não sobrescrever admins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verificar se o email é do administrador principal
  IF NEW.email = 'administrador1' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    -- Para outros usuários, inserir como vendedor por padrão
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'vendedor');
  END IF;
  RETURN NEW;
END;
$$;

-- Criar uma função para promover um usuário específico a admin (caso já exista)
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Buscar o ID do usuário pelo email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;
  
  IF target_user_id IS NOT NULL THEN
    -- Atualizar ou inserir a role de admin
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'admin', updated_at = now();
  END IF;
END;
$$;
