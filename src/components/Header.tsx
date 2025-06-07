
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png"
              alt="Exclusive Piscinas"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-premium-gray hover:text-aqua transition-colors font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('produtos')}
              className="text-premium-gray hover:text-aqua transition-colors font-medium"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-premium-gray hover:text-aqua transition-colors font-medium"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-premium-gray hover:text-aqua transition-colors font-medium"
            >
              Contato
            </button>
          </nav>

          {/* CTA Button with Cart Info */}
          <div className="hidden md:flex items-center space-x-4">
            {getItemCount() > 0 && (
              <button
                onClick={() => navigateToPage('/orcamento')}
                className="relative text-premium-gray hover:text-aqua transition-colors"
              >
                Carrinho ({getItemCount()})
              </button>
            )}
            <Button 
              onClick={() => scrollToSection('orcamento')}
              className="gradient-aqua hover:gradient-aqua-light text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center items-center space-y-1"
          >
            <span className={`w-6 h-0.5 bg-premium-gray transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-premium-gray transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-premium-gray transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-premium-gray hover:text-aqua transition-colors font-medium text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('produtos')}
                className="text-premium-gray hover:text-aqua transition-colors font-medium text-left"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-premium-gray hover:text-aqua transition-colors font-medium text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-premium-gray hover:text-aqua transition-colors font-medium text-left"
              >
                Contato
              </button>
              {getItemCount() > 0 && (
                <button
                  onClick={() => navigateToPage('/orcamento')}
                  className="text-premium-gray hover:text-aqua transition-colors font-medium text-left"
                >
                  Carrinho ({getItemCount()})
                </button>
              )}
              <Button 
                onClick={() => scrollToSection('orcamento')}
                className="gradient-aqua text-white font-semibold w-full rounded-full"
              >
                Solicitar Orçamento
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
