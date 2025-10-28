import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, CreditCard } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const orderDetails = `
🛒 Coinbank ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Coin bank! 
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/61581085479475?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && contactNumber;

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-background-white">
        <div className="container-minimal py-8">
          <div className="flex items-center mb-12">
          <button
            onClick={onBack}
              className="flex items-center space-x-3 text-secondary-silver-dark hover:text-primary-charcoal transition-colors duration-200 group"
          >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Cart</span>
          </button>
            <h1 className="text-4xl font-display font-semibold text-primary-charcoal ml-8">Order Details</h1>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
            <div className="card-elevated p-8">
              <h2 className="text-2xl font-display font-semibold text-primary-charcoal mb-8">Order Summary</h2>
            
              <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 divider-minimal">
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-primary-charcoal mb-1">{item.name}</h4>
                    {item.selectedVariation && (
                        <p className="text-sm text-secondary-silver-dark mb-1">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <p className="text-sm text-secondary-silver-dark mb-1">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                      <p className="text-sm text-secondary-silver-dark">₱{item.totalPrice.toFixed(2)} x {item.quantity}</p>
                  </div>
                    <span className="font-display font-semibold text-primary-charcoal text-lg">
                      ₱{(item.totalPrice * item.quantity).toFixed(2)}
                    </span>
                </div>
              ))}
            </div>
            
              <div className="divider-minimal pt-6">
                <div className="flex items-center justify-between text-3xl font-display font-semibold text-primary-charcoal">
                <span>Total:</span>
                  <span className="text-accent-teal">₱{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
            <div className="card-elevated p-8">
              <h2 className="text-2xl font-display font-semibold text-primary-charcoal mb-8">Customer Information</h2>
            
              <form className="space-y-8">
              {/* Customer Information */}
              <div>
                  <label className="block text-sm font-semibold text-primary-charcoal mb-3">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                    className="input-minimal"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                  <label className="block text-sm font-semibold text-primary-charcoal mb-3">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                    className="input-minimal"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                  <label className="block text-sm font-semibold text-primary-charcoal mb-4">Service Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'deposit', label: 'Deposit', icon: '💰' },
                    { value: 'withdraw', label: 'Withdraw', icon: '💸' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                        className={`p-6 rounded-lg border-2 transition-all duration-200 focus-minimal ${
                        serviceType === option.value
                            ? 'border-accent-teal bg-accent-teal text-white'
                            : 'border-secondary-silver-light bg-background-white text-primary-charcoal hover:border-secondary-silver hover:bg-secondary-silver-light'
                      }`}
                    >
                        <div className="text-3xl mb-2">{option.icon}</div>
                        <div className="text-sm font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>


              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isDetailsValid
                      ? 'btn-primary'
                      : 'bg-secondary-silver-light text-secondary-silver-dark cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="min-h-screen bg-background-white">
      <div className="container-minimal py-8">
        <div className="flex items-center mb-12">
        <button
          onClick={() => setStep('details')}
            className="flex items-center space-x-3 text-secondary-silver-dark hover:text-primary-charcoal transition-colors duration-200 group"
        >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Details</span>
        </button>
          <h1 className="text-4xl font-display font-semibold text-primary-charcoal ml-8">Secure Payment</h1>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Payment Method Selection */}
          <div className="card-elevated p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="h-6 w-6 text-accent-teal" />
              <h2 className="text-2xl font-display font-semibold text-primary-charcoal">Choose Payment Method</h2>
            </div>
            
            <div className="space-y-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`w-full p-6 rounded-lg border-2 transition-all duration-200 flex items-center space-x-4 focus-minimal ${
                  paymentMethod === method.id
                      ? 'border-accent-teal bg-accent-teal text-white'
                      : 'border-secondary-silver-light bg-background-white text-primary-charcoal hover:border-secondary-silver hover:bg-secondary-silver-light'
                }`}
              >
                  <CreditCard className="h-6 w-6" />
                  <span className="font-semibold text-lg">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
              <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-lg p-6 mb-8">
                <h3 className="font-display font-semibold text-primary-charcoal mb-4">Payment Details</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                    <p className="text-sm text-secondary-silver-dark mb-1">{selectedPaymentMethod.name}</p>
                    <p className="font-mono text-primary-charcoal font-semibold text-lg">{selectedPaymentMethod.account_number}</p>
                    <p className="text-sm text-secondary-silver-dark mb-3">Account Name: {selectedPaymentMethod.account_name}</p>
                    <p className="text-2xl font-display font-semibold text-accent-teal">Amount: ₱{totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={selectedPaymentMethod.qr_code_url} 
                    alt={`${selectedPaymentMethod.name} QR Code`}
                      className="w-32 h-32 rounded-lg border-2 border-secondary-silver-light shadow-minimal"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                    <p className="text-xs text-secondary-silver-dark text-center mt-2">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

            {/* Payment Proof Notice */}
            <div className="bg-secondary-silver-light border border-secondary-silver rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-accent-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-semibold text-primary-charcoal mb-2">Payment Proof Required</h4>
                  <p className="text-sm text-secondary-silver-dark leading-relaxed">
                    After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly and securely.
                  </p>
                </div>
              </div>
          </div>
        </div>

        {/* Order Summary */}
          <div className="card-elevated p-8">
            <h2 className="text-2xl font-display font-semibold text-primary-charcoal mb-8">Final Order Summary</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-secondary-silver-light rounded-lg p-6">
                <h4 className="font-display font-semibold text-primary-charcoal mb-4">Customer Details</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-secondary-silver-dark"><span className="font-medium text-primary-charcoal">Name:</span> {customerName}</p>
                  <p className="text-secondary-silver-dark"><span className="font-medium text-primary-charcoal">Contact:</span> {contactNumber}</p>
                  <p className="text-secondary-silver-dark"><span className="font-medium text-primary-charcoal">Service:</span> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
                </div>
            </div>

            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 divider-minimal">
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-primary-charcoal mb-1">{item.name}</h4>
                  {item.selectedVariation && (
                      <p className="text-sm text-secondary-silver-dark mb-1">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-secondary-silver-dark mb-1">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                    <p className="text-sm text-secondary-silver-dark">₱{item.totalPrice.toFixed(2)} x {item.quantity}</p>
                </div>
                  <span className="font-display font-semibold text-primary-charcoal text-lg">
                    ₱{(item.totalPrice * item.quantity).toFixed(2)}
                  </span>
              </div>
            ))}
          </div>
          
            <div className="divider-minimal pt-6 mb-8">
              <div className="flex items-center justify-between text-3xl font-display font-semibold text-primary-charcoal">
              <span>Total:</span>
                <span className="text-accent-teal">₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
              className="w-full btn-primary py-4 text-lg font-semibold"
          >
            Place Order via Messenger
          </button>
          
            <p className="text-xs text-secondary-silver-dark text-center mt-4">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;