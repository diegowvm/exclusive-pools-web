
import React from 'react';

const PremiumBadge = () => {
  return (
    <div className="inline-flex items-center bg-aqua/20 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-6 lg:mb-8 animate-fade-in">
      <span className="w-2 h-2 bg-aqua rounded-full mr-3 animate-pulse" aria-hidden="true"></span>
      <span className="text-white font-medium text-sm lg:text-base">
        Produtos Premium • Instalação Profissional
      </span>
    </div>
  );
};

export default PremiumBadge;
