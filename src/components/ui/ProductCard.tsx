import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import eyeCircle from "../../assets/icons/eye-circle.svg";
import quickView from "../../assets/icons/quick-view.svg";
import star3 from "../../assets/icons/star-3.svg";
import star4 from "../../assets/icons/star-4.svg";
import star45 from "../../assets/icons/star-4-half.svg";
import star5 from "../../assets/icons/star-5.svg";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { useCart } from "../../hooks/useCart";
import { useColorSelection } from "../../hooks/useColorSelection";
import { useWishlist } from "../../hooks/useWishlist";
import { cn } from "../../lib/cn";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";
import ColorSwatches from "./ColorSwatches";
import HeartIcon from "./HeartIcon";
import ProductPhoto from "./ProductPhoto";

const starImages = { 3: star3, 4: star4, 4.5: star45, 5: star5 };
const ADDED_FEEDBACK_MS = 1200;

interface ProductCardProps {
    product: Product;
    /** `inline` puts the price and the rating on one row (used by "Explore Our Products"). */
    layout?: "stacked" | "inline";
    /** `wishlist` swaps the heart for a remove button and keeps "Add To Cart" visible. */
    variant?: "default" | "wishlist";
    className?: string;
}

function AddToCartButton({ productId, pinned }: { productId: string; pinned: boolean }) {
    const { addToCart } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
        if (!justAdded) return;
        const id = setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
        return () => clearTimeout(id);
    }, [justAdded]);

    return (
        <button
            type="button"
            data-testid={TEST_IDS.addToCart}
            onClick={() => {
                addToCart(productId);
                setJustAdded(true);
            }}
            className={cn(
                "absolute inset-x-0 bottom-0 z-10 h-[41px] cursor-pointer rounded-b bg-black text-mid leading-6 font-medium text-white transition-opacity",
                // Revealed on hover or focus; always visible on touch screens.
                !pinned &&
                    "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100",
            )}
        >
            {justAdded ? "Added ✓" : "Add To Cart"}
        </button>
    );
}

export default function ProductCard({
    product,
    layout = "stacked",
    variant = "default",
    className,
}: ProductCardProps) {
    const { id, name, price, oldPrice, discountPercent, rating, reviewCount, isNew, colors } =
        product;
    const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist();
    const isWishlistCard = variant === "wishlist";
    const isSaved = isInWishlist(id);
    const productPath = ROUTES.product(id);
    const [selectedColor, selectColor] = useColorSelection(colors);

    const ratingRow = (
        <div className="flex items-start gap-2">
            <img
                src={starImages[rating]}
                alt={`${rating} out of 5 stars`}
                className="h-5 w-[100px]"
            />
            <span className="text-small leading-[21px] font-semibold text-text-black/50">
                ({reviewCount})
            </span>
        </div>
    );

    return (
        <article
            data-testid={isWishlistCard ? TEST_IDS.wishlistItem : TEST_IDS.productCard}
            className={cn("flex min-w-0 flex-col gap-4", className)}
        >
            <div className="group relative h-[250px] overflow-clip rounded bg-secondary">
                {discountPercent ? (
                    <span className="absolute top-3 left-3 z-10 rounded bg-primary px-3 py-1 text-[12px] leading-[18px] text-heading-white">
                        -{discountPercent}%
                    </span>
                ) : null}
                {isNew && (
                    <span className="absolute top-3 left-3 z-10 rounded bg-green px-3 py-1 text-[12px] leading-[18px] text-black">
                        NEW
                    </span>
                )}

                {/* The name below is the accessible link; this one only widens the click area. */}
                <Link
                    to={productPath}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <ProductPhoto image={product.images[0]} alt="" />
                </Link>

                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    {isWishlistCard ? (
                        <button
                            type="button"
                            aria-label={`Remove ${name} from wishlist`}
                            onClick={() => removeFromWishlist(id)}
                            className="flex size-[34px] cursor-pointer items-center justify-center rounded-full bg-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="size-5 fill-none stroke-black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="button"
                            data-testid={TEST_IDS.addToWishlist}
                            aria-label={`Add ${name} to wishlist`}
                            aria-pressed={isSaved}
                            onClick={() => toggleWishlist(id)}
                            className="cursor-pointer"
                        >
                            <HeartIcon filled={isSaved} />
                        </button>
                    )}
                    <Link
                        to={productPath}
                        aria-label={`View ${name}`}
                        className="relative block size-[34px]"
                    >
                        <img src={eyeCircle} alt="" className="absolute inset-0 size-full" />
                        <span className="absolute inset-[14.71%] overflow-clip">
                            <span className="absolute inset-[20.83%_9.95%]">
                                <span className="absolute inset-[-5.36%_-3.9%]">
                                    <img
                                        src={quickView}
                                        alt=""
                                        className="block size-full max-w-none"
                                    />
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>

                <AddToCartButton productId={id} pinned={isWishlistCard} />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-mid leading-6 font-medium text-text-black">
                    <Link
                        to={productPath}
                        data-testid={TEST_IDS.productLink}
                        className="hover:text-primary"
                    >
                        {name}
                    </Link>
                </h3>
                {layout === "inline" ? (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-mid leading-6 font-medium text-primary">
                            {formatPrice(price)}
                        </span>
                        {ratingRow}
                    </div>
                ) : (
                    <>
                        <div className="flex gap-3 text-mid leading-6 font-medium">
                            <span className="text-primary">{formatPrice(price)}</span>
                            {oldPrice && (
                                <span className="text-text-black/50 line-through">
                                    {formatPrice(oldPrice)}
                                </span>
                            )}
                        </div>
                        {ratingRow}
                    </>
                )}
                {colors && layout === "inline" && (
                    <ColorSwatches
                        colors={colors}
                        selected={selectedColor}
                        onSelect={selectColor}
                    />
                )}
            </div>
        </article>
    );
}
