
-- Tabela para configurações de design
CREATE TABLE IF NOT EXISTS design_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  layout VARCHAR(50) DEFAULT 'modern',
  logo_url TEXT DEFAULT '/lovable-uploads/placeholder-logo.png',
  primary_color VARCHAR(7) DEFAULT '#00cfc1',
  secondary_color VARCHAR(7) DEFAULT '#99f6e4',
  accent_color VARCHAR(7) DEFAULT '#0891b2',
  hero_title TEXT DEFAULT 'Transforme Sua Área de Lazer em um Paraíso Particular',
  hero_subtitle TEXT DEFAULT 'Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. Mais de 500 projetos entregues com excelência.',
  about_text TEXT DEFAULT 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
  contact_phone VARCHAR(20) DEFAULT '(11) 99999-9999',
  contact_email VARCHAR(100) DEFAULT 'contato@piscinasdeluxo.com.br',
  contact_address VARCHAR(200) DEFAULT 'São Paulo, SP',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para slides do carrossel
CREATE TABLE IF NOT EXISTS carousel_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão apenas se não existir
INSERT INTO design_settings (id, layout, logo_url, primary_color, secondary_color, accent_color, hero_title, hero_subtitle, about_text, contact_phone, contact_email, contact_address)
SELECT 
  gen_random_uuid(),
  'modern',
  '/lovable-uploads/placeholder-logo.png',
  '#00cfc1',
  '#99f6e4',
  '#0891b2',
  'Transforme Sua Área de Lazer em um Paraíso Particular',
  'Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. Mais de 500 projetos entregues com excelência.',
  'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
  '(11) 99999-9999',
  'contato@piscinasdeluxo.com.br',
  'São Paulo, SP'
WHERE NOT EXISTS (SELECT 1 FROM design_settings);

-- Inserir slides padrão apenas se não existir
INSERT INTO carousel_slides (src, alt, title, order_index, is_active)
SELECT * FROM (VALUES 
  ('/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png', 'Área de lazer completa com piscina e spa integrados', 'Piscinas de Luxo', 1, true),
  ('/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png', 'Piscina moderna com design minimalista e paisagismo', 'Design Moderno', 2, true),
  ('/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png', 'Piscina contemporânea com iluminação e deck de madeira', 'Iluminação Premium', 3, true)
) AS slides_data(src, alt, title, order_index, is_active)
WHERE NOT EXISTS (SELECT 1 FROM carousel_slides);

-- Habilitar RLS
ALTER TABLE design_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_slides ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir leitura para todos
DROP POLICY IF EXISTS "Allow public read access on design_settings" ON design_settings;
DROP POLICY IF EXISTS "Allow public read access on carousel_slides" ON carousel_slides;

CREATE POLICY "Allow public read access on design_settings" ON design_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on carousel_slides" ON carousel_slides FOR SELECT USING (true);

-- Políticas para permitir escrita apenas para usuários autenticados
DROP POLICY IF EXISTS "Allow authenticated users to update design_settings" ON design_settings;
DROP POLICY IF EXISTS "Allow authenticated users to insert/update/delete carousel_slides" ON carousel_slides;

CREATE POLICY "Allow authenticated users to update design_settings" ON design_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert carousel_slides" ON carousel_slides FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update carousel_slides" ON carousel_slides FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete carousel_slides" ON carousel_slides FOR DELETE USING (auth.role() = 'authenticated');
