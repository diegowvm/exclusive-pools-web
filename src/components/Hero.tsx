
import React from "react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";
import { useDesign } from "@/contexts/DesignContext";

export default function Hero() {
  const { designState } = useDesign();

  return (
    <HeroCarousel slides={designState.carousel} />
  );
}
