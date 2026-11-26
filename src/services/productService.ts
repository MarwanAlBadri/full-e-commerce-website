import { PRODUCTS } from "../data/products";
import type { Product, ProductTag } from "../types/product";

export interface ProductFilter {
    query?: string;
    categoryId?: string;
    /** "all" lists the whole catalogue. */
    tag?: ProductTag | "all";
}

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByTag(tag: ProductTag): Product[] {
    return PRODUCTS.filter((product) => product.tags.includes(tag));
}

/** Products that share the most categories come first. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
    const sharedCategories = (other: Product) =>
        other.categoryIds.filter((id) => product.categoryIds.includes(id)).length;

    return PRODUCTS.filter((other) => other.id !== product.id)
        .sort((a, b) => sharedCategories(b) - sharedCategories(a))
        .slice(0, limit);
}

/** Every word of the query must appear in the product name (case-insensitive). */
function matchesQuery(product: Product, query: string): boolean {
    const name = product.name.toLowerCase();
    return query
        .toLowerCase()
        .split(/\s+/)
        .every((word) => name.includes(word));
}

/** Returns only the products that match every given filter. No filter means no results. */
export function searchProducts({ query = "", categoryId, tag }: ProductFilter): Product[] {
    const text = query.trim();
    if (!text && !categoryId && !tag) return [];

    return PRODUCTS.filter(
        (product) =>
            (!text || matchesQuery(product, text)) &&
            (!categoryId || product.categoryIds.includes(categoryId)) &&
            (!tag || tag === "all" || product.tags.includes(tag)),
    );
}
