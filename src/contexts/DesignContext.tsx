
import React, { createContext, useContext } from 'react';
import { useDesignSettings, DesignSettings, CarouselSlide } from '@/hooks/useDesignSettings';

export interface DesignState {
  layout: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  carousel: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
  }>;
  content: {
    heroTitle: string;
    heroSubtitle: string;
    aboutText: string;
    contactInfo: {
      phone: string;
      email: string;
      address: string;
    };
  };
}

interface DesignContextType {
  designState: DesignState;
  updateDesign: (updates: Partial<DesignState>) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  // Novos métodos para carrossel
  addSlide: (slideData: { src: string; alt: string; title?: string }) => Promise<void>;
  updateSlide: (id: string, field: string, value: string) => Promise<void>;
  removeSlide: (id: string) => Promise<void>;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const {
    settings,
    slides,
    isLoading,
    updateSettings,
    addSlide: addSlideToSupabase,
    updateSlide: updateSlideInSupabase,
    removeSlide: removeSlideFromSupabase,
  } = useDesignSettings();

  // Converter dados do Supabase para o formato esperado
  const designState: DesignState = settings ? {
    layout: settings.layout,
    logo: settings.logo_url,
    colors: {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
      accent: settings.accent_color,
    },
    carousel: slides.map(slide => ({
      id: slide.id,
      src: slide.src,
      alt: slide.alt,
      title: slide.title,
    })),
    content: {
      heroTitle: settings.hero_title,
      heroSubtitle: settings.hero_subtitle,
      aboutText: settings.about_text,
      contactInfo: {
        phone: settings.contact_phone,
        email: settings.contact_email,
        address: settings.contact_address,
      },
    },
  } : {
    layout: 'modern',
    logo: '/lovable-uploads/placeholder-logo.png',
    colors: { primary: '#00cfc1', secondary: '#99f6e4', accent: '#0891b2' },
    carousel: [],
    content: {
      heroTitle: 'Piscinas de Luxo e Sofisticação',
      heroSubtitle: 'Transforme seu espaço com nossas piscinas exclusivas',
      aboutText: 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
      contactInfo: { phone: '(11) 99999-9999', email: 'contato@piscinasdeluxo.com.br', address: 'São Paulo, SP' }
    }
  };

  const updateDesign = async (updates: Partial<DesignState>) => {
    if (!settings) return;

    const supabaseUpdates: Partial<DesignSettings> = {};
    
    if (updates.layout) supabaseUpdates.layout = updates.layout;
    if (updates.logo) supabaseUpdates.logo_url = updates.logo;
    if (updates.colors?.primary) supabaseUpdates.primary_color = updates.colors.primary;
    if (updates.colors?.secondary) supabaseUpdates.secondary_color = updates.colors.secondary;
    if (updates.colors?.accent) supabaseUpdates.accent_color = updates.colors.accent;
    if (updates.content?.heroTitle) supabaseUpdates.hero_title = updates.content.heroTitle;
    if (updates.content?.heroSubtitle) supabaseUpdates.hero_subtitle = updates.content.heroSubtitle;
    if (updates.content?.aboutText) supabaseUpdates.about_text = updates.content.aboutText;
    if (updates.content?.contactInfo?.phone) supabaseUpdates.contact_phone = updates.content.contactInfo.phone;
    if (updates.content?.contactInfo?.email) supabaseUpdates.contact_email = updates.content.contactInfo.email;
    if (updates.content?.contactInfo?.address) supabaseUpdates.contact_address = updates.content.contactInfo.address;

    await updateSettings(supabaseUpdates);
  };

  const saveChanges = async () => {
    // As alterações já são salvas automaticamente através do updateDesign
    return Promise.resolve();
  };

  const addSlide = async (slideData: { src: string; alt: string; title?: string }) => {
    await addSlideToSupabase({
      src: slideData.src,
      alt: slideData.alt,
      title: slideData.title,
      is_active: true,
    });
  };

  const updateSlide = async (id: string, field: string, value: string) => {
    const updates: Partial<CarouselSlide> = { [field]: value };
    await updateSlideInSupabase(id, updates);
  };

  const removeSlide = async (id: string) => {
    await removeSlideFromSupabase(id);
  };

  return (
    <DesignContext.Provider value={{
      designState,
      updateDesign,
      saveChanges,
      hasUnsavedChanges: false, // Sempre salvo automaticamente
      isLoading,
      addSlide,
      updateSlide,
      removeSlide,
    }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesign deve ser usado dentro de um DesignProvider');
  }
  return context;
}
