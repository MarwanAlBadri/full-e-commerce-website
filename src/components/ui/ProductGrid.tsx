import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    layout?: "stacked" | "inline";
    variant?: "default" | "wishlist";
}

export default function ProductGrid({ products, layout, variant }: ProductGridProps) {
    return (
        <div className="grid gap-x-[30px] gap-y-[60px] sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} layout={layout} variant={variant} />
            ))}
        </div>
    );
}
