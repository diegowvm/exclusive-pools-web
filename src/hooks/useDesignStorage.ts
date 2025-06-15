
import { useDesignState } from './useDesignState';
import { useDesignSaver } from './useDesignSaver';

export const useDesignStorage = () => {
  const { designState, updateDesign, hasUnsavedChanges, markAsSaved } = useDesignState();
  const { saveChanges: saveFn, isLoading } = useDesignSaver();

  const saveChanges = async () => {
    await saveFn(designState);
    markAsSaved();
  };

  return {
    designState,
    updateDesign,
    saveChanges,
    hasUnsavedChanges,
    isLoading
  };
};
