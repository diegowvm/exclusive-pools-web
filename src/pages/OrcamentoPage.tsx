
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const OrcamentoPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Orçamento enviado:', { formData, items, total: getTotalPrice() });
    alert('Orçamento enviado com sucesso! Entraremos em contato em breve.');
    clearCart();
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-premium-black mb-6">
              Finalizar <span className="text-gradient-aqua">Orçamento</span>
            </h1>
            <p className="text-xl text-premium-gray">
              Revise sua seleção e complete seus dados para receber o orçamento
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Resumo dos Produtos */}
            <div>
              <h2 className="text-2xl font-bold text-premium-black mb-6">
                Produtos Selecionados
              </h2>
              
              {items.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-premium-gray">
                      Nenhum produto selecionado. 
                      <a href="/piscinas" className="text-aqua hover:underline ml-1">
                        Volte às categorias
                      </a> 
                      para adicionar produtos.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-premium-black">{item.name}</h3>
                            <p className="text-sm text-premium-gray mb-2">{item.description}</p>
                            <p className="text-sm">Quantidade: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-aqua">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="border-2 border-aqua">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Estimado:</span>
                        <span className="text-aqua">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Formulário */}
            <div>
              <h2 className="text-2xl font-bold text-premium-black mb-6">
                Seus Dados
              </h2>
              
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
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
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Observações</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="mt-2"
                        placeholder="Detalhes sobre instalação, prazo, etc..."
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={items.length === 0}
                      className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold py-3 rounded-full text-lg transition-all duration-300"
                    >
                      Finalizar Solicitação de Orçamento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrcamentoPage;
