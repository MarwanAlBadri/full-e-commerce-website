import type { CSSProperties } from "react";
import type { Product } from "../../data/products";
import heartCircle from "../../assets/icons/heart-circle.svg";
import eyeCircle from "../../assets/icons/eye-circle.svg";
import quickView from "../../assets/icons/quick-view.svg";
import star3 from "../../assets/icons/star-3.svg";
import star4 from "../../assets/icons/star-4.svg";
import star45 from "../../assets/icons/star-4-half.svg";
import star5 from "../../assets/icons/star-5.svg";

const starImages = { 3: star3, 4: star4, 4.5: star45, 5: star5 };

interface ProductCardProps {
    product: Product;
    /** `inline` puts the price and the rating on one row (used by "Explore Our Products"). */
    layout?: "stacked" | "inline";
    className?: string;
}

export default function ProductCard({
    product,
    layout = "stacked",
    className = "",
}: ProductCardProps) {
    const { name, price, oldPrice, discount, rating, reviews, image, frame, crop, isNew, colors } =
        product;

    const cropStyle: CSSProperties | undefined = crop
        ? { width: `${crop.w}%`, height: `${crop.h}%`, left: `${crop.left}%`, top: `${crop.top}%` }
        : undefined;

    const ratingRow = (
        <div className="flex items-start gap-2">
            <img
                src={starImages[rating]}
                alt={`${rating} out of 5 stars`}
                className="h-5 w-[100px]"
            />
            <span className="text-small leading-[21px] font-semibold text-text-black/50">
                ({reviews})
            </span>
        </div>
    );

    return (
        <article className={`flex flex-col gap-4 ${className}`}>
            <div className="group relative h-[250px] overflow-clip rounded bg-secondary">
                {discount && (
                    <span className="absolute top-3 left-3 rounded bg-primary px-3 py-1 text-[12px] leading-[18px] text-heading-white">
                        -{discount}%
                    </span>
                )}
                {isNew && (
                    <span className="absolute top-3 left-3 rounded bg-green px-3 py-1 text-[12px] leading-[18px] text-heading-white">
                        NEW
                    </span>
                )}

                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="size-[34px] cursor-pointer"
                    >
                        <img src={heartCircle} alt="" className="size-full" />
                    </button>
                    <button
                        type="button"
                        aria-label="Quick view"
                        className="relative size-[34px] cursor-pointer"
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
                    </button>
                </div>

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                    style={{ width: frame[0], height: frame[1] }}
                >
                    <img
                        src={image}
                        alt={name}
                        className={crop ? "absolute max-w-none" : "size-full"}
                        style={cropStyle}
                    />
                </div>

                <button
                    type="button"
                    className="absolute inset-x-0 bottom-0 h-[41px] translate-y-full cursor-pointer rounded-b bg-black text-mid leading-6 font-medium text-white transition-transform duration-200 group-focus-within:translate-y-0 group-hover:translate-y-0"
                >
                    Add To Cart
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-mid leading-6 font-medium text-text-black">{name}</h3>
                {layout === "inline" ? (
                    <div className="flex items-center gap-2">
                        <span className="text-mid leading-6 font-medium text-primary">
                            ${price}
                        </span>
                        {ratingRow}
                    </div>
                ) : (
                    <>
                        <div className="flex gap-3 text-mid leading-6 font-medium">
                            <span className="text-primary">${price}</span>
                            {oldPrice && (
                                <span className="text-text-black/50 line-through">${oldPrice}</span>
                            )}
                        </div>
                        {ratingRow}
                    </>
                )}
                {colors && <img src={colors} alt="Available colors" className="h-5 w-12" />}
            </div>
        </article>
    );
}
