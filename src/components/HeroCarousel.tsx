
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: "/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png",
      alt: "Área de lazer completa com piscina e spa integrados"
    },
    {
      src: "/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png", 
      alt: "Piscina moderna com design minimalista e paisagismo"
    },
    {
      src: "/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png",
      alt: "Piscina contemporânea com iluminação e deck de madeira"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Carousel Background Images */}
      <div className="absolute inset-0" role="img" aria-label="Carousel de piscinas premium">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
      </div>

      {/* Floating Elements - Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-24 lg:w-32 h-24 lg:h-32 bg-aqua/20 rounded-full animate-float"></div>
        <div 
          className="absolute top-1/2 right-1/4 w-20 lg:w-24 h-20 lg:h-24 bg-aqua/30 rounded-full animate-float" 
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/2 w-28 lg:w-40 h-28 lg:h-40 bg-aqua/10 rounded-full animate-float" 
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 lg:px-8 pt-20 pb-32">
        {/* Premium Badge */}
        <div className="inline-flex items-center bg-aqua/20 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-6 lg:mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-aqua rounded-full mr-3 animate-pulse" aria-hidden="true"></span>
          <span className="text-white font-medium text-sm lg:text-base">Produtos Premium • Instalação Profissional</span>
        </div>

        {/* Main Headline */}
        <h1 
          id="hero-title"
          className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 animate-fade-in text-white leading-tight"
        >
          Transforme Sua Área de Lazer em um
          <span className="block text-gradient-aqua bg-gradient-to-r from-aqua to-aqua-light bg-clip-text text-transparent mt-2">
            Paraíso Particular
          </span>
        </h1>

        {/* Subheadline */}
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 lg:mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in px-4" 
          style={{ animationDelay: '0.2s' }}
        >
          Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. 
          <strong className="text-aqua"> Mais de 500 projetos entregues</strong> com excelência.
        </p>

        {/* Features List */}
        <div 
          className="flex flex-wrap justify-center gap-3 lg:gap-6 mb-8 lg:mb-12 animate-fade-in px-4" 
          style={{ animationDelay: '0.4s' }}
          role="list"
          aria-label="Principais benefícios"
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2" role="listitem">
            <span className="text-aqua mr-2" aria-hidden="true">✓</span>
            <span className="text-white text-sm lg:text-base">Garantia de 10 anos</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2" role="listitem">
            <span className="text-aqua mr-2" aria-hidden="true">✓</span>
            <span className="text-white text-sm lg:text-base">Instalação em 7 dias</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2" role="listitem">
            <span className="text-aqua mr-2" aria-hidden="true">✓</span>
            <span className="text-white text-sm lg:text-base">Financiamento próprio</span>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 lg:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-aqua scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block z-20">
        <button
          onClick={() => scrollToSection('produtos')}
          className="text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-2"
          aria-label="Rolar para próxima seção"
        >
          <ChevronDown size={32} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
