import type { BillingValues } from "../utils/validation";

export type PaymentMethod = "bank" | "cash";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    /** Null for guest checkouts. */
    userId: string | null;
    items: OrderItem[];
    total: number;
    paymentMethod: PaymentMethod;
    billing: BillingValues;
    createdAt: string;
}
