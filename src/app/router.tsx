import { createBrowserRouter } from "react-router-dom";
import { GuestOnly, RequireAuth } from "../components/auth/RouteGuards";
import Layout from "../components/layout/Layout";
import { PRODUCT_ROUTE_PATTERN, ROUTES } from "../constants/routes";
import About from "../pages/About";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import Wishlist from "../pages/Wishlist";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { path: ROUTES.home, element: <Home /> },
                    { path: ROUTES.about, element: <About /> },
                    { path: ROUTES.contact, element: <Contact /> },
                    { path: ROUTES.search, element: <Search /> },
                    { path: PRODUCT_ROUTE_PATTERN, element: <ProductDetails /> },
                    { path: ROUTES.cart, element: <Cart /> },
                    { path: ROUTES.wishlist, element: <Wishlist /> },
                    { path: ROUTES.checkout, element: <Checkout /> },
                    {
                        element: <GuestOnly />,
                        children: [
                            { path: ROUTES.signUp, element: <SignUp /> },
                            { path: ROUTES.logIn, element: <Login /> },
                        ],
                    },
                    {
                        element: <RequireAuth />,
                        children: [{ path: ROUTES.account, element: <Account /> }],
                    },
                    { path: "*", element: <NotFound /> },
                ],
            },
        ],
    },
]);
