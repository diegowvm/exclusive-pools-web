
import { useState, useEffect } from 'react';

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=600&fit=crop",
      caption: "Piscina Premium Instalada"
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop",
      caption: "Spa de Luxo em Funcionamento"
    },
    {
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&h=600&fit=crop",
      caption: "Ambiente Noturno Iluminado"
    },
    {
      src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&h=600&fit=crop",
      caption: "Área de Lazer Completa"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            Projetos <span className="text-gradient-aqua">Reais</span>
          </h2>
          <p className="text-xl text-premium-gray">
            Clientes Reais | Resultados Excepcionais
          </p>
        </div>

        <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-semibold">{image.caption}</p>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImage ? 'bg-aqua' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
