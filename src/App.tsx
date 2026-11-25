import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Placeholder from "./pages/Placeholder";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { PRODUCT_ROUTE_PATTERN, ROUTES } from "./constants/routes";

const pages = [
    { path: ROUTES.wishlist, title: "Wishlist" },
    { path: ROUTES.cart, title: "Cart" },
    { path: ROUTES.checkout, title: "Checkout" },
    { path: ROUTES.account, title: "Account" },
    { path: ROUTES.about, title: "About" },
    { path: ROUTES.contact, title: "Contact" },
    { path: PRODUCT_ROUTE_PATTERN, title: "Product Details" },
    { path: "*", title: "404 Not Found" },
];

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={ROUTES.home} element={<Home />} />
                    <Route path={ROUTES.signUp} element={<SignUp />} />
                    <Route path={ROUTES.logIn} element={<Login />} />
                    {pages.map(({ path, title }) => (
                        <Route key={path} path={path} element={<Placeholder title={title} />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
