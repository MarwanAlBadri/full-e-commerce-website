import { Link } from "react-router-dom";
import chevronRight from "../../assets/icons/chevron-right.svg";

const categories = [
    { label: "Woman’s Fashion", slug: "womens-fashion", hasChildren: true },
    { label: "Men’s Fashion", slug: "mens-fashion", hasChildren: true },
    { label: "Electronics", slug: "electronics" },
    { label: "Home & Lifestyle", slug: "home-lifestyle" },
    { label: "Medicine", slug: "medicine" },
    { label: "Sports & Outdoor", slug: "sports-outdoor" },
    { label: "Baby’s & Toys", slug: "babys-toys" },
    { label: "Groceries & Pets", slug: "groceries-pets" },
    { label: "Health & Beauty", slug: "health-beauty" },
];

export default function CategorySidebar() {
    return (
        <nav aria-label="Product categories" className="flex w-[217px] shrink-0 flex-col gap-4">
            {categories.map(({ label, slug, hasChildren }) => (
                <Link
                    key={slug}
                    to={`/?category=${slug}`}
                    className="flex items-center justify-between text-mid leading-6 text-text-black hover:text-primary"
                >
                    {label}
                    {hasChildren && <img src={chevronRight} alt="" className="size-6" />}
                </Link>
            ))}
        </nav>
    );
}
