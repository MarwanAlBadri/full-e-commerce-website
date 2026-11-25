import SectionHeader from "../ui/SectionHeader";
import CarouselArrows from "../ui/CarouselArrows";
import ProductCard from "../ui/ProductCard";
import { exploreProducts } from "../../data/products";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function ExploreProducts() {
    return (
        <Container as="section">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader label="Our Products" title="Explore Our Products" />
                {/* All eight products fit on one page, so there is nothing to page through yet. */}
                <CarouselArrows disabled />
            </div>

            <div className="mt-[60px] grid gap-x-[30px] gap-y-[60px] sm:grid-cols-2 lg:grid-cols-4">
                {exploreProducts.map((product) => (
                    <ProductCard key={product.id} product={product} layout="inline" />
                ))}
            </div>

            <div className="mt-[60px] flex justify-center">
                <Button to={ROUTES.home}>View All Products</Button>
            </div>
        </Container>
    );
}
