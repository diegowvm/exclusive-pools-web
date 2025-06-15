
import { useState } from 'react';
import { DesignState } from '@/types/design';
import { saveDesignToStorage } from '@/utils/designStorage';

export const useDesignSaver = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveChanges = async (designState: DesignState): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate backend save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      saveDesignToStorage(designState);
      
      console.log('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveChanges,
    isLoading
  };
};
