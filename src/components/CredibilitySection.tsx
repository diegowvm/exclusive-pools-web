import { Shield, Award, Clock, MapPin, Users, Wrench } from 'lucide-react';
const CredibilitySection = () => {
  const credentials = [{
    icon: Shield,
    title: "Garantia Estendida",
    description: "10 anos de garantia em produtos de fibra",
    highlight: "Proteção Total"
  }, {
    icon: Award,
    title: "Certificação Premium",
    description: "Produtos certificados pelos melhores padrões",
    highlight: "Qualidade Garantida"
  }, {
    icon: Clock,
    title: "Instalação Rápida",
    description: "Projetos concluídos em até 7 dias úteis",
    highlight: "Agilidade Comprovada"
  }, {
    icon: MapPin,
    title: "Cobertura Regional",
    description: "Atendemos mais de 50 cidades",
    highlight: "Alcance Amplo"
  }, {
    icon: Users,
    title: "Equipe Especializada",
    description: "Profissionais com mais de 12 anos de experiência",
    highlight: "Expertise Comprovada"
  }, {
    icon: Wrench,
    title: "Suporte Completo",
    description: "Manutenção e assistência técnica vitalícia",
    highlight: "Tranquilidade Total"
  }];
  return <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="credibility-title">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center bg-aqua/10 rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-4 lg:mb-6">
            <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-aqua mr-2" aria-hidden="true" />
            <span className="text-aqua font-semibold text-sm lg:text-base">Confiança e Qualidade</span>
          </div>
          <h2 id="credibility-title" className="text-3xl lg:text-5xl font-bold text-premium-black mb-4 lg:mb-6">
            Por que Escolher a <span className="text-gradient-aqua">Exclusive Piscinas</span>
          </h2>
          <p className="text-lg lg:text-xl text-premium-gray max-w-3xl mx-auto leading-relaxed">
            Mais de uma década dedicada à excelência em projetos aquáticos, 
            com a confiança de centenas de famílias satisfeitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Nossos diferenciais">
          {credentials.map((credential, index) => {
          const IconComponent = credential.icon;
          return <div key={credential.title} style={{
            animationDelay: `${index * 0.1}s`
          }} role="listitem" className="group bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-gray-100 px-[17px]">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-aqua/10 rounded-xl flex items-center justify-center group-hover:bg-aqua group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-aqua group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-aqua/10 text-aqua text-xs font-medium rounded-full mb-2">
                        {credential.highlight}
                      </span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-premium-black mb-2 group-hover:text-aqua transition-colors duration-300">
                      {credential.title}
                    </h3>
                    <p className="text-premium-gray leading-relaxed text-sm lg:text-base">
                      {credential.description}
                    </p>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default CredibilitySection;