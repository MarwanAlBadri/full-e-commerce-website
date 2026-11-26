import { WishlistContext } from "../context/wishlistContext";
import { useRequiredContext } from "./useRequiredContext";

export const useWishlist = () => useRequiredContext(WishlistContext, "useWishlist");
