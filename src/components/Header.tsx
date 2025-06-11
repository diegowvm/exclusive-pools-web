
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getItemCount } = useCart();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Define header style based on page and scroll
  const getHeaderStyle = () => {
    if (!isHomePage) {
      // Always visible and black on other pages
      return 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg';
    }
    // Home page: transparent until scroll
    return isScrolled 
      ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg' 
      : 'bg-transparent';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded-lg p-2 -m-2" 
            onClick={() => navigate('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Voltar para página inicial"
          >
            <img 
              src="/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png" 
              alt="Exclusive Piscinas - Logo" 
              className="w-[190px] h-[74px] object-contain" 
              loading="eager"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Menu principal">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-aqua transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-2 py-1"
              aria-label="Ir para seção inicial"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('produtos')} 
              className="text-white hover:text-aqua transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-2 py-1"
              aria-label="Ir para seção de produtos"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('servicos')} 
              className="text-white hover:text-aqua transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-2 py-1"
              aria-label="Ir para seção de serviços"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('contato')} 
              className="text-white hover:text-aqua transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-2 py-1"
              aria-label="Ir para seção de contato"
            >
              Contato
            </button>
          </nav>

          {/* Cart Info (only when items exist) */}
          <div className="hidden lg:flex items-center">
            {getItemCount() > 0 && (
              <button 
                onClick={() => navigateToPage('/orcamento')} 
                className="text-white hover:text-aqua transition-colors flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-4 py-2"
                aria-label={`Carrinho com ${getItemCount()} itens`}
              >
                <ShoppingCart size={20} aria-hidden="true" />
                <span>Carrinho ({getItemCount()})</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-aqua"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg animate-fade-in"
            role="navigation"
            aria-label="Menu mobile"
          >
            <nav className="flex flex-col p-6 space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-white hover:text-aqua transition-colors font-medium text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded"
                aria-label="Ir para seção inicial"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('produtos')} 
                className="text-white hover:text-aqua transition-colors font-medium text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded"
                aria-label="Ir para seção de produtos"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('servicos')} 
                className="text-white hover:text-aqua transition-colors font-medium text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded"
                aria-label="Ir para seção de serviços"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('contato')} 
                className="text-white hover:text-aqua transition-colors font-medium text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded"
                aria-label="Ir para seção de contato"
              >
                Contato
              </button>
              {getItemCount() > 0 && (
                <button 
                  onClick={() => navigateToPage('/orcamento')} 
                  className="text-white hover:text-aqua transition-colors font-medium text-left py-2 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded"
                  aria-label={`Carrinho com ${getItemCount()} itens`}
                >
                  <ShoppingCart size={20} aria-hidden="true" />
                  <span>Carrinho ({getItemCount()})</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
