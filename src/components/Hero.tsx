
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { usePublicDesign } from "@/hooks/usePublicDesign";

export default function Hero() {
  const { data: publicData, isLoading } = usePublicDesign();

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-aqua to-aqua-light">
        <div className="text-white text-xl">Carregando...</div>
      </section>
    );
  }

  return (
    <HeroCarousel 
      slides={publicData?.slides || []}
      heroTitle={publicData?.hero_title}
      heroSubtitle={publicData?.hero_subtitle}
    />
  );
}
