import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import ProductGrid from "../components/ui/ProductGrid";
import SectionHeader from "../components/ui/SectionHeader";
import { ROUTES } from "../constants/routes";
import { useWishlist } from "../hooks/useWishlist";
import { getProductsByTag } from "../services/productService";

export default function Wishlist() {
    const { products, isInWishlist, moveAllToCart } = useWishlist();
    const suggestions = getProductsByTag("explore")
        .filter((product) => !isInWishlist(product.id))
        .slice(0, 4);

    return (
        <Container className="py-10 lg:pt-20 lg:pb-[140px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-xl">Wishlist ({products.length})</h1>
                <Button variant="outline" onClick={moveAllToCart} disabled={products.length === 0}>
                    Move All To Bag
                </Button>
            </div>

            <div className="mt-[60px]">
                {products.length === 0 ? (
                    <EmptyState
                        title="Your wishlist is empty"
                        message="Tap the heart on any product to save it here."
                    />
                ) : (
                    <ProductGrid products={products} variant="wishlist" />
                )}
            </div>

            <div className="mt-16 flex flex-col gap-[60px] lg:mt-20">
                <SectionHeader
                    label="Just For You"
                    actions={
                        <Button to={`${ROUTES.search}?tag=all`} variant="outline">
                            See All
                        </Button>
                    }
                />
                <ProductGrid products={suggestions} />
            </div>
        </Container>
    );
}
