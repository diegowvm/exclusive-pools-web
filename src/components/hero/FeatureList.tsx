
import React from 'react';

const features = [
  { text: "Garantia de 10 anos", icon: "✓" },
  { text: "Instalação em 7 dias", icon: "✓" },
  { text: "Financiamento próprio", icon: "✓" }
];

const FeatureList = () => {
  return (
    <div 
      className="flex flex-wrap justify-center gap-3 lg:gap-6 mb-8 lg:mb-12 animate-fade-in px-4" 
      style={{ animationDelay: '0.4s' }}
      role="list"
      aria-label="Principais benefícios"
    >
      {features.map((feature, index) => (
        <div 
          key={index}
          className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2" 
          role="listitem"
        >
          <span className="text-aqua mr-2" aria-hidden="true">{feature.icon}</span>
          <span className="text-white text-sm lg:text-base">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
