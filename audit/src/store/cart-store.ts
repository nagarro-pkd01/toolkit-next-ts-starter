import { create } from "zustand";

import type { CartItem } from "@/types/cart-types";

type CartState = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
