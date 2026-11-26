import { ROUTES } from "../../constants/routes";
import { getProductsByTag } from "../../services/productService";
import Button from "../ui/Button";
import Container from "../ui/Container";
import ProductGrid from "../ui/ProductGrid";
import SectionHeader from "../ui/SectionHeader";

export default function BestSelling() {
    return (
        <Container as="section">
            <SectionHeader
                label="This Month"
                title="Best Selling Products"
                actions={<Button to={`${ROUTES.search}?tag=best-selling`}>View All</Button>}
            />

            <div className="mt-[60px]">
                <ProductGrid products={getProductsByTag("best-selling")} />
            </div>
        </Container>
    );
}
