
import { DesignState } from '@/types/design';
import { defaultDesignState } from '@/constants/designDefaults';

export const loadDesignFromStorage = (): DesignState => {
  const savedDesign = localStorage.getItem('design-settings');
  if (savedDesign) {
    try {
      const parsed = JSON.parse(savedDesign);
      return { ...defaultDesignState, ...parsed };
    } catch (error) {
      console.error('Erro ao carregar configurações salvas:', error);
    }
  }
  return defaultDesignState;
};

export const saveDesignToStorage = (designState: DesignState): void => {
  localStorage.setItem('design-settings', JSON.stringify(designState));
};
