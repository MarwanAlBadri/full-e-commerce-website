import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import searchIcon from "../../assets/icons/search.svg";
import wishlistIcon from "../../assets/icons/wishlist.svg";
import cartIcon from "../../assets/icons/cart.svg";
import underline from "../../assets/icons/underline.svg";
import { ROUTES } from "../../constants/routes";
import Container from "../ui/Container";
import { cn } from "../../lib/cn";

const links = [
    { to: ROUTES.home, label: "Home" },
    { to: ROUTES.contact, label: "Contact" },
    { to: ROUTES.about, label: "About" },
    { to: ROUTES.signUp, label: "Sign Up" },
];

const authRoutes: string[] = [ROUTES.signUp, ROUTES.logIn];

export default function Header() {
    const { pathname } = useLocation();
    const isAuthPage = authRoutes.includes(pathname);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b border-black/30 py-4 lg:pt-10">
            <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                <div className="flex items-start lg:gap-16 xl:gap-[190px]">
                    <Link
                        to={ROUTES.home}
                        className="font-inter text-xxl leading-6 font-bold tracking-[0.72px] text-text-black"
                    >
                        Exclusive
                    </Link>
                    <nav
                        className={cn(
                            "absolute top-full left-0 z-10 w-full flex-col items-start gap-4 border-b border-black/30 bg-background px-4 py-4 lg:static lg:flex lg:w-auto lg:flex-row lg:gap-12 lg:border-0 lg:p-0",
                            menuOpen ? "flex" : "hidden",
                        )}
                    >
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setMenuOpen(false)}
                                className="flex flex-col items-center text-mid leading-6 text-text-black"
                            >
                                {({ isActive }) => (
                                    <>
                                        {label}
                                        {isActive && (
                                            <img src={underline} alt="" className="h-px w-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    <label className="hidden items-center gap-[34px] rounded bg-secondary py-[7px] pr-3 pl-5 sm:flex">
                        <input
                            type="search"
                            placeholder="What are you looking for?"
                            className="w-[160px] bg-transparent text-[12px] leading-[18px] outline-none placeholder:text-text-black/50"
                        />
                        <img src={searchIcon} alt="Search" className="size-6" />
                    </label>
                    {!isAuthPage && (
                        <div className="flex items-center gap-4">
                            <Link to={ROUTES.wishlist}>
                                <img src={wishlistIcon} alt="Wishlist" className="size-8" />
                            </Link>
                            <Link to={ROUTES.cart}>
                                <img src={cartIcon} alt="Cart" className="size-8" />
                            </Link>
                        </div>
                    )}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="cursor-pointer lg:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="size-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            {menuOpen ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </Container>
        </header>
    );
}
