import { useState } from "react";
import { cn } from "../../lib/cn";
import type { Product } from "../../types/product";
import ProductPhoto from "../ui/ProductPhoto";

/** Thumbnails beside a large photo. Thumbnails appear only when there is more than one image. */
export default function ProductGallery({ product }: { product: Product }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = product.images[activeIndex];

    return (
        <div className="flex flex-col-reverse gap-4 sm:flex-row lg:gap-[30px]">
            {product.images.length > 1 && (
                <ul className="flex gap-4 sm:flex-col">
                    {product.images.map((image, index) => (
                        <li key={image.src}>
                            <button
                                type="button"
                                aria-label={`Show photo ${index + 1}`}
                                aria-pressed={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "flex size-20 cursor-pointer items-center justify-center rounded bg-secondary lg:h-[138px] lg:w-[170px]",
                                    index === activeIndex && "ring-2 ring-primary",
                                )}
                            >
                                <ProductPhoto image={image} alt="" scale={0.5} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex h-[320px] min-w-0 flex-1 items-center justify-center rounded bg-secondary p-6 md:h-[480px] lg:h-[600px]">
                <ProductPhoto image={activeImage} alt={product.name} scale={2} />
            </div>
        </div>
    );
}
