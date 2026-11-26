import { CartContext } from "../context/cartContext";
import { useRequiredContext } from "./useRequiredContext";

export const useCart = () => useRequiredContext(CartContext, "useCart");
