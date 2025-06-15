
import { useState, useEffect } from 'react';

interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export const useCarousel = (slides: CarouselSlide[], interval: number = 4000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide
  };
};
