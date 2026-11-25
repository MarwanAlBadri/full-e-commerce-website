import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";
import { bestSellingProducts } from "../../data/products";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function BestSelling() {
    return (
        <Container as="section">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader label="This Month" title="Best Selling Products" />
                <Button to={ROUTES.home}>View All</Button>
            </div>

            <div className="mt-[60px] grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
                {bestSellingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Container>
    );
}
