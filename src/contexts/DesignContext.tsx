
import React, { createContext, useContext } from 'react';
import { DesignContextType } from '@/types/design';
import { useDesignStorage } from '@/hooks/useDesignStorage';

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const designStorage = useDesignStorage();

  return (
    <DesignContext.Provider value={designStorage}>
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
