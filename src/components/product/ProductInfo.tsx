import { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryIcon from "../../assets/icons/svc-delivery.svg";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { useCart } from "../../hooks/useCart";
import { useColorSelection } from "../../hooks/useColorSelection";
import { useWishlist } from "../../hooks/useWishlist";
import { cn } from "../../lib/cn";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";
import Button from "../ui/Button";
import ColorSwatches from "../ui/ColorSwatches";
import HeartIcon from "../ui/HeartIcon";
import QuantityInput from "../ui/QuantityInput";
import Stars from "../ui/Stars";

function DeliveryBox({ title, text }: { title: string; text: string }) {
    return (
        <div className="flex items-center gap-4 px-4 py-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black">
                <img src={deliveryIcon} alt="" className="size-6" />
            </span>
            <div className="flex flex-col gap-2">
                <p className="text-mid font-medium">{title}</p>
                <p className="text-[12px] leading-[18px] font-medium">{text}</p>
            </div>
        </div>
    );
}

/** Mount with `key={product.id}` so the chosen options reset between products. */
export default function ProductInfo({ product }: { product: Product }) {
    const { id, name, rating, reviewCount, price, description, colors, sizes, inStock } = product;
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, selectColor] = useColorSelection(colors);
    const [size, setSize] = useState(sizes?.[Math.floor(sizes.length / 2)]);
    const [message, setMessage] = useState("");

    const handleBuyNow = () => {
        addToCart(id, quantity);
        navigate(ROUTES.checkout);
    };

    return (
        <div className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="font-inter text-xxl font-semibold tracking-[0.72px]">{name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-small">
                    <Stars value={Math.floor(rating)} />
                    <span className="text-text-black/50">({reviewCount} Reviews)</span>
                    <span className="text-text-black/30">|</span>
                    <span className={inStock ? "text-[#00aa44]" : "text-primary"}>
                        {inStock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>
                <p className="font-inter text-xxl tracking-[0.72px]">{formatPrice(price)}</p>
                <p className="border-b border-black/50 pb-6 text-small leading-[21px]">
                    {description}
                </p>
            </div>

            {colors && (
                <div className="flex items-center gap-4">
                    <span className="font-inter text-xl">Colours:</span>
                    <ColorSwatches
                        colors={colors}
                        selected={selectedColor}
                        onSelect={selectColor}
                    />
                </div>
            )}

            {sizes && (
                <fieldset className="flex flex-wrap items-center gap-4">
                    <legend className="sr-only">Size</legend>
                    <span className="font-inter text-xl" aria-hidden="true">
                        Size:
                    </span>
                    {sizes.map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={option === size}
                            onClick={() => setSize(option)}
                            className={cn(
                                "size-8 cursor-pointer rounded border text-small font-medium",
                                option === size
                                    ? "border-primary bg-primary text-white"
                                    : "border-black/50",
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </fieldset>
            )}

            <div className="flex flex-wrap items-center gap-4">
                <QuantityInput value={quantity} onChange={setQuantity} label="quantity" />
                <Button onClick={handleBuyNow} disabled={!inStock} className="h-11 py-2.5">
                    Buy Now
                </Button>
                <Button
                    variant="outline"
                    data-testid={TEST_IDS.addToCart}
                    disabled={!inStock}
                    onClick={() => {
                        addToCart(id, quantity);
                        setMessage(`${quantity} × ${name} added to your cart.`);
                    }}
                    className="order-last h-11 w-full py-2.5"
                >
                    Add To Cart
                </Button>
                <button
                    type="button"
                    data-testid={TEST_IDS.addToWishlist}
                    aria-label="Add to wishlist"
                    aria-pressed={isInWishlist(id)}
                    onClick={() => toggleWishlist(id)}
                    className="flex size-11 cursor-pointer items-center justify-center rounded border border-black/50"
                >
                    <HeartIcon filled={isInWishlist(id)} />
                </button>
            </div>
            <p role="status" className="min-h-6 text-small text-text-black/70">
                {message}
            </p>

            <div className="divide-y divide-black/50 rounded border border-black/50">
                <DeliveryBox
                    title="Free Delivery"
                    text="Free delivery on every order in this demo store."
                />
                <DeliveryBox title="Return Delivery" text="Free 30 Days Delivery Returns." />
            </div>
        </div>
    );
}
