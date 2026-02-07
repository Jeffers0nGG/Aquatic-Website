'use client';

import { ReactNode, createContext, useContext } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item: CartItem) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id && i.size === item.size && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, item],
          };
        }),
      removeFromCart: (id: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id: string, quantity: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
      cartTotal: () => {
        const state = get();
        return state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-store',
    }
  )
);

const CartContext = createContext<typeof useCartStore | null>(null);

export function CartStore({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default CartStore;
