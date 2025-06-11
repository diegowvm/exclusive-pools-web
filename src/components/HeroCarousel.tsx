import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    {
      src: '/lovable-uploads/1c9c9a9b-e89e-414a-a55a-986149a73981.jpeg',
      alt: 'Piscina de fibra com deck de madeira e área de lazer'
    },
    {
      src: '/lovable-uploads/69619897-f139-444a-a98e-c9f959593eb5.jpeg',
      alt: 'Ambiente moderno com piscina e iluminação noturna'
    },
    {
      src: '/lovable-uploads/4994135a-8ca9-448a-8945-848999a1c8ff.jpeg',
      alt: 'Piscina com design elegante e borda infinita'
    }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleRequestQuote = () => {
    navigate('/piscinas');
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-premium-black">
      {/* Carousel Container */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transforme Seu Espaço com{' '}
            <span className="text-gradient-aqua">Piscinas Exclusivas</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Fabricação própria, designs únicos e instalação profissional. 
            Sua piscina dos sonhos está a um clique de distância.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleRequestQuote}
              className="bg-aqua hover:bg-aqua-secondary text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg min-w-[280px]"
            >
              Solicitar Orçamento Gratuito
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-aqua scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
