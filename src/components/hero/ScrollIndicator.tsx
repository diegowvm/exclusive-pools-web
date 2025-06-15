
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetSection: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetSection }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block z-20">
      <button
        onClick={() => scrollToSection(targetSection)}
        className="text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-2"
        aria-label="Rolar para próxima seção"
      >
        <ChevronDown size={32} aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollIndicator;
