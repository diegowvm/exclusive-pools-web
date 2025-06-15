
import { useState, useEffect } from 'react';
import { DesignState } from '@/types/design';
import { defaultDesignState } from '@/constants/designDefaults';

export const useDesignStorage = () => {
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

  return {
    designState,
    updateDesign,
    saveChanges,
    hasUnsavedChanges,
    isLoading
  };
};
