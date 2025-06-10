
const CredibilitySection = () => {
  const certifications = [
    { title: "ISO 9001", description: "Qualidade Certificada" },
    { title: "ABNT", description: "Normas Brasileiras" },
    { title: "10 Anos", description: "Garantia Total" },
    { title: "24h", description: "Suporte Técnico" }
  ];

  const process = [
    { step: "1", title: "Visita Técnica", description: "Análise gratuita do local" },
    { step: "2", title: "Projeto 3D", description: "Visualização completa" },
    { step: "3", title: "Aprovação", description: "Ajustes e confirmação" },
    { step: "4", title: "Instalação", description: "Execução profissional" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Certifications */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-premium-black mb-6">
            Qualidade <span className="text-gradient-aqua">Garantida</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 gradient-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="font-bold text-premium-black mb-2">{cert.title}</h3>
                <p className="text-premium-gray text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-premium-black mb-12">
            Nosso Processo Profissional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {process.map((item, index) => (
              <div 
                key={item.step}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 gradient-aqua rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-premium-black mb-2">{item.title}</h4>
                  <p className="text-premium-gray text-sm text-center">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-aqua to-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
