import { createContext } from "react";
import type { Product } from "../types/product";

export interface WishlistContextValue {
    products: Product[];
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    moveAllToCart: () => void;
}

export const WishlistContext = createContext<WishlistContextValue | null>(null);
