import { ROUTES } from "../../constants/routes";
import { getProductsByTag } from "../../services/productService";
import Button from "../ui/Button";
import CarouselArrows from "../ui/CarouselArrows";
import Container from "../ui/Container";
import ProductGrid from "../ui/ProductGrid";
import SectionHeader from "../ui/SectionHeader";

export default function ExploreProducts() {
    return (
        <Container as="section">
            {/* All eight products fit on one page, so there is nothing to page through yet. */}
            <SectionHeader
                label="Our Products"
                title="Explore Our Products"
                actions={<CarouselArrows disabled />}
            />

            <div className="mt-[60px]">
                <ProductGrid products={getProductsByTag("explore")} layout="inline" />
            </div>

            <div className="mt-[60px] flex justify-center">
                <Button to={`${ROUTES.search}?tag=all`}>View All Products</Button>
            </div>
        </Container>
    );
}
