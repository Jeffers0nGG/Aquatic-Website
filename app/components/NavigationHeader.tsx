'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from './providers/CartStore';

const NavigationHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollRef = useRef(0);
  const { cartItems } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScrollRef.current;

      if (currentScroll < 100) {
        setIsVisible(true);
      } else if (isScrollingDown && currentScroll > lastScrollRef.current + 20) {
        setIsVisible(false);
      } else if (!isScrollingDown && currentScroll < lastScrollRef.current - 20) {
        setIsVisible(true);
      }

      lastScrollRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 border-b border-ocean-100"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-ocean-900 flex items-center gap-2 hover:text-teal-600 transition-colors"
            >
              <span className="text-3xl">🌊</span>
              Aqua Luxe
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-ocean-700 hover:text-teal-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-ocean-700 hover:text-teal-600 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-ocean-700 hover:text-teal-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-ocean-700 hover:text-teal-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="relative p-2 text-ocean-700 hover:text-teal-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-ocean-700 hover:text-teal-600 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden mt-4 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm font-medium text-ocean-700 hover:text-teal-600 hover:bg-ocean-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block px-4 py-2 text-sm font-medium text-ocean-700 hover:text-teal-600 hover:bg-ocean-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm font-medium text-ocean-700 hover:text-teal-600 hover:bg-ocean-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm font-medium text-ocean-700 hover:text-teal-600 hover:bg-ocean-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default NavigationHeader;
