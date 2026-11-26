import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTopButton from "./ScrollToTopButton";
import TopHeader from "./TopHeader";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-text-black">
            <TopHeader />
            <div className="relative">
                <Header />
            </div>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <ScrollToTopButton />
            <ScrollRestoration />
        </div>
    );
}
