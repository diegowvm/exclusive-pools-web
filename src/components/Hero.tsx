
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-aqua-light">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-aqua/20 rounded-full animate-ripple"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-aqua/30 rounded-full animate-ripple" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-aqua/10 rounded-full animate-ripple" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 lg:px-8">
        {/* Dynamic Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 gradient-aqua rounded-full flex items-center justify-center animate-float shadow-2xl">
              <div className="w-12 h-12 bg-white rounded-full opacity-90 animate-wave"></div>
            </div>
            <div className="absolute -inset-4 gradient-aqua rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-premium-black">Exclusive</span>{' '}
          <span className="text-gradient-aqua">Piscinas</span>
        </h1>

        {/* Headline */}
        <h2 className="text-2xl lg:text-4xl font-semibold text-premium-black mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          A Sofisticação Que Sua Área de Lazer Merece
        </h2>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-premium-gray mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Piscinas de fibra premium, spas e equipamentos de alto padrão.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={() => scrollToSection('produtos')}
            className="gradient-aqua hover:gradient-aqua-light text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Ver Modelos
          </Button>
          <Button 
            onClick={() => scrollToSection('orcamento')}
            variant="outline"
            className="border-2 border-aqua text-aqua hover:gradient-aqua hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
          >
            Solicitar Orçamento
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-aqua rounded-full flex justify-center">
            <div className="w-1 h-3 bg-aqua rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
