
import { Button } from '@/components/ui/button';
import HeroStats from './HeroStats';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" role="img" aria-label="Piscina premium de fundo">
        <img 
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop&auto=format&q=80" 
          alt="" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-premium-black/80 via-premium-black/60 to-aqua/40"></div>
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

      {/* Stats Section */}
      <HeroStats />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
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

export default Hero;
