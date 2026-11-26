import type { ReactNode } from "react";
import AuthProvider from "../context/AuthProvider";
import CartProvider from "../context/CartProvider";
import WishlistProvider from "../context/WishlistProvider";

/** The wishlist uses the cart ("Move All To Bag"), so it must sit inside `CartProvider`. */
export default function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}
