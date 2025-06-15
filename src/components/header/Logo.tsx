
import React from 'react';

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded-lg p-2 -m-2" 
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }} 
      tabIndex={0} 
      role="button" 
      aria-label="Voltar para página inicial"
    >
      <img 
        src="/lovable-uploads/f43e9895-9b6f-4461-8bc0-71a0e93f77e6.png" 
        alt="Exclusive Piscinas - Logo" 
        loading="eager" 
        className="w-[190px] h-[145px] object-contain" 
      />
    </div>
  );
};

export default Logo;
