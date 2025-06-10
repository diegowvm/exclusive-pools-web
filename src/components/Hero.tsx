import { Button } from '@/components/ui/button';
import HeroStats from './HeroStats';
const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop" alt="Piscina Premium" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-premium-black/70 via-premium-black/50 to-aqua/30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-aqua/20 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-aqua/30 rounded-full animate-float" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-aqua/10 rounded-full animate-float" style={{
        animationDelay: '4s'
      }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 lg:px-8">
        {/* Premium Badge */}
        <div className="inline-flex items-center bg-aqua/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-aqua rounded-full mr-3 animate-pulse"></span>
          <span className="text-white font-medium">Produtos Premium • Instalação Profissional</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in text-white">
          Transforme Sua Área de Lazer em um
          <span className="block text-gradient-aqua bg-gradient-to-r from-aqua to-aqua-light bg-clip-text text-transparent">
            Paraíso Particular
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          Piscinas de fibra premium, spas luxuosos e equipamentos de última geração. 
          <strong className="text-aqua"> Mais de 500 projetos entregues</strong> com excelência.
        </p>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-aqua mr-2">✓</span>
            <span className="text-white">Garantia de 10 anos</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-aqua mr-2">✓</span>
            <span className="text-white">Instalação em 7 dias</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-aqua mr-2">✓</span>
            <span className="text-white">Financiamento próprio</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{
        animationDelay: '0.6s'
      }}>
          <Button onClick={() => scrollToSection('produtos')} className="gradient-aqua hover:gradient-aqua-light text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-aqua/30">
            Ver Modelos Disponíveis
          </Button>
          <Button onClick={() => scrollToSection('orcamento')} variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-premium-black font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            Calcular Meu Orçamento
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <HeroStats />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        
      </div>
    </section>;
};
export default Hero;