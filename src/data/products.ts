
import { Product } from '@/contexts/CartContext';

export const products = {
  piscinas: [
    {
      id: '1',
      name: 'Piscina Premium Ocean Blue',
      description: 'Piscina de fibra premium com acabamento especial em gel coat azul oceano. Ideal para áreas residenciais de alto padrão.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '2',
      name: 'Piscina Elegance Crystal',
      description: 'Design minimalista com bordas infinitas e sistema de cascata integrado. Perfeita para projetos modernos.',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '3',
      name: 'Piscina Family Comfort',
      description: 'Piscina familiar com área rasa para crianças e banco integrado. Segurança e diversão em um só lugar.',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '4',
      name: 'Piscina Sport Pro',
      description: 'Piscina esportiva para natação com 25 metros de comprimento. Ideal para atletas e entusiastas.',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '5',
      name: 'Piscina Resort Deluxe',
      description: 'Piscina com formato orgânico e deck de madeira integrado. Experiência de resort em casa.',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1574618307088-38ac6ac42ad9?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '6',
      name: 'Piscina Compact City',
      description: 'Solução perfeita para espaços reduzidos sem abrir mão da qualidade e design sofisticado.',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1571953032194-c4c3f9ec6305?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '7',
      name: 'Piscina Infinity Edge',
      description: 'Piscina com borda infinita que cria um efeito visual deslumbrante. Para terrenos inclinados.',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1584302179602-e4cdd6b581ab?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '8',
      name: 'Piscina Kids Paradise',
      description: 'Piscina infantil com jogos aquáticos integrados e sistema de segurança avançado.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1566043430235-cb128cb87d7c?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '9',
      name: 'Piscina Zen Garden',
      description: 'Design inspirado na filosofia zen com elementos naturais e iluminação suave.',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    },
    {
      id: '10',
      name: 'Piscina Executive Premium',
      description: 'Piscina executiva com acabamento em mármore e sistema de automação completo.',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&h=300&fit=crop',
      category: 'piscinas' as const
    }
  ],
  banheiras: [
    {
      id: '11',
      name: 'Banheira Spa Relax Premium',
      description: 'Banheira de hidromassagem com 12 jatos terapêuticos e sistema de cromoterapia integrado.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '12',
      name: 'Jacuzzi Elite Paradise',
      description: 'Jacuzzi para 6 pessoas com sistema de aquecimento inteligente e controle digital touchscreen.',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1562113530-57ba394c2ac8?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '13',
      name: 'Banheira Romantic Couple',
      description: 'Banheira dupla com design romântico e sistema de aromaterapia. Perfeita para casais.',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1552546618-3be9f9b2524b?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '14',
      name: 'Jacuzzi Family Fun',
      description: 'Jacuzzi familiar com área para crianças e sistema de segurança avançado.',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1618396669351-45c89881c0b2?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '15',
      name: 'Banheira Wellness Therapy',
      description: 'Banheira terapêutica com jatos direcionados para alívio de tensões musculares.',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1566053664824-e2e5cc4d1e8b?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '16',
      name: 'Jacuzzi Outdoor Adventure',
      description: 'Jacuzzi para área externa com resistência total às intempéries e isolamento térmico.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1571954347166-3c5e3b5ba2e5?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '17',
      name: 'Banheira Luxury Marble',
      description: 'Banheira esculpida em mármore natural com sistema de hidromassagem silencioso.',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '18',
      name: 'Jacuzzi Smart Tech',
      description: 'Jacuzzi com tecnologia inteligente, controle por app e sistema de purificação UV.',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '19',
      name: 'Banheira Compact Design',
      description: 'Banheira compacta com design inovador para banheiros pequenos sem perder funcionalidade.',
      price: 9000,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    },
    {
      id: '20',
      name: 'Jacuzzi VIP Platinum',
      description: 'O mais luxuoso de nossa linha, com acabamento em ouro 24k e sistema de som integrado.',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1572053542946-0db4f8e6e0a1?w=400&h=300&fit=crop',
      category: 'banheiras' as const
    }
  ],
  spas: [
    {
      id: '21',
      name: 'Spa Oasis Retreat',
      description: 'Spa residencial completo com sauna seca, sauna úmida e área de relaxamento.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '22',
      name: 'Spa Wellness Center',
      description: 'Centro de bem-estar completo com piscina térmica, ducha escocesa e sala de massagem.',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1556022442-58d7a7e17c52?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '23',
      name: 'Spa Urban Sanctuary',
      description: 'Spa urbano com design minimalista e tecnologia de ponta para relaxamento total.',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1571721200767-51d978a15715?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '24',
      name: 'Spa Himalayan Salt',
      description: 'Spa com paredes de sal do Himalaia e sistema de ionização do ar para terapia respiratória.',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '25',
      name: 'Spa Thermal Paradise',
      description: 'Spa com águas termais artificiais e sistema de mineralização controlada.',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1590716842584-5a049c6a0a7e?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '26',
      name: 'Spa Garden Zen',
      description: 'Spa ao ar livre integrado ao jardim com elementos zen e fonte de água natural.',
      price: 48000,
      image: 'https://images.unsplash.com/photo-1600002415506-dd06090d2e97?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '27',
      name: 'Spa Crystal Therapy',
      description: 'Spa com cristais terapêuticos integrados e sistema de vibração harmônica.',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1559662780-33dc2d5e4ab3?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '28',
      name: 'Spa Infinity Pool',
      description: 'Spa com piscina infinita aquecida e vista panorâmica para relaxamento máximo.',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1566572655318-da9dc942b3bb?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '29',
      name: 'Spa Aromatherapy Suite',
      description: 'Suíte de spa com sistema de aromaterapia automatizado e difusores de óleos essenciais.',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1571721200767-51d978a15715?w=400&h=300&fit=crop',
      category: 'spas' as const
    },
    {
      id: '30',
      name: 'Spa Royal Experience',
      description: 'Experiência real de spa com mordomo personalizado e serviços exclusivos 24h.',
      price: 120000,
      image: 'https://images.unsplash.com/photo-1541795083-21c24055a5e1?w=400&h=300&fit=crop',
      category: 'spas' as const
    }
  ],
  equipamentos: [
    {
      id: '31',
      name: 'Bomba Pentair SuperFlo',
      description: 'Bomba de alta eficiência energética com motor de velocidade variável e controle digital.',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '32',
      name: 'Sistema de Automação AquaLink',
      description: 'Sistema completo de automação para piscinas com controle via smartphone e IoT.',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '33',
      name: 'Filtro de Areia Premium',
      description: 'Sistema de filtração de areia com válvula multipórtia e manômetro de pressão.',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1571721224467-87ec27adcd6b?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '34',
      name: 'Aquecedor Solar Heliocol',
      description: 'Sistema de aquecimento solar ecológico com coletores de alta eficiência.',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '35',
      name: 'Iluminação LED ColorSplash',
      description: 'Sistema de iluminação LED RGB com controle de cores e efeitos especiais.',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '36',
      name: 'Clorador Salino AquaRite',
      description: 'Sistema de cloração salina que produz cloro naturalmente a partir do sal.',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1566043430235-cb128cb87d7c?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '37',
      name: 'Aspirador Robótico Dolphin',
      description: 'Robô aspirador inteligente com mapeamento 3D e limpeza programável.',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '38',
      name: 'Trocador de Calor Titanium',
      description: 'Trocador de calor em titânio resistente à corrosão para aquecimento eficiente.',
      price: 7500,
      image: 'https://images.unsplash.com/photo-1571954347166-3c5e3b5ba2e5?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '39',
      name: 'Sistema UV Ultraviolet',
      description: 'Sistema de purificação por radiação ultravioleta que elimina bactérias e vírus.',
      price: 5500,
      image: 'https://images.unsplash.com/photo-1562113530-57ba394c2ac8?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    },
    {
      id: '40',
      name: 'Capa Automática SafetyCover',
      description: 'Capa de segurança automática com motor elétrico e controle remoto.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1618396669351-45c89881c0b2?w=400&h=300&fit=crop',
      category: 'equipamentos' as const
    }
  ]
} satisfies Record<string, Product[]>;
