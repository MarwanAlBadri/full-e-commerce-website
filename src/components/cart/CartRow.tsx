import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { useCart } from "../../hooks/useCart";
import type { CartLine } from "../../types/cart";
import { formatPrice } from "../../utils/format";
import ProductPhoto from "../ui/ProductPhoto";
import QuantityInput from "../ui/QuantityInput";

/** Column layout shared with the table heading on the cart page. */
export const cartColumns = "md:grid-cols-[minmax(0,2fr)_1fr_1fr_auto]";

function Cell({ label, children }: { label: string; children: string }) {
    return (
        <p className="flex justify-between text-mid">
            {/* The headings are hidden on small screens, so each value carries its own. */}
            <span className="text-text-black/60 md:sr-only">{label}</span>
            {children}
        </p>
    );
}

export default function CartRow({ line }: { line: CartLine }) {
    const { product, quantity, total } = line;
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <li
            data-testid={TEST_IDS.cartItem}
            className={`grid items-center gap-4 rounded px-4 py-6 shadow-[0_1px_13px_rgba(0,0,0,0.08)] md:px-10 ${cartColumns}`}
        >
            <div className="flex min-w-0 items-center gap-5">
                <div className="relative flex size-16 shrink-0 items-center justify-center">
                    <ProductPhoto image={product.images[0]} alt="" scale={0.3} />
                    <button
                        type="button"
                        data-testid={TEST_IDS.removeFromCart}
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeFromCart(product.id)}
                        className="absolute -top-1 -left-1 flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary text-[12px] leading-none text-white"
                    >
                        ✕
                    </button>
                </div>
                <Link to={ROUTES.product(product.id)} className="min-w-0 hover:text-primary">
                    {product.name}
                </Link>
            </div>
            <Cell label="Price">{formatPrice(product.price)}</Cell>
            <div className="flex items-center justify-between">
                <span className="text-text-black/60 md:sr-only">Quantity</span>
                <QuantityInput
                    value={quantity}
                    onChange={(value) => updateQuantity(product.id, value)}
                    label={`quantity of ${product.name}`}
                />
            </div>
            <div className="md:w-24 md:text-right">
                <Cell label="Subtotal">{formatPrice(total)}</Cell>
            </div>
        </li>
    );
}
