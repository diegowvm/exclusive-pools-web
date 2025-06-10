
const HeroStats = () => {
  const stats = [
    { number: "500+", label: "Piscinas Instaladas" },
    { number: "12", label: "Anos de Experiência" },
    { number: "98%", label: "Clientes Satisfeitos" },
    { number: "50+", label: "Cidades Atendidas" }
  ];

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center animate-fade-in"
            style={{ animationDelay: `${0.8 + index * 0.1}s` }}
          >
            <div className="text-2xl md:text-3xl font-bold text-aqua mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-premium-gray font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroStats;
