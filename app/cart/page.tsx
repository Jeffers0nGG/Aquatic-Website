'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/app/components/providers/CartStore';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCartStore();

  const shipping = cartItems.length > 0 ? 10 : 0;
  const tax = cartTotal() * 0.08;
  const total = cartTotal() + shipping + tax;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-teal-100 mb-2">
            Shopping Cart
          </h1>
          <p className="text-ocean-700">
            {cartItems.length === 0
              ? 'Your cart is empty'
              : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-serif font-bold text-teal-100 mb-2">
              Your cart is empty
            </h2>
            <p className="text-ocean-700 mb-6">
              Discover our beautiful collection and add something special to your cart.
            </p>
            <Link href="/products">
              <motion.button
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              className="lg:col-span-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((cartItem) => (
                    <motion.div
                      key={cartItem.id}
                      variants={item}
                      layout
                      className="flex gap-4 bg-ocean-700 rounded-lg p-5 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-ocean-100 rounded-lg overflow-hidden">
                        <Image
                          src={cartItem.image}
                          alt={cartItem.name}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <Link href={`/product/${cartItem.id}`}>
                          <h3 className="font-semibold text-teal-100 hover:text-teal-600 transition-colors">
                            {cartItem.name}
                          </h3>
                        </Link>
                        <div className="flex gap-4 text-xs text-ocean-600 mt-1">
                          {cartItem.color && <span>Color: {cartItem.color}</span>}
                          {cartItem.size && <span>Size: {cartItem.size}</span>}
                        </div>
                        <p className="font-semibold text-teal-100 mt-2">
                          ${cartItem.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <motion.button
                          onClick={() => removeFromCart(cartItem.id)}
                          className="text-ocean-400 hover:text-coral-500 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Remove item"
                        >
                          ✕
                        </motion.button>

                        <div className="flex items-center gap-2 border border-ocean-600 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItem.id,
                                Math.max(1, cartItem.quantity - 1)
                              )
                            }
                            className="px-2 py-1 hover:bg-ocean-100 transition"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 py-1 text-sm font-semibold">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(cartItem.id, cartItem.quantity + 1)
                            }
                            className="px-2 py-1 hover:bg-ocean-100 transition"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-semibold text-teal-100">
                          ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-ocean-50 to-teal-50 rounded-lg p-6 sticky top-32">
                <h2 className="text-xl font-serif font-bold text-teal-100 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 pb-4 border-b border-ocean-600 mb-4">
                  <div className="flex justify-between text-ocean-700">
                    <span>Subtotal</span>
                    <span>${cartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ocean-700">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ocean-700">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-teal-100">Total</span>
                  <span className="text-2xl font-bold text-teal-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link href="/checkout">
                  <motion.button
                    className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all mb-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <Link href="/products">
                  <motion.button
                    className="w-full py-3 border-2 border-teal-600 text-teal-100 font-semibold rounded-lg hover:bg-ocean-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-4 border-t border-ocean-600 text-xs text-ocean-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Free shipping over $200</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
