
import { DesignState } from '@/types/design';

export const defaultDesignState: DesignState = {
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
      title: 'Transforme Sua Área de Lazer'
    },
    {
      id: '2',
      src: '/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png',
      alt: 'Piscina moderna',
      title: 'Piscinas de Alta Qualidade'
    },
    {
      id: '3',
      src: '/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png',
      alt: 'Piscina iluminada',
      title: 'Design e Elegância'
    }
  ],
  content: {
    heroTitle: 'Transforme Sua Área de Lazer em um Paraíso Particular',
    heroSubtitle: 'Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. Mais de 500 projetos entregues com excelência.',
    aboutText: 'Há mais de 10 anos criando momentos únicos com piscinas de alta qualidade.',
    contactInfo: {
      phone: '(11) 99999-9999',
      email: 'contato@piscinasdeluxo.com.br',
      address: 'São Paulo, SP'
    }
  },
  fonts: {
    primary: 'Inter',
    secondary: 'Inter'
  }
};
