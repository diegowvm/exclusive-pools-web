
import { useState, useEffect } from 'react';

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: "/lovable-uploads/85c772c5-87cf-46e9-8754-df5e4c12564a.png",
      caption: "Spa de Luxo Residencial",
      description: "Ambiente de relaxamento com hidromassagem premium e vista para a natureza"
    },
    {
      src: "/lovable-uploads/b05541d5-cae6-4279-b83b-2bb43cb0bf20.png",
      caption: "Jacuzzi Moderno Externo",
      description: "Design contemporâneo com deck de madeira e arquitetura integrada"
    },
    {
      src: "/lovable-uploads/b7e0abd6-a821-4e1a-b37e-f89a33d545a7.png",
      caption: "Spa Premium com Vista",
      description: "Hidromassagem sofisticada com acabamentos em mármore e vista panorâmica"
    },
    {
      src: "/lovable-uploads/1e1e9cf4-3211-48c5-a591-cf0039b0f5a5.png",
      caption: "Ambiente Tropical de Spa",
      description: "Experiência única de relaxamento com jardim integrado e design natural"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center bg-aqua/10 rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-4 lg:mb-6">
            <span className="text-aqua font-semibold text-sm lg:text-base">Galeria Premium</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-premium-black mb-4 lg:mb-6">
            Projetos <span className="text-gradient-aqua bg-gradient-to-r from-aqua to-aqua-light bg-clip-text text-transparent">Exclusivos</span>
          </h2>
          <p className="text-lg lg:text-xl text-premium-gray max-w-3xl mx-auto leading-relaxed">
            Descubra ambientes únicos criados para proporcionar experiências extraordinárias de relaxamento e bem-estar
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
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
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-white">
                  <div className="max-w-4xl">
                    <h3 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 leading-tight">
                      {image.caption}
                    </h3>
                    <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
              aria-label="Imagem anterior"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
              aria-label="Próxima imagem"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-aqua/10 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-premium-black mb-2 lg:mb-3">Design Exclusivo</h3>
              <p className="text-premium-gray text-sm lg:text-base leading-relaxed">Projetos únicos desenvolvidos especialmente para cada cliente</p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-aqua/10 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-premium-black mb-2 lg:mb-3">Qualidade Premium</h3>
              <p className="text-premium-gray text-sm lg:text-base leading-relaxed">Materiais e equipamentos de última geração com garantia estendida</p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-aqua/10 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-premium-black mb-2 lg:mb-3">Instalação Rápida</h3>
              <p className="text-premium-gray text-sm lg:text-base leading-relaxed">Processo otimizado com entrega em até 7 dias úteis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
