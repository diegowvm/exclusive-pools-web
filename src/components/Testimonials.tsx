
const Testimonials = () => {
  const testimonials = [
    {
      name: "Mariana L.",
      text: "A piscina ficou incrível! Atendimento rápido e profissional. Recomendo muito!",
      rating: 5
    },
    {
      name: "Carlos R.",
      text: "Excelente qualidade e acabamento impecável. Nossa família está adorando!",
      rating: 5
    },
    {
      name: "Ana Paula S.",
      text: "Superou nossas expectativas. O spa é um luxo que vale cada centavo.",
      rating: 5
    },
    {
      name: "Roberto M.",
      text: "Profissionais competentes e produto de primeira linha. Muito satisfeito!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            O que nossos <span className="text-gradient-aqua">clientes</span> dizem
          </h2>
          <p className="text-xl text-premium-gray">
            Depoimentos reais de clientes satisfeitos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              
              {/* Testimonial */}
              <p className="text-premium-gray mb-4 italic">
                "{testimonial.text}"
              </p>
              
              {/* Name */}
              <p className="font-semibold text-premium-black">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
