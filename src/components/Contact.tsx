
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Mensagem enviada! Entraremos em contato em breve.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
            Entre em <span className="text-gradient-aqua">Contato</span>
          </h2>
          <p className="text-xl text-premium-gray">
            Vamos transformar seu sonho em realidade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="interest">Categoria de Interesse</Label>
                <Select onValueChange={(value) => handleInputChange('interest', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piscina">Piscinas de Fibra</SelectItem>
                    <SelectItem value="spa">Spas e Jacuzzis</SelectItem>
                    <SelectItem value="equipamentos">Equipamentos</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button 
                type="submit"
                className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold py-3 rounded-full text-lg transition-all duration-300"
              >
                Fale Conosco
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-premium-black mb-4">Localização & Atendimento</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-premium-black">Endereço</h4>
                  <p className="text-premium-gray">Rua das Piscinas, 123 - Centro<br />São Paulo, SP - CEP: 01234-567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-black">Horário de Atendimento</h4>
                  <p className="text-premium-gray">Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 14h</p>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-black">Contato Direto</h4>
                  <p className="text-premium-gray">WhatsApp: (11) 99999-9999<br />Email: contato@exclusivepiscinas.com.br</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-3xl flex items-center justify-center">
              <p className="text-premium-gray">Mapa do Google (integração futura)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
