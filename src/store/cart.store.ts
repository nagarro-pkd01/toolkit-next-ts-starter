import type { CartItem } from "@/modules/cart";

type CartState = {
  items: CartItem[];
};

export const cartStore: CartState = {
  items: [],
};
