
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Product, useCart } from '@/contexts/CartContext';
import { Download, Check } from 'lucide-react';
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
    
    // Header
    doc.setFillColor(0, 207, 193); // Aqua color
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('EXCLUSIVE PISCINAS', 20, 20);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Orçamento - ${currentDate}`, 20, 45);
    
    // Product info
    doc.setFontSize(16);
    doc.text(`Produto Principal: ${product.name}`, 20, 60);
    doc.setFontSize(12);
    doc.text(`Preço: ${formatPrice(product.price)}`, 20, 70);
    
    // Items list
    doc.text('Itens Selecionados:', 20, 85);
    let yPosition = 95;
    
    getSelectedItemsData().forEach(item => {
      doc.text(`• ${item.name} - ${formatPrice(item.price)}`, 25, yPosition);
      yPosition += 8;
    });
    
    // Total
    yPosition += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL ESTIMADO: ${formatPrice(calculateTotal())}`, 20, yPosition);
    
    // Footer
    doc.setFontSize(10);
    doc.text('Exclusive Piscinas - Orçamento válido por 30 dias', 20, 280);
    doc.text('Entre em contato para mais informações', 20, 290);
    
    doc.save(`orcamento-${product.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
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
    
    const phoneNumber = '5511999999999'; // Substitua pelo número real da empresa
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    // Criar um produto customizado com os itens adicionais
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-premium-black">
            Ficha Técnica - {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Produto Principal */}
          <Card>
            <CardContent className="p-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-premium-gray mb-2">{product.description}</p>
              <p className="text-xl font-bold text-aqua">
                Preço base: {formatPrice(product.price)}
              </p>
            </CardContent>
          </Card>

          {/* Resumo do Orçamento */}
          <Card className="border-2 border-aqua">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Resumo do Orçamento</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Produto base:</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Itens adicionais:</span>
                  <span>{formatPrice(calculateTotal() - product.price)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold text-aqua">
                  <span>Total:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={generatePDF}
                  className="w-full gradient-aqua hover:gradient-aqua-light"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Orçamento PDF
                </Button>
                
                <Button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Enviar via WhatsApp
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  className="w-full gradient-aqua hover:gradient-aqua-light"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itens Essenciais */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-green-600">
            ✅ Itens Essenciais (Incluídos)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {essentialItems.map(item => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleItemToggle(item.id)}
                />
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-green-600">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Itens Opcionais */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-blue-600">
            🔧 Itens Opcionais (Personalize seu projeto)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionalItems.map(item => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleItemToggle(item.id)}
                />
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-blue-600">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTechSheet;
