
import ProductCard from './ProductCard';

const Products = () => {
  const products = [
    {
      title: "Piscinas de Fibra",
      description: "Designs modernos, resistentes e prontos para instalação rápida.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop"
    },
    {
      title: "Banheiras & Jacuzzis",
      description: "Conforto absoluto com tecnologias de hidroterapia.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop"
    },
    {
      title: "Spas Luxuosos",
      description: "Relaxe com estilo em nossos modelos exclusivos.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop"
    },
    {
      title: "Equipamentos e Acessórios",
      description: "Filtros, bombas, iluminação LED e automação para sua piscina.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&h=300&fit=crop"
    }
  ];

  const handleExplore = (productTitle: string) => {
    console.log(`Exploring: ${productTitle}`);
    // Here you would typically navigate to a product detail page or open a modal
  };

  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            Produtos em <span className="text-gradient-aqua">Destaque</span>
          </h2>
          <p className="text-xl text-premium-gray max-w-3xl mx-auto">
            Descubra nossa linha completa de produtos premium para transformar sua área de lazer
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
                onExplore={() => handleExplore(product.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
