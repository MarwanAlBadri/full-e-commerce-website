import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import ProductGrid from "../components/ui/ProductGrid";
import { ROUTES } from "../constants/routes";
import { CATEGORIES } from "../data/categories";
import { searchProducts, type ProductFilter } from "../services/productService";

const TAG_TITLES = {
    "flash-sale": "Flash Sales",
    "best-selling": "Best Selling Products",
    explore: "Explore Our Products",
    all: "All Products",
} as const;

const isTag = (value: string): value is keyof typeof TAG_TITLES => Object.hasOwn(TAG_TITLES, value);

function readFilter(searchParams: URLSearchParams): ProductFilter {
    const tag = searchParams.get("tag") ?? "";
    return {
        query: searchParams.get("q") ?? "",
        categoryId: searchParams.get("category") ?? undefined,
        tag: isTag(tag) ? tag : undefined,
    };
}

function getTitle({ query, categoryId, tag }: ProductFilter): string {
    if (query) return `Results for “${query}”`;
    if (categoryId) {
        return CATEGORIES.find((category) => category.id === categoryId)?.name ?? "Category";
    }
    return tag ? TAG_TITLES[tag] : "Search";
}

export default function Search() {
    const [searchParams] = useSearchParams();
    const filter = readFilter(searchParams);
    const results = searchProducts(filter);
    const title = getTitle(filter);

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Search" }]} />
            <h1 className="font-inter text-[28px] font-semibold tracking-[1.44px] break-words md:text-heading-small">
                {title}
            </h1>
            <p role="status" className="mt-2 mb-10 text-mid text-text-black/60">
                {results.length} {results.length === 1 ? "product" : "products"}
            </p>

            {results.length > 0 ? (
                <ProductGrid products={results} />
            ) : (
                <EmptyState
                    title="No products found"
                    message="Check the spelling or try a shorter word, for example “gamepad”."
                    actionLabel="Back to home page"
                />
            )}
        </Container>
    );
}
