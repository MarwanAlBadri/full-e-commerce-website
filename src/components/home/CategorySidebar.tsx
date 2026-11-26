import { Link } from "react-router-dom";
import chevronRight from "../../assets/icons/chevron-right.svg";
import { ROUTES } from "../../constants/routes";
import { CATEGORIES } from "../../data/categories";

const SIDEBAR_COUNT = 9;
/** The design shows a chevron beside the two fashion categories. */
const WITH_CHEVRON = ["womens-fashion", "mens-fashion"];

export default function CategorySidebar() {
    return (
        <nav aria-label="Product categories" className="flex w-[217px] shrink-0 flex-col gap-4">
            {CATEGORIES.slice(0, SIDEBAR_COUNT).map(({ id, name }) => (
                <Link
                    key={id}
                    to={`${ROUTES.search}?category=${id}`}
                    className="flex items-center justify-between text-mid leading-6 text-text-black hover:text-primary"
                >
                    {name}
                    {WITH_CHEVRON.includes(id) && (
                        <img src={chevronRight} alt="" className="size-6 -rotate-90" />
                    )}
                </Link>
            ))}
        </nav>
    );
}
