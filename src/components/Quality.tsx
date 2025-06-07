
const Quality = () => {
  const qualityPoints = [
    { icon: "🏆", title: "Garantia de fábrica" },
    { icon: "💪", title: "Materiais reforçados" },
    { icon: "☀️", title: "Tecnologia anti-UV" },
    { icon: "⏰", title: "Alta durabilidade" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-premium-black mb-6">
            Produtos certificados com os mais altos padrões de qualidade.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityPoints.map((point, index) => (
            <div 
              key={index}
              className="text-center p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-lg font-semibold text-premium-black">{point.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality;
