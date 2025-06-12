
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Product, useCart } from '@/contexts/CartContext';
import { Download, Check, MessageCircle, X, Star, ShoppingCart } from 'lucide-react';
import jsPDF from 'jspdf';

interface TechItem {
  id: string;
  name: string;
  price: number;
  essential: boolean;
}

interface ProductTechSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductTechSheet = ({ isOpen, onClose, product }: ProductTechSheetProps) => {
  const { addToCart } = useCart();
  
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'caixa-maquinas',
    'motobomba',
    'filtro',
    'escoamento',
    'cano-pvc'
  ]);

  const techItems: TechItem[] = [
    // Itens essenciais (pré-marcados)
    { id: 'caixa-maquinas', name: 'Caixa de máquinas', price: 850, essential: true },
    { id: 'motobomba', name: 'Motobomba', price: 1200, essential: true },
    { id: 'filtro', name: 'Filtro', price: 650, essential: true },
    { id: 'escoamento', name: 'Sistema de escoamento', price: 450, essential: true },
    { id: 'cano-pvc', name: 'Cano PVC 50mm', price: 320, essential: true },
    
    // Itens opcionais
    { id: 'led-subaquatica', name: 'Iluminação LED subaquática', price: 890, essential: false },
    { id: 'escada-inox', name: 'Escada inox', price: 750, essential: false },
    { id: 'hidromassagem', name: 'Hidromassagem', price: 2200, essential: false },
    { id: 'cascata', name: 'Cascata decorativa', price: 1650, essential: false },
    { id: 'aquecedor-solar', name: 'Aquecedor solar', price: 3200, essential: false },
    { id: 'aquecedor-eletrico', name: 'Aquecedor elétrico', price: 2800, essential: false },
    { id: 'capa-termica', name: 'Capa térmica', price: 480, essential: false },
    { id: 'sistema-cloro', name: 'Sistema automatizado de cloro', price: 1890, essential: false }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateTotal = () => {
    const itemsTotal = techItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
    return product.price + itemsTotal;
  };

  const getSelectedItemsData = () => {
    return techItems.filter(item => selectedItems.includes(item.id));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    // Header with logo
    doc.setFillColor(0, 207, 193);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo placeholder (you would need to convert the image to base64 and add it here)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EXCLUSIVE PISCINAS', 20, 25);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('ORÇAMENTO DETALHADO', 20, 55);
    doc.setFontSize(12);
    doc.text(`Data: ${currentDate}`, 150, 55);
    
    // Product info
    doc.setFontSize(14);
    doc.text(`Produto Principal: ${product.name}`, 20, 75);
    doc.setFontSize(11);
    doc.text(`Descrição: ${product.description}`, 20, 85);
    doc.text(`Preço base: ${formatPrice(product.price)}`, 20, 95);
    
    // Items list
    doc.setFontSize(12);
    doc.text('ITENS SELECIONADOS:', 20, 115);
    let yPosition = 125;
    
    // Essential items
    const essentialItems = getSelectedItemsData().filter(item => item.essential);
    if (essentialItems.length > 0) {
      doc.setFontSize(11);
      doc.text('Itens Essenciais:', 25, yPosition);
      yPosition += 10;
      
      essentialItems.forEach(item => {
        doc.text(`• ${item.name} - ${formatPrice(item.price)}`, 30, yPosition);
        yPosition += 8;
      });
      yPosition += 5;
    }
    
    // Optional items
    const optionalItems = getSelectedItemsData().filter(item => !item.essential);
    if (optionalItems.length > 0) {
      doc.setFontSize(11);
      doc.text('Itens Opcionais:', 25, yPosition);
      yPosition += 10;
      
      optionalItems.forEach(item => {
        doc.text(`• ${item.name} - ${formatPrice(item.price)}`, 30, yPosition);
        yPosition += 8;
      });
    }
    
    // Total
    yPosition += 15;
    doc.setFontSize(16);
    doc.setTextColor(0, 207, 193);
    doc.text(`TOTAL ESTIMADO: ${formatPrice(calculateTotal())}`, 20, yPosition);
    
    // Footer disclaimer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Este orçamento é uma simulação automática. Para informações finais e personalização,', 20, 260);
    doc.text('entre em contato com nossa equipe pelo WhatsApp (44) 99151-2466.', 20, 270);
    
    doc.setTextColor(0, 0, 0);
    doc.text('Exclusive Piscinas - Orçamento válido por 30 dias', 20, 285);
    
    doc.save(`orcamento-exclusive-piscinas-${product.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  const sendToWhatsApp = () => {
    const selectedItemsList = getSelectedItemsData()
      .map(item => `• ${item.name} - ${formatPrice(item.price)}`)
      .join('\n');
    
    const message = `🏊‍♀️ *ORÇAMENTO EXCLUSIVE PISCINAS*\n\n` +
      `*Produto:* ${product.name}\n` +
      `*Preço base:* ${formatPrice(product.price)}\n\n` +
      `*Itens selecionados:*\n${selectedItemsList}\n\n` +
      `*💰 TOTAL ESTIMADO: ${formatPrice(calculateTotal())}*\n\n` +
      `Gostaria de mais informações sobre este orçamento!`;
    
    const phoneNumber = '5544991512466';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    const customProduct = {
      ...product,
      price: calculateTotal(),
      name: `${product.name} (Personalizado)`,
      description: `${product.description} + ${getSelectedItemsData().length} itens adicionais`
    };
    
    addToCart(customProduct);
    onClose();
  };

  const essentialItems = techItems.filter(item => item.essential);
  const optionalItems = techItems.filter(item => !item.essential);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-white p-0 rounded-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              Ficha Técnica Detalhada
            </DialogTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>Avaliação 5.0</span>
              </div>
              <span>•</span>
              <span>Garantia 10 anos</span>
              <span>•</span>
              <span>Instalação profissional</span>
            </div>
          </DialogHeader>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Produto Principal - 2/3 da largura */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="relative h-64 lg:h-80">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <p className="text-lg opacity-90">{product.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Preço base a partir de</p>
                        <p className="text-3xl font-bold text-aqua">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Prazo de entrega</p>
                        <p className="text-lg font-semibold text-gray-800">7-15 dias úteis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Itens Essenciais */}
                <Card className="border border-green-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      Itens Essenciais (Incluídos)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {essentialItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleItemToggle(item.id)}
                            className="border-green-400 data-[state=checked]:bg-green-500"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <span className="font-bold text-green-600">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Itens Opcionais */}
                <Card className="border border-blue-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Itens Opcionais (Personalize seu projeto)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {optionalItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleItemToggle(item.id)}
                            className="border-blue-400 data-[state=checked]:bg-blue-500"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <span className="font-bold text-blue-600">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resumo do Orçamento - 1/3 da largura */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6 border-2 border-aqua shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
                      Resumo do Orçamento
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Produto base:</span>
                        <span className="font-semibold">{formatPrice(product.price)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Itens adicionais:</span>
                        <span className="font-semibold">{formatPrice(calculateTotal() - product.price)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-aqua/10 rounded-lg px-4 border-2 border-aqua/20">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-aqua">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={generatePDF}
                        className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Baixar PDF
                      </Button>
                      
                      <Button
                        onClick={sendToWhatsApp}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Falar com Vendedor
                      </Button>
                      
                      <Button
                        onClick={handleAddToCart}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Adicionar ao Carrinho
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600 text-center">
                        ✓ Orçamento válido por 30 dias<br/>
                        ✓ Garantia de 10 anos<br/>
                        ✓ Financiamento disponível
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTechSheet;
