
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
  const [isLoading, setIsLoading] = useState(true);

  const loadPublicData = async () => {
    try {
      console.log('Tentando carregar dados do Supabase...');
      
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublicData();

    // Configurar real-time subscriptions para o frontend
    const subscription = supabase
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { data, isLoading };
}
