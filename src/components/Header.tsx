
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigation } from '@/hooks/useNavigation';
import { Menu, X } from 'lucide-react';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import CartButton from './header/CartButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCart();
  const { scrollToSection, navigateToPage, isHomePage } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  const handlePageNavigation = (path: string) => {
    navigateToPage(path);
    setIsOpen(false);
  };

  const getHeaderStyle = () => {
    if (!isHomePage) {
      return 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg';
    }
    return isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg' : 'bg-transparent';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo onClick={() => navigateToPage('/')} />
          
          <DesktopNav onNavigate={handleNavigation} />

          <div className="hidden lg:flex items-center">
            <CartButton 
              itemCount={getItemCount()} 
              onClick={() => handlePageNavigation('/orcamento')} 
            />
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-aqua" 
            aria-expanded={isOpen} 
            aria-controls="mobile-menu" 
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg animate-fade-in" role="navigation" aria-label="Menu mobile">
            <nav className="flex flex-col p-6 space-y-4">
              {['home', 'produtos', 'servicos', 'contato'].map((section) => (
                <button 
                  key={section}
                  onClick={() => handleNavigation(section)} 
                  className="text-white hover:text-aqua transition-colors font-medium text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded" 
                  aria-label={`Ir para seção ${section}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <CartButton 
                itemCount={getItemCount()} 
                onClick={() => handlePageNavigation('/orcamento')} 
                isMobile={true}
              />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
