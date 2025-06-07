
import { Product } from '@/contexts/CartContext';

export const products: Record<string, Product[]> = {
  piscinas: [
    {
      id: 'piscina-riviera-600',
      name: 'Piscina Riviera 600',
      description: 'Piscina de fibra premium com 6m de comprimento, ideal para famílias.',
      price: 14990,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      category: 'piscinas'
    },
    {
      id: 'piscina-monaco-800',
      name: 'Piscina Monaco 800',
      description: 'Modelo espaçoso de 8m com design elegante e moderno.',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      category: 'piscinas'
    },
    {
      id: 'piscina-capri-450',
      name: 'Piscina Capri 450',
      description: 'Compacta e perfeita para espaços menores, sem abrir mão do luxo.',
      price: 12900,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop',
      category: 'piscinas'
    },
    {
      id: 'piscina-infinity-1000',
      name: 'Piscina Infinity 1000',
      description: 'Piscina premium de 10m com borda infinita para máximo luxo.',
      price: 25900,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=300&fit=crop',
      category: 'piscinas'
    }
  ],
  banheiras: [
    {
      id: 'banheira-zen-premium',
      name: 'Banheira Zen Premium',
      description: 'Banheira de hidromassagem com 12 jatos e aquecimento.',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      category: 'banheiras'
    },
    {
      id: 'banheira-luxury-duo',
      name: 'Banheira Luxury Duo',
      description: 'Modelo para casal com sistema de cromoterapia integrado.',
      price: 11200,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop',
      category: 'banheiras'
    },
    {
      id: 'banheira-compact-spa',
      name: 'Banheira Compact Spa',
      description: 'Versão compacta ideal para banheiros menores.',
      price: 6900,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      category: 'banheiras'
    }
  ],
  spas: [
    {
      id: 'spa-royal-8-pessoas',
      name: 'Spa Royal 8 Pessoas',
      description: 'Spa luxuoso para até 8 pessoas com aquecimento automático.',
      price: 22500,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=300&fit=crop',
      category: 'spas'
    },
    {
      id: 'spa-elite-4-pessoas',
      name: 'Spa Elite 4 Pessoas',
      description: 'Modelo intermediário perfeito para relaxamento familiar.',
      price: 16800,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop',
      category: 'spas'
    },
    {
      id: 'spa-diamond-6-pessoas',
      name: 'Spa Diamond 6 Pessoas',
      description: 'Tecnologia avançada com 45 jatos e iluminação LED.',
      price: 19900,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      category: 'spas'
    }
  ],
  equipamentos: [
    {
      id: 'filtro-automatico-xp',
      name: 'Filtro Automático XP',
      description: 'Sistema de filtragem automática com limpeza programável.',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      category: 'equipamentos'
    },
    {
      id: 'bomba-premium-1hp',
      name: 'Bomba Premium 1HP',
      description: 'Bomba de alta eficiência para piscinas até 50m³.',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      category: 'equipamentos'
    },
    {
      id: 'aquecedor-solar-pro',
      name: 'Aquecedor Solar Pro',
      description: 'Sistema de aquecimento solar ecológico e econômico.',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop',
      category: 'equipamentos'
    },
    {
      id: 'iluminacao-led-rgb',
      name: 'Iluminação LED RGB',
      description: 'Kit completo de iluminação subaquática colorida.',
      price: 890,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=300&fit=crop',
      category: 'equipamentos'
    }
  ]
};
