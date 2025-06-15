
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
