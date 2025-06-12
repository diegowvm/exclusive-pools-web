
const HeroStats = () => {
  const stats = [
    { number: "500+", label: "Piscinas Instaladas", description: "Projetos concluídos com sucesso" },
    { number: "12", label: "Anos de Experiência", description: "Tradição no mercado" },
    { number: "98%", label: "Clientes Satisfeitos", description: "Índice de satisfação" },
    { number: "50+", label: "Cidades Atendidas", description: "Alcance regional" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative -mt-32 z-20 w-full max-w-5xl mx-auto px-4 mb-8">
      <div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8"
        role="region"
        aria-label="Estatísticas da empresa"
      >
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 text-center animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            role="article"
            aria-labelledby={`stat-${index}-number`}
            aria-describedby={`stat-${index}-label`}
          >
            <div 
              id={`stat-${index}-number`}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-aqua mb-1"
              aria-label={`${stat.number} ${stat.description}`}
            >
              {stat.number}
            </div>
            <div 
              id={`stat-${index}-label`}
              className="text-xs sm:text-sm lg:text-sm text-premium-gray font-medium leading-tight"
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Botão Solicitar Orçamento movido para cá */}
      <div className="text-center">
        <button
          onClick={() => scrollToSection('produtos')}
          className="gradient-aqua hover:gradient-aqua-light text-white font-bold text-lg px-8 py-4 rounded-full shadow-large hover:shadow-aqua transition-all duration-300 hover:scale-105"
        >
          Solicitar Orçamento Gratuito
        </button>
      </div>
    </div>
  );
};

export default HeroStats;
