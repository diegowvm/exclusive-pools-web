
-- Tabela para configurações de design
CREATE TABLE design_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  layout VARCHAR(50) DEFAULT 'modern',
  logo_url TEXT DEFAULT '/lovable-uploads/placeholder-logo.png',
  primary_color VARCHAR(7) DEFAULT '#00cfc1',
  secondary_color VARCHAR(7) DEFAULT '#99f6e4',
  accent_color VARCHAR(7) DEFAULT '#0891b2',
  hero_title TEXT DEFAULT 'Piscinas de Luxo e Sofisticação',
  hero_subtitle TEXT DEFAULT 'Transforme seu espaço com nossas piscinas exclusivas',
  about_text TEXT DEFAULT 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
  contact_phone VARCHAR(20) DEFAULT '(11) 99999-9999',
  contact_email VARCHAR(100) DEFAULT 'contato@piscinasdeluxo.com.br',
  contact_address VARCHAR(200) DEFAULT 'São Paulo, SP',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para slides do carrossel
CREATE TABLE carousel_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO design_settings DEFAULT VALUES;

-- Inserir slides padrão do carrossel
INSERT INTO carousel_slides (src, alt, title, order_index) VALUES 
('/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png', 'Área de lazer completa', 'Piscinas de Luxo', 1),
('/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png', 'Piscina moderna', 'Design Moderno', 2),
('/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png', 'Piscina iluminada', 'Iluminação Premium', 3);

-- Habilitar RLS
ALTER TABLE design_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_slides ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir leitura para todos
CREATE POLICY "Allow public read access on design_settings" ON design_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on carousel_slides" ON carousel_slides FOR SELECT USING (true);

-- Políticas para permitir escrita apenas para usuários autenticados
CREATE POLICY "Allow authenticated users to update design_settings" ON design_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert/update/delete carousel_slides" ON carousel_slides FOR ALL USING (auth.role() = 'authenticated');
