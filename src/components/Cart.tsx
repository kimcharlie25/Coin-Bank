import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background-white">
        <div className="container-minimal py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary-silver-light rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="h-12 w-12 text-secondary-silver-dark" />
            </div>
            <h2 className="text-3xl font-display font-semibold text-primary-charcoal mb-4">Your cart is empty</h2>
            <p className="text-lg text-secondary-silver-dark mb-8 leading-relaxed">
              Discover our premium selection and add some delicious items to get started.
            </p>
            <button
              onClick={onContinueShopping}
              className="btn-primary px-8 py-4 text-base"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-white">
      <div className="container-minimal py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onContinueShopping}
            className="flex items-center space-x-3 text-secondary-silver-dark hover:text-primary-charcoal transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Continue Shopping</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-display font-semibold text-primary-charcoal mb-2">Your Cart</h1>
            <p className="text-secondary-silver-dark">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          </div>
          
          <button
            onClick={clearCart}
            className="text-secondary-silver-dark hover:text-primary-charcoal transition-colors duration-200 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card-elevated overflow-hidden">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-secondary-silver-light' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <h3 className="text-xl font-display font-semibold text-primary-charcoal mb-2">{item.name}</h3>
                      
                      {item.selectedVariation && (
                        <p className="text-sm text-secondary-silver-dark mb-1">
                          Size: {item.selectedVariation.name}
                        </p>
                      )}
                      
                      {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <p className="text-sm text-secondary-silver-dark mb-2">
                          Add-ons: {item.selectedAddOns.map(addOn => 
                            addOn.quantity && addOn.quantity > 1 
                              ? `${addOn.name} x${addOn.quantity}`
                              : addOn.name
                          ).join(', ')}
                        </p>
                      )}
                      
                      <p className="text-lg font-semibold text-primary-charcoal">
                        ₱{item.totalPrice.toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 bg-secondary-silver-light rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-secondary-silver rounded-lg transition-colors duration-200 focus-minimal"
                        >
                          <Minus className="h-4 w-4 text-primary-charcoal" />
                        </button>
                        <span className="font-semibold text-primary-charcoal min-w-[40px] text-center text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-secondary-silver rounded-lg transition-colors duration-200 focus-minimal"
                        >
                          <Plus className="h-4 w-4 text-primary-charcoal" />
                        </button>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-xl font-display font-semibold text-primary-charcoal">
                          ₱{(item.totalPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-secondary-silver-dark hover:text-primary-charcoal hover:bg-secondary-silver-light rounded-lg transition-all duration-200 focus-minimal"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-elevated p-6 sticky top-24">
              <h3 className="text-2xl font-display font-semibold text-primary-charcoal mb-6">Order Summary</h3>
              
              {/* Item Breakdown */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-secondary-silver-dark">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-primary-charcoal">
                      ₱{(item.totalPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="divider-minimal py-4 mb-6">
                <div className="flex justify-between text-2xl font-display font-semibold text-primary-charcoal">
                  <span>Total:</span>
                  <span className="text-accent-teal">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={onCheckout}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-xs text-secondary-silver-dark text-center mt-4">
                Secure checkout powered by trusted payment methods
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;