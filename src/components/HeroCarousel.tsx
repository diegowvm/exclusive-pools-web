
import { Button } from '@/components/ui/button';
import { useCarousel } from '@/hooks/useCarousel';
import PremiumBadge from './hero/PremiumBadge';
import FeatureList from './hero/FeatureList';
import ScrollIndicator from './hero/ScrollIndicator';

const HeroCarousel = () => {
  const slides = [
    {
      id: '1',
      src: "/lovable-uploads/9fc2586d-a49a-4d5d-be6f-0394ab0a47c5.png",
      alt: "Área de lazer completa com piscina e spa integrados"
    },
    {
      id: '2',
      src: "/lovable-uploads/302da745-af18-4c81-a321-21c5113d4707.png", 
      alt: "Piscina moderna com design minimalista e paisagismo"
    },
    {
      id: '3',
      src: "/lovable-uploads/0dfd6cfa-5a40-4de1-8c86-df33cc316981.png",
      alt: "Piscina contemporânea com iluminação e deck de madeira"
    }
  ];

  const { currentSlide } = useCarousel(slides);

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
            key={slide.id}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 lg:px-8 pt-20 pb-32">
        <PremiumBadge />

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

        <FeatureList />

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in px-4" 
          style={{ animationDelay: '0.6s' }}
        >
          <Button 
            onClick={() => scrollToSection('produtos')} 
            className="gradient-aqua hover:gradient-aqua-light text-white font-bold px-6 lg:px-10 py-3 lg:py-4 rounded-full text-base lg:text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-aqua/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white min-h-[48px] w-full sm:w-auto"
            aria-label="Ver modelos de piscinas disponíveis"
          >
            Ver Modelos Disponíveis
          </Button>
          <Button 
            onClick={() => scrollToSection('orcamento')} 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-premium-black font-semibold px-6 lg:px-10 py-3 lg:py-4 rounded-full text-base lg:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white min-h-[48px] w-full sm:w-auto"
            aria-label="Calcular orçamento personalizado"
          >
            Calcular Meu Orçamento
          </Button>
        </div>
      </div>

      <ScrollIndicator targetSection="produtos" />
    </section>
  );
};

export default HeroCarousel;
