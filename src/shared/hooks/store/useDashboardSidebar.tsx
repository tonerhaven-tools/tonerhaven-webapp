import { Product } from "types/global.d.ts";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface UseDashboardSidebarProps {
    openSidebar: () => void;
    closeSidebar: () => void;
    isOpen: boolean;
}

const useDashboardSidebar = create<UseDashboardSidebarProps>()(
    persist(
        (set, get) => ({
            isOpen: false,
            openSidebar: () => {
                set({ isOpen: true });
            },
            closeSidebar: () => {
                set({ isOpen: false });
            },
        }),
        {
            name: "dashboard-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useDashboardSidebar;
