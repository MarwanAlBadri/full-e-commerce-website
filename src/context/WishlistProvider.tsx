import { useEffect, useState, type ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useCart } from "../hooks/useCart";
import { readJson, writeJson } from "../lib/storage";
import { getProductById } from "../services/productService";
import { WishlistContext, type WishlistContextValue } from "./wishlistContext";

const loadWishlist = () => readJson<string[]>(STORAGE_KEYS.wishlist, [], Array.isArray);

export default function WishlistProvider({ children }: { children: ReactNode }) {
    const { addToCart } = useCart();
    const [productIds, setProductIds] = useState(loadWishlist);

    useEffect(() => {
        writeJson(STORAGE_KEYS.wishlist, productIds);
    }, [productIds]);

    const products = productIds.flatMap((id) => getProductById(id) ?? []);

    const removeFromWishlist = (productId: string) =>
        setProductIds((ids) => ids.filter((id) => id !== productId));

    const value: WishlistContextValue = {
        products,
        isInWishlist: (productId) => productIds.includes(productId),
        toggleWishlist: (productId) =>
            setProductIds((ids) =>
                ids.includes(productId)
                    ? ids.filter((id) => id !== productId)
                    : [...ids, productId],
            ),
        removeFromWishlist,
        moveAllToCart: () => {
            products.forEach((product) => addToCart(product.id));
            setProductIds([]);
        },
    };

    return <WishlistContext value={value}>{children}</WishlistContext>;
}
