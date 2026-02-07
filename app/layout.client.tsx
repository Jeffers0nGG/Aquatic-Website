'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import BubbleSystem from './components/BubbleSystem';
import NavigationHeader from './components/NavigationHeader';
import Footer from './components/Footer';
import CartStore from './components/providers/CartStore';
import CustomCursor from './components/CustomCursor';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <CartStore>
      <div className="relative min-h-screen overflow-hidden">
        <BubbleSystem />
        <CustomCursor />
        <NavigationHeader />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartStore>
  );
}
