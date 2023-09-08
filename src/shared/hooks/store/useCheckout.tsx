import { Product } from "types/global.d.ts";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface UseCartStateProps {
  onCart: Product[];
  addCart: (product: Product) => Promise<Product>;
  removeItem: (product: Product) => Promise<Product>;
  clearCart: () => void;
}

const useCart = create<UseCartStateProps>()(
  persist(
    (set, get) => ({
      onCart: [],
      addCart: (product: Product) => {
        const tempCart = get().onCart;
        if (!tempCart.some((item) => item.id === product.id)) {
          set({ onCart: [...tempCart, product] });
        }
        return Promise.resolve(product);
      },
      removeItem: (product: Product) => {
        const tempCart = get().onCart;
        const updatedCart = tempCart.filter((item) => item.id !== product.id);
        set({ onCart: updatedCart });
        return Promise.resolve(product);
      },
      clearCart: () => {
        set({ onCart: [] });
      },
    }),
    {
      name: "checkout-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCart;
