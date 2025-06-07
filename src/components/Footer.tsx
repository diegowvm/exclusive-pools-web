
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-premium-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png"
                alt="Exclusive Piscinas"
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transformando sonhos em realidade há mais de 10 anos, 
              com produtos premium e atendimento excepcional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-gray-400 hover:text-aqua transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('produtos')}
                className="block text-gray-400 hover:text-aqua transition-colors"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('orcamento')}
                className="block text-gray-400 hover:text-aqua transition-colors"
              >
                Orçamento
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="block text-gray-400 hover:text-aqua transition-colors"
              >
                Contato
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/5544991512466" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-aqua transition-colors"
              >
                <span>📱</span>
                <span>(44) 99151-2466</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-aqua transition-colors">
                <span>📘</span>
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-aqua transition-colors">
                <span>📱</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Exclusive Piscinas — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
