/** Demo coupon codes and the share of the subtotal they take off. */
const COUPONS: Record<string, number> = { SAVE10: 0.1 };

export function normalizeCoupon(code: string): string {
    return code.trim().toUpperCase();
}

export function isValidCoupon(code: string): boolean {
    return Object.hasOwn(COUPONS, normalizeCoupon(code));
}

export interface OrderTotals {
    subtotal: number;
    discount: number;
    total: number;
}

/** Shipping is free, so the total is the subtotal minus any coupon discount. */
export function calculateTotals(subtotal: number, couponCode: string | null): OrderTotals {
    const rate = couponCode ? (COUPONS[normalizeCoupon(couponCode)] ?? 0) : 0;
    const discount = Math.round(subtotal * rate * 100) / 100;
    return { subtotal, discount, total: subtotal - discount };
}
