import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import CarouselArrows from "../ui/CarouselArrows";
import ProductCard from "../ui/ProductCard";
import { exploreProducts } from "../../data/products";
import { ROUTES } from "../../constants/routes";

export default function ExploreProducts() {
    return (
        <section className="mx-auto max-w-[1202px] px-4">
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
                <Link
                    to={ROUTES.home}
                    className="rounded bg-primary px-12 py-4 text-mid leading-6 font-medium text-heading-white hover:opacity-90"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
