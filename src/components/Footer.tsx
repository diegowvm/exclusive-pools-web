import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer className="bg-premium-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-aqua mb-4">Exclusive Piscinas</h3>
              <p className="text-gray-300 leading-relaxed">
                Transformando sonhos em realidade há mais de 12 anos. 
                Especialistas em piscinas de fibra premium, spas e equipamentos de última geração.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-aqua/10 rounded-full flex items-center justify-center hover:bg-aqua transition-all duration-300 group" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-aqua group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-aqua/10 rounded-full flex items-center justify-center hover:bg-aqua transition-all duration-300 group" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-aqua group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-aqua/10 rounded-full flex items-center justify-center hover:bg-aqua transition-all duration-300 group" aria-label="YouTube">
                <Youtube className="w-5 h-5 text-aqua group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-aqua/10 rounded-full flex items-center justify-center hover:bg-aqua transition-all duration-300 group" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-aqua group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('produtos')} className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Produtos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sobre')} className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Sobre Nós
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('servicos')} className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Serviços
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('depoimentos')} className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Depoimentos
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Produtos</h4>
            <ul className="space-y-3">
              <li>
                <a href="/piscinas" className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Piscinas de Fibra
                </a>
              </li>
              <li>
                <a href="/banheiras" className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Banheiras & Jacuzzis
                </a>
              </li>
              <li>
                <a href="/spas" className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Spas Luxuosos
                </a>
              </li>
              <li>
                <a href="/equipamentos" className="text-gray-300 hover:text-aqua transition-colors duration-200">
                  Equipamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-aqua mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Rua das Piscinas, 123<br />
                    Centro, São Paulo - SP<br />
                    CEP: 01234-567
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-aqua flex-shrink-0" />
                <p className="text-gray-300 text-sm">(44) 9 99151-2466</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-aqua flex-shrink-0" />
                <p className="text-gray-300 text-sm">contato@exclusivepiscinas.com.br</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-aqua mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Seg - Sex: 8h às 18h<br />
                    Sáb: 8h às 12h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Exclusive Piscinas. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-aqua transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-aqua transition-colors duration-200">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;