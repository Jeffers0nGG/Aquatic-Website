'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/app/components/providers/CartStore';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartItems.length > 0 ? 10 : 0;
  const tax = cartTotal() * 0.08;
  const total = cartTotal() + shipping + tax;

  const steps: { id: CheckoutStep; label: string; icon: string }[] = [
    { id: 'shipping', label: 'Shipping', icon: '📦' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'review', label: 'Review', icon: '✓' },
    { id: 'confirmation', label: 'Confirmation', icon: '✨' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep('confirmation');
    setTimeout(() => clearCart(), 2000);
  };

  const stepIndex = steps.findIndex((s) => s.id === step);

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-3xl font-serif font-bold text-ocean-900 mb-4">
            Your cart is empty
          </h1>
          <Link href="/products">
            <motion.button
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              Back to Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    idx < stepIndex
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : idx === stepIndex
                      ? 'bg-white border-teal-500 text-teal-600'
                      : 'bg-white border-ocean-200 text-ocean-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {idx < stepIndex ? '✓' : s.icon}
                </motion.div>
                <p
                  className={`text-sm font-medium ml-2 ${
                    idx <= stepIndex ? 'text-ocean-900' : 'text-ocean-400'
                  }`}
                >
                  {s.label}
                </p>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-3 rounded transition-all ${
                      idx < stepIndex ? 'bg-teal-500' : 'bg-ocean-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg p-6 md:p-8"
                >
                  <h2 className="text-2xl font-serif font-bold text-ocean-900 mb-6">
                    Shipping Information
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setStep('payment')}
                    className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg p-6 md:p-8"
                >
                  <h2 className="text-2xl font-serif font-bold text-ocean-900 mb-6">
                    Payment Information
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="4532 1234 5678 9010"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      className="w-full px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      maxLength={19}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        maxLength={5}
                      />
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={cardData.cvc}
                        onChange={handleCardChange}
                        className="px-4 py-2 border border-ocean-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <motion.button
                      onClick={() => setStep('shipping')}
                      className="flex-1 py-3 border-2 border-ocean-300 text-ocean-900 font-semibold rounded-lg hover:bg-ocean-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={() => setStep('review')}
                      className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Review Order
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg p-6 md:p-8"
                >
                  <h2 className="text-2xl font-serif font-bold text-ocean-900 mb-6">
                    Review Your Order
                  </h2>

                  <div className="space-y-4 pb-6 border-b border-ocean-200 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-ocean-900">{item.name}</p>
                          <p className="text-sm text-ocean-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-ocean-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-ocean-700">
                      <span>Subtotal</span>
                      <span>${cartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-ocean-700">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-ocean-700">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-ocean-900 pt-2 border-t border-ocean-200">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setStep('payment')}
                      className="flex-1 py-3 border-2 border-ocean-300 text-ocean-900 font-semibold rounded-lg hover:bg-ocean-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-teal-50 to-ocean-50 rounded-lg p-6 md:p-8 text-center"
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    ✨
                  </motion.div>
                  <h2 className="text-3xl font-serif font-bold text-ocean-900 mb-2">
                    Order Confirmed!
                  </h2>
                  <p className="text-ocean-700 mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                  </p>
                  <p className="text-sm text-ocean-600 mb-6">
                    Order confirmation has been sent to {formData.email}
                  </p>
                  <Link href="/">
                    <motion.button
                      className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Back to Home
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-lg p-6 sticky top-32 shadow-elevation-2">
              <h3 className="font-serif text-xl font-bold text-ocean-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 pb-4 border-b border-ocean-200 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-ocean-900 font-medium">{item.name}</p>
                      <p className="text-ocean-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-ocean-900 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-ocean-700">
                  <span className="text-sm">Subtotal</span>
                  <span>${cartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ocean-700">
                  <span className="text-sm">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ocean-700">
                  <span className="text-sm">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-ocean-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-ocean-900">Total</span>
                  <span className="text-2xl font-bold text-teal-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
