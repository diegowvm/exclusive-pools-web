
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

export interface DesignContextType {
  designState: DesignState;
  updateDesign: (updates: Partial<DesignState>) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}
