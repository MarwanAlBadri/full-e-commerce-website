import { Link } from "react-router-dom";

export interface Crumb {
    label: string;
    /** Omitted for the current page. */
    to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="py-10 lg:py-20">
            <ol className="flex flex-wrap items-center gap-3 text-small leading-[21px]">
                {items.map(({ label, to }, index) => (
                    <li key={label} className="flex items-center gap-3">
                        {index > 0 && <span className="text-text-black/50">/</span>}
                        {to ? (
                            <Link to={to} className="text-text-black/50 hover:text-text-black">
                                {label}
                            </Link>
                        ) : (
                            <span aria-current="page">{label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
