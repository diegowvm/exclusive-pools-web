
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Product, useCart } from '@/contexts/CartContext';
import { Download, Check, MessageCircle, Calculator, Package, Star, Shield } from 'lucide-react';
import jsPDF from 'jspdf';

interface TechItem {
  id: string;
  name: string;
  price: number;
  essential: boolean;
  description?: string;
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
    { 
      id: 'caixa-maquinas', 
      name: 'Caixa de máquinas', 
      price: 850, 
      essential: true,
      description: 'Casa de máquinas completa com proteção'
    },
    { 
      id: 'motobomba', 
      name: 'Motobomba', 
      price: 1200, 
      essential: true,
      description: 'Sistema de bombeamento de alta eficiência'
    },
    { 
      id: 'filtro', 
      name: 'Filtro', 
      price: 650, 
      essential: true,
      description: 'Sistema de filtragem avançado'
    },
    { 
      id: 'escoamento', 
      name: 'Sistema de escoamento', 
      price: 450, 
      essential: true,
      description: 'Drenagem completa e overflow'
    },
    { 
      id: 'cano-pvc', 
      name: 'Cano PVC 50mm', 
      price: 320, 
      essential: true,
      description: 'Tubulação hidráulica completa'
    },
    
    // Itens opcionais
    { 
      id: 'led-subaquatica', 
      name: 'Iluminação LED subaquática', 
      price: 890, 
      essential: false,
      description: 'Sistema RGB com controle remoto'
    },
    { 
      id: 'escada-inox', 
      name: 'Escada inox', 
      price: 750, 
      essential: false,
      description: 'Escada em aço inoxidável 304'
    },
    { 
      id: 'hidromassagem', 
      name: 'Hidromassagem', 
      price: 2200, 
      essential: false,
      description: 'Sistema de hidromassagem com 6 bocais'
    },
    { 
      id: 'cascata', 
      name: 'Cascata decorativa', 
      price: 1650, 
      essential: false,
      description: 'Cascata em aço inox com LED'
    },
    { 
      id: 'aquecedor-solar', 
      name: 'Aquecedor solar', 
      price: 3200, 
      essential: false,
      description: 'Sistema de aquecimento solar completo'
    },
    { 
      id: 'aquecedor-eletrico', 
      name: 'Aquecedor elétrico', 
      price: 2800, 
      essential: false,
      description: 'Aquecimento elétrico com termostato'
    },
    { 
      id: 'capa-termica', 
      name: 'Capa térmica', 
      price: 480, 
      essential: false,
      description: 'Capa térmica bolha para aquecimento'
    },
    { 
      id: 'sistema-cloro', 
      name: 'Sistema automatizado de cloro', 
      price: 1890, 
      essential: false,
      description: 'Dosagem automática de produtos químicos'
    }
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
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader className="border-b border-slate-700 pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-aqua to-aqua-secondary bg-clip-text text-transparent">
            Ficha Técnica Premium
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-lg">
            Configure seu projeto personalizado - {product.name}
          </DialogDescription>
        </DialogHeader>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
          {/* Product Image and Info */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-200">{product.description}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Summary */}
          <Card className="bg-gradient-to-br from-aqua/10 to-aqua-secondary/10 border-aqua/30">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calculator className="mr-3 h-6 w-6 text-aqua" />
                <h3 className="text-xl font-bold text-white">Resumo do Investimento</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-300">Produto base:</span>
                  <span className="font-semibold text-white">{formatPrice(product.price)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-300">Itens essenciais:</span>
                  <span className="font-semibold text-white">
                    {formatPrice(essentialItems.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-300">Opcionais selecionados:</span>
                  <span className="font-semibold text-white">
                    {formatPrice(calculateTotal() - product.price - essentialItems.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-gradient-to-r from-aqua/20 to-aqua-secondary/20 rounded-lg px-4 mt-4">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-aqua">{formatPrice(calculateTotal())}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <Button
                    onClick={generatePDF}
                    className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  
                  <Button
                    onClick={sendToWhatsApp}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-aqua to-aqua-secondary hover:from-aqua-secondary hover:to-aqua text-white font-bold py-3 mt-4"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Essential Items */}
        <div className="py-6">
          <div className="flex items-center mb-6">
            <Shield className="mr-3 h-6 w-6 text-green-400" />
            <h3 className="text-2xl font-bold text-white">
              Itens Essenciais Inclusos
            </h3>
            <div className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Garantia de 10 anos
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {essentialItems.map(item => (
              <Card key={item.id} className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-slate-300 mb-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-400">
                          {formatPrice(item.price)}
                        </span>
                        <Star className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Optional Items */}
        <div className="py-6 border-t border-slate-700">
          <div className="flex items-center mb-6">
            <Package className="mr-3 h-6 w-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">
              Personalize Seu Projeto
            </h3>
            <div className="ml-auto bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
              Itens Premium Opcionais
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {optionalItems.map(item => (
              <Card key={item.id} className="bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-slate-300 mb-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-400">
                          {formatPrice(item.price)}
                        </span>
                        {selectedItems.includes(item.id) && (
                          <Check className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTechSheet;
