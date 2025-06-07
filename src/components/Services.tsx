
const Services = () => {
  const services = [
    "Consultoria completa para escolha de modelo",
    "Projeto 3D do ambiente",
    "Entrega e instalação",
    "Suporte técnico e manutenção",
    "Parcelamento facilitado"
  ];

  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            Nossos <span className="text-gradient-aqua">Serviços</span>
          </h2>
          <p className="text-xl text-premium-gray max-w-3xl mx-auto">
            Oferecemos um serviço completo, desde a concepção até a manutenção da sua área de lazer
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex items-center space-x-6 p-6 mb-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 gradient-aqua rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <span className="text-lg font-medium text-premium-black">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
