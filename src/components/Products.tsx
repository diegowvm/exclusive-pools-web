
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  
  const products = [
    {
      title: "Piscinas de Fibra Premium",
      description: "Designs modernos e exclusivos, fabricadas com fibra de vidro de alta qualidade. Instalação rápida e acabamento perfeito.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop",
      price: "R$ 25.000",
      features: ["Fibra de alta qualidade", "10 anos garantia", "Instalação em 7 dias"],
      route: "/piscinas"
    },
    {
      title: "Banheiras & Jacuzzis",
      description: "Relaxamento absoluto com sistemas de hidromassagem avançados e design ergonômico para máximo conforto.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop",
      price: "R$ 15.000",
      features: ["Hidromassagem premium", "LED integrado", "Sistema digital"],
      route: "/banheiras"
    },
    {
      title: "Spas Luxuosos",
      description: "Experiência de spa profissional em casa, com tecnologia de aquecimento inteligente e sistema de filtragem avançado.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop",
      price: "R$ 35.000",
      features: ["Aquecimento inteligente", "6-8 pessoas", "Cromoterapia"],
      route: "/spas"
    },
    {
      title: "Equipamentos Premium",
      description: "Bombas de alta eficiência, filtros de última geração, iluminação LED e sistemas de automação completos.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=300&fit=crop",
      price: "R$ 5.000",
      features: ["Bombas eficientes", "Automação total", "LED colorido"],
      route: "/equipamentos"
    }
  ];

  const handleExplore = (route: string) => {
    navigate(route);
  };

  return (
    <section id="produtos" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-aqua/10 rounded-full px-6 py-2 mb-6">
            <span className="text-aqua font-semibold">Produtos Premium</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Soluções Completas em <span className="text-gradient-aqua">Aqua Design</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubra nossa linha completa de produtos premium, desenvolvidos com tecnologia de ponta 
            e design exclusivo para transformar sua área de lazer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                features={product.features}
                onExplore={() => handleExplore(product.route)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
