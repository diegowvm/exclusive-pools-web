
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-premium-black text-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-10 left-10 w-32 h-32 bg-aqua rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-aqua rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png"
                  alt="Exclusive Piscinas"
                  className="h-10 lg:h-12 w-auto filter brightness-0 invert"
                  loading="lazy"
                />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base max-w-md">
                Transformando sonhos em realidade há mais de 12 anos, 
                com produtos premium e atendimento excepcional em toda região.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-aqua" aria-hidden="true">📍</span>
                  <span className="text-sm lg:text-base">Atendemos 50+ cidades</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-aqua" aria-hidden="true">⭐</span>
                  <span className="text-sm lg:text-base">98% de satisfação</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg lg:text-xl font-semibold mb-6 text-white">Navegação</h4>
              <nav className="space-y-3" role="navigation" aria-label="Links do rodapé">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block text-gray-400 hover:text-aqua transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1 text-sm lg:text-base"
                  aria-label="Ir para seção inicial"
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection('produtos')}
                  className="block text-gray-400 hover:text-aqua transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1 text-sm lg:text-base"
                  aria-label="Ir para seção de produtos"
                >
                  Produtos
                </button>
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="block text-gray-400 hover:text-aqua transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1 text-sm lg:text-base"
                  aria-label="Ir para seção de serviços"
                >
                  Serviços
                </button>
                <button 
                  onClick={() => scrollToSection('orcamento')}
                  className="block text-gray-400 hover:text-aqua transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1 text-sm lg:text-base"
                  aria-label="Ir para seção de orçamento"
                >
                  Orçamento
                </button>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="block text-gray-400 hover:text-aqua transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1 text-sm lg:text-base"
                  aria-label="Ir para seção de contato"
                >
                  Contato
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg lg:text-xl font-semibold mb-6 text-white">Contato</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/5544991512466" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-aqua transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1"
                  aria-label="Entrar em contato via WhatsApp"
                >
                  <span className="text-green-400 group-hover:scale-110 transition-transform" aria-hidden="true">📱</span>
                  <span className="text-sm lg:text-base">(44) 99151-2466</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 text-gray-400 hover:text-aqua transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1"
                  aria-label="Seguir no Facebook"
                >
                  <span className="text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true">📘</span>
                  <span className="text-sm lg:text-base">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 text-gray-400 hover:text-aqua transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded p-1"
                  aria-label="Seguir no Instagram"
                >
                  <span className="text-pink-400 group-hover:scale-110 transition-transform" aria-hidden="true">📷</span>
                  <span className="text-sm lg:text-base">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-sm lg:text-base text-center lg:text-left">
                © 2025 Exclusive Piscinas — Todos os direitos reservados.
              </p>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-aqua transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-3 py-2"
                aria-label="Voltar ao topo da página"
              >
                <span className="text-sm lg:text-base">Voltar ao topo</span>
                <ArrowUp 
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" 
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
