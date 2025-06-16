
-- Primeiro, vamos remover as políticas existentes que estão causando problemas
DROP POLICY IF EXISTS "Admin full access to products" ON public.products;
DROP POLICY IF EXISTS "Admin full access to customers" ON public.customers;
DROP POLICY IF EXISTS "Admin full access to orders" ON public.orders;
DROP POLICY IF EXISTS "Admin full access to order_items" ON public.order_items;
DROP POLICY IF EXISTS "Admin full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Admin full access to financial_transactions" ON public.financial_transactions;
DROP POLICY IF EXISTS "Admin full access to user_roles" ON public.user_roles;

-- Criar políticas mais eficientes que usam a função get_user_role existente
CREATE POLICY "Admin and vendedor access to products" ON public.products
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'vendedor')
  );

CREATE POLICY "Admin access to customers" ON public.customers
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'vendedor', 'financeiro')
  );

CREATE POLICY "Admin access to orders" ON public.orders
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'vendedor', 'financeiro')
  );

CREATE POLICY "Admin access to order_items" ON public.order_items
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'vendedor', 'financeiro')
  );

CREATE POLICY "Admin access to leads" ON public.leads
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'vendedor')
  );

CREATE POLICY "Admin access to financial_transactions" ON public.financial_transactions
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'financeiro')
  );

CREATE POLICY "Admin access to user_roles" ON public.user_roles
  FOR ALL USING (
    public.get_user_role(auth.uid()) = 'admin'
  );

-- Otimizar a função get_user_role para melhor performance
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.user_roles 
  WHERE user_roles.user_id = $1 
  LIMIT 1;
$$;

-- Criar índice para melhorar performance das consultas de role
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
