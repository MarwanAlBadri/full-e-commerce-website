import { useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import underline from "../../assets/icons/underline.svg";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";
import Container from "../ui/Container";
import AccountMenu from "./AccountMenu";
import HeaderActions from "./HeaderActions";
import HeaderSearch from "./HeaderSearch";

const authRoutes: string[] = [ROUTES.signUp, ROUTES.logIn];

export default function Header() {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const { isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const isAuthPage = authRoutes.includes(pathname);
    const query = searchParams.get("q") ?? "";

    const links = [
        { to: ROUTES.home, label: "Home" },
        { to: ROUTES.contact, label: "Contact" },
        { to: ROUTES.about, label: "About" },
        isAuthenticated
            ? { to: ROUTES.account, label: "Account" }
            : { to: ROUTES.signUp, label: "Sign Up" },
    ];

    return (
        <header className="border-b border-black/30 py-4 lg:pt-10">
            <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
                <div className="flex items-start lg:gap-12 xl:gap-[190px]">
                    <Link
                        to={ROUTES.home}
                        className="font-inter text-xxl leading-6 font-bold tracking-[0.72px] text-text-black"
                    >
                        Exclusive
                    </Link>
                    <nav
                        className={cn(
                            "absolute top-full left-0 z-20 w-full flex-col items-start gap-4 border-b border-black/30 bg-background px-4 py-4 lg:static lg:flex lg:w-auto lg:flex-row lg:gap-8 lg:border-0 lg:p-0 xl:gap-12",
                            menuOpen ? "flex" : "hidden",
                        )}
                    >
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={label}
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

                {/* One search field only: it moves to its own row on small screens. */}
                <HeaderSearch
                    key={query}
                    initialQuery={query}
                    className="order-last w-full sm:order-none sm:ml-auto sm:w-auto"
                />

                <div className="flex items-center gap-4">
                    {!isAuthPage && <HeaderActions />}
                    {isAuthenticated && <AccountMenu />}
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
