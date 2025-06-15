
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  fonts: {
    primary: string;
    secondary: string;
  };
}

const defaultDesignState: DesignState = {
  layout: 'modern',
  logo: '/lovable-uploads/placeholder-logo.png',
  colors: {
    primary: '#00cfc1',
    secondary: '#99f6e4',
    accent: '#0891b2'
  },
  carousel: [
    {
      id: '1',
      src: '/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png',
      alt: 'Área de lazer completa',
      title: 'Piscinas de Luxo'
    },
    {
      id: '2',
      src: '/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png',
      alt: 'Piscina moderna',
      title: 'Design Moderno'
    },
    {
      id: '3',
      src: '/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png',
      alt: 'Piscina iluminada',
      title: 'Iluminação Premium'
    }
  ],
  content: {
    heroTitle: 'Piscinas de Luxo e Sofisticação',
    heroSubtitle: 'Transforme seu espaço com nossas piscinas exclusivas',
    aboutText: 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
    contactInfo: {
      phone: '(11) 99999-9999',
      email: 'contato@piscinasdeluxo.com.br',
      address: 'São Paulo, SP'
    }
  },
  fonts: {
    primary: 'Inter',
    secondary: 'Poppins'
  }
};

interface DesignContextType {
  designState: DesignState;
  updateDesign: (updates: Partial<DesignState>) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [designState, setDesignState] = useState<DesignState>(defaultDesignState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar dados salvos no localStorage
  useEffect(() => {
    const savedDesign = localStorage.getItem('design-settings');
    if (savedDesign) {
      try {
        const parsed = JSON.parse(savedDesign);
        setDesignState({ ...defaultDesignState, ...parsed });
      } catch (error) {
        console.error('Erro ao carregar configurações salvas:', error);
      }
    }
  }, []);

  const updateDesign = (updates: Partial<DesignState>) => {
    setDesignState(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      // Simular salvamento no backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvar no localStorage
      localStorage.setItem('design-settings', JSON.stringify(designState));
      
      setHasUnsavedChanges(false);
      console.log('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DesignContext.Provider value={{
      designState,
      updateDesign,
      saveChanges,
      hasUnsavedChanges,
      isLoading
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
