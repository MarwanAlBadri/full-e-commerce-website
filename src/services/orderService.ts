import { SESSION_KEYS, STORAGE_KEYS } from "../constants/storageKeys";
import { readJson, removeItem, writeJson } from "../lib/storage";
import type { CartLine } from "../types/cart";
import type { Order } from "../types/order";
import type { BillingValues } from "../utils/validation";
import { getCurrentUser } from "./authService";

/** Only a signed-in user can order, and the order needs at least one product. */
export const canPlaceOrder = (userId: string | null, lines: CartLine[]) =>
    Boolean(userId) && lines.length > 0;

const readOrders = () => readJson<Order[]>(STORAGE_KEYS.orders, [], Array.isArray);

export function getOrdersByUser(userId: string): Order[] {
    return readOrders().filter((order) => order.userId === userId);
}

/**
 * Saves a demo order. No payment is taken.
 * Throws unless the order belongs to the user who is signed in right now.
 */
export function createOrder(input: Omit<Order, "id" | "createdAt">): Order {
    if (!input.userId || getCurrentUser()?.id !== input.userId) {
        throw new Error("Log in to place an order.");
    }

    const order: Order = {
        ...input,
        id: `EX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        createdAt: new Date().toISOString(),
    };
    writeJson(STORAGE_KEYS.orders, [order, ...readOrders()]);
    return order;
}

type SavedBilling = Record<string, BillingValues>;

const readAllBilling = () => readJson<SavedBilling>(STORAGE_KEYS.billing, {});

/** Saved details are kept per user, so accounts sharing a browser never see each other's. */
export function readSavedBilling(userId: string): BillingValues | null {
    return readAllBilling()[userId] ?? null;
}

export function saveBilling(userId: string, billing: BillingValues | null): void {
    const others = readAllBilling();
    delete others[userId];
    writeJson(STORAGE_KEYS.billing, billing ? { ...others, [userId]: billing } : others);
}

/** What a visitor typed before being sent to the log in page. */
const session = () => sessionStorage;

export function saveCheckoutDraft(billing: BillingValues): void {
    writeJson(SESSION_KEYS.checkoutDraft, billing, session);
}

export function readCheckoutDraft(): BillingValues | null {
    return readJson<BillingValues | null>(SESSION_KEYS.checkoutDraft, null, undefined, session);
}

export function clearCheckoutDraft(): void {
    removeItem(SESSION_KEYS.checkoutDraft, session);
}
