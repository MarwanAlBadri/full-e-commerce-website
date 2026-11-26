import type { CartItem } from "../types/cart";

export const MAX_QUANTITY = 99;

export type CartAction =
    | { type: "add"; productId: string; quantity: number }
    | { type: "setQuantity"; productId: string; quantity: number }
    | { type: "remove"; productId: string }
    | { type: "clear" };

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.floor(quantity));

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "add": {
            const existing = items.find((item) => item.productId === action.productId);
            if (!existing) {
                const added = { productId: action.productId, quantity: clamp(action.quantity) };
                return [...items, added];
            }
            return items.map((item) =>
                item === existing
                    ? { ...item, quantity: clamp(item.quantity + action.quantity) }
                    : item,
            );
        }
        case "setQuantity":
            if (action.quantity < 1) {
                return items.filter((item) => item.productId !== action.productId);
            }
            return items.map((item) =>
                item.productId === action.productId
                    ? { ...item, quantity: clamp(action.quantity) }
                    : item,
            );
        case "remove":
            return items.filter((item) => item.productId !== action.productId);
        case "clear":
            return [];
    }
}
