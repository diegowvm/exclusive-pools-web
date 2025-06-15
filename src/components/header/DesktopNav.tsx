
import React from 'react';

interface DesktopNavProps {
  onNavigate: (section: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Início', ariaLabel: 'Ir para seção inicial' },
    { id: 'produtos', label: 'Produtos', ariaLabel: 'Ir para seção de produtos' },
    { id: 'servicos', label: 'Serviços', ariaLabel: 'Ir para seção de serviços' },
    { id: 'contato', label: 'Contato', ariaLabel: 'Ir para seção de contato' }
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Menu principal">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => onNavigate(item.id)} 
          className="text-white hover:text-aqua transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-2 py-1" 
          aria-label={item.ariaLabel}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DesktopNav;
