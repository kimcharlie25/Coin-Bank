import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-8 right-8 bg-accent-teal text-white p-5 rounded-full shadow-minimal-lg hover:bg-accent-teal-dark transition-all duration-300 transform hover:scale-110 z-40 md:hidden focus-minimal group"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        <span className="absolute -top-2 -right-2 bg-primary-charcoal text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-minimal animate-scale-in">
          {itemCount}
        </span>
      </div>
    </button>
  );
};

export default FloatingCartButton;