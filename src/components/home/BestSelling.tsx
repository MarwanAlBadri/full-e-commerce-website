import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";
import { bestSellingProducts } from "../../data/products";

export default function BestSelling() {
    return (
        <section className="mx-auto max-w-[1202px] px-4">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader label="This Month" title="Best Selling Products" />
                <Link
                    to="/"
                    className="rounded bg-primary px-12 py-4 text-mid leading-6 font-medium text-heading-white hover:opacity-90"
                >
                    View All
                </Link>
            </div>

            <div className="mt-[60px] grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
                {bestSellingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
