
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { usePublicDesign } from "@/hooks/usePublicDesign";

export default function Hero() {
  const { data: publicData, isLoading, hasSupabaseConnection } = usePublicDesign();

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-aqua to-aqua-light">
        <div className="text-white text-xl">Carregando configurações...</div>
      </section>
    );
  }

  // Log para debug
  console.log('Hero - Conexão Supabase:', hasSupabaseConnection);
  console.log('Hero - Dados:', publicData);

  return (
    <>
      {!hasSupabaseConnection && (
        <div className="bg-yellow-500 text-black text-center py-2 text-sm">
          ⚠️ Modo offline - usando configurações padrão. Configure o Supabase para personalização completa.
        </div>
      )}
      <HeroCarousel 
        slides={publicData?.slides || []}
        heroTitle={publicData?.hero_title}
        heroSubtitle={publicData?.hero_subtitle}
      />
    </>
  );
}
