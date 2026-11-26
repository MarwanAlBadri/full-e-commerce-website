import { useEffect, useReducer, useState, type ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { readJson, writeJson } from "../lib/storage";
import { getProductById } from "../services/productService";
import type { CartItem, CartLine } from "../types/cart";
import { isValidCoupon, normalizeCoupon } from "../utils/pricing";
import { CartContext, type CartContextValue } from "./cartContext";
import { cartReducer } from "./cartReducer";

interface StoredCart {
    items: CartItem[];
    couponCode: string | null;
}

const EMPTY_CART: StoredCart = { items: [], couponCode: null };

function loadCart(): StoredCart {
    const stored = readJson<StoredCart>(STORAGE_KEYS.cart, EMPTY_CART, (value) =>
        Array.isArray((value as StoredCart | null)?.items),
    );
    // Drop entries for products that no longer exist or have a broken quantity.
    const items = stored.items.filter(
        (item) => getProductById(item.productId) && item.quantity > 0,
    );
    return { ...stored, items };
}

function toLines(items: CartItem[]): CartLine[] {
    return items.flatMap(({ productId, quantity }) => {
        const product = getProductById(productId);
        return product ? [{ product, quantity, total: product.price * quantity }] : [];
    });
}

export default function CartProvider({ children }: { children: ReactNode }) {
    const [initialCart] = useState(loadCart);
    const [items, dispatch] = useReducer(cartReducer, initialCart.items);
    const [couponCode, setCouponCode] = useState(initialCart.couponCode);

    useEffect(() => {
        writeJson(STORAGE_KEYS.cart, { items, couponCode });
    }, [items, couponCode]);

    const lines = toLines(items);

    const value: CartContextValue = {
        lines,
        itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
        subtotal: lines.reduce((sum, line) => sum + line.total, 0),
        couponCode,
        addToCart: (productId, quantity = 1) => dispatch({ type: "add", productId, quantity }),
        updateQuantity: (productId, quantity) =>
            dispatch({ type: "setQuantity", productId, quantity }),
        removeFromCart: (productId) => dispatch({ type: "remove", productId }),
        clearCart: () => {
            dispatch({ type: "clear" });
            setCouponCode(null);
        },
        applyCoupon: (code) => {
            const isValid = isValidCoupon(code);
            if (isValid) setCouponCode(normalizeCoupon(code));
            return isValid;
        },
    };

    return <CartContext value={value}>{children}</CartContext>;
}
