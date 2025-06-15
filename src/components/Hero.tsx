import React from "react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";

import { useDesign } from "@/contexts/DesignContext";

export default function Hero() {
  const { designState } = useDesign();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-aqua-light to-white overflow-hidden">
      {/* Hero Carousel */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel slides={designState.carousel} />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen bg-gradient-to-r from-black/40 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {designState.content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in [animation-delay:0.3s]">
            {designState.content.heroSubtitle}
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center animate-fade-in [animation-delay:0.6s]">
            <Button size="lg" className="bg-aqua hover:bg-aqua-dark text-white px-8 py-3 text-lg">
              Ver Catálogo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aqua px-8 py-3 text-lg">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
