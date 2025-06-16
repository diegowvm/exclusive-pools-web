
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'vendedor', 'financeiro');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'vendedor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'website',
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create financial_transactions table
CREATE TABLE public.financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'income' or 'expense'
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  order_id UUID REFERENCES public.orders(id),
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.user_roles WHERE user_roles.user_id = $1 LIMIT 1;
$$;

-- Create RLS policies
-- Admin can access everything
CREATE POLICY "Admin full access to user_roles" ON public.user_roles
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to products" ON public.products
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to customers" ON public.customers
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to orders" ON public.orders
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to order_items" ON public.order_items
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to leads" ON public.leads
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admin full access to financial_transactions" ON public.financial_transactions
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Vendedor policies (can manage products, customers, orders, leads)
CREATE POLICY "Vendedor access to products" ON public.products
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('vendedor', 'admin'));

CREATE POLICY "Vendedor access to customers" ON public.customers
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('vendedor', 'admin'));

CREATE POLICY "Vendedor access to orders" ON public.orders
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('vendedor', 'admin'));

CREATE POLICY "Vendedor access to order_items" ON public.order_items
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('vendedor', 'admin'));

CREATE POLICY "Vendedor access to leads" ON public.leads
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('vendedor', 'admin'));

-- Financeiro policies (can access customers, orders, financial data)
CREATE POLICY "Financeiro access to customers" ON public.customers
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('financeiro', 'admin'));

CREATE POLICY "Financeiro access to orders" ON public.orders
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('financeiro', 'admin'));

CREATE POLICY "Financeiro access to order_items" ON public.order_items
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('financeiro', 'admin'));

CREATE POLICY "Financeiro access to financial_transactions" ON public.financial_transactions
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('financeiro', 'admin'));

-- Insert sample data
INSERT INTO public.products (name, description, price, image_url, category) VALUES
  ('Piscina Premium 8x4m', 'Piscina de fibra premium com acabamento de luxo', 25000.00, '/lovable-uploads/b05541d5-cae6-4279-b83b-2bb43cb0bf20.png', 'piscinas'),
  ('Spa Relaxamento 4 Pessoas', 'Spa com hidromassagem para até 4 pessoas', 15000.00, '/lovable-uploads/85c772c5-87cf-46e9-8754-df5e4c12564a.png', 'spas'),
  ('Banheira Luxo Premium', 'Banheira de hidromassagem premium', 8000.00, '/lovable-uploads/9f15d66c-29f0-4f3b-8b1d-a6794b47d313.png', 'banheiras'),
  ('Sistema de Filtragem Avançado', 'Kit completo de filtragem e tratamento', 3500.00, '/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png', 'equipamentos');

INSERT INTO public.customers (name, email, phone, address, city, state) VALUES
  ('João Silva', 'joao@email.com', '(11) 99999-1111', 'Rua das Flores, 123', 'São Paulo', 'SP'),
  ('Maria Santos', 'maria@email.com', '(11) 99999-2222', 'Av. Principal, 456', 'São Paulo', 'SP'),
  ('Pedro Costa', 'pedro@email.com', '(11) 99999-3333', 'Rua do Lago, 789', 'Campinas', 'SP');

INSERT INTO public.leads (name, email, phone, message, status) VALUES
  ('Ana Oliveira', 'ana@email.com', '(11) 99999-4444', 'Interessada em piscina premium', 'new'),
  ('Carlos Pereira', 'carlos@email.com', '(11) 99999-5555', 'Preciso de orçamento para spa', 'contacted'),
  ('Julia Lima', 'julia@email.com', '(11) 99999-6666', 'Quero uma banheira de luxo', 'qualified');

-- Create trigger to automatically set user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'vendedor');
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
