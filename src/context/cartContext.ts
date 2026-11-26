import { createContext } from "react";
import type { CartLine } from "../types/cart";

export interface CartContextValue {
    lines: CartLine[];
    /** Total number of units, shown on the header badge. */
    itemCount: number;
    subtotal: number;
    couponCode: string | null;
    addToCart: (productId: string, quantity?: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    /** Returns false when the code is not recognised. */
    applyCoupon: (code: string) => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);
