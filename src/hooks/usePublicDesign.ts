
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface PublicDesignData {
  layout: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  slides: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
  }>;
}

const defaultData: PublicDesignData = {
  layout: 'modern',
  logo_url: '/lovable-uploads/placeholder-logo.png',
  primary_color: '#00cfc1',
  secondary_color: '#99f6e4',
  accent_color: '#0891b2',
  hero_title: 'Transforme Sua Área de Lazer em um Paraíso Particular',
  hero_subtitle: 'Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. Mais de 500 projetos entregues com excelência.',
  about_text: 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
  contact_phone: '(11) 99999-9999',
  contact_email: 'contato@piscinasdeluxo.com.br',
  contact_address: 'São Paulo, SP',
  slides: [
    {
      id: "1",
      src: "/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png",
      alt: "Área de lazer completa com piscina e spa integrados",
      title: "Piscinas de Luxo"
    },
    {
      id: "2",
      src: "/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png",
      alt: "Piscina moderna com design minimalista e paisagismo",
      title: "Design Moderno"
    },
    {
      id: "3",
      src: "/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png",
      alt: "Piscina contemporânea com iluminação e deck de madeira",
      title: "Iluminação Premium"
    }
  ]
};

export function usePublicDesign() {
  const [data, setData] = useState<PublicDesignData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSupabaseConnection, setHasSupabaseConnection] = useState(false);

  const testSupabaseConnection = async () => {
    try {
      console.log('Testando conexão com Supabase...');
      
      // Teste simples de conexão
      const { data: testData, error: testError } = await supabase
        .from('design_settings')
        .select('count')
        .limit(1)
        .single();

      if (testError) {
        console.log('Tabelas não encontradas no Supabase. Usando dados padrão.');
        console.log('Erro:', testError.message);
        setHasSupabaseConnection(false);
        return false;
      }

      console.log('Conexão com Supabase estabelecida com sucesso!');
      setHasSupabaseConnection(true);
      return true;
    } catch (error) {
      console.log('Erro de conexão com Supabase:', error);
      setHasSupabaseConnection(false);
      return false;
    }
  };

  const loadPublicData = async () => {
    try {
      setIsLoading(true);
      console.log('Tentando carregar dados do Supabase...');
      
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        console.log('Usando dados padrão devido à falta de conexão com Supabase');
        setData(defaultData);
        return;
      }

      const { data: settingsData, error: settingsError } = await supabase
        .from('design_settings')
        .select('*')
        .single();

      const { data: slidesData, error: slidesError } = await supabase
        .from('carousel_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (settingsError) {
        console.log('Erro ao carregar configurações, usando dados padrão:', settingsError);
        setData(defaultData);
      } else if (settingsData) {
        console.log('Dados carregados do Supabase:', settingsData);
        setData({
          ...settingsData,
          slides: slidesData?.map(slide => ({
            id: slide.id,
            src: slide.src,
            alt: slide.alt,
            title: slide.title,
          })) || defaultData.slides,
        });
      }
    } catch (error) {
      console.log('Erro geral ao carregar dados, usando padrão:', error);
      setData(defaultData);
      setHasSupabaseConnection(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublicData();

    // Só configura real-time se há conexão com Supabase
    let subscription: any = null;
    
    if (hasSupabaseConnection) {
      subscription = supabase
        .channel('public_design_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'design_settings' },
          () => {
            console.log('Mudança detectada em design_settings');
            loadPublicData();
          }
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'carousel_slides' },
          () => {
            console.log('Mudança detectada em carousel_slides');
            loadPublicData();
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [hasSupabaseConnection]);

  return { 
    data, 
    isLoading, 
    hasSupabaseConnection,
    retryConnection: loadPublicData 
  };
}
