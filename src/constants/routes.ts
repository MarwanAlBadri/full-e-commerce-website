export const ROUTES = {
    home: "/",
    about: "/about",
    contact: "/contact",
    cart: "/cart",
    wishlist: "/wishlist",
    checkout: "/checkout",
    account: "/account",
    signUp: "/signup",
    logIn: "/login",
    search: "/search",
    product: (id: string) => `/product/${id}`,
} as const;

/** Path pattern the router matches; use `ROUTES.product(id)` to build links. */
export const PRODUCT_ROUTE_PATTERN = "/product/:id";
