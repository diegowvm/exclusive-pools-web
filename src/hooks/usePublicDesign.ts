
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

export function usePublicDesign() {
  const [data, setData] = useState<PublicDesignData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPublicData = async () => {
    try {
      const { data: settingsData } = await supabase
        .from('design_settings')
        .select('*')
        .single();

      const { data: slidesData } = await supabase
        .from('carousel_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (settingsData) {
        setData({
          ...settingsData,
          slides: slidesData?.map(slide => ({
            id: slide.id,
            src: slide.src,
            alt: slide.alt,
            title: slide.title,
          })) || [],
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados públicos:', error);
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
        () => loadPublicData()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'carousel_slides' },
        () => loadPublicData()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { data, isLoading };
}
