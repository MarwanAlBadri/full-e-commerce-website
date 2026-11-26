import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/icons/search.svg";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { cn } from "../../lib/cn";

interface HeaderSearchProps {
    /** The query currently shown on the search page. */
    initialQuery: string;
    className?: string;
}

export default function HeaderSearch({ initialQuery, className }: HeaderSearchProps) {
    const navigate = useNavigate();
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const text = query.trim();
        if (text) navigate(`${ROUTES.search}?q=${encodeURIComponent(text)}`);
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={cn(
                "flex items-center gap-3 rounded bg-secondary py-[7px] pr-3 pl-5 focus-within:ring-2 focus-within:ring-primary",
                className,
            )}
        >
            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                data-testid={TEST_IDS.searchInput}
                aria-label="Search products"
                placeholder="What are you looking for?"
                className="w-full min-w-0 bg-transparent text-[12px] leading-[18px] outline-none placeholder:text-text-black/50 sm:w-[185px]"
            />
            <button type="submit" aria-label="Search" className="shrink-0 cursor-pointer">
                <img src={searchIcon} alt="" className="size-6" />
            </button>
        </form>
    );
}
