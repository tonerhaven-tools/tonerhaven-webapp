import { Product } from "types/global.d.ts";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface UseCartStateProps {
  onCart: Product[];
  addCart: (product: Product) => void;
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
      },
    }),
    {
      name: "checkout-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCart;
