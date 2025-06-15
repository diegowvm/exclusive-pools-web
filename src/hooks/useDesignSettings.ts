
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

export interface DesignSettings {
  id: string;
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
}

export interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  title?: string;
  order_index: number;
  is_active: boolean;
}

export function useDesignSettings() {
  const [settings, setSettings] = useState<DesignSettings | null>(null);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar configurações
  const loadSettings = async () => {
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from('design_settings')
        .select('*')
        .single();

      const { data: slidesData, error: slidesError } = await supabase
        .from('carousel_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (settingsError) throw settingsError;
      if (slidesError) throw slidesError;

      setSettings(settingsData);
      setSlides(slidesData || []);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast({
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar as configurações do design.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar configurações
  const updateSettings = async (updates: Partial<DesignSettings>) => {
    if (!settings) return;

    try {
      const { data, error } = await supabase
        .from('design_settings')
        .update(updates)
        .eq('id', settings.id)
        .select()
        .single();

      if (error) throw error;

      setSettings(data);
      toast({
        title: "Configurações salvas!",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  // Adicionar slide
  const addSlide = async (slideData: Omit<CarouselSlide, 'id' | 'order_index'>) => {
    try {
      const maxOrder = Math.max(...slides.map(s => s.order_index), 0);
      
      const { data, error } = await supabase
        .from('carousel_slides')
        .insert({ ...slideData, order_index: maxOrder + 1 })
        .select()
        .single();

      if (error) throw error;

      setSlides(prev => [...prev, data]);
      toast({
        title: "Slide adicionado!",
        description: "O novo slide foi adicionado ao carrossel.",
      });
    } catch (error) {
      console.error('Erro ao adicionar slide:', error);
      toast({
        title: "Erro ao adicionar slide",
        description: "Não foi possível adicionar o slide.",
        variant: "destructive",
      });
    }
  };

  // Atualizar slide
  const updateSlide = async (id: string, updates: Partial<CarouselSlide>) => {
    try {
      const { data, error } = await supabase
        .from('carousel_slides')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSlides(prev => prev.map(slide => 
        slide.id === id ? { ...slide, ...data } : slide
      ));
    } catch (error) {
      console.error('Erro ao atualizar slide:', error);
      toast({
        title: "Erro ao atualizar slide",
        description: "Não foi possível atualizar o slide.",
        variant: "destructive",
      });
    }
  };

  // Remover slide
  const removeSlide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_slides')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setSlides(prev => prev.filter(slide => slide.id !== id));
      toast({
        title: "Slide removido!",
        description: "O slide foi removido do carrossel.",
      });
    } catch (error) {
      console.error('Erro ao remover slide:', error);
      toast({
        title: "Erro ao remover slide",
        description: "Não foi possível remover o slide.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadSettings();

    // Configurar real-time subscriptions
    const settingsSubscription = supabase
      .channel('design_settings_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'design_settings' },
        () => loadSettings()
      )
      .subscribe();

    const slidesSubscription = supabase
      .channel('carousel_slides_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'carousel_slides' },
        () => loadSettings()
      )
      .subscribe();

    return () => {
      settingsSubscription.unsubscribe();
      slidesSubscription.unsubscribe();
    };
  }, []);

  return {
    settings,
    slides,
    isLoading,
    updateSettings,
    addSlide,
    updateSlide,
    removeSlide,
  };
}
