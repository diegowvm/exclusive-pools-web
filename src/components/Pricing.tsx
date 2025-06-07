
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const models = [
    {
      name: "Riviera 600",
      type: "Piscina de Fibra",
      price: "R$ 14.990"
    },
    {
      name: "Spa Zen Premium",
      type: "Spa com aquecedor", 
      price: "R$ 18.500"
    },
    {
      name: "Filtro Automático XP",
      type: "Equipamento",
      price: "R$ 2.199"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            Faixa de <span className="text-gradient-aqua">Preços</span>
          </h2>
          <p className="text-xl text-premium-gray">
            Preços a partir de - valores podem variar conforme personalização
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              <div className="gradient-aqua text-white p-6 lg:col-span-1">
                <h3 className="text-2xl font-bold mb-2">Modelo</h3>
              </div>
              <div className="gradient-aqua text-white p-6 lg:col-span-1">
                <h3 className="text-2xl font-bold mb-2">Tipo</h3>
              </div>
              <div className="gradient-aqua text-white p-6 lg:col-span-1">
                <h3 className="text-2xl font-bold mb-2">Preço Inicial</h3>
              </div>
            </div>
            
            {models.map((model, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-100">
                <div className="p-6">
                  <span className="font-semibold text-premium-black">{model.name}</span>
                </div>
                <div className="p-6">
                  <span className="text-premium-gray">{model.type}</span>
                </div>
                <div className="p-6">
                  <span className="text-2xl font-bold text-aqua">{model.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => scrollToSection('orcamento')}
              className="gradient-aqua hover:gradient-aqua-light text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            >
              Simular Orçamento Personalizado
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
