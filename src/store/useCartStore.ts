"use client";

import { create } from "zustand";
import type { Book, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
}

function getTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
  };
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (book) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.book.id === book.id);
      const items = existingItem
        ? state.items.map((item) =>
            item.book.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.items, { book, quantity: 1 }];

      return {
        items,
        ...getTotals(items),
      };
    }),
  removeItem: (bookId) =>
    set((state) => {
      const items = state.items.filter((item) => item.book.id !== bookId);

      return {
        items,
        ...getTotals(items),
      };
    }),
  updateQuantity: (bookId, quantity) =>
    set((state) => {
      const items = quantity <= 0
        ? state.items.filter((item) => item.book.id !== bookId)
        : state.items.map((item) =>
            item.book.id === bookId ? { ...item, quantity } : item,
          );

      return {
        items,
        ...getTotals(items),
      };
    }),
}));
