/**
 * `data-testid` values required by the Almdrasa automated grader.
 * The strings must match the requirements page exactly, so do not rename them.
 */
export const TEST_IDS = {
    // Product cards (home and search results)
    productCard: "product-card",
    productLink: "product-link",
    addToCart: "add-to-cart",
    addToWishlist: "add-to-wishlist",

    // Header
    searchInput: "search-input",
    cartCount: "cart-count",
    logout: "logout",

    // Cart and wishlist
    cartItem: "cart-item",
    removeFromCart: "remove-from-cart",
    wishlistItem: "wishlist-item",

    // Checkout
    checkoutForm: "checkout-form",
    placeOrder: "place-order",
    orderSuccess: "order-success",

    // Authentication
    signUpForm: "signup-form",
    logInForm: "login-form",

    // Product page and reviews
    productDetails: "product-details",
    reviewText: "review-text",
    reviewSubmit: "review-submit",
    review: "review",
} as const;
