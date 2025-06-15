
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
  isMobile?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick, isMobile = false }) => {
  if (itemCount === 0) return null;

  return (
    <button 
      onClick={onClick}
      className="text-white hover:text-aqua transition-colors flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua rounded px-4 py-2" 
      aria-label={`Carrinho com ${itemCount} itens`}
    >
      <ShoppingCart size={20} aria-hidden="true" />
      <span>Carrinho ({itemCount})</span>
    </button>
  );
};

export default CartButton;
