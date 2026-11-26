import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TEST_IDS } from "../../constants/testIds";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";

const items = [
    {
        label: "Manage My Account",
        to: ROUTES.account,
        icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0",
    },
    {
        label: "My Order",
        to: `${ROUTES.account}?tab=orders`,
        icon: "M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0",
    },
    {
        label: "My Cancellations",
        to: `${ROUTES.account}?tab=cancellations`,
        icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 9l6 6M15 9l-6 6",
    },
    {
        label: "My Reviews",
        to: `${ROUTES.account}?tab=reviews`,
        icon: "m12 4 2.4 5 5.6.7-4.1 3.8 1.1 5.5-5-2.8-5 2.8 1.1-5.5L4 9.7 9.6 9 12 4Z",
    },
];

const itemClasses =
    "flex w-full cursor-pointer items-center gap-4 text-left text-small leading-[21px]";

function MenuIcon({ path, className }: { path: string; className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={cn("size-6 shrink-0 fill-none stroke-current", className)}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={path} />
        </svg>
    );
}

export default function AccountMenu() {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    /** True when a touch started while the menu was closed: that tap must only open it. */
    const openedByTouch = useRef(false);

    useEffect(() => {
        if (!isOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        const closeOnOutsidePress = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("keydown", closeOnEscape);
        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.removeEventListener("pointerdown", closeOnOutsidePress);
        };
    }, [isOpen]);

    const handleLogOut = () => {
        if (openedByTouch.current) {
            openedByTouch.current = false;
            setIsOpen(true);
            return;
        }
        logOut();
        navigate(ROUTES.home);
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onPointerEnter={(event) => event.pointerType === "mouse" && setIsOpen(true)}
            onPointerLeave={(event) => event.pointerType === "mouse" && setIsOpen(false)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
            }}
        >
            <button
                type="button"
                aria-label="Account menu"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white"
            >
                <MenuIcon path={items[0].icon} className="size-5" />
            </button>

            {/* Kept in the DOM while closed (only transparent) so the logout button stays reachable. */}
            <div
                className={cn(
                    "absolute top-full right-0 z-30 w-56 pt-2 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0",
                )}
            >
                <div className="flex flex-col gap-3 rounded bg-black/70 px-5 py-4 text-heading-white backdrop-blur-xl">
                    {items.map(({ label, to, icon }) => (
                        <Link
                            key={label}
                            to={to}
                            onFocus={() => setIsOpen(true)}
                            onClick={() => setIsOpen(false)}
                            className={itemClasses}
                        >
                            <MenuIcon path={icon} />
                            {label}
                        </Link>
                    ))}
                    <button
                        type="button"
                        data-testid={TEST_IDS.logout}
                        onFocus={() => setIsOpen(true)}
                        onPointerDown={(event) => {
                            openedByTouch.current = event.pointerType === "touch" && !isOpen;
                        }}
                        onClick={handleLogOut}
                        className={itemClasses}
                    >
                        <MenuIcon path="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
