
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { items, getTotalPrice, updateQuantity, removeFromCart, getItemCount } = useCart();
  const navigate = useNavigate();

  if (getItemCount() === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-premium-black">
              Produtos Selecionados ({getItemCount()})
            </h3>
          </div>
          
          <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-2 mb-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-aqua">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate('/orcamento')}
            className="w-full gradient-aqua hover:gradient-aqua-light text-white font-semibold rounded-full"
          >
            Finalizar Orçamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartSummary;
