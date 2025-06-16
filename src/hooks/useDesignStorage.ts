
import { useState, useCallback } from 'react';
import { DesignState, DesignContextType } from '@/types/design';
import { loadDesignFromStorage, saveDesignToStorage } from '@/utils/designStorage';
import { supabase } from '@/integrations/supabase/client';

export function useDesignStorage(): DesignContextType {
  const [designState, setDesignState] = useState<DesignState>(() => loadDesignFromStorage());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateDesign = useCallback((updates: Partial<DesignState>) => {
    setDesignState(prev => {
      const newState = { ...prev, ...updates };
      saveDesignToStorage(newState);
      setHasUnsavedChanges(true);
      return newState;
    });
  }, []);

  const saveChanges = useCallback(async () => {
    setIsLoading(true);
    try {
      // Save to Supabase database
      const { error } = await supabase
        .from('design_settings')
        .upsert({
          layout: designState.layout,
          logo_url: designState.logo,
          primary_color: designState.colors.primary,
          secondary_color: designState.colors.secondary,
          accent_color: designState.colors.accent,
          hero_title: designState.content.heroTitle,
          hero_subtitle: designState.content.heroSubtitle,
          about_text: designState.content.aboutText,
          contact_phone: designState.content.contactInfo.phone,
          contact_email: designState.content.contactInfo.email,
          contact_address: designState.content.contactInfo.address,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) throw error;

      // Save carousel slides
      if (designState.carousel && designState.carousel.length > 0) {
        // Delete existing slides
        await supabase.from('carousel_slides').delete().neq('id', '');
        
        // Insert new slides
        const slidesToInsert = designState.carousel.map((slide, index) => ({
          src: slide.src,
          alt: slide.alt,
          title: slide.title,
          order_index: index,
          is_active: true
        }));

        const { error: carouselError } = await supabase
          .from('carousel_slides')
          .insert(slidesToInsert);

        if (carouselError) throw carouselError;
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [designState]);

  return {
    designState,
    updateDesign,
    saveChanges,
    hasUnsavedChanges,
    isLoading
  };
}
