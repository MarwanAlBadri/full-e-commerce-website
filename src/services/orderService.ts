import { STORAGE_KEYS } from "../constants/storageKeys";
import { readJson, removeItem, writeJson } from "../lib/storage";
import type { CartLine } from "../types/cart";
import type { Order } from "../types/order";
import type { BillingValues } from "../utils/validation";

/** An order needs at least one product. */
export const canPlaceOrder = (lines: CartLine[]) => lines.length > 0;

const readOrders = () => readJson<Order[]>(STORAGE_KEYS.orders, [], Array.isArray);

export function getOrdersByUser(userId: string): Order[] {
    return readOrders().filter((order) => order.userId === userId);
}

/** Saves a demo order. No payment is taken. */
export function createOrder(input: Omit<Order, "id" | "createdAt">): Order {
    const order: Order = {
        ...input,
        id: `EX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        createdAt: new Date().toISOString(),
    };
    writeJson(STORAGE_KEYS.orders, [order, ...readOrders()]);
    return order;
}

export function readSavedBilling(): BillingValues | null {
    return readJson<BillingValues | null>(STORAGE_KEYS.billing, null);
}

export function saveBilling(billing: BillingValues | null): void {
    if (billing) writeJson(STORAGE_KEYS.billing, billing);
    else removeItem(STORAGE_KEYS.billing);
}
