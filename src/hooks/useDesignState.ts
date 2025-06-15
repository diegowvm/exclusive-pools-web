
import { useState, useEffect } from 'react';
import { DesignState } from '@/types/design';
import { loadDesignFromStorage } from '@/utils/designStorage';

export const useDesignState = () => {
  const [designState, setDesignState] = useState<DesignState>(loadDesignFromStorage());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const loadedState = loadDesignFromStorage();
    setDesignState(loadedState);
  }, []);

  const updateDesign = (updates: Partial<DesignState>) => {
    setDesignState(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const markAsSaved = () => {
    setHasUnsavedChanges(false);
  };

  return {
    designState,
    updateDesign,
    hasUnsavedChanges,
    markAsSaved
  };
};
