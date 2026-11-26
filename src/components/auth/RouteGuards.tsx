import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getRedirectTarget, logInPathWithRedirect } from "../../utils/redirect";

export function RequireAuth() {
    const { isAuthenticated } = useAuth();
    const { pathname, search } = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={logInPathWithRedirect(pathname + search)} replace />;
    }
    return <Outlet />;
}

/** Sign up and log in pages. Once signed in, the user moves on to where they were heading. */
export function GuestOnly() {
    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();

    if (isAuthenticated) return <Navigate to={getRedirectTarget(searchParams)} replace />;
    return <Outlet />;
}
