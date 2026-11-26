import type { ProductImage } from "../../types/product";
import { cn } from "../../lib/cn";

interface ProductPhotoProps {
    image: ProductImage;
    alt: string;
    /** Multiplies the Figma frame size, for thumbnails or the product page. */
    scale?: number;
    className?: string;
}

/** Renders a product photo with the same crop it has in the design. */
export default function ProductPhoto({ image, alt, scale = 1, className }: ProductPhotoProps) {
    const { src, frame, crop } = image;
    const [width, height] = frame;

    return (
        <span
            className={cn("relative block max-w-full overflow-hidden", className)}
            style={{ width: width * scale, aspectRatio: `${width} / ${height}` }}
        >
            <img
                src={src}
                alt={alt}
                className={crop ? "absolute max-w-none" : "size-full"}
                style={
                    crop && {
                        width: `${crop.w}%`,
                        height: `${crop.h}%`,
                        left: `${crop.left}%`,
                        top: `${crop.top}%`,
                    }
                }
            />
        </span>
    );
}
