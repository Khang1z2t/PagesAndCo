"use client";

import { books } from "@/data/books";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Book, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  hasHydrated: boolean;
  unavailableItemCount: number;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
}

const booksById = new Map(books.map((book) => [book.id, book]));

function coercePersistedItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }

    const quantity = "quantity" in entry && typeof entry.quantity === "number" ? entry.quantity : 0;

    if ("bookId" in entry && typeof entry.bookId === "string") {
      return [{ bookId: entry.bookId, quantity }];
    }

    if (
      "book" in entry &&
      entry.book &&
      typeof entry.book === "object" &&
      "id" in entry.book &&
      typeof entry.book.id === "string"
    ) {
      return [{ bookId: entry.book.id, quantity }];
    }

    return [];
  });
}

function getCartSnapshot(items: CartItem[]) {
  const availableItems: CartItem[] = [];
  let unavailableItemCount = 0;

  for (const item of items) {
    if (item.quantity <= 0) {
      continue;
    }

    if (booksById.has(item.bookId)) {
      availableItems.push(item);
      continue;
    }

    unavailableItemCount += 1;
  }

  return {
    items: availableItems,
    unavailableItemCount,
    totalItems: availableItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: availableItems.reduce((sum, item) => {
      const book = booksById.get(item.bookId);
      return book ? sum + book.price * item.quantity : sum;
    }, 0),
  };
}

const defaultCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  hasHydrated: false,
  unavailableItemCount: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...defaultCartState,
      addItem: (book) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.bookId === book.id);
          const items = existingItem
            ? state.items.map((item) =>
                item.bookId === book.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              )
            : [...state.items, { bookId: book.id, quantity: 1 }];

          return getCartSnapshot(items);
        }),
      removeItem: (bookId) =>
        set((state) => {
          const items = state.items.filter((item) => item.bookId !== bookId);

          return getCartSnapshot(items);
        }),
      updateQuantity: (bookId, quantity) =>
        set((state) => {
          const items = quantity <= 0
            ? state.items.filter((item) => item.bookId !== bookId)
            : state.items.map((item) =>
                item.bookId === bookId ? { ...item, quantity } : item,
              );

          return getCartSnapshot(items);
        }),
    }),
    {
      name: "pages-co-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => {
        const rawPersistedItems = persistedState && typeof persistedState === "object" && "items" in persistedState
          ? coercePersistedItems(persistedState.items)
          : currentState.items;
        const cartSnapshot = getCartSnapshot(rawPersistedItems);

        return {
          ...currentState,
          ...cartSnapshot,
          hasHydrated: true,
        };
      },
    },
  ),
);
