import { Link, useSearchParams } from "react-router-dom";
import { MessagePanel, OrdersPanel, ReviewsPanel } from "../components/account/AccountPanels";
import ProfileForm from "../components/account/ProfileForm";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Container from "../components/ui/Container";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/cn";
import type { User } from "../types/user";

const menu = [
    {
        title: "Manage My Account",
        links: [
            { tab: "profile", label: "My Profile" },
            { tab: "address", label: "Address Book" },
            { tab: "payment", label: "My Payment Options" },
        ],
    },
    {
        title: "My Orders",
        links: [
            { tab: "orders", label: "My Orders" },
            { tab: "returns", label: "My Returns" },
            { tab: "cancellations", label: "My Cancellations" },
            { tab: "reviews", label: "My Reviews" },
        ],
    },
];

function TabContent({ tab, user }: { tab: string; user: User }) {
    switch (tab) {
        case "orders":
            return <OrdersPanel userId={user.id} />;
        case "reviews":
            return <ReviewsPanel userId={user.id} />;
        case "address":
            return (
                <MessagePanel
                    title="Address Book"
                    message={user.address || "No address saved yet. Add one under My Profile."}
                />
            );
        case "payment":
            return (
                <MessagePanel
                    title="My Payment Options"
                    message="You choose bank or cash on delivery at checkout. No cards are stored."
                />
            );
        case "returns":
            return <MessagePanel title="My Returns" message="You have no returns." />;
        case "cancellations":
            return <MessagePanel title="My Cancellations" message="You have no cancellations." />;
        default:
            return <ProfileForm user={user} />;
    }
}

export default function Account() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") ?? "profile";

    // `RequireAuth` guarantees a user; this keeps the types honest.
    if (!user) return null;

    return (
        <Container className="pb-16 lg:pb-[140px]">
            <div className="flex flex-wrap items-center justify-between gap-x-6">
                <Breadcrumbs
                    items={[{ label: "Home", to: ROUTES.home }, { label: "My Account" }]}
                />
                <p className="text-small">
                    Welcome! <span className="text-primary">{user.name}</span>
                </p>
            </div>
            <h1 className="sr-only">My account</h1>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[80px]">
                <nav aria-label="Account sections" className="flex flex-col gap-6">
                    {menu.map(({ title, links }) => (
                        <div key={title} className="flex flex-col gap-4">
                            <p className="text-mid font-medium">{title}</p>
                            <ul className="flex flex-col gap-2 pl-9">
                                {links.map(({ tab, label }) => (
                                    <li key={tab}>
                                        <Link
                                            to={`${ROUTES.account}?tab=${tab}`}
                                            aria-current={tab === activeTab ? "page" : undefined}
                                            className={cn(
                                                tab === activeTab
                                                    ? "text-primary"
                                                    : "text-text-black/50 hover:text-text-black",
                                            )}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <Link to={ROUTES.wishlist} className="text-mid font-medium">
                        My WishList
                    </Link>
                </nav>

                <div className="rounded px-4 py-8 shadow-[0_1px_13px_rgba(0,0,0,0.08)] md:px-20 md:py-10">
                    {/* The key discards unsaved edits when the profile or tab changes. */}
                    <TabContent
                        key={`${activeTab}-${user.identifier}`}
                        tab={activeTab}
                        user={user}
                    />
                </div>
            </div>
        </Container>
    );
}
