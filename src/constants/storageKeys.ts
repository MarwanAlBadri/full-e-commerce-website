/** localStorage keys, namespaced so they don't clash with other apps on the same origin. */
export const STORAGE_KEYS = {
    users: "exclusive:users",
    session: "exclusive:session",
    cart: "exclusive:cart",
    wishlist: "exclusive:wishlist",
    reviews: "exclusive:reviews",
    orders: "exclusive:orders",
    billing: "exclusive:billing",
} as const;

/** sessionStorage keys: values that only need to survive until the tab is closed. */
export const SESSION_KEYS = {
    reviewDraft: "exclusive:review-draft",
} as const;
