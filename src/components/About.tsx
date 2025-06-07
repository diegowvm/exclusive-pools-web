
const About = () => {
  const highlights = [
    "Mais de 10 anos de experiência",
    "Atendimento personalizado em todo o Brasil", 
    "Instalação rápida e garantida",
    "Materiais com garantia estendida"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-8">
            Sobre a <span className="text-gradient-aqua">Exclusive Piscinas</span>
          </h2>
          
          <p className="text-xl text-premium-gray mb-12 leading-relaxed">
            Há mais de uma década, transformamos sonhos em realidade, criando espaços aquáticos únicos 
            que combinam sofisticação, qualidade e funcionalidade. Nossa paixão é proporcionar momentos 
            inesquecíveis para você e sua família.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-3 h-3 gradient-aqua rounded-full flex-shrink-0"></div>
                <span className="text-lg font-medium text-premium-black">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
