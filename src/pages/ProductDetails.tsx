import { useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductReviews from "../components/product/ProductReviews";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import ProductGrid from "../components/ui/ProductGrid";
import SectionHeader from "../components/ui/SectionHeader";
import { ROUTES } from "../constants/routes";
import { TEST_IDS } from "../constants/testIds";
import { getProductById, getRelatedProducts } from "../services/productService";
import NotFound from "./NotFound";

export default function ProductDetails() {
    const { id = "" } = useParams();
    const product = getProductById(id);

    if (!product) return <NotFound />;

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs
                items={[
                    { label: "Account", to: ROUTES.account },
                    { label: "Home", to: ROUTES.home },
                    { label: product.name },
                ]}
            />

            <div
                data-testid={TEST_IDS.productDetails}
                className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[70px]"
            >
                {/* Keys reset the selected photo and options when moving between products. */}
                <ProductGallery key={`gallery-${product.id}`} product={product} />
                <ProductInfo key={`info-${product.id}`} product={product} />
            </div>

            <div className="mt-16 lg:mt-[140px]">
                <ProductReviews key={product.id} productId={product.id} />
            </div>

            <div className="mt-16 flex flex-col gap-[60px] lg:mt-[140px]">
                <SectionHeader label="Related Item" />
                <ProductGrid products={getRelatedProducts(product)} />
            </div>
        </Container>
    );
}
