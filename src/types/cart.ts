import type { Product } from "./product";

/** What gets stored: only the id, so prices always come from the catalogue. */
export interface CartItem {
    productId: string;
    quantity: number;
}

/** A cart item joined with its product, ready to render. */
export interface CartLine {
    product: Product;
    quantity: number;
    total: number;
}
